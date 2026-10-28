// Mass on a spring, then with a damper: two live demos for Mechanics §5.1.
(function () {
  const { $, fmt, set, attr, path, nb } = NB;

  // ---------- Fig. 5.1-1: free oscillation, animated ----------
  // Rest line, mass size, pen position, trace speed (SVG units per second) and window (seconds).
  const YR = 145, MX = 90, MW = 56, MH = 36, TOP = 20, XP = 170, XE = 500, PXS = 165, WIN = (XE - XP) / PXS;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let osc = { A: 40, w: 10 }, phase = 0, playing = !still, last = 0;

  // Zigzag spring from the ceiling to the top of the mass.
  function spring(y1) {
    const lead = 8, coils = 10, len = y1 - TOP - 2 * lead, pts = [[MX, TOP], [MX, TOP + lead]];
    for (let i = 1; i < coils; i++) pts.push([MX + (i % 2 ? 14 : -14), TOP + lead + (len * i) / coils]);
    pts.push([MX, y1 - lead], [MX, y1]);
    return path(pts);
  }

  function drawOsc() {
    const y = YR + osc.A * Math.cos(phase); // displacement drawn 1 unit per mm, downwards
    attr("spring", { d: spring(y - MH / 2) });
    attr("mass", { y: (y - MH / 2).toFixed(1) });
    attr("mass-label", { y: (y + 5).toFixed(1) });
    attr("pen-link", { d: path([[MX + MW / 2, y], [XP, y]]) });
    attr("pen", { cy: y.toFixed(1) });
    const pts = [];
    for (let x = XP; x <= XE; x += 2) pts.push([x, YR + osc.A * Math.cos(phase - (osc.w * (x - XP)) / PXS)]);
    attr("trace", { d: path(pts) });
  }

  function tick(now) {
    if (!playing) return;
    if (last) phase += (osc.w * Math.min(now - last, 100)) / 1000; // cap a stalled frame
    last = now;
    drawOsc();
    requestAnimationFrame(tick);
  }
  function play(on) {
    playing = on;
    last = 0;
    set("play", on ? "Pause" : "Play");
    $("play").setAttribute("aria-pressed", String(!on));
    if (on) requestAnimationFrame(tick);
  }
  $("play").addEventListener("click", () => play(!playing));

  // ---------- Fig. 5.1-2: damped response after release from x0 ----------
  const OX = 180, OY = 110, PW = 320, PH = 80, TMAX = 4, N = 400; // plot origin and size; x/x0 = 1 is PH units

  // Free response from x0 = 1 at rest, for natural frequency wn and damping ratio z.
  function response(wn, z) {
    if (Math.abs(z - 1) < 1e-6) return (t) => Math.exp(-wn * t) * (1 + wn * t);
    if (z < 1) {
      const wd = wn * Math.sqrt(1 - z * z), s = z / Math.sqrt(1 - z * z);
      return (t) => Math.exp(-z * wn * t) * (Math.cos(wd * t) + s * Math.sin(wd * t));
    }
    const q = Math.sqrt(z * z - 1), r1 = -wn * (z - q), r2 = -wn * (z + q);
    return (t) => (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
  }
  const X = (t) => OX + (PW * t) / TMAX, Y = (x) => OY - PH * x;
  const curve = (f) => path(Array.from({ length: N + 1 }, (_, i) => (TMAX * i) / N).map((t) => [X(t), Y(f(t))]));

  NB.demo(function (v) {
    // Part 1
    const wn1 = Math.sqrt(v.k / v.m), f1 = wn1 / (2 * Math.PI), T1 = 1 / f1, vmax = (v.A / 1000) * wn1;
    osc = { A: v.A, w: wn1 };
    if (!playing) drawOsc();
    attr("amp", { d: path([[XP, YR - v.A], [XE, YR - v.A]]) + " " + path([[XP, YR + v.A], [XE, YR + v.A]]) });
    attr("amp-label", { y: (YR - v.A - 5).toFixed(1) });
    set("amp-label", "A = " + v.A + " mm");
    const pw = T1 * PXS, py = YR + v.A + 16;
    attr("period", { d: pw <= XE - XP ? path([[XP, py - 4], [XP, py + 4]]) + " " + path([[XP, py], [XP + pw, py]]) + " " + path([[XP + pw, py - 4], [XP + pw, py + 4]]) : "" });
    attr("period-label", { x: (pw <= XE - XP ? XP + pw + 6 : XP).toFixed(1), y: (py + 4).toFixed(1) });
    set("period-label", "T = " + fmt(T1) + " s" + (pw > XE - XP ? ", longer than the trace" : ""));

    set("out-wn", fmt(wn1) + " rad/s");
    set("out-T", fmt(T1) + " s");
    set("out-v", fmt(vmax) + " m/s");
    set("out-f", fmt(f1) + " Hz");
    set("readout", "The mass completes " + fmt(f1) + " cycles a second. Four times the mass halves the frequency; four times the stiffness doubles it.");

    set("g-m", fmt(v.m) + " kg");
    set("g-k", fmt(v.k) + " N/m");
    set("g-A", v.A + " mm");
    set("w-wn", "√(" + fmt(v.k) + nb + "N/m / " + fmt(v.m) + nb + "kg) = " + fmt(wn1) + nb + "rad/s");
    set("w-f", fmt(wn1) + nb + "rad/s / 2π = " + fmt(f1) + nb + "Hz");
    set("w-T", "1 / " + fmt(f1) + nb + "Hz = " + fmt(T1) + nb + "s");
    set("w-v", fmt(v.A / 1000) + nb + "m × " + fmt(wn1) + nb + "rad/s = " + fmt(vmax) + nb + "m/s");
    set("w-ans", fmt(f1) + " Hz");
    set("w-note", "One cycle takes " + fmt(T1) + " s, and the mass passes the rest line at " + fmt(vmax) + " m/s.");

    // Part 2
    const wn = Math.sqrt(v.k2 / v.m2), cc = 2 * Math.sqrt(v.k2 * v.m2), z = v.c / cc, near = Math.abs(z - 1) < 0.02;
    const kind = near ? "critically damped" : z < 1 ? "underdamped" : "overdamped";
    const wd = z < 1 ? wn * Math.sqrt(1 - z * z) : 0;
    attr("x-curve", { d: curve(response(wn, z)) });
    attr("x-crit", { d: near ? "" : curve(response(wn, 1)) });
    attr("x-env", { d: z < 1 && z > 0 ? curve((t) => Math.exp(-z * wn * t)) + " " + curve((t) => -Math.exp(-z * wn * t)) : "" });
    set("kind-label", kind.toUpperCase() + ", ζ = " + fmt(z));

    set("out-cc", fmt(cc) + " N·s/m");
    set("out-wd", z < 1 ? fmt(wd) + " rad/s" : "none");
    set("out-kind", kind);
    set("out-z", fmt(z));
    set("readout2", near
      ? "Critically damped: the fastest return to rest without overshooting."
      : z < 1
        ? "Underdamped: it overshoots and rings at " + fmt(wd) + " rad/s" + (z > 0 ? ", settling within 2% in about " + fmt(4 / (z * wn)) + " s." : ", never settling: there is no damping.")
        : "Overdamped: no overshoot, but it creeps back more slowly than at critical damping.");

    set("g-m2", fmt(v.m2) + " kg");
    set("g-k2", fmt(v.k2) + " N/m");
    set("g-c", fmt(v.c) + " N·s/m");
    set("w-cc", "2√(" + fmt(v.k2) + nb + "N/m × " + fmt(v.m2) + nb + "kg) = " + fmt(cc) + nb + "N·s/m");
    set("w-z", fmt(v.c) + " / " + fmt(cc) + " = " + fmt(z));
    set("w-wn2", "√(" + fmt(v.k2) + nb + "N/m / " + fmt(v.m2) + nb + "kg) = " + fmt(wn) + nb + "rad/s");
    set("w-wd", z < 1 ? fmt(wn) + nb + "rad/s × √(1 − " + fmt(z) + "²) = " + fmt(wd) + nb + "rad/s" : "none: ζ ≥ 1, so it does not oscillate");
    set("w-ans2", fmt(z));
    set("w-note2", near
      ? "ζ is 1, so it is critically damped."
      : z < 1
        ? "ζ is below 1, so it is underdamped and oscillates as it decays."
        : "ζ is above 1, so it is overdamped and returns without oscillating.");
  });

  $("play").hidden = false; // shown only when the script can run the animation
  play(playing);
})();
