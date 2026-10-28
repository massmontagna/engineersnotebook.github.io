// Pipe that changes diameter: live demo for Fluids §1.1.
(function () {
  const { fmt, set, attr, arrow, nb } = NB;
  const CY = 100, RMAX = 70, AMAX = 160; // pipe axis, largest drawn radius and arrow, SVG units

  NB.demo(function (v) {
    const A1 = (Math.PI * (v.D1 / 1000) ** 2) / 4, A2 = (Math.PI * (v.D2 / 1000) ** 2) / 4;
    const v2 = (v.v1 * A1) / A2, Q = A1 * v.v1;

    const s = RMAX / Math.max(v.D1, v.D2), r1 = Math.max(5, v.D1 * s), r2 = Math.max(5, v.D2 * s);
    attr("pipe", { d: "M20 " + (CY - r1) + " L200 " + (CY - r1) + " L280 " + (CY - r2) + " L500 " + (CY - r2) +
      " L500 " + (CY + r2) + " L280 " + (CY + r2) + " L200 " + (CY + r1) + " L20 " + (CY + r1) + " Z" });
    const k = AMAX / Math.max(v.v1, v2);
    attr("arr1", { d: arrow(40, CY, 40 + k * v.v1, CY, 12) });
    attr("arr2", { d: arrow(300, CY, 300 + k * v2, CY, 12) });
    attr("s1-label", { y: (CY + r1 + 18).toFixed(1) });
    attr("s2-label", { y: (CY + r2 + 18).toFixed(1) });
    set("s1-label", "v₁ = " + fmt(v.v1) + " m/s");
    set("s2-label", "v₂ = " + fmt(v2) + " m/s");

    set("out-A1", fmt(A1 * 1e6) + " mm²");
    set("out-A2", fmt(A2 * 1e6) + " mm²");
    set("out-Q", fmt(Q * 1000) + " L/s");
    set("out-v2", fmt(v2) + " m/s");
    const r = A1 / A2;
    set("readout", r > 1.0005
      ? "The outlet has 1/" + fmt(r) + " of the inlet's area, so the flow is " + fmt(r) + " times faster."
      : r < 0.9995
        ? "The outlet is wider, so the flow slows to " + fmt(v2) + " m/s."
        : "Both sections are the same size, so the speed does not change.");

    set("g-D1", v.D1 + " mm");
    set("g-D2", v.D2 + " mm");
    set("g-v1", fmt(v.v1) + " m/s");
    set("w-A1", "π × (" + fmt(v.D1 / 1000) + nb + "m)² / 4 = " + fmt(A1) + nb + "m²");
    set("w-A2", "π × (" + fmt(v.D2 / 1000) + nb + "m)² / 4 = " + fmt(A2) + nb + "m²");
    set("w-v2", fmt(v.v1) + nb + "m/s × " + fmt(A1) + " / " + fmt(A2) + " = " + fmt(v2) + nb + "m/s");
    set("w-Q", fmt(A1) + nb + "m² × " + fmt(v.v1) + nb + "m/s = " + fmt(Q) + nb + "m³/s");
    set("w-ans", fmt(v2) + " m/s");
    set("w-note", "That is " + fmt(Q * 1000) + " L/s, the same through both sections.");
  });
})();
