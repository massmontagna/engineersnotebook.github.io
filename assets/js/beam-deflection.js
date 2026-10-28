// Simply supported beam, central point load: live demo for §2.3.
(function () {
  const X0 = 40, X1 = 480, Y0 = 86;           // beam ends and rest line in SVG units
  const MAX_DRAW = 52;                         // largest drawn deflection, SVG units
  const SCALES = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const fields = {
    P: { min: 0.1, max: 50, unit: "kN", name: "a load" },
    L: { min: 0.5, max: 10, unit: "m", name: "a span" },
    b: { min: 5, max: 300, unit: "mm", name: "a width" },
    h: { min: 5, max: 500, unit: "mm", name: "a depth" },
  };
  const values = { P: 2, L: 1.5, b: 40, h: 80 };
  const $ = (id) => document.getElementById(id);
  const curve = $("beam-curve"), load = $("load");
  let drawn = 0, anim = 0;

  const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };

  function fmt(n, digits) {
    // Plain numbers in the everyday range, scientific notation outside it.
    if (n !== 0 && (Math.abs(n) >= 1e5 || Math.abs(n) < 1e-2)) {
      const exp = Math.floor(Math.log10(Math.abs(n)));
      const mant = (n / 10 ** exp).toLocaleString("en-GB", { maximumSignificantDigits: digits || 3 });
      return mant + " × 10" + String(exp).replace(/./g, (c) => SUP[c]);
    }
    return n.toLocaleString("en-GB", { maximumSignificantDigits: digits || 3 });
  }

  function shape(amp) {
    // Elastic line normalised to its mid-span value: f(u) = 3u − 4u³ for u ≤ ½, mirrored.
    let d = "";
    for (let i = 0; i <= 40; i++) {
      const u = i / 40, v = u <= 0.5 ? u : 1 - u;
      const y = Y0 + amp * (3 * v - 4 * v * v * v);
      d += (i ? " L" : "M") + (X0 + u * (X1 - X0)).toFixed(1) + " " + y.toFixed(2);
    }
    return d;
  }

  function draw(amp) {
    drawn = amp;
    curve.setAttribute("d", shape(amp));
    load.setAttribute("transform", "translate(0 " + amp.toFixed(2) + ")");
  }

  function animateTo(target) {
    cancelAnimationFrame(anim);
    if (reduceMotion.matches) return draw(target);
    const from = drawn, start = performance.now(), dur = 420;
    const step = (t) => {
      const k = Math.min(1, (t - start) / dur);
      draw(from + (target - from) * (1 - Math.pow(2, -10 * k)));
      if (k < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  function update() {
    const P = values.P * 1e3, L = values.L, E = Number($("E-sel").value) * 1e9;
    const b = values.b / 1e3, h = values.h / 1e3;
    const I = (b * h * h * h) / 12;
    const delta = (P * L ** 3) / (48 * E * I);
    const M = (P * L) / 4;
    const theta = (P * L * L) / (16 * E * I);
    const ratio = L / delta;

    $("out-I").textContent = fmt(I * 1e12) + " mm⁴";
    $("out-M").textContent = fmt(M / 1e3) + " kN·m";
    $("out-T").textContent = fmt(theta * 1e3) + " mrad";
    $("out-D").textContent = fmt(delta * 1e3) + " mm";

    // Drawn deflection: true scale is 440 units per span; pick the largest round exaggeration that fits.
    const trueAmp = (delta / L) * (X1 - X0);
    let scale = 1;
    for (const s of SCALES) if (trueAmp * s <= MAX_DRAW) scale = s;
    const amp = Math.min(trueAmp * scale, MAX_DRAW);
    $("scale-label").textContent = trueAmp > MAX_DRAW
      ? "deflection not to scale"
      : "deflection drawn ×" + scale.toLocaleString("en-GB");
    $("load-label").textContent = "P = " + fmt(values.P) + " kN";
    $("span-label").textContent = "L = " + values.L.toFixed(2) + " m";
    animateTo(amp);

    let note = "The beam deflects " + fmt(delta * 1e3) + " mm at mid-span, or L/" + fmt(ratio, 4) + ".";
    if (ratio < 50) note += " That is more than L/50, so small-deflection theory no longer holds well.";
    else if (ratio < 360) note += " That is more than L/360, a common serviceability limit for floors.";
    $("readout").textContent = note;

    // Worked example: the same numbers, written out.
    const opt = $("E-sel").selectedOptions[0];
    $("g-P").textContent = fmt(values.P) + " kN";
    $("g-L").textContent = fmt(values.L) + " m";
    $("g-Ename").textContent = opt.dataset.name;
    $("g-E").textContent = fmt(E / 1e9) + " GPa";
    $("g-bh").textContent = values.b + " × " + values.h + " mm";
    const nb = "\u00a0"; // keep each unit on the same line as its value
    $("w-I").textContent = fmt(I, 4) + nb + "m⁴";
    $("w-sub").textContent = "= " + fmt(P, 4) + nb + "N × (" + fmt(L) + nb + "m)³ / (48 × " + fmt(E) + nb + "Pa × " + fmt(I, 4) + nb + "m⁴)";
    $("w-m").textContent = "= " + fmt(delta) + nb + "m";
    $("w-ans").textContent = fmt(delta * 1e3) + " mm";
    $("w-note").textContent = "Span over deflection: L/" + fmt(ratio, 4) + ".";
    if (started) flash();
  }

  function bind(key) {
    const f = fields[key], range = $(key + "-range"), num = $(key + "-num"), err = $(key + "-err");
    function accept(v, from) {
      values[key] = v;
      if (from !== range) range.value = v;
      if (from !== num) num.value = v;
      num.removeAttribute("aria-invalid");
      err.textContent = "";
      update();
    }
    range.addEventListener("input", () => accept(Number(range.value), range));
    num.addEventListener("input", () => {
      const v = Number(num.value);
      if (num.value.trim() !== "" && v >= f.min && v <= f.max) return accept(v, num);
      num.setAttribute("aria-invalid", "true");
      err.textContent = "Enter " + f.name + " between " + f.min + " and " + f.max + " " + f.unit + ".";
    });
    num.addEventListener("blur", () => {
      if (num.getAttribute("aria-invalid")) accept(values[key], range); // restore the last valid value
    });
  }

  // Mark the worked example's live values each time the demo changes them.
  let started = false, flashTimer = 0;
  function flash() {
    const live = document.querySelectorAll(".worked-live .live");
    live.forEach((el) => el.classList.remove("flash"));
    void document.body.offsetWidth; // restart the animation
    live.forEach((el) => el.classList.add("flash"));
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => live.forEach((el) => el.classList.remove("flash")), 900);
  }

  Object.keys(fields).forEach(bind);
  $("E-sel").addEventListener("change", update);
  update();
  started = true;
})();
