// Steady conduction through a plane wall: live demo for Thermodynamics §2.1.
(function () {
  const { fmt, set, attr, opt, path, arrow, nb } = NB;
  const XW0 = 200, XW1 = 320; // wall faces, SVG units
  const neg = (s) => s.replace("-", "−");
  const watts = (w) => (Math.abs(w) >= 1000 ? fmt(w / 1000) + " kW" : fmt(w) + " W");

  NB.demo(function (v) {
    const k = v.k, L = v.L / 1000, dT = v.T1 - v.T2, q = (k * dT) / L, Phi = q * v.A;
    // Temperature scale fitted to the two faces, at least 20 K tall, centred on the wall.
    const mid = (v.T1 + v.T2) / 2, span = Math.max(Math.abs(dT), 20);
    const Y = (t) => 105 - (100 * (t - mid)) / span;
    const y1 = Y(v.T1), y2 = Y(v.T2);
    attr("prof", { d: path([[40, y1], [XW0, y1], [XW1, y2], [480, y2]]) });
    attr("T1-label", { y: (y1 - 8).toFixed(1) });
    attr("T2-label", { y: (y2 - 8).toFixed(1) });
    set("T1-label", "T₁ = " + neg(fmt(v.T1)) + " °C");
    set("T2-label", "T₂ = " + neg(fmt(v.T2)) + " °C");
    set("k-label", "k = " + fmt(k));
    set("L-label", "L = " + v.L + " mm");
    attr("flow", { d: dT > 0 ? arrow(210, 210, 310, 210, 12) : dT < 0 ? arrow(310, 210, 210, 210, 12) : "" });
    set("q-label", dT === 0 ? "no heat flow" : "q = " + fmt(Math.abs(q)) + " W/m²");

    set("out-grad", neg(fmt(-dT / L)) + " K/m");
    set("out-q", neg(fmt(q)) + " W/m²");
    set("out-Phi", neg(watts(Phi)));
    set("readout", dT === 0
      ? "Both faces are at the same temperature, so no heat flows."
      : "Heat flows from the " + (dT > 0 ? "left" : "right") + " face to the other at " + watts(Math.abs(Phi)) +
        ". The wall's U-value, k/L, is " + fmt(k / L) + " W/(m²·K).");

    set("g-kname", opt("k").dataset.name);
    set("g-k", fmt(k) + " W/(m·K)");
    set("g-L", v.L + " mm");
    set("g-A", fmt(v.A) + " m²");
    set("g-T1", neg(fmt(v.T1)) + " °C");
    set("g-T2", neg(fmt(v.T2)) + " °C");
    set("w-q", fmt(k) + nb + "W/(m·K) × (" + neg(fmt(v.T1)) + " − " + neg(fmt(v.T2)) + ")" + nb + "K / " + fmt(L) + nb + "m = " + neg(fmt(q)) + nb + "W/m²");
    set("w-Phi", neg(fmt(q)) + nb + "W/m² × " + fmt(v.A) + nb + "m² = " + neg(fmt(Phi)) + nb + "W");
    set("w-ans", neg(watts(Phi)));
    set("w-note", "Over 24 hours that is " + fmt((Math.abs(Phi) * 24) / 1000) + " kWh.");
  });
})();
