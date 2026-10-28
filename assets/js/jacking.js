// Roll versus jacking split of lateral load transfer: live demo for Automotive §3.1.
(function () {
  const { fmt, set, attr, path, arrow } = NB;
  // Front view to one length scale (SVG units per mm), car centreline, ground line, split bar.
  const S = 0.15, CX = 260, GROUND = 250, TW = 205 * S, BX = 20, BW = 480, BY = 292, BH = 14;

  // Body outline in mm about the centreline (x across, y up), widened with the track.
  const body = (t) => {
    const half = t / 2 + 120, pts = [
      [half - 260, 200], [half, 330], [half, 760], [half - 50, 900],
      [half - 220, 960], [half - 330, 1380],
    ];
    const side = pts.map(([x, y]) => [CX + x * S, GROUND - y * S]);
    const other = pts.slice().reverse().map(([x, y]) => [CX - x * S, GROUND - y * S]);
    return path(side.concat(other)) + " Z";
  };
  const signed = (n) => fmt(n).replace("-", "−");

  NB.demo(function (v) {
    const rcmm = NB.limit("rc", -150, v.h); // the roll centre sits below the CG
    const jack = rcmm / v.h, roll = 1 - jack, share = (v.ay * v.h) / v.t; // share: transfer as a fraction of weight
    const lift = share >= 0.5;

    const XI = CX - (v.t / 2) * S, XO = CX + (v.t / 2) * S, cg = GROUND - v.h * S, rc = GROUND - rcmm * S;
    attr("body", { d: body(v.t) });
    attr("tyre-i", { x: (XI - TW / 2).toFixed(1) });
    attr("tyre-o", { x: (XO - TW / 2).toFixed(1) });
    attr("link-lines", { d: path([[XI, GROUND], [CX, rc], [XO, GROUND]]) });
    attr("cg", { cy: cg.toFixed(1) });
    attr("cg-label", { y: (cg + 4).toFixed(1) });
    attr("rc", { cy: rc.toFixed(1) });
    attr("rc-label", { y: (rc + 4).toFixed(1) });
    attr("inertia", { d: v.ay > 0 ? arrow(CX + 10, cg, CX + 20 + 30 * v.ay, cg, 12) : "" });
    attr("may-label", { x: (CX + 14).toFixed(1), y: (cg - 10).toFixed(1), display: v.ay > 0 ? "inline" : "none" });

    // Roll arm from CG down to RC, on the inner side of the centreline.
    const arm = rc - cg, bx = CX - 46;
    attr("arm", { d: arm > 8 ? path([[bx + 4, cg], [bx - 4, cg]]) + " " + path([[bx, cg], [bx, rc]]) + " " + path([[bx + 4, rc], [bx - 4, rc]]) : "" });
    // Jacking pushes the body up through the RC, or pulls it down when the RC is below ground.
    // Upward, it stops short of the CG and its force arrow.
    const dir = jack >= 0 ? -1 : 1, jl = dir < 0 ? Math.min(52 * jack, arm - 20) : 52 * -jack;
    attr("jack", { d: v.ay > 0 && jl >= 6 ? arrow(CX, rc + dir * 8, CX, rc + dir * (8 + jl), 10) : "" });

    // Split bar: jacking from the left, roll from the right, each clipped to the bar.
    const jw = BW * Math.min(1, Math.max(0, jack));
    attr("bar-jack", { width: jw.toFixed(1) });
    attr("bar-roll", { x: (BX + jw).toFixed(1), width: (BW - jw).toFixed(1) });
    set("jack-label", "JACKING " + signed(100 * jack) + "%");
    set("roll-label", "ROLL " + signed(100 * roll) + "%");

    set("out-jack", signed(100 * jack) + "%");
    set("out-roll", signed(100 * roll) + "%");
    set("out-arm", fmt(v.h - rcmm, 4) + " mm");
    set("out-dW", fmt(100 * share) + "% of weight");
    set("readout", lift
      ? "The transfer is half the car's weight or more: the inner wheels lift."
      : jack < 0
        ? "Negative roll centre: the links pull the body down, so the springs carry more than the whole transfer."
        : jack > 0.7
          ? "High roll centre: little roll, but the tyre forces jack the body up hard."
          : jack > 0.35
            ? "Mid roll centre: the transfer is shared between roll and jacking."
            : "Low roll centre: most of the transfer comes through body roll and the springs.");

    set("g-ay", fmt(v.ay) + " g");
    set("g-h", v.h + " mm");
    set("g-t", fmt(v.t, 4) + " mm");
    set("g-rc", signed(rcmm) + " mm");
    set("w-jack", signed(rcmm) + " mm / " + v.h + " mm = " + signed(100 * jack) + "%");
    set("w-roll", "1 − " + signed(100 * jack) + "% = " + signed(100 * roll) + "%");
    set("w-dW", fmt(v.ay) + " × " + v.h + " mm / " + fmt(v.t, 4) + " mm = " + fmt(100 * share) + "%");
    set("w-ans", signed(100 * jack) + "%");
    set("w-note", lift
      ? "The transfer reaches half the weight, so the inner wheels lift off."
      : "Roll takes the other " + signed(100 * roll) + "%. " + fmt(100 * share) + "% of the car's weight moves to the outer wheels.");
  });
})();
