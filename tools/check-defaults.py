#!/usr/bin/env python3
"""Check that every topic page ships the same defaults its demo script writes.

Each page has its default output written into the HTML so it reads correctly without
JavaScript. This renders each page in headless Chrome and compares every element with
an id (its text and its drawing attributes) against the shipped HTML.

Run from anywhere: python3 tools/check-defaults.py [page.html ...]
Exits 1 and lists each difference when a page has drifted.
"""
import functools, glob, http.server, os, re, subprocess, sys, threading
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
GEOMETRY = ("d", "x", "y", "cx", "cy", "x1", "y1", "x2", "y2", "width", "height", "transform", "visibility")
VOID = {"input", "br", "img", "meta", "link", "source", "hr", "col", "wbr"}


class Ids(HTMLParser):
    """Text and geometry attributes of every element with an id."""

    def __init__(self, html):
        super().__init__()
        self.stack, self.text, self.attrs = [], {}, {}
        self.hidden, self.live, self.parents = set(), set(), set()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        if tag in VOID:
            return
        a = dict(attrs)
        self.add(a)
        self.stack.append((tag, a.get("id")))

    def handle_startendtag(self, _tag, attrs):
        self.add(dict(attrs))

    def add(self, a):
        i = a.get("id")
        if not i:
            return
        self.text[i] = ""
        self.attrs[i] = {k: v for k, v in a.items() if k in GEOMETRY}
        self.parents.update(j for _, j in self.stack if j)  # compared through their own ids instead
        if "hidden" in a:
            self.hidden.add(i)
        if "aria-live" in a:
            self.live.add(i)

    def handle_endtag(self, tag):
        while self.stack and self.stack.pop()[0] != tag:
            pass

    def handle_data(self, data):
        for _, i in self.stack:
            if i:
                self.text[i] += data


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


def close(a, b):
    # SVG numbers are rounded differently by hand and by script; allow under a pixel.
    na, nb = re.findall(r"-?\d+\.?\d*", a), re.findall(r"-?\d+\.?\d*", b)
    return re.sub(r"-?\d+\.?\d*", "#", a) == re.sub(r"-?\d+\.?\d*", "#", b) and len(na) == len(nb) and \
        all(abs(float(x) - float(y)) < 0.6 for x, y in zip(na, nb))


def diff(page, base):
    shipped = Ids(open(os.path.join(ROOT, page), encoding="utf-8").read())
    dom = subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--force-prefers-reduced-motion",
         "--virtual-time-budget=3000", "--dump-dom", base + page],
        capture_output=True, text=True, check=True).stdout
    rendered = Ids(dom)
    out = []
    for i, text in shipped.text.items():
        # Skip what only the script shows or fills: a hidden control, or a live region shipped empty.
        if i not in rendered.text or i in shipped.parents or i in shipped.hidden:
            continue
        if not (i in shipped.live and not norm(text)) and norm(text) != norm(rendered.text[i]):
            out.append(f"#{i}: ships {norm(text)[:90]!r}, script writes {norm(rendered.text[i])[:90]!r}")
        for k, v in shipped.attrs[i].items():
            w = rendered.attrs[i].get(k, "")
            if v != w and not close(v, w):
                out.append(f"#{i} {k}: ships {v[:60]!r}, script writes {w[:60]!r}")
    return out


def main():
    os.chdir(ROOT)
    pages = sys.argv[1:] or sorted(p for p in glob.glob("*/*.html") if not p.endswith("index.html"))
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *_):
            pass

    handler = functools.partial(Quiet, directory=ROOT)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_port}/"
    failed = 0
    for page in pages:
        problems = diff(page, base)
        if problems:
            failed += 1
            print(page)
            for p in problems:
                print("  " + p)
    server.shutdown()
    print(f"{len(pages) - failed} of {len(pages)} pages match their scripts.")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
