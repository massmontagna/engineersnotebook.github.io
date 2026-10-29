// Steady conduction through a plane wall: live demo for Thermodynamics §2.1.
(function () {
  const { fmt, set, attr, opt, path, arrow, nb } = NB;
  const CX = 260; // wall centre, SVG units
  const Y = (t) => 180 - (140 * (t + 20)) / 220; // fixed scale: −20 °C at the foot, 200 °C at the top
  // Wall drawn 8 units thick at 1 mm up to 160 at 500 mm, on a log scale so every thickness shows.
  const wallW = (mm) => 8 + (152 * Math.log(mm)) / Math.log(500);
  // Face receding into the page at 45°, 10 units deep at 0.1 m² up to 50 at 100 m², on a log scale.
  const depth = (m2) => 10 + (40 * (Math.log10(m2) + 1)) / 3;
  const watts = (w) => { const a = Math.abs(w); return a >= 1e9 ? fmt(w / 1e9) + " GW" : a >= 1e6 ? fmt(w / 1e6) + " MW" : a >= 1e3 ? fmt(w / 1e3) + " kW" : fmt(w) + " W"; };

  NB.demo(function (v) {
    const k = v.k, L = v.L / 1000, dT = v.T1 - v.T2, q = (k * dT) / L, Phi = q * v.A;
    const w = wallW(v.L), x0 = CX - w / 2, x1 = CX + w / 2, y1 = Y(v.T1), y2 = Y(v.T2);
    attr("wall", { x: x0.toFixed(1), width: w.toFixed(1) });
    const o = depth(v.A) * Math.SQRT1_2, TOP = 34, FOOT = 190;
    attr("wall-top", { d: path([[x0, TOP], [x1, TOP], [x1 + o, TOP - o], [x0 + o, TOP - o]]) + " Z" });
    attr("wall-side", { d: path([[x1, TOP], [x1 + o, TOP - o], [x1 + o, FOOT - o], [x1, FOOT]]) + " Z" });
    attr("prof", { d: path([[40, y1], [x0, y1], [x1, y2], [480, y2]]) });
    attr("T1-label", { y: (y1 - 8).toFixed(1) });
    attr("T2-label", { y: (y2 - 8).toFixed(1) });
    set("T1-label", "T₁ = " + fmt(v.T1) + " °C");
    set("T2-label", "T₂ = " + fmt(v.T2) + " °C");
    set("k-label", "k = " + fmt(k) + " W/(m·K)");
    set("L-label", "L = " + v.L + " mm");
    set("A-label", "A = " + fmt(v.A) + " m²");

    // Heat flow under the wall, wider than the thickest wall, its weight growing with |Φ| on a log scale
    // (1.5 units at 0.01 W up to about 13 at 10 GW).
    const a0 = 170, a1 = 350, sw = Math.max(1.5, 1.5 + Math.log10(Math.abs(Phi) / 0.01)), head = 8 + 1.4 * sw;
    attr("flow", { d: dT > 0 ? arrow(a0, 214, a1, 214, head) : dT < 0 ? arrow(a1, 214, a0, 214, head) : "", "stroke-width": sw.toFixed(1) });
    set("q-label", dT === 0 ? "no heat flow" : "q = " + fmt(Math.abs(q)) + " W/m²");
    set("Phi-label", dT === 0 ? "" : "Φ = " + watts(Math.abs(Phi)));

    set("out-grad", fmt(-dT / L) + " K/m");
    set("out-q", fmt(q) + " W/m²");
    set("out-Phi", watts(Phi));
    set("readout", dT === 0
      ? "Both faces are at the same temperature, so no heat flows."
      : "Heat flows from the " + (dT > 0 ? "left" : "right") + " face to the other at " + watts(Math.abs(Phi)) +
        ". The wall's U-value, k/L, is " + fmt(k / L) + " W/(m²·K).");

    set("g-kname", opt("k").dataset.name);
    set("g-k", fmt(k) + " W/(m·K)");
    set("g-L", v.L + " mm");
    set("g-A", fmt(v.A) + " m²");
    set("g-T1", fmt(v.T1) + " °C");
    set("g-T2", fmt(v.T2) + " °C");
    set("w-q", fmt(k) + nb + "W/(m·K) × (" + fmt(v.T1) + " − " + fmt(v.T2) + ")" + nb + "K / " + fmt(L) + nb + "m = " + fmt(q) + nb + "W/m²");
    set("w-Phi", fmt(q) + nb + "W/m² × " + fmt(v.A) + nb + "m² = " + fmt(Phi) + nb + "W");
    set("w-ans", watts(Phi));
    set("w-note", "Over 24 hours that is " + fmt((Math.abs(Phi) * 24) / 1000) + " kWh.");
  });
})();
