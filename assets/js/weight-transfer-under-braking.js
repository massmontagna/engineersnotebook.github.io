// Axle loads of a braking car: live demo for Automotive §2.1.
(function () {
  const { fmt, set, attr, path, arrow, nb } = NB;
  // One length scale for the whole car (SVG units per mm), front axle fixed, ground line and arrow scale.
  const G = 9.81, S = 0.085, XF = 410, GROUND = 180, MAXA = 44;

  // Side profile: the tail hangs off the rear axle and the nose off the front, so the cabin stretches with the wheelbase.
  const body = (xr, xf) => path([
    [xr - 60, 150], [xr - 60, 118], [xr + 20, 112], [xr + 70, 76],
    [xf - 60, 76], [xf - 10, 112], [xf + 60, 120], [xf + 66, 150],
  ]) + " Z";

  NB.demo(function (v) {
    const amm = NB.limit("a", 0, v.L); // the CG sits somewhere between the axles
    const m = v.m, ax = v.ax * G, h = v.h / 1000, L = v.L / 1000, a = amm / 1000, b = L - a, W = m * G;
    const dW = (m * ax * h) / L, Wfs = (W * b) / L, Wf = Math.min(W, Wfs + dW), Wr = W - Wf;

    const XR = XF - v.L * S, cx = XF - amm * S, cy = GROUND - v.h * S;
    attr("body", { d: body(XR, XF) });
    attr("wheel-r", { cx: XR.toFixed(1) });
    attr("cg", { cx: cx.toFixed(1), cy: cy.toFixed(1) });
    attr("inertia", { d: v.ax > 0 ? arrow(cx + 10, cy, cx + 70, cy, 12) : "" });
    attr("ma-label", { x: (cx + 14).toFixed(1), y: (cy - 10).toFixed(1) });
    set("ma-label", v.ax > 0 ? "ma" : "");
    const len = (load) => (MAXA * load) / W;
    attr("Wr", { d: Wr > 0 ? arrow(XR, GROUND + 8 + len(Wr), XR, GROUND + 8, 12) : "" });
    attr("Wf", { d: arrow(XF, GROUND + 8 + len(Wf), XF, GROUND + 8, 12) });
    attr("Wr-label", { x: XR.toFixed(1) });
    set("Wr-label", "rear " + fmt(Wr / 1000) + " kN");
    set("Wf-label", "front " + fmt(Wf / 1000) + " kN");

    set("out-Wfs", fmt(Wfs / 1000) + " kN");
    set("out-Wr", fmt(Wr / 1000) + " kN");
    set("out-Wf", fmt(Wf / 1000) + " kN");
    set("out-dW", fmt(dW / 1000) + " kN");
    set("readout", Wfs + dW >= W
      ? "The rear axle is fully unloaded: the rear wheels would lift."
      : "Braking at " + fmt(v.ax) + " g moves " + fmt(dW / 1000) + " kN onto the front axle, which now carries " + fmt((100 * Wf) / W) + "% of the weight.");

    set("g-m", fmt(m, 4) + " kg");
    set("g-ax", fmt(v.ax) + " g");
    set("g-h", v.h + " mm");
    set("g-L", fmt(v.L, 4) + " mm");
    set("g-a", fmt(amm, 4) + " mm");
    set("w-ax", fmt(v.ax) + " × 9.81" + nb + "m/s² = " + fmt(ax) + nb + "m/s²");
    set("w-dW", fmt(m, 4) + nb + "kg × " + fmt(ax) + nb + "m/s² × " + fmt(h) + nb + "m / " + fmt(L) + nb + "m = " + fmt(dW / 1000) + nb + "kN");
    set("w-Wf", fmt(W / 1000) + nb + "kN × " + fmt(b, 4) + nb + "m / " + fmt(L) + nb + "m + " + fmt(dW / 1000) + nb + "kN = " + fmt((Wfs + dW) / 1000) + nb + "kN");
    set("w-Wr", fmt(W / 1000) + nb + "kN × " + fmt(a, 4) + nb + "m / " + fmt(L) + nb + "m − " + fmt(dW / 1000) + nb + "kN = " + fmt((W - Wfs - dW) / 1000).replace("-", "−") + nb + "kN");
    set("w-ans", fmt(dW / 1000) + " kN");
    set("w-note", Wfs + dW >= W
      ? "The rear load comes out negative: the rear wheels lift off."
      : "The front axle now carries " + fmt((100 * Wf) / W) + "% of the weight, up from " + fmt((100 * b) / L) + "%.");
  });
})();
