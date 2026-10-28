// Shaft power at constant torque: live demo for Automotive §1.1.
(function () {
  const { fmt, set, attr, path, nice, nb } = NB;
  const OX = 60, OY = 200, W = 400, H = 160, NMAX = 9000; // plot origin, size and speed axis limit

  NB.demo(function (v) {
    const w = (2 * Math.PI * v.N) / 60, P = v.T * w, kW = P / 1000, hp = P / 745.7;
    const top = (v.T * 2 * Math.PI * NMAX) / 60 / 1000, pm = nice(top);
    const X = (n) => OX + (W * n) / NMAX, Y = (k) => OY - (H * k) / pm;

    attr("line", { d: path([[OX, OY], [X(NMAX), Y(top)]]) });
    const p = [X(v.N), Y(kW)];
    attr("pt", { cx: p[0].toFixed(1), cy: p[1].toFixed(1) });
    attr("drop", { d: path([[OX, p[1]], p, [p[0], OY]]) });
    attr("pt-label", { x: (p[0] - 10).toFixed(1), y: (p[1] - 10).toFixed(1), "text-anchor": "end" });
    set("pt-label", "P = " + fmt(kW) + " kW");
    set("pmax-label", fmt(pm));

    set("out-w", fmt(w) + " rad/s");
    set("out-hp", fmt(hp) + " hp");
    set("out-P", fmt(kW) + " kW");
    set("readout", "At " + fmt(v.N, 4) + " rpm the shaft turns at " + fmt(w) + " rad/s, so " + fmt(v.T) + " N·m delivers " + fmt(kW) + " kW.");

    set("g-T", fmt(v.T) + " N·m");
    set("g-N", fmt(v.N, 4) + " rpm");
    set("w-w", "2π × " + fmt(v.N, 4) + nb + "rpm / 60 = " + fmt(w) + nb + "rad/s");
    set("w-P", fmt(v.T) + nb + "N·m × " + fmt(w) + nb + "rad/s = " + fmt(kW) + nb + "kW");
    set("w-ans", fmt(kW) + " kW");
    set("w-note", "That is " + fmt(hp) + " hp (1 hp = 745.7 W).");
  });
})();
