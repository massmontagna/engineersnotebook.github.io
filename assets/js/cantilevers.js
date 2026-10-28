// Cantilever with an end load: live demo for Mechanics §2.4.
(function () {
  const { fmt, set, attr, opt, nb } = NB;
  const X0 = 40, X1 = 480, Y0 = 86, MAX_DRAW = 52, SCALE = 50; // beam ends, rest line, largest drawn deflection, exaggeration

  function shape(amp) {
    // Elastic line normalised to its tip value: f(u) = (3u² − u³)/2.
    let d = "";
    for (let i = 0; i <= 40; i++) {
      const u = i / 40, y = Y0 + (amp * (3 * u * u - u * u * u)) / 2;
      d += (i ? " L" : "M") + (X0 + u * (X1 - X0)).toFixed(1) + " " + y.toFixed(2);
    }
    return d;
  }

  NB.demo(function (v) {
    const P = v.P * 1e3, L = v.L, E = v.E * 1e9, b = v.b / 1e3, h = v.h / 1e3;
    const I = (b * h * h * h) / 12;
    const delta = (P * L ** 3) / (3 * E * I), M = P * L, theta = (P * L * L) / (2 * E * I), ratio = L / delta;

    set("out-I", fmt(I * 1e12) + " mm⁴");
    set("out-M", fmt(M / 1e3) + " kN·m");
    set("out-T", fmt(theta * 1e3) + " mrad");
    set("out-D", fmt(delta * 1e3) + " mm");

    const ex = NB.exaggerate((delta / L) * (X1 - X0), SCALE, MAX_DRAW);
    attr("curve", { d: shape(ex.amp) });
    attr("load", { transform: "translate(0 " + ex.amp.toFixed(2) + ")" });
    set("scale-label", "deflection " + ex.label);
    set("load-label", "P = " + fmt(v.P) + " kN");
    set("span-label", "L = " + v.L.toFixed(2) + " m");

    let note = "The tip deflects " + fmt(delta * 1e3) + " mm, or L/" + fmt(ratio, 4) + ".";
    if (ratio < 50) note += " That is more than L/50, so small-deflection theory no longer holds well.";
    else if (ratio < 180) note += " That is more than L/180, a limit often used for cantilevers.";
    set("readout", note);

    set("g-P", fmt(v.P) + " kN");
    set("g-L", fmt(v.L) + " m");
    set("g-Ename", opt("E").dataset.name);
    set("g-E", fmt(v.E) + " GPa");
    set("g-bh", v.b + " × " + v.h + " mm");
    set("w-I", fmt(I, 4) + nb + "m⁴");
    set("w-sub", "= " + fmt(P, 4) + nb + "N × (" + fmt(L) + nb + "m)³ / (3 × " + fmt(E) + nb + "Pa × " + fmt(I, 4) + nb + "m⁴)");
    set("w-m", "= " + fmt(delta) + nb + "m");
    set("w-ans", fmt(delta * 1e3) + " mm");
    set("w-note", "Length over tip deflection: L/" + fmt(ratio, 4) + ".");
  });
})();
