// Flow through a pipe that narrows and rises: live demo for Fluids §1.2.
(function () {
  const { fmt, set, attr, opt, arrow, nb } = NB;
  const G = 9.81, Y1 = 150, K = 4, RMAX = 30, TOP = 14, COL = 60, AMAX = 120; // inlet axis, px per metre of rise, sizes
  const signed = (x) => (x < 0 ? " − " : " + ") + fmt(Math.abs(x));

  NB.demo(function (v) {
    const rho = v.rho, v2 = v.v1 * (v.D1 / v.D2) ** 2;
    const kin = (0.5 * rho * (v.v1 ** 2 - v2 ** 2)) / 1000, pot = (-rho * G * v.dh) / 1000; // kPa
    const p2 = v.p1 + kin + pot, abs2 = p2 + 101.325;

    const y2 = Y1 - K * v.dh, s = RMAX / Math.max(v.D1, v.D2), r1 = Math.max(4, v.D1 * s), r2 = Math.max(4, v.D2 * s);
    attr("pipe", { d: "M20 " + (Y1 - r1) + " L200 " + (Y1 - r1) + " L280 " + (y2 - r2) + " L500 " + (y2 - r2) +
      " L500 " + (y2 + r2) + " L280 " + (y2 + r2) + " L200 " + (Y1 + r1) + " L20 " + (Y1 + r1) + " Z" });
    const t1 = Y1 - r1, t2 = y2 - r2;
    attr("tube1", { height: (t1 - TOP).toFixed(1) });
    attr("tube2", { height: (t2 - TOP).toFixed(1) });
    const kp = COL / Math.max(v.p1, p2, 1), h1 = Math.max(0, v.p1 * kp), h2 = Math.max(0, p2 * kp);
    attr("col1", { y: (t1 - h1).toFixed(1), height: h1.toFixed(1) });
    attr("col2", { y: (t2 - h2).toFixed(1), height: h2.toFixed(1) });
    attr("p1-label", { y: (t1 - h1 + 4).toFixed(1) });
    attr("p2-label", { y: (t2 - h2 + 4).toFixed(1) });
    set("p1-label", "p₁ = " + fmt(v.p1) + " kPa");
    set("p2-label", "p₂ = " + fmt(p2) + " kPa");
    const k = AMAX / Math.max(v.v1, v2);
    attr("arr1", { d: arrow(30, Y1, 30 + k * v.v1 * 0.6, Y1, 10) });
    attr("arr2", { d: arrow(300, y2, 300 + k * v2 * 0.6, y2, 10) });
    set("h-label", "Δh = " + fmt(v.dh) + " m (drawn " + K + " units/m)");

    set("out-v2", fmt(v2) + " m/s");
    set("out-kin", fmt(kin) + " kPa");
    set("out-pot", fmt(pot) + " kPa");
    set("out-p2", fmt(p2) + " kPa");
    set("readout", abs2 < 2.3
      ? "The outlet's absolute pressure would fall below about 2.3 kPa, so the liquid would boil there (cavitate) and this result no longer holds."
      : p2 < 0
        ? "The outlet is below atmospheric pressure: a standpipe there would draw air in."
        : "Speeding up changes the pressure by " + fmt(kin) + " kPa and the rise by " + fmt(pot) + " kPa.");

    set("g-p1", fmt(v.p1) + " kPa");
    set("g-v1", fmt(v.v1) + " m/s");
    set("g-D1", v.D1 + " mm");
    set("g-D2", v.D2 + " mm");
    set("g-dh", fmt(v.dh) + " m");
    set("g-name", opt("rho").dataset.name);
    set("g-rho", fmt(rho, 4) + " kg/m³");
    set("w-v2", fmt(v.v1) + nb + "m/s × (" + v.D1 + "/" + v.D2 + ")² = " + fmt(v2) + nb + "m/s");
    set("w-sub", "= " + fmt(v.p1) + nb + "kPa + ½ × " + fmt(rho, 4) + nb + "kg/m³ × ((" + fmt(v.v1) + nb + "m/s)² − (" + fmt(v2) +
      nb + "m/s)²) − " + fmt(rho, 4) + nb + "kg/m³ × 9.81" + nb + "m/s² × " + fmt(v.dh) + nb + "m");
    set("w-p2", "= " + fmt(v.p1) + signed(kin) + signed(pot) + " = " + fmt(p2) + nb + "kPa");
    set("w-ans", fmt(p2) + " kPa");
    set("w-note", "That is gauge pressure, about " + fmt(abs2) + " kPa absolute.");
  });
})();
