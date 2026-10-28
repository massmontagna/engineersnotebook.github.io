// Tyre load sensitivity and the axle grip lost to load transfer: live demo for Automotive §3.2.
(function () {
  const { fmt, set, attr, path, nb } = NB;
  const OX = 60, OY = 250, W = 420, H = 210, ZMAX = 12, FMAX = 20; // plot origin and size; axes in kN
  // Inset: a fixed ×10 view of the plot around the static point, where the grip lost is visible.
  const ZOOM = 10, IX = 72, IY = 36, IW = 190, IH = 110, ICX = IX + IW / 2, ICY = IY + IH / 2;

  NB.demo(function (v) {
    const dWkN = NB.limit("dW", 0, v.Fz0); // the inner wheel cannot carry less than nothing
    const mu = (z) => v.mu0 - v.k * z, F = (z) => mu(z) * z;
    const zi = v.Fz0 - dWkN, zo = v.Fz0 + dWkN;
    const Fi = F(zi), Fo = F(zo), Fs = F(v.Fz0), equal = 2 * Fs;
    const loss = 2 * v.k * dWkN * dWkN, axle = equal - loss; // the closed form, so equal loads show exactly zero

    const X = (z) => OX + (W * z) / ZMAX, Y = (f) => OY - (H * Math.min(f, FMAX)) / FMAX;
    const pts = [];
    for (let z = 0; z <= ZMAX + 1e-9; z += 0.25) pts.push([X(z), Y(Math.max(0, F(z)))]);
    attr("curve", { d: path(pts) });
    attr("chord", { d: path([[X(zi), Y(Fi)], [X(zo), Y(Fo)]]) });
    const pin = (id, z, f) => attr(id, { cx: X(z).toFixed(1), cy: Y(f).toFixed(1) });
    pin("pt-i", zi, Fi);
    pin("pt-o", zo, Fo);
    pin("pt-s", v.Fz0, Fs);
    pin("pt-m", v.Fz0, axle / 2);
    attr("drops", { d: [[zi, Fi], [zo, Fo], [v.Fz0, axle / 2]].map(([z, f]) => path([[X(z), Y(f)], [X(z), OY]])).join(" ") });
    attr("lens", { x: (X(v.Fz0) - IW / ZOOM / 2).toFixed(1), y: (Y((Fs + axle / 2) / 2) - IH / ZOOM / 2).toFixed(1) });

    // Inset coordinates, centred between the curve and the chord at the static load.
    const zc = v.Fz0, fc = (Fs + axle / 2) / 2, half = IW / (2 * ZOOM) / (W / ZMAX) + 0.02;
    const ix = (z) => ICX + (ZOOM * W * (z - zc)) / ZMAX, iy = (f) => ICY - (ZOOM * H * (f - fc)) / FMAX;
    const zs = [];
    for (let i = 0; i <= 24; i++) zs.push(zc - half + (2 * half * i) / 24);
    attr("i-curve", { d: path(zs.map((z) => [ix(z), iy(F(z))])) });
    const slope = dWkN > 0 ? (Fo - Fi) / (2 * dWkN) : 0, chord = (z) => axle / 2 + slope * (z - zc);
    attr("i-chord", { d: dWkN > 0 ? path([[ix(zc - half), iy(chord(zc - half))], [ix(zc + half), iy(chord(zc + half))]]) : "" });
    const ys = iy(Fs), ym = iy(axle / 2);
    attr("i-s", { cy: ys.toFixed(1) });
    attr("i-m", { cy: ym.toFixed(1), display: dWkN > 0 ? "inline" : "none" });
    attr("i-gap", { d: ym - ys > 4 ? path([[ICX + 12, ys], [ICX + 12, ym]]) : "" });
    attr("i-gap-label", { y: ((ys + ym) / 2 + 4).toFixed(1), display: ym - ys > 10 ? "inline" : "none" });
    const named = dWkN >= 0.8 ? "inline" : "none"; // the points need room for their labels
    attr("i-label", { x: X(zi).toFixed(1), y: (Y(Fi) - 12).toFixed(1), display: named });
    attr("o-label", { x: X(zo).toFixed(1), y: (Y(Fo) - 12).toFixed(1), display: named });

    set("out-Fi", fmt(Fi) + " kN");
    set("out-Fo", fmt(Fo) + " kN");
    set("out-eq", fmt(equal) + " kN");
    set("out-loss", fmt(loss) + " kN");
    set("readout", dWkN === 0
      ? "Equal wheel loads: the axle has all " + fmt(equal) + " kN of its grip."
      : "Moving " + fmt(dWkN) + " kN across the axle costs " + fmt(loss) + " kN of grip, " + fmt((100 * loss) / equal) + "% of what it has with equal loads.");

    set("g-Fz0", fmt(v.Fz0) + " kN");
    set("g-dW", fmt(dWkN) + " kN");
    set("g-mu0", fmt(v.mu0));
    set("g-k", fmt(v.k) + " /kN");
    set("w-Fi", "(" + fmt(v.mu0) + " − " + fmt(v.k) + " × " + fmt(zi) + ") × " + fmt(zi) + nb + "kN = " + fmt(Fi) + nb + "kN");
    set("w-Fo", "(" + fmt(v.mu0) + " − " + fmt(v.k) + " × " + fmt(zo) + ") × " + fmt(zo) + nb + "kN = " + fmt(Fo) + nb + "kN");
    set("w-eq", "2 × (" + fmt(v.mu0) + " − " + fmt(v.k) + " × " + fmt(v.Fz0) + ") × " + fmt(v.Fz0) + nb + "kN = " + fmt(equal) + nb + "kN");
    set("w-loss", fmt(equal) + nb + "kN − " + fmt(axle) + nb + "kN = " + fmt(loss) + nb + "kN");
    set("w-ans", fmt(loss) + " kN");
    set("w-note", "The same as 2kΔW² = 2 × " + fmt(v.k) + " × " + fmt(dWkN) + "² = " + fmt(2 * v.k * dWkN * dWkN) + " kN, whatever the static load.");
  });
})();
