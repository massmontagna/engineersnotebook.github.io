// Heat into an ideal gas split between internal energy and work: live demo for Thermodynamics §1.2.
(function () {
  const { fmt, set, attr, opt, nb } = NB;
  const R = 8.314, X0 = 150, MAX = 330; // bar start and full width, SVG units

  NB.demo(function (v) {
    const Q = v.Q * 1e3, cv = v.gas * R, isobaric = v.proc === 1;
    const c = isobaric ? cv + R : cv, dT = Q / (v.n * c), W = isobaric ? v.n * R * dT : 0, U = Q - W;

    const wU = (MAX * U) / Q;
    attr("bar-Q", { width: MAX });
    attr("Q-label", { x: X0 + 10 });
    set("Q-label", "Q = " + fmt(v.Q) + " kJ");
    attr("bar-U", { width: wU.toFixed(1) });
    attr("bar-W", { x: (X0 + wU).toFixed(1), width: (MAX - wU).toFixed(1), visibility: W > 0 ? "visible" : "hidden" });
    attr("U-label", { x: (X0 + wU / 2).toFixed(1) });
    attr("W-label", { x: (X0 + wU + (MAX - wU) / 2).toFixed(1) });
    set("U-label", "ΔU = " + fmt(U / 1e3) + " kJ");
    set("W-label", W > 0 ? "W = " + fmt(W / 1e3) + " kJ" : "");

    set("out-dT", fmt(dT) + " K");
    set("out-W", fmt(W / 1e3) + " kJ");
    set("out-U", fmt(U / 1e3) + " kJ");
    set("readout", isobaric
      ? "At constant pressure, " + fmt((100 * U) / Q) + "% of the heat raises the internal energy and " + fmt((100 * W) / Q) + "% leaves as work pushing the boundary out."
      : "At constant volume the gas does no work, so all of the heat raises its internal energy.");

    const gas = opt("gas").dataset.name, cvTxt = fmt(cv) + nb + "J/(mol·K)";
    set("g-Q", fmt(v.Q) + " kJ");
    set("g-n", fmt(v.n) + " mol");
    set("g-gas", gas);
    set("g-cv", v.gas + "R");
    set("g-proc", opt("proc").dataset.name);
    set("w-c", isobaric ? "cₚ = cᵥ + R = " + fmt(c) + nb + "J/(mol·K)" : "cᵥ = " + cvTxt);
    set("w-dT", fmt(Q, 4) + nb + "J / (" + fmt(v.n) + nb + "mol × " + fmt(c) + nb + "J/(mol·K)) = " + fmt(dT) + nb + "K");
    set("w-W", isobaric
      ? "nRΔT = " + fmt(v.n) + nb + "mol × 8.314" + nb + "J/(mol·K) × " + fmt(dT) + nb + "K = " + fmt(W / 1e3) + nb + "kJ"
      : "0, since the volume is fixed");
    set("w-U", fmt(v.Q) + nb + "kJ − " + fmt(W / 1e3) + nb + "kJ = " + fmt(U / 1e3) + nb + "kJ");
    set("w-ans", fmt(U / 1e3) + " kJ");
    set("w-note", fmt((100 * U) / Q) + "% of the heat went into internal energy, raising the temperature by " + fmt(dT) + " K.");
  });
})();
