// Axle loads of a braking car: live demo for Automotive §2.1.
(function () {
  const { fmt, set, attr, arrow, nb } = NB;
  const G = 9.81, XR = 130, XF = 390, WB = 260, GROUND = 184, MAXA = 44; // axle positions, wheelbase, arrow scale

  NB.demo(function (v) {
    const m = v.m, a = v.a * G, h = v.h / 1000, L = v.L / 1000, f = v.f / 100, W = m * G;
    const dW = (m * a * h) / L, Wfs = f * W, Wf = Math.min(W, Wfs + dW), Wr = W - Wf;

    const cx = XR + f * WB, cy = Math.max(60, GROUND - 4 - (h / L) * WB);
    attr("cg", { cx: cx.toFixed(1), cy: cy.toFixed(1) });
    attr("inertia", { d: v.a > 0 ? arrow(cx + 10, cy, cx + 70, cy, 12) : "" });
    attr("ma-label", { x: (cx + 14).toFixed(1), y: (cy - 10).toFixed(1) });
    set("ma-label", v.a > 0 ? "ma" : "");
    const len = (load) => (MAXA * load) / W;
    attr("Wr", { d: Wr > 0 ? arrow(XR, GROUND + 4 + len(Wr), XR, GROUND + 4, 12) : "" });
    attr("Wf", { d: arrow(XF, GROUND + 4 + len(Wf), XF, GROUND + 4, 12) });
    set("Wr-label", "rear " + fmt(Wr / 1000) + " kN");
    set("Wf-label", "front " + fmt(Wf / 1000) + " kN");

    set("out-Wfs", fmt(Wfs / 1000) + " kN");
    set("out-Wr", fmt(Wr / 1000) + " kN");
    set("out-Wf", fmt(Wf / 1000) + " kN");
    set("out-dW", fmt(dW / 1000) + " kN");
    set("readout", Wfs + dW >= W
      ? "The rear axle is fully unloaded: the rear wheels would lift."
      : "Braking at " + fmt(v.a) + " g moves " + fmt(dW / 1000) + " kN onto the front axle, which now carries " + fmt((100 * Wf) / W) + "% of the weight.");

    set("g-m", fmt(m, 4) + " kg");
    set("g-a", fmt(v.a) + " g");
    set("g-h", v.h + " mm");
    set("g-L", fmt(v.L, 4) + " mm");
    set("g-f", v.f + "%");
    set("w-a", fmt(v.a) + " × 9.81" + nb + "m/s² = " + fmt(a) + nb + "m/s²");
    set("w-dW", fmt(m, 4) + nb + "kg × " + fmt(a) + nb + "m/s² × " + fmt(h) + nb + "m / " + fmt(L) + nb + "m = " + fmt(dW / 1000) + nb + "kN");
    set("w-Wf", fmt(f) + " × " + fmt(W / 1000) + nb + "kN + " + fmt(dW / 1000) + nb + "kN = " + fmt((Wfs + dW) / 1000) + nb + "kN");
    set("w-Wr", fmt(1 - f) + " × " + fmt(W / 1000) + nb + "kN − " + fmt(dW / 1000) + nb + "kN = " + fmt((W - Wfs - dW) / 1000).replace("-", "−") + nb + "kN");
    set("w-ans", fmt(dW / 1000) + " kN");
    set("w-note", Wfs + dW >= W
      ? "The rear load comes out negative: the rear wheels lift off."
      : "The front axle now carries " + fmt((100 * Wf) / W) + "% of the weight, up from " + v.f + "%.");
  });
})();
