# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Engineer's Notebook (`engineersnotebook.github.io`): "your go-to for engineering theory, formulae and demos". It is a plain static site served by GitHub Pages. There is no build step, package manager, framework or test suite. Every page is hand-written HTML that shares one stylesheet, and each interactive demo has its own small script.

## Commands

- **Preview locally:** `python3 -m http.server 8765` from the repo root, then open `http://localhost:8765/`. Links are relative, so pages also work at sub-paths.
- **Screenshot a page** (the visual check used so far):
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion --virtual-time-budget=4000 --window-size=1440,2200 --screenshot=.impeccable/review/desktop.png http://localhost:8765/mechanics/beam-deflection.html`
  - Headless Chrome won't lay out narrower than about 500px. For a 390px phone view, screenshot a temporary HTML file that holds the page in a 390px-wide `<iframe>`, then delete that file.
- **Design detector:** `.claude/skills/impeccable/scripts/impeccable detect --json <files>`.
  - Ignores already applied live in `.impeccable/config.json`.
  - Known false positives: `flat-type-hierarchy` (it misreads `clamp()` headings), `design-system-color` on `.frac` borders (they use `currentColor`), and `cramped-padding` on the unboxed `.disc h2`.

## Architecture

- **Pages:**
  - `index.html` is the Contents page: a grid of six disciplines and one example.
  - Each discipline has a folder (`mechanics/`, `thermodynamics/`, `fluids/`, `materials/`, `electrical/`, `automotive/`) with an `index.html` topic list and one page per topic: 27 topics in all.
  - `mechanics/beam-deflection.html` is the original hand-written topic. Every other topic page follows its structure.
- **Shared chrome is duplicated, not templated.** Each page repeats the running head, the right-edge discipline tabs (`ul.tabs`: Contents, Mechanics, Thermo, Fluids, Materials, Electrical, Automotive) and the footer.
  - Adding a discipline or a page means editing the tab list on every page, plus the discipline index, the homepage (its demo count, and its list if the topic is among the first three, which is all it shows) and the neighbouring pagers.
  - Every discipline is published now. A future unpublished one would use `class="soon"` and link to its homepage section.
- **Topic page order** (keep it the same for new topics):
  1. title, lede, `.eq` formula block, `dl.symbols`
  2. the boxed demo (`.demo-col > figure.demo`, sticky beside every block on desktop; `notebook.js` shifts the sticky `top` of a demo taller than the window so it scrolls with the page until its far edge shows, so long demos need no special handling. Any page with a demo loads `notebook.js`)
  3. Worked example: `.step` rows for Given / Find / Solution / Answer, driven by the demo's values
  4. Assumptions and Derivation as collapsed `details.more`
  5. Related cases/forms (`details#cases` > `ul.cases`, a mini SVG beside its formulas; never a highlighted table shared with the main formula), then the pager

  The source order is what puts the demo straight after the formula block on phones.
- **Demo scripts** (`assets/js/<topic>.js`) find elements by id.
  - `beam-deflection.js` is self-contained. Every other topic loads `assets/js/notebook.js` first and calls `NB.demo(update)`. The helper binds every `.demo .ctl` (range/number pair `<key>-range`/`<key>-num`, or select `<key>-sel`), validates against the number input's `min`, `max`, `data-name` and `data-unit`, then calls `update(values)` and flashes the worked example. It also supplies `fmt`, `set`, `attr`, `opt`, `path`, `arrow`, `nice`, `exaggerate` and `limit`.
  - Demo figures use `svg.fig` with token classes from `site.css` (`s-ink`, `s-ox`, `f-tab`, `t-ox` and so on) instead of hex colours.
  - The HTML ships with each demo's default output already written in (worked example, results and figure), so pages read correctly without JavaScript. If you change a default, update those values too.
  - `beam-deflection.js` syncs each range input with its number input, validates against each field's min and max, redraws the SVG elastic curve with an auto-chosen exaggeration scale, fills the results table, and rewrites the worked-example `.live` spans, which flash on change.
  - `fmt()` switches to ×10ⁿ notation outside 1e-2 to 1e5. Units are joined to their values with a no-break space.
- **Maths markup:** variables are `<i class="v">` (italic serif) and numerals stay mono. Fractions are `.frac` with two child spans, and subscripts use `<sub>`. Greek letters in uppercase table headers go in `.gk`, so δ does not render as Δ.
- **Placeholders:** unpublished topics appear greyed (`.planned`, `li` without `.live`), with one legend line ("Topics in grey are in preparation."). Never invent content, authors, usage figures or testimonials (PRODUCT.md, Evidence on Hand).

## Design authority

Design work in this repo goes through the Impeccable skill (`/impeccable`, in `.claude/skills/impeccable`). Read these before changing any UI:

- `PRODUCT.md`: audience (students, practising engineers, hobbyists), demo-led positioning, static-only constraint.
- `DESIGN.md` and `.impeccable/design.json`: the "Tabbed Handbook" visual system. These are tokens on `:root` in `assets/css/site.css`. Its named rules:
  - Where-and-Live: oxblood `#b3261e` only marks location or a live value.
  - Cool Stock: cool grey paper, never cream.
  - Variable Is Serif Italic.
  - Apparatus Is Narrow: labels use Archivo Narrow.
  - Ruled Not Raised: no shadows.
- `.impeccable/surfaces/index-html.md`: the current direction contract for the three pages.

Still not done: the homepage and `beam-deflection.html` SVGs still use hard-coded hex colours instead of the `svg.fig` token classes, and a few inline `style=` margins remain there.
