// Bar narrowing as it stretches: live demo for Materials §1.2.
(function () {
  const { fmt, set, attr, opt, arrow, nb } = NB;
  const CX = 260, CY = 100, L0 = 280, MAX = 70, SCALE = 10; // original bar, largest drawn half-extension, exaggeration
  // Drawn original width: 20 units at 1 mm up to 100 at 200 mm, on a log scale so the whole range fits and stays visible.
  const D0 = (d) => 20 + (80 * Math.log(d)) / Math.log(200);
  const pct = (x) => fmt(x * 100) + "%";

  NB.demo(function (v) {
    const nu = v.nu, ea = v.e / 100, el = -nu * ea, dd = el * v.d, vol = ea * (1 - 2 * nu);

    const ex = NB.exaggerate((Math.abs(ea) * L0) / 2, SCALE, MAX);
    const f = ea === 0 ? SCALE : ex.amp / ((Math.abs(ea) * L0) / 2); // drawn exaggeration, less than SCALE only when clipped
    const h0 = D0(v.d), Lw = L0 * (1 + ea * f), Dh = h0 * (1 + el * f), x0 = CX - Lw / 2, x1 = CX + Lw / 2;
    attr("orig", { x: CX - L0 / 2, y: (CY - h0 / 2).toFixed(1), width: L0, height: h0.toFixed(1) });
    attr("bar", { x: x0.toFixed(1), y: (CY - Dh / 2).toFixed(1), width: Lw.toFixed(1), height: Dh.toFixed(1) });
    const out = ea > 0;
    attr("fl", { d: ea === 0 ? "" : out ? arrow(x0 - 6, CY, x0 - 40, CY, 12) : arrow(x0 - 40, CY, x0 - 6, CY, 12) });
    attr("fr", { d: ea === 0 ? "" : out ? arrow(x1 + 6, CY, x1 + 40, CY, 12) : arrow(x1 + 40, CY, x1 + 6, CY, 12) });
    set("d-label", "d = " + v.d + " mm → " + fmt(v.d + dd, 5) + " mm");
    set("scale-label", "strains " + ex.label);

    set("out-dd", fmt(dd) + " mm");
    set("out-vol", pct(vol));
    set("out-lat", pct(el));
    set("readout", ea === 0
      ? "With no axial strain there is no lateral strain."
      : (out ? "Stretched by " : "Squashed by ") + fmt(Math.abs(ea) * 100) + "%, the bar " + (nu === 0 ? "keeps its width" : (out ? "narrows" : "widens") + " by " + fmt(Math.abs(el) * 100) + "%") +
        ". Its volume changes by " + pct(vol) + ".");

    set("g-name", opt("nu").dataset.name);
    set("g-nu", fmt(nu));
    set("g-e", pct(ea));
    set("g-d", v.d + " mm");
    set("w-lat", "−" + fmt(nu) + " × " + pct(ea) + " = " + pct(el));
    set("w-dd", fmt(el) + " × " + v.d + nb + "mm = " + fmt(dd) + nb + "mm");
    set("w-ans", pct(el));
    set("w-note", "The width changes by " + fmt(dd) + " mm, and the volume by " + pct(vol) + ".");
  });
})();
