// Simply supported beam, central point load plus uniform load: bending moment diagram for Mechanics §2.2.
(function () {
  const { fmt, set, attr, path, nb } = NB;
  const X0 = 40, X1 = 480, BASE = 145, DEPTH = 75; // diagram axis and depth of its peak

  NB.demo(function (v) {
    const P = v.P, w = v.w, L = v.L;
    const MP = (P * L) / 4, Mw = (w * L * L) / 8, M = MP + Mw, R = P / 2 + (w * L) / 2;

    const show = (id, on) => attr(id, { visibility: on ? "visible" : "hidden" });
    show("load", P > 0); show("load-label", P > 0);
    show("udl", w > 0); show("udl-label", w > 0);
    set("load-label", "P = " + fmt(P) + " kN");
    set("udl-label", "w = " + fmt(w) + " kN/m");

    // Moment along the beam, scaled so the mid-span peak is DEPTH units below the axis.
    const pts = [[X0, BASE]];
    for (let i = 0; i <= 40; i++) {
      const x = (i / 40) * L;
      const m = (P * Math.min(x, L - x)) / 2 + (w * x * (L - x)) / 2;
      pts.push([X0 + (i / 40) * (X1 - X0), BASE + (M > 0 ? (DEPTH * m) / M : 0)]);
    }
    pts.push([X1, BASE]);
    attr("bmd", { d: path(pts) + " Z" });
    attr("M-label", { y: BASE + (M > 0 ? DEPTH : 0) + 18 });
    set("M-label", "M = " + fmt(M) + " kN·m");

    set("out-MP", fmt(MP) + " kN·m");
    set("out-Mw", fmt(Mw) + " kN·m");
    set("out-M", fmt(M) + " kN·m");
    set("readout", M > 0
      ? "At mid-span the point load gives " + fmt((100 * MP) / M) + "% of the moment and the uniform load the rest. Each support carries " + fmt(R) + " kN."
      : "With no load there is no bending moment.");

    set("g-P", fmt(P) + " kN");
    set("g-w", fmt(w) + " kN/m");
    set("g-L", fmt(L) + " m");
    set("w-MP", fmt(P) + nb + "kN × " + fmt(L) + nb + "m / 4 = " + fmt(MP) + nb + "kN·m");
    set("w-Mw", fmt(w) + nb + "kN/m × (" + fmt(L) + nb + "m)² / 8 = " + fmt(Mw) + nb + "kN·m");
    set("w-M", fmt(MP) + " + " + fmt(Mw) + " = " + fmt(M) + nb + "kN·m");
    set("w-ans", fmt(M) + " kN·m");
    set("w-note", "Each support reaction is P/2 + wL/2 = " + fmt(R) + " kN.");
  });
})();
