// Round bar in tension: live demo for Mechanics §3.1.
(function () {
  const { fmt, set, attr, opt, arrow, nb } = NB;
  const X0 = 40, XL = 400, CY = 90, MAX_DRAW = 40, SCALE = 50; // fixed end, unloaded end, axis, largest drawn extension, exaggeration

  NB.demo(function (v) {
    const F = v.F * 1e3, d = v.d / 1e3, L = v.L, E = v.E * 1e9;
    const sel = opt("E"), fy = Number(sel.dataset.fy);
    const A = (Math.PI * d * d) / 4, s = F / A, e = s / E, dL = e * L;

    const ex = NB.exaggerate(e * (XL - X0), SCALE, MAX_DRAW), end = XL + ex.amp, hh = 4 + (26 * v.d) / 100;
    attr("bar", { y: (CY - hh).toFixed(1), width: (end - X0).toFixed(1), height: (2 * hh).toFixed(1) });
    attr("force", { d: arrow(end + 4, CY, end + 64, CY, 14) });
    attr("force-label", { x: 512, "text-anchor": "end", y: (CY - hh - 10).toFixed(1) });
    set("force-label", "F = " + fmt(v.F) + " kN");
    set("len-label", "L = " + fmt(v.L) + " m");
    set("scale-label", "extension " + ex.label);

    set("out-A", fmt(A * 1e6) + " mm²");
    set("out-s", fmt(s / 1e6) + " MPa");
    set("out-e", fmt(e));
    set("out-dL", fmt(dL * 1e3) + " mm");
    const pct = (100 * s) / 1e6 / fy;
    const yieldNote = pct <= 100
      ? "The stress is " + fmt(pct) + "% of the yield strength of " + sel.dataset.name + " (" + fy + " MPa)."
      : "The stress exceeds the yield strength of " + sel.dataset.name + " (" + fy + " MPa), so the bar would yield and these elastic formulas no longer apply.";
    set("readout", "The bar stretches " + fmt(dL * 1e3) + " mm. " + yieldNote);

    set("g-F", fmt(v.F) + " kN");
    set("g-d", v.d + " mm");
    set("g-L", fmt(v.L) + " m");
    set("g-Ename", sel.dataset.name);
    set("g-E", fmt(v.E) + " GPa");
    set("w-A", "π × (" + v.d + nb + "mm)² / 4 = " + fmt(A * 1e6) + nb + "mm²");
    set("w-s", fmt(F, 4) + nb + "N / " + fmt(A * 1e6) + nb + "mm² = " + fmt(s / 1e6) + nb + "MPa");
    set("w-e", fmt(s / 1e6) + nb + "MPa / " + fmt(v.E * 1e3) + nb + "MPa = " + fmt(e));
    set("w-dL", fmt(e) + " × " + fmt(L * 1e3, 4) + nb + "mm = " + fmt(dL * 1e3) + nb + "mm");
    set("w-ans", fmt(dL * 1e3) + " mm");
    set("w-note", yieldNote);
  });
})();
