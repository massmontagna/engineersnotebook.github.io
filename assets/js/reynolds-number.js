// Laminar or turbulent pipe flow: live demo for Fluids §1.3.
(function () {
  const { fmt, set, attr, opt, path, arrow, nb } = NB;
  const PX = 380, CY = 100, HALF = 56, LEN = 100; // profile station, pipe axis, drawn half-bore, longest profile arrow

  NB.demo(function (v) {
    const o = opt("fl"), rho = Number(o.dataset.rho), mu = Number(o.dataset.mu);
    const D = v.D / 1000, Re = (rho * v.v * D) / mu, nu = mu / rho;
    const regime = Re < 2300 ? "laminar" : Re < 4000 ? "transitional" : "turbulent";

    // Schematic streamlines: straight when laminar, wavy when turbulent, wavy only downstream when transitional.
    const amp = regime === "laminar" ? 0 : regime === "transitional" ? 5 : Math.min(14, 6 + 2 * Math.log10(Re / 4000));
    let d = "";
    for (let j = 0; j < 7; j++) {
      const y0 = 52 + j * 16, pts = [];
      for (let x = 20; x <= 370; x += 5) {
        const on = regime !== "transitional" || x > 200 ? 1 : 0;
        const y = y0 + on * amp * (Math.sin(x * 0.05 + j * 1.7) + 0.6 * Math.sin(x * 0.13 + j * 0.9));
        pts.push([x, Math.min(156, Math.max(44, y))]);
      }
      d += path(pts) + " ";
    }
    attr("lines", { d: d });

    // Velocity profile: parabolic when laminar, a flat 1/7-power profile when turbulent.
    const shape = (r) => {
      const lam = 1 - r * r, turb = Math.pow(1 - Math.abs(r), 1 / 7);
      return regime === "laminar" ? lam : regime === "turbulent" ? turb : (lam + turb) / 2;
    };
    const prof = [];
    for (let i = 0; i <= 40; i++) { const r = -1 + i / 20; prof.push([PX + LEN * shape(r), CY + HALF * r]); }
    attr("prof", { d: path(prof) });
    let arrows = "";
    for (const r of [-0.8, -0.4, 0, 0.4, 0.8]) arrows += arrow(PX, CY + HALF * r, PX + LEN * shape(r), CY + HALF * r, 8) + " ";
    attr("prof-arrows", { d: arrows });
    set("regime", regime.toUpperCase());
    set("re-label", "Re = " + fmt(Re, 4));

    set("out-nu", fmt(nu) + " m²/s");
    set("out-reg", regime);
    set("out-Re", fmt(Re, 4));
    set("readout", "Re = " + fmt(Re, 4) + ", so the flow is " + regime + (regime === "laminar"
      ? ": layers slide smoothly past one another."
      : regime === "turbulent" ? ": eddies mix the flow across the pipe." : ": it switches unpredictably between laminar and turbulent."));

    set("g-name", o.dataset.name);
    set("g-rho", fmt(rho, 4) + " kg/m³");
    set("g-mu", fmt(mu) + " Pa·s");
    set("g-v", fmt(v.v) + " m/s");
    set("g-D", v.D + " mm");
    set("w-sub", "= " + fmt(rho, 4) + nb + "kg/m³ × " + fmt(v.v) + nb + "m/s × " + fmt(D) + nb + "m / " + fmt(mu) + nb + "Pa·s");
    set("w-Re", "= " + fmt(Re, 4));
    set("w-ans", fmt(Re, 4));
    set("w-note", "Pipe flow is laminar below about 2,300 and turbulent above about 4,000, so this flow is " + regime + ".");
  });
})();
