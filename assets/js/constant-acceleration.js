// Speed–time graph for constant acceleration: live demo for Mechanics §4.1.
(function () {
  const { fmt, set, attr, path, nice, nb } = NB;
  const OX = 60, OY = 200, W = 400, H = 165; // graph origin and plotting size

  NB.demo(function (v) {
    const u = v.u, a = v.a, s = v.s, v2 = u * u + 2 * a * s;
    let vf, t, state = "ok";
    if (v2 < 0) {
      state = "stops"; vf = 0; t = u / -a;
    } else {
      vf = Math.sqrt(v2);
      if (Math.abs(a) > 1e-9) t = (vf - u) / a;
      else if (u > 0) t = s / u;
      else state = "never";
    }

    if (state === "never") {
      ["area", "line"].forEach((id) => attr(id, { d: "" }));
      ["u-label", "v-label", "t-label", "s-label"].forEach((id) => set(id, ""));
    } else {
      const tm = nice(t), vm = nice(Math.max(u, vf));
      const X = (tt) => OX + (W * tt) / tm, Y = (vv) => OY - (H * vv) / vm;
      const p0 = [X(0), Y(u)], p1 = [X(t), Y(vf)];
      attr("area", { d: path([[OX, OY], p0, p1, [p1[0], OY]]) + " Z" });
      attr("line", { d: path([p0, p1]) });
      attr("u-label", { y: (p0[1] + 4).toFixed(1) });
      attr("v-label", { x: p1[0].toFixed(1), y: (p1[1] - 10).toFixed(1), "text-anchor": "end" });
      attr("t-label", { x: p1[0].toFixed(1) });
      attr("s-label", { x: ((OX + p1[0]) / 2).toFixed(1), y: ((OY + (p0[1] + p1[1]) / 2) / 2 + 4).toFixed(1) });
      set("u-label", "u = " + fmt(u));
      set("v-label", "v = " + fmt(vf) + " m/s");
      set("t-label", "t = " + fmt(t) + " s");
      set("s-label", "s = " + fmt(state === "stops" ? (u * u) / (-2 * a) : s) + " m");
    }

    set("out-t", state === "never" ? "—" : fmt(t) + " s");
    set("out-avg", fmt((u + vf) / 2) + " m/s");
    set("out-v", state === "stops" ? "stops first" : state === "never" ? "—" : fmt(vf) + " m/s");
    set("readout", state === "ok"
      ? "The body reaches " + fmt(vf) + " m/s (" + fmt(vf * 3.6) + " km/h) after " + fmt(t) + " s."
      : state === "stops"
        ? "With this deceleration the body stops after " + fmt((u * u) / (-2 * a)) + " m, so it never covers " + fmt(s) + " m."
        : "With no speed and no acceleration, the body never moves.");

    set("g-u", fmt(u) + " m/s");
    set("g-a", fmt(a).replace("-", "−") + " m/s²");
    set("g-s", fmt(s) + " m");
    set("w-sub", "= (" + fmt(u) + nb + "m/s)² + 2 × " + fmt(a).replace("-", "−") + nb + "m/s² × " + fmt(s) + nb + "m = " + fmt(v2, 4).replace("-", "−") + nb + "m²/s²");
    if (state === "stops") {
      set("w-v", "no real value: v² is negative, so the body stops first");
      set("w-t", "u/|a| = " + fmt(t) + nb + "s to come to rest");
      set("w-ans", "0 m/s, after " + fmt((u * u) / (-2 * a)) + " m");
      set("w-note", "The body stops before covering the distance.");
    } else if (state === "never") {
      set("w-v", "0 m/s");
      set("w-t", "no finite time: the body never moves");
      set("w-ans", "0 m/s");
      set("w-note", "With u = 0 and a = 0 the body stays where it is.");
    } else {
      set("w-v", "√" + fmt(v2, 4) + " = " + fmt(vf) + nb + "m/s");
      set("w-t", Math.abs(a) > 1e-9
        ? "(v − u)/a = (" + fmt(vf) + " − " + fmt(u) + ")" + nb + "m/s / " + fmt(a).replace("-", "−") + nb + "m/s² = " + fmt(t) + nb + "s"
        : "s/u = " + fmt(s) + nb + "m / " + fmt(u) + nb + "m/s = " + fmt(t) + nb + "s");
      set("w-ans", fmt(vf) + " m/s");
      set("w-note", "That is " + fmt(vf * 3.6) + " km/h, reached after " + fmt(t) + " s.");
    }
  });
})();
