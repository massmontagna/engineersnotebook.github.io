// Ideal gas on a pressure–volume graph: live demo for Thermodynamics §1.1.
(function () {
  const { fmt, set, attr, path, nb } = NB;
  const R = 8.314, OX = 60, OY = 200, W = 400, H = 160, VMAX = 100, PMAX = 500; // plot origin and size; axes in litres and kPa
  const neg = (s) => s.replace("-", "−");

  NB.demo(function (v) {
    const T = v.T + 273.15, V = v.V / 1000, nRT = v.n * R * T, p = nRT / V, pk = p / 1000;
    const pm = PMAX, off = pk > pm;
    const X = (litres) => OX + (W * litres) / VMAX, Y = (kpa) => OY - (H * kpa) / pm;

    // Isotherm from where it enters the plot to the end of the volume axis.
    const start = Math.max(0.5, nRT / (pm * 1000) * 1000), pts = [];
    for (let i = 0; i <= 60; i++) {
      const L = start + ((VMAX - start) * i) / 60;
      pts.push([X(L), Y(nRT / (L / 1000) / 1000)]);
    }
    attr("iso", { d: start < VMAX ? path(pts) : "" });
    attr("iso-label", { y: Math.max(48, Y(nRT / 0.1 / 1000) - 10).toFixed(1) });
    set("iso-label", "T = " + fmt(T, 4) + " K");
    const P = [X(v.V), Y(Math.min(pk, pm))]; // pinned to the top edge when off scale
    attr("pt", { cx: P[0].toFixed(1), cy: P[1].toFixed(1) });
    attr("drop", { d: path([[OX, P[1]], P, [P[0], OY]]) });
    attr("pt-label", { x: (P[0] + 10).toFixed(1), y: (P[1] - 8).toFixed(1) });
    set("pt-label", "p = " + fmt(pk) + " kPa" + (off ? ", off scale" : ""));
    set("pmax-label", fmt(pm));
    set("vmax-label", "100");

    set("out-TK", fmt(T, 5) + " K");
    set("out-nRT", fmt(nRT) + " J");
    set("out-p", fmt(pk) + " kPa");
    set("readout", "At " + fmt(v.V) + " L the gas is at " + fmt(pk) + " kPa (" + fmt(pk / 100) + " bar). Halve the volume and the pressure doubles.");

    set("g-n", fmt(v.n) + " mol");
    set("g-T", neg(fmt(v.T)) + " °C");
    set("g-V", fmt(v.V) + " L");
    set("w-T", neg(fmt(v.T)) + " + 273.15 = " + fmt(T, 5) + nb + "K");
    set("w-sub", "= " + fmt(v.n) + nb + "mol × 8.314" + nb + "J/(mol·K) × " + fmt(T, 5) + nb + "K / " + fmt(V) + nb + "m³");
    set("w-p", "= " + fmt(p) + nb + "Pa");
    set("w-ans", fmt(pk) + " kPa");
    set("w-note", "That is " + fmt(pk / 100) + " bar, or " + fmt(p / 101325) + " times standard atmospheric pressure (101.325 kPa).");
  });
})();
