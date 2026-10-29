// Simply supported beam, central point load: live demo for §2.3.
(function () {
  const { $, fmt, set, opt, nb } = NB;
  const X0 = 40, X1 = 480, Y0 = 86;           // beam ends and rest line in SVG units
  const MAX_DRAW = 52;                         // largest drawn deflection, SVG units
  const SCALE = 200;                           // fixed exaggeration of the drawn deflection
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const curve = $("beam-curve"), load = $("load");
  let drawn = null, anim = 0; // null until the first draw, which matches the shipped figure and is not animated

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
    if (drawn === null || reduceMotion.matches) return draw(target);
    const from = drawn, start = performance.now(), dur = 420;
    const step = (t) => {
      const k = Math.min(1, (t - start) / dur);
      draw(from + (target - from) * (1 - Math.pow(2, -10 * k)));
      if (k < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  NB.demo(function (v) {
    const P = v.P * 1e3, L = v.L, E = v.E * 1e9;
    const b = v.b / 1e3, h = v.h / 1e3;
    const I = (b * h * h * h) / 12;
    const delta = (P * L ** 3) / (48 * E * I);
    const M = (P * L) / 4;
    const theta = (P * L * L) / (16 * E * I);
    const ratio = L / delta;

    set("out-I", fmt(I * 1e12) + " mm⁴");
    set("out-M", fmt(M / 1e3) + " kN·m");
    set("out-T", fmt(theta * 1e3) + " mrad");
    set("out-D", fmt(delta * 1e3) + " mm");

    // Drawn deflection: true scale is 440 units per span, exaggerated by a fixed SCALE and clipped at MAX_DRAW.
    const ex = NB.exaggerate((delta / L) * (X1 - X0), SCALE, MAX_DRAW);
    set("scale-label", "deflection " + ex.label);
    set("load-label", "P = " + fmt(v.P) + " kN");
    set("span-label", "L = " + v.L.toFixed(2) + " m");
    animateTo(ex.amp);

    let note = "The beam deflects " + fmt(delta * 1e3) + " mm at mid-span, or L/" + fmt(ratio, 4) + ".";
    if (ratio < 50) note += " That is more than L/50, so small-deflection theory no longer holds well.";
    else if (ratio < 360) note += " That is more than L/360, a common serviceability limit for floors.";
    set("readout", note);

    // Worked example: the same numbers, written out.
    set("g-P", fmt(v.P) + " kN");
    set("g-L", fmt(v.L) + " m");
    set("g-Ename", opt("E").dataset.name);
    set("g-E", fmt(E / 1e9) + " GPa");
    set("g-bh", v.b + " × " + v.h + " mm");
    set("w-I", fmt(I, 4) + nb + "m⁴");
    set("w-sub", "= " + fmt(P, 4) + nb + "N × (" + fmt(L) + nb + "m)³ / (48 × " + fmt(E) + nb + "Pa × " + fmt(I, 4) + nb + "m⁴)");
    set("w-m", "= " + fmt(delta) + nb + "m");
    set("w-ans", fmt(delta * 1e3) + " mm");
    set("w-note", "Span over deflection: L/" + fmt(ratio, 4) + ".");
  });
})();
