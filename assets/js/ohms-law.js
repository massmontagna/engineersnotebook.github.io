// Resistor circuit and its current–voltage line: live demo for Electrical §1.1.
(function () {
  const { fmt, set, attr, path, nice, nb } = NB;
  const OX = 320, OY = 190, W = 170, H = 150; // I–V plot origin and size
  const amps = (i) => (i < 1 ? fmt(i * 1000) + " mA" : fmt(i) + " A");

  NB.demo(function (v) {
    const I = v.V / v.R, P = v.V * I;

    const vm = nice(v.V * 1.25), im = nice(I * 1.25), vEnd = Math.min(vm, im * v.R);
    const X = (volts) => OX + (W * volts) / vm, Y = (a) => OY - (H * a) / im;
    attr("iv", { d: path([[OX, OY], [X(vEnd), Y(vEnd / v.R)]]) });
    const p = [X(v.V), Y(I)];
    attr("pt", { cx: p[0].toFixed(1), cy: p[1].toFixed(1) });
    attr("drop", { d: path([[OX, p[1]], p, [p[0], OY]]) });
    set("V-label", "V = " + fmt(v.V) + " V");
    set("R-label", "R = " + fmt(v.R) + " Ω");
    set("I-label", "I = " + amps(I));

    set("out-G", fmt(1000 / v.R) + " mS");
    set("out-P", fmt(P) + " W");
    set("out-I", amps(I));
    set("readout", amps(I) + " flows. Double the voltage and the current doubles; double the resistance and it halves.");

    set("g-V", fmt(v.V) + " V");
    set("g-R", fmt(v.R) + " Ω");
    set("w-I", fmt(v.V) + nb + "V / " + fmt(v.R) + nb + "Ω = " + fmt(I) + nb + "A");
    set("w-ans", amps(I));
    set("w-note", "The resistor dissipates P = VI = " + fmt(P) + " W as heat.");
  });
})();
