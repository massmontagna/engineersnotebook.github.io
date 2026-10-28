// Simply supported beam, point load anywhere: reactions and shear diagram for Mechanics §2.1.
(function () {
  const { fmt, set, attr, path, arrow, nb } = NB;
  const X0 = 40, X1 = 480, BASE = 200, VMAX = 36; // shear axis and its largest drawn height

  NB.demo(function (v) {
    const L = v.L, a = NB.limit("a", 0, L), b = L - a, P = v.P;
    const RB = (P * a) / L, RA = P - RB;
    const xa = X0 + (a / L) * (X1 - X0);

    attr("load", { d: arrow(xa, 8, xa, 66, 16) });
    attr("load-label", { x: (xa > 380 ? xa - 10 : xa + 10).toFixed(1), "text-anchor": xa > 380 ? "end" : "start" });
    set("load-label", "P = " + fmt(P) + " kN at a = " + fmt(a) + " m");

    // Reaction arrows push up on the supports, drawn to scale with the load.
    const len = (R) => 4 + (34 * R) / P;
    attr("RA", { d: arrow(X0, 98 + len(RA), X0, 98, 10) });
    attr("RB", { d: arrow(X1, 98 + len(RB), X1, 98, 10) });
    set("RA-label", "R = " + fmt(RA) + " kN");
    set("RB-label", "R = " + fmt(RB) + " kN");

    const hA = (VMAX * RA) / P, hB = (VMAX * RB) / P;
    attr("sfd", { d: path([[X0, BASE], [X0, BASE - hA], [xa, BASE - hA], [xa, BASE + hB], [X1, BASE + hB], [X1, BASE]]) + " Z" });
    attr("VA-label", { x: ((X0 + xa) / 2).toFixed(1), y: (BASE - hA - 6).toFixed(1) });
    attr("VB-label", { x: ((xa + X1) / 2).toFixed(1), y: (BASE + hB + 16).toFixed(1) });
    set("VA-label", a > 0 ? "+" + fmt(RA) + " kN" : "");
    set("VB-label", b > 0 ? "−" + fmt(RB) + " kN" : "");

    const V = Math.max(RA, RB);
    set("out-RA", fmt(RA) + " kN");
    set("out-RB", fmt(RB) + " kN");
    set("out-V", fmt(V) + " kN");
    set("readout", "Support A carries " + fmt((100 * RA) / P) + "% of the load and B the rest. The support nearer the load always carries more.");

    set("g-P", fmt(P) + " kN");
    set("g-L", fmt(L) + " m");
    set("g-a", fmt(a) + " m");
    set("w-b", fmt(L) + nb + "m − " + fmt(a) + nb + "m = " + fmt(b) + nb + "m");
    set("w-RB", fmt(P) + nb + "kN × " + fmt(a) + nb + "m / " + fmt(L) + nb + "m = " + fmt(RB) + nb + "kN");
    set("w-RA", fmt(P) + nb + "kN − " + fmt(RB) + nb + "kN = " + fmt(RA) + nb + "kN");
    set("w-ansA", fmt(RA) + " kN");
    set("w-ans", fmt(RB) + " kN");
    set("w-note", "Shear equals the reaction at A left of the load and minus the reaction at B right of it, so the largest is " + fmt(V) + " kN.");
  });
})();
