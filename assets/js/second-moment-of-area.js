// Rectangular section, I about each centroidal axis: live demo for Mechanics §2.5.
(function () {
  const { fmt, set, attr, nb } = NB;
  const CX = 200, CY = 120, FIT = 180, BAR = 170; // section centre, largest drawn side, tallest bar

  NB.demo(function (v) {
    const b = v.b, h = v.h;
    const Ix = (b * h ** 3) / 12, Iy = (h * b ** 3) / 12, A = b * h, Z = (b * h * h) / 6;

    const k = Math.min(FIT / b, FIT / h), w = b * k, ht = h * k;
    attr("sec", { x: (CX - w / 2).toFixed(1), y: (CY - ht / 2).toFixed(1), width: w.toFixed(1), height: ht.toFixed(1) });
    attr("b-label", { y: (CY + ht / 2 + 18).toFixed(1) });
    attr("h-label", { x: (CX + w / 2 + 8).toFixed(1), y: (CY - ht / 4 + 4).toFixed(1) });
    set("b-label", "b = " + b + " mm");
    set("h-label", "h = " + h + " mm");

    const top = Math.max(Ix, Iy);
    attr("bar-x", { y: (200 - (BAR * Ix) / top).toFixed(1), height: ((BAR * Ix) / top).toFixed(1) });
    attr("bar-y", { y: (200 - (BAR * Iy) / top).toFixed(1), height: ((BAR * Iy) / top).toFixed(1) });

    set("out-A", fmt(A) + " mm²");
    set("out-Z", fmt(Z) + " mm³");
    set("out-Iy", fmt(Iy) + " mm⁴");
    set("out-Ix", fmt(Ix) + " mm⁴");
    const r = Ix / Iy;
    set("readout", r > 1.0005
      ? "Standing on edge, the section is " + fmt(r) + " times stiffer in bending than laid flat: (h/b)² = (" + h + "/" + b + ")²."
      : r < 0.9995
        ? "Laid flat like this, the section is " + fmt(1 / r) + " times less stiff in bending than standing on edge."
        : "A square section is equally stiff about both axes.");

    set("g-b", b + " mm");
    set("g-h", h + " mm");
    set("w-sub", "= " + b + nb + "mm × (" + h + nb + "mm)³ / 12");
    set("w-mm", "= " + fmt(Ix, 4) + nb + "mm⁴");
    set("w-m", "= " + fmt(Ix * 1e-12, 4) + nb + "m⁴");
    set("w-ans", fmt(Ix) + " mm⁴");
    set("w-note", "About the vertical axis, hb³/12 = " + fmt(Iy) + " mm⁴.");
  });
})();
