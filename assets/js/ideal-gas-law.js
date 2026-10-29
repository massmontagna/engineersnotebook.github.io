// Ideal gas on a pressure–volume graph: live demo for Thermodynamics §1.1.
(function () {
  const { fmt, set, attr, path, nb } = NB;
  // Plot origin and size. Volume is linear to 100 L; pressure is log, fixed at 0.1 to 100,000 kPa so every input fits without rescaling.
  const R = 8.314, OX = 60, OY = 200, W = 400, H = 160, VMAX = 100, PMIN = 0.1, PMAX = 1e5;
  const X = (litres) => OX + (W * litres) / VMAX;
  const Y = (kpa) => OY - (H * Math.log10(kpa / PMIN)) / Math.log10(PMAX / PMIN);

  NB.demo(function (v) {
    const T = v.T + 273.15, V = v.V / 1000, nRT = v.n * R * T, p = nRT / V, pk = p / 1000;
    const kpaAt = (litres) => nRT / litres; // J per litre is kPa

    // Isotherm from where it enters the top of the plot to the end of the volume axis,
    // sampled geometrically so its steep end near the pressure axis stays smooth.
    const start = Math.max(0.5, nRT / PMAX), pts = [];
    for (let i = 0; i <= 60; i++) {
      const L = start * (VMAX / start) ** (i / 60);
      pts.push([X(L), Y(kpaAt(L))]);
    }
    attr("iso", { d: path(pts) });
    set("iso-label", "T = " + fmt(T, 4) + " K");
    const P = [X(v.V), Y(pk)], right = P[0] > 360;
    // The point's label sits by the curve's end when the point is near it, so the T label steps up a line.
    attr("iso-label", { y: Math.max(48, Y(kpaAt(VMAX)) - (right ? 28 : 10)).toFixed(1) });
    attr("pt", { cx: P[0].toFixed(1), cy: P[1].toFixed(1) });
    attr("drop", { d: path([[OX, P[1]], P, [P[0], OY]]) });
    attr("pt-label", { x: (P[0] + (right ? -10 : 10)).toFixed(1), y: (P[1] - 8).toFixed(1), "text-anchor": right ? "end" : "start" });
    set("pt-label", "p = " + fmt(pk) + " kPa");

    set("out-TK", fmt(T, 5) + " K");
    set("out-nRT", fmt(nRT) + " J");
    set("out-p", fmt(pk) + " kPa");
    set("readout", "At " + fmt(v.V) + " L the gas is at " + fmt(pk) + " kPa (" + fmt(pk / 100) + " bar). Halve the volume and the pressure doubles.");

    set("g-n", fmt(v.n) + " mol");
    set("g-T", fmt(v.T) + " °C");
    set("g-V", fmt(v.V) + " L");
    set("w-T", fmt(v.T) + " + 273.15 = " + fmt(T, 5) + nb + "K");
    set("w-sub", "= " + fmt(v.n) + nb + "mol × 8.314" + nb + "J/(mol·K) × " + fmt(T, 5) + nb + "K / " + fmt(V) + nb + "m³");
    set("w-p", "= " + fmt(p) + nb + "Pa");
    set("w-ans", fmt(pk) + " kPa");
    set("w-note", "That is " + fmt(pk / 100) + " bar, or " + fmt(p / 101325) + " times standard atmospheric pressure (101.325 kPa).");
  });
})();
