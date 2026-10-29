// Heat into an ideal gas split between internal energy and work: live demo for Thermodynamics §1.2.
(function () {
  const { fmt, set, attr, opt, path, arrow, nb } = NB;
  const R = 8.314, T1 = 293.15; // the gas starts at 20 °C
  const BASE = 210, H0 = 45, XL = 111, XR = 249; // cylinder floor, starting gas height, inner walls
  const TB = 200, TH = 150, TLO = 250, THI = 1150; // thermometer: foot, height and scale in K
  const BY = 60, BH = 140; // split bar top and height
  const yT = (t) => TB - (TH * (t - TLO)) / (THI - TLO);

  NB.demo(function (v) {
    const Q = v.Q * 1e3, cv = v.gas * R, isobaric = v.proc === 1;
    const c = isobaric ? cv + R : cv, dT = Q / (v.n * c), W = isobaric ? v.n * R * dT : 0, U = Q - W, T2 = T1 + dT;

    // Thermometer: the column stands at T₂, with a tick where it started.
    const y1 = yT(T1), y2 = yT(T2);
    attr("therm", { y: y2.toFixed(1), height: (212 - y2).toFixed(1) });
    attr("t1-tick", { d: path([[46, y1], [52, y1]]) });
    attr("t1-label", { y: (y1 + 4).toFixed(1), visibility: y1 - y2 < 14 ? "hidden" : "visible" });
    attr("t2-label", { y: (y2 + 4).toFixed(1) });

    // Cylinder: at constant pressure the gas height grows with T (V ∝ T), drawn to scale; at constant volume stops hold the piston.
    const h = isobaric ? (H0 * T2) / T1 : H0, yP = BASE - h, y0 = BASE - H0;
    attr("gas", { y: yP.toFixed(1), height: h.toFixed(1) });
    attr("piston", { y: (yP - 12).toFixed(1) });
    attr("weight", { y: (yP - 30).toFixed(1) });
    const stop = (x0, x1) => path([[x0, y0 - 19], [x1, y0 - 19], [x1, y0 - 12], [x0, y0 - 12]]) + " Z";
    attr("stops", { d: isobaric ? "" : stop(XL, XL + 14) + " " + stop(XR - 14, XR) });
    attr("start-line", { d: isobaric ? path([[XL, y0], [XR, y0]]) : "" });
    attr("gas-label", { y: (BASE - h / 2 + 5).toFixed(1) });
    set("gas-label", "n = " + fmt(v.n) + " mol");
    const tall = isobaric && h - H0 > 14;
    attr("rise", { d: tall ? arrow(262, y0, 262, yP, 8) + " " + path([[256, y0], [268, y0]]) : "" });
    attr("rise-label", { y: ((y0 + yP) / 2 + 4).toFixed(1) });
    set("rise-label", tall ? "ΔV" : "");

    // Heat in from below, the arrows growing with Q.
    const len = 8 + (20 * v.Q) / 10;
    attr("heat", { d: [150, 180, 210].map((x) => arrow(x, 216 + len, x, 216, 8)).join(" ") });
    set("Q-label", "Q = " + fmt(v.Q) + " kJ");

    // Split bar: ΔU stays in the gas (bottom), W leaves through the piston (top).
    const hU = (BH * U) / Q;
    attr("bar-U", { y: (BY + BH - hU).toFixed(1), height: hU.toFixed(1) });
    attr("bar-W", { height: (BH - hU).toFixed(1), visibility: W > 0 ? "visible" : "hidden" });
    attr("U-label", { y: (BY + BH - hU / 2 + 4).toFixed(1) });
    attr("W-label", { y: (BY + (BH - hU) / 2 + 4).toFixed(1) });
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
