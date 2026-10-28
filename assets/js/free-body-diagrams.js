// Block on a slope, drawn in place and as its free body: live demo for Mechanics §1.1.
(function () {
  const { fmt, set, attr, path, arrow, nb } = NB;
  const G = 9.81, P0 = [30, 210], C = [395, 125], SCALE = 80; // weight arrow length, SVG units

  NB.demo(function (v) {
    const th = (v.th * Math.PI) / 180, c = Math.cos(th), s = Math.sin(th);
    const W = v.m * G, N = W * c, F = W * s, Fmax = v.mu * N;
    const holds = F <= Fmax * (1 + 1e-9);
    const Fdraw = holds ? F : Fmax;

    // Unit vectors up the slope (t) and out of it (n), in SVG coordinates.
    const t = [c, -s], n = [-s, -c];
    const at = (o, a, b) => [o[0] + a * t[0] + b * n[0], o[1] + a * t[1] + b * n[1]];
    const P1 = at(P0, 210, 0), B = at(P0, 120, 0);
    attr("slope", { d: path([P0, [P1[0], 210], P1]) + " Z" });
    attr("block", { d: path([at(B, -28, 0), at(B, 28, 0), at(B, 28, 36), at(B, -28, 36)]) + " Z" });
    attr("angle-arc", { d: "M70 210 A40 40 0 0 0 " + (30 + 40 * c).toFixed(1) + " " + (210 - 40 * s).toFixed(1) });
    attr("angle-label", { x: 76, y: 204 });
    set("angle-label", "θ = " + v.th + "°");

    // Free body: the same block on its own, forces drawn to scale with the weight.
    attr("fb-block", { d: path([at(C, -28, -18), at(C, 28, -18), at(C, 28, 18), at(C, -28, 18)]) + " Z" });
    const k = SCALE / W;
    const tipN = at(C, 0, N * k), tipF = at(C, Fdraw * k, 0);
    attr("arr-W", { d: arrow(C[0], C[1], C[0], C[1] + SCALE, 12) });
    attr("arr-N", { d: arrow(C[0], C[1], tipN[0], tipN[1], 12) });
    attr("arr-F", { d: arrow(C[0], C[1], tipF[0], tipF[1], 12) });
    attr("lab-W", { x: C[0] + 14, y: C[1] + SCALE });
    const lN = at(C, 0, N * k + 14), lF = at(C, Fdraw * k + 16, 0);
    attr("lab-N", { x: lN[0].toFixed(1), y: (lN[1] + 4).toFixed(1) });
    attr("lab-F", { x: lF[0].toFixed(1), y: (lF[1] + 4).toFixed(1) });
    set("lab-F", Fdraw * k < 30 ? "" : holds ? "F" : "μN");

    set("out-W", fmt(W) + " N");
    set("out-N", fmt(N) + " N");
    set("out-Fmax", fmt(Fmax) + " N");
    set("out-F", fmt(F) + " N");

    const repose = (Math.atan(v.mu) * 180) / Math.PI;
    $readout(holds
      ? "Friction needed is " + fmt(F) + " N and up to " + fmt(Fmax) + " N is available, so the block stays put. It would start to slide at θ = " + fmt(repose) + "°."
      : "Friction needed is " + fmt(F) + " N but only " + fmt(Fmax) + " N is available, so the block slides, accelerating at " + fmt(G * (s - v.mu * c)) + " m/s² down the slope.");

    set("g-m", fmt(v.m) + " kg");
    set("g-th", v.th + "°");
    set("g-mu", fmt(v.mu));
    set("w-W", fmt(v.m) + nb + "kg × 9.81" + nb + "m/s² = " + fmt(W) + nb + "N");
    set("w-N", fmt(W) + nb + "N × cos " + v.th + "° = " + fmt(N) + nb + "N");
    set("w-F", fmt(W) + nb + "N × sin " + v.th + "° = " + fmt(F) + nb + "N");
    set("w-Fmax", fmt(v.mu) + " × " + fmt(N) + nb + "N = " + fmt(Fmax) + nb + "N");
    set("w-ans", fmt(F) + " N");
    set("w-note", holds
      ? "Friction can supply up to " + fmt(Fmax) + " N, so the block holds."
      : "Friction can supply only " + fmt(Fmax) + " N, so the block slides.");
  });

  function $readout(text) { NB.set("readout", text); }
})();
