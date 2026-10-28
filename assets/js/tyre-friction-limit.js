// Friction circle for combined braking and cornering: live demo for Automotive §2.2.
(function () {
  const { fmt, set, attr, opt, arrow, nb } = NB;
  const G = 9.81, CX = 200, CY = 130, K = 100; // circle centre; SVG units per g

  NB.demo(function (v) {
    const mu = v.mu, a = Math.hypot(v.ab, v.al), use = a / mu, vs = v.v / 3.6, d = (vs * vs) / (2 * mu * G);

    attr("circle", { r: K * mu });
    const tip = [CX + K * v.al, CY + K * v.ab];
    attr("vec", { d: a > 0 ? arrow(CX, CY, tip[0], tip[1], 12) : "" });
    attr("pt", { cx: tip[0].toFixed(1), cy: tip[1].toFixed(1) });
    set("use-label", use > 1 ? "OVER THE LIMIT" : "GRIP USED");
    set("use", fmt(use * 100) + "%");
    set("lim", fmt(mu) + " g");

    set("out-amax", fmt(mu) + " g");
    set("out-a", fmt(a) + " g");
    set("out-d", fmt(d) + " m");
    set("out-use", fmt(use * 100) + "%");
    set("readout", (use <= 1
      ? "The tyres can supply this, with " + fmt(use * 100) + "% of the grip in use."
      : "The demand is " + fmt((use - 1) * 100) + "% over the limit, so the tyres would slide.") +
      " Braking alone from " + fmt(v.v) + " km/h, the shortest stop is " + fmt(d) + " m.");

    const name = opt("mu").dataset.name;
    set("g-name", name);
    set("g-mu", fmt(mu));
    set("g-ab", fmt(v.ab) + " g");
    set("g-al", fmt(v.al) + " g");
    set("g-v", fmt(v.v) + " km/h");
    set("w-amax", fmt(mu) + " × 9.81" + nb + "m/s² = " + fmt(mu * G) + nb + "m/s²");
    set("w-a", "√(" + fmt(v.ab) + "² + " + fmt(v.al) + "²) g = " + fmt(a) + nb + "g = " + fmt(a * G) + nb + "m/s²");
    set("w-use", fmt(a) + nb + "g / " + fmt(mu) + nb + "g = " + fmt(use * 100) + "%");
    set("w-ans", fmt(use * 100) + "%");
    set("w-note", (use <= 1 ? "Within the limit. " : "Over the limit: the tyres slide. ") +
      "Braking hard from " + fmt(v.v) + " km/h on " + name + ", the shortest stop is " + fmt(d) + " m.");
  });
})();
