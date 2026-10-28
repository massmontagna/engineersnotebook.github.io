// Capacitor charging through a resistor: live demo for Electrical §1.3.
(function () {
  const { fmt, set, attr, path, nb } = NB;
  const OX = 60, OY = 200, PER_TAU = 80, H = 160; // one time constant spans 80 units; supply level 160 units up
  const secs = (s) => (s < 0.9995 ? fmt(s * 1000) + " ms" : fmt(s) + " s");
  const vAt = (k) => 1 - Math.exp(-k);

  const curve = [];
  for (let i = 0; i <= 50; i++) curve.push([OX + (PER_TAU * i) / 10, OY - H * vAt(i / 10)]);
  NB.attr("curve", { d: path(curve) });

  NB.demo(function (v) {
    const R = v.R * 1e3, C = v.C * 1e-6, tau = R * C, t = v.k * tau;
    const vc = v.V * vAt(v.k), i = (v.V / R) * Math.exp(-v.k);

    const p = [OX + PER_TAU * v.k, OY - H * vAt(v.k)];
    attr("pt", { cx: p[0].toFixed(1), cy: p[1].toFixed(1) });
    attr("drop", { d: path([[OX, p[1]], p, [p[0], OY]]) });
    const right = p[0] > 360;
    attr("pt-label", { x: (p[0] + (right ? -10 : 10)).toFixed(1), y: (p[1] + (right ? 22 : 18)).toFixed(1), "text-anchor": right ? "end" : "start" });
    set("pt-label", "v = " + fmt(vc) + " V");
    set("V-label", "V = " + fmt(v.V) + " V");
    set("tau-label", "τ = " + secs(tau));

    set("out-tau", secs(tau));
    set("out-t", secs(t));
    set("out-i", fmt(i * 1000) + " mA");
    set("out-v", fmt(vc) + " V");
    set("readout", "After " + fmt(v.k) + "τ, or " + secs(t) + ", the capacitor is at " + fmt(100 * vAt(v.k)) + "% of the supply and the current has fallen to " +
      fmt(100 * Math.exp(-v.k)) + "% of its starting value.");

    set("g-R", fmt(v.R) + " kΩ");
    set("g-C", fmt(v.C) + " µF");
    set("g-V", fmt(v.V) + " V");
    set("g-t", fmt(v.k) + "τ = " + secs(t));
    set("w-tau", fmt(R, 4) + nb + "Ω × " + fmt(C) + nb + "F = " + secs(tau));
    set("w-sub", "= " + fmt(v.V) + nb + "V × (1 − e^(−" + fmt(v.k) + "))");
    set("w-v", "= " + fmt(vc) + nb + "V");
    set("w-ans", fmt(vc) + " V");
    set("w-note", "After 5τ = " + secs(5 * tau) + " it is above 99% charged.");
  });
})();
