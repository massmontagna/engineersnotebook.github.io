// Bar growing as it heats: live demo for Materials §2.1.
(function () {
  const { fmt, set, attr, opt, nb } = NB;
  const X0 = 40, XL = 440, MAX = 40; // bar start, original end, largest drawn change
  const neg = (s) => s.replace("-", "−");

  NB.demo(function (v) {
    const o = opt("a"), a = v.a * 1e-6, E = Number(o.dataset.e) * 1e3; // MPa
    const e = a * v.dT, dL = e * v.L, s = -E * e;

    const ex = NB.exaggerate(Math.abs(e) * (XL - X0), MAX), end = XL + Math.sign(v.dT) * ex.amp;
    attr("bar", { width: (end - X0).toFixed(1) });
    attr("dL-label", { x: end.toFixed(1), "text-anchor": "end" });
    set("dL-label", "ΔL = " + neg(fmt(dL * 1000)) + " mm");
    set("len-label", "L = " + fmt(v.L) + " m");
    set("scale-label", "change " + ex.label);

    set("out-e", neg(fmt(e)));
    set("out-s", v.dT === 0 ? "0 MPa" : neg(fmt(s)) + " MPa");
    set("out-dL", neg(fmt(dL * 1000)) + " mm");
    set("readout", v.dT === 0
      ? "With no temperature change the length does not change."
      : (v.dT > 0 ? "Heated" : "Cooled") + " by " + fmt(Math.abs(v.dT)) + " K, the bar " + (v.dT > 0 ? "grows" : "shrinks") + " by " + fmt(Math.abs(dL) * 1000) +
        " mm. Held between rigid supports instead, it would carry " + fmt(Math.abs(s)) + " MPa of " + (v.dT > 0 ? "compression." : "tension."));

    set("g-name", o.dataset.name);
    set("g-a", fmt(v.a) + " × 10⁻⁶ /K");
    set("g-L", fmt(v.L) + " m");
    set("g-dT", neg(fmt(v.dT)) + " K");
    set("w-sub", "= " + fmt(v.a) + " × 10⁻⁶" + nb + "/K × " + fmt(v.L) + nb + "m × " + neg(fmt(v.dT)) + nb + "K");
    set("w-dL", "= " + neg(fmt(dL)) + nb + "m");
    set("w-ans", neg(fmt(dL * 1000)) + " mm");
    set("w-note", "If both ends were fixed, the stress would be −EαΔT = " + neg(fmt(s)) + " MPa.");
  });
})();
