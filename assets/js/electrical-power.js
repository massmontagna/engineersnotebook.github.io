// Power as the area of a voltage–current rectangle: live demo for Electrical §1.2.
(function () {
  const { fmt, set, attr, nb } = NB;
  const OX = 60, OY = 200, W = 400, H = 160, VMAX = 400, IMAX = 32; // plot origin, size and axis limits
  const watts = (w) => (w >= 1000 ? fmt(w / 1000) + " kW" : fmt(w) + " W");

  NB.demo(function (v) {
    const P = v.V * v.I, R = v.V / v.I, E = (P * v.t) / 1000; // kWh

    const x = OX + (W * v.I) / IMAX, y = OY - (H * v.V) / VMAX;
    attr("area", { y: y.toFixed(1), width: (x - OX).toFixed(1), height: (OY - y).toFixed(1) });
    attr("pt", { cx: x.toFixed(1), cy: y.toFixed(1) });
    const right = x > 360;
    attr("P-label", { x: (x + (right ? -10 : 10)).toFixed(1), y: (y - 10).toFixed(1), "text-anchor": right ? "end" : "start" });
    set("P-label", "P = " + watts(P));

    set("out-R", fmt(R) + " Ω");
    set("out-E", fmt(E) + " kWh");
    set("out-P", watts(P));
    set("readout", "Running for " + fmt(v.t) + " h uses " + fmt(E) + " kWh. The load draws current like a " + fmt(R) + " Ω resistor.");

    set("g-V", fmt(v.V) + " V");
    set("g-I", fmt(v.I) + " A");
    set("g-t", fmt(v.t) + " h");
    set("w-P", fmt(v.V) + nb + "V × " + fmt(v.I) + nb + "A = " + fmt(P, 4) + nb + "W");
    set("w-E", fmt(P / 1000, 4) + nb + "kW × " + fmt(v.t) + nb + "h = " + fmt(E) + nb + "kWh");
    set("w-ans", watts(P));
    set("w-note", "The equivalent resistance is V/I = " + fmt(R) + " Ω, so P = I²R gives the same " + watts(P) + ".");
  });
})();
