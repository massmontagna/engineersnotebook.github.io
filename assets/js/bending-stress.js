// Linear bending stress across a rectangular section: live demo for Mechanics §3.2.
(function () {
  const { fmt, set, attr, arrow, nb } = NB;
  const CX = 130, CY = 120, AX = 340, HALF = 110; // section centre, stress axis, drawn width of σmax

  NB.demo(function (v) {
    const M = v.M, b = v.b, h = v.h;
    const y = NB.limit("y", -Math.floor(h / 2), Math.floor(h / 2));
    const I = (b * h ** 3) / 12, Mn = M * 1e6; // N·mm, so stresses come out in MPa
    const s = (Mn * y) / I, smax = (Mn * h) / 2 / I;

    const k = Math.min(180 / h, 160 / b), w = b * k, ht = h * k, top = CY - ht / 2, bot = CY + ht / 2;
    attr("sec", { x: (CX - w / 2).toFixed(1), y: top.toFixed(1), width: w.toFixed(1), height: ht.toFixed(1) });
    attr("sd", { d: "M" + AX + " " + top.toFixed(1) + " L" + (AX - HALF) + " " + top.toFixed(1) + " L" + AX + " " + CY +
      " L" + (AX + HALF) + " " + bot.toFixed(1) + " L" + AX + " " + bot.toFixed(1) + " Z" });
    attr("top-label", { x: AX - HALF - 6, y: (top + 4).toFixed(1) });
    attr("bot-label", { x: AX + HALF + 6, y: (bot + 4).toFixed(1) });
    set("top-label", "C " + fmt(-smax));
    set("bot-label", "T +" + fmt(smax));

    const py = CY + y * k, len = (HALF * s) / smax;
    attr("pt", { cx: CX, cy: py.toFixed(1) });
    attr("pt-line", { x1: CX, y1: py.toFixed(1), x2: AX, y2: py.toFixed(1) });
    attr("pt-arrow", { d: Math.abs(len) > 12 ? arrow(AX, py, AX + len, py, 10) : "" });
    attr("pt-label", { x: (AX + len + (s >= 0 ? 8 : -8)).toFixed(1), y: (py + (y >= 0 ? 16 : -6)).toFixed(1), "text-anchor": s >= 0 ? "start" : "end" });
    set("pt-label", "σ = " + fmt(s) + " MPa");

    set("out-I", fmt(I) + " mm⁴");
    set("out-smax", "±" + fmt(smax) + " MPa");
    set("out-s", fmt(s) + " MPa");
    set("readout", y === 0
      ? "On the neutral axis the bending stress is zero."
      : "At " + Math.abs(y) + " mm " + (y > 0 ? "below" : "above") + " the neutral axis the fibre is in " + (y > 0 ? "tension" : "compression") +
        " at " + fmt(Math.abs(s)) + " MPa, " + fmt((100 * Math.abs(y)) / (h / 2)) + "% of the extreme-fibre stress.");

    set("g-M", fmt(M) + " kN·m");
    set("g-bh", b + " × " + h + " mm");
    set("g-y", fmt(y) + " mm");
    set("w-I", b + nb + "mm × (" + h + nb + "mm)³ / 12 = " + fmt(I, 4) + nb + "mm⁴");
    set("w-sub", "= " + fmt(Mn, 4) + nb + "N·mm × " + fmt(y) + nb + "mm / " + fmt(I, 4) + nb + "mm⁴");
    set("w-s", "= " + fmt(s) + nb + "N/mm² = " + fmt(s) + nb + "MPa");
    set("w-ans", fmt(s) + " MPa");
    set("w-note", "The extreme fibres, at y = ±" + fmt(h / 2) + " mm, carry ±" + fmt(smax) + " MPa.");
  });
})();
