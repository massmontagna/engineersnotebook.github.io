// Shared plumbing for the topic demos: number formatting, input binding, the
// worked-example flash and a few SVG helpers. Each topic script calls NB.demo(update).
(function () {
  const $ = (id) => document.getElementById(id);
  const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
  const values = {};

  function fmt(n, digits) {
    // Plain numbers in the everyday range, scientific notation outside it. Negatives get a true minus sign.
    // Round first, so 0.009996 reads 0.01 and 99,960 reads 1 × 10⁵, never "10 × 10⁻³".
    // Round with the same formatter that displays it, so ties go the same way in both.
    const d = digits || 3, r = Number(n.toLocaleString("en-US", { maximumSignificantDigits: d, useGrouping: false }));
    let s;
    if (r !== 0 && (Math.abs(r) >= 1e5 || Math.abs(r) < 1e-2)) {
      const exp = Math.floor(Math.log10(Math.abs(r)));
      const mant = (r / 10 ** exp).toLocaleString("en-GB", { maximumSignificantDigits: d });
      s = mant + " × 10" + String(exp).replace(/./g, (c) => SUP[c]);
    } else s = r.toLocaleString("en-GB", { maximumSignificantDigits: d });
    return s.replace("-", "−");
  }

  const set = (id, text) => { $(id).textContent = text; };
  const opt = (key) => $(key + "-sel").selectedOptions[0];
  function attr(id, attrs) {
    const el = $(id);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
  }

  // Polyline through [x, y] points.
  function path(pts) {
    return pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  }

  // Shaft from (x1, y1) to (x2, y2) with a closed head at the second point. Give the path a stroke and a fill.
  function arrow(x1, y1, x2, y2, head) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    if (len < 1) return "";
    const h = Math.min(head || 9, len), ux = dx / len, uy = dy / len, w = h * 0.55;
    const bx = x2 - ux * h, by = y2 - uy * h;
    return path([[x1, y1], [bx, by]]) + " " + path([[bx - uy * w, by + ux * w], [x2, y2], [bx + uy * w, by - ux * w]]) + " Z";
  }

  // Displacement drawn at a fixed exaggeration, clipped at max SVG units so the figure never rescales.
  function exaggerate(trueAmp, scale, max) {
    const amp = trueAmp * scale;
    return { amp: Math.min(amp, max), label: "drawn ×" + scale.toLocaleString("en-GB") + (amp > max ? ", off scale" : "") };
  }

  // Narrow a control's allowed range when it depends on another input, clamping its value.
  function limit(key, min, max) {
    const range = $(key + "-range"), num = $(key + "-num");
    range.min = num.min = min;
    range.max = num.max = max;
    const v = Math.min(max, Math.max(min, values[key]));
    if (v !== values[key]) {
      values[key] = v;
      range.value = num.value = v;
    }
    return v;
  }

  function demo(update) {
    let started = false, flashTimer = 0;

    // Mark the worked example's live values each time the demo changes them. A page with
    // several demos has one .topic per demo, so only the changed demo's example flashes.
    function flash(ctl) {
      const live = (ctl.closest(".topic") || document).querySelectorAll(".worked-live .live");
      live.forEach((el) => el.classList.remove("flash"));
      void document.body.offsetWidth; // restart the animation
      live.forEach((el) => el.classList.add("flash"));
      clearTimeout(flashTimer);
      flashTimer = setTimeout(() => live.forEach((el) => el.classList.remove("flash")), 900);
    }
    function run(ctl) {
      update(values);
      if (started) flash(ctl);
    }

    document.querySelectorAll(".demo .ctl").forEach((ctl) => {
      const sel = ctl.querySelector("select");
      if (sel) {
        const key = sel.id.replace(/-sel$/, "");
        values[key] = Number(sel.value);
        sel.addEventListener("change", () => { values[key] = Number(sel.value); run(ctl); });
        return;
      }
      const num = ctl.querySelector('input[type="number"]'), range = ctl.querySelector('input[type="range"]');
      const key = num.id.replace(/-num$/, ""), err = $(key + "-err");
      values[key] = Number(num.value);
      function accept(v, from) {
        values[key] = v;
        if (from !== range) range.value = v;
        if (from !== num) num.value = v;
        num.removeAttribute("aria-invalid");
        err.textContent = "";
        run(ctl);
      }
      range.addEventListener("input", () => accept(Number(range.value), range));
      num.addEventListener("input", () => {
        const v = Number(num.value);
        if (num.value.trim() !== "" && v >= Number(num.min) && v <= Number(num.max)) return accept(v, num);
        num.setAttribute("aria-invalid", "true");
        const unit = num.dataset.unit ? " " + num.dataset.unit : "";
        err.textContent = "Enter " + num.dataset.name + " between " + fmt(Number(num.min), 4) + " and " + fmt(Number(num.max), 4) + unit + ".";
      });
      num.addEventListener("blur", () => {
        if (num.getAttribute("aria-invalid")) accept(values[key], range); // restore the last valid value
      });
    });

    update(values);
    started = true;
  }

  // The sticky demo column normally pins 24px from the top. When it is taller than the window, shift that
  // offset with each scroll: reading down, it rides up until its foot shows; scrolling back, down until its head shows.
  function stickyDemo(col) {
    const GAP = 24, wide = window.matchMedia("(min-width: 961px)");
    let top = GAP, lastY = window.scrollY;
    function place() {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!wide.matches) return col.style.removeProperty("top");
      const lowest = Math.min(GAP, window.innerHeight - col.offsetHeight - GAP);
      top = Math.max(lowest, Math.min(GAP, top - dy));
      col.style.top = top + "px";
    }
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    new ResizeObserver(place).observe(col); // sections opening or closing change its height
    place();
  }
  document.querySelectorAll(".topic > .demo-col").forEach(stickyDemo);

  window.NB = { $, fmt, set, opt, attr, path, arrow, exaggerate, limit, demo, nb: " " };
})();
