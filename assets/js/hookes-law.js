// Stress–strain line up to yield: live demo for Materials §1.1.
(function () {
  const { fmt, set, attr, opt, path, nb } = NB;
  const OX = 60, OY = 200, W = 400, H = 160, EMAX = 10000, SMAX = 1000; // plot origin and size; axes in µε and MPa

  NB.demo(function (v) {
    const o = opt("E"), E = v.E * 1e3, fy = Number(o.dataset.fy); // MPa
    const e = v.e * 1e-6, ey = fy / E, s = E * e, yielded = s > fy;

    const xm = EMAX, ym = SMAX;
    const X = (ue) => OX + (W * ue) / xm, Y = (mpa) => OY - (H * mpa) / ym;
    const Py = [X(ey * 1e6), Y(fy)];
    attr("el", { d: path([[OX, OY], Py]) });
    attr("pl", { d: path([Py, [OX + W, Py[1]]]) });
    const P = [X(v.e), Y(Math.min(s, fy))];
    attr("pt", { cx: P[0].toFixed(1), cy: P[1].toFixed(1) });
    attr("drop", { d: path([[OX, P[1]], P, [P[0], OY]]) });
    const right = P[0] > 360;
    attr("pt-label", { x: (P[0] + (right ? -10 : 10)).toFixed(1), y: (P[1] + 20).toFixed(1), "text-anchor": right ? "end" : "start" });
    set("pt-label", yielded ? "yielded" : "σ = " + fmt(s) + " MPa");
    attr("fy-label", { y: (Py[1] + 4).toFixed(1) });
    set("fy-label", fmt(fy));
    set("emax-label", fmt(xm));

    set("out-ey", fmt(ey));
    set("out-e", fmt(e));
    set("out-s", yielded ? "yields at " + fmt(fy) + " MPa" : fmt(s) + " MPa");
    set("readout", yielded
      ? "The strain is past the yield strain of " + fmt(ey * 1e6) + " µε, so the material yields and keeps a permanent set when unloaded."
      : "The material is elastic, at " + fmt((100 * s) / fy) + "% of its yield strength. Unloaded, it returns to its original length.");

    set("g-name", o.dataset.name);
    set("g-E", fmt(v.E) + " GPa");
    set("g-e", fmt(v.e) + " µε");
    set("w-e", fmt(v.e) + " × 10⁻⁶ = " + fmt(e));
    set("w-s", fmt(E, 4) + nb + "MPa × " + fmt(e) + " = " + fmt(s) + nb + "MPa" + (yielded ? ", above the yield strength" : ""));
    set("w-ans", yielded ? fmt(fy) + " MPa, at yield" : fmt(s) + " MPa");
    set("w-note", yielded
      ? "Hooke's law stops applying at yield (" + fmt(fy) + " MPa), so the stress cannot follow σ = Eε any further."
      : "That is " + fmt((100 * s) / fy) + "% of the yield strength of " + o.dataset.name + " (" + fmt(fy) + " MPa).");
  });
})();
