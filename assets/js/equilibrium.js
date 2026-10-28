// Weight hung from two cables: live demo for Mechanics §1.2.
(function () {
  const { fmt, set, attr, path, nb } = NB;
  const TOP = 30, MAX_DEPTH = 140;
  const rad = (d) => (d * Math.PI) / 180;

  NB.demo(function (v) {
    const a = rad(v.a), b = rad(v.b), sum = Math.sin(a + b);
    const T1 = (v.W * Math.cos(b)) / sum, T2 = (v.W * Math.cos(a)) / sum, H = T1 * Math.cos(a);

    // Anchor spacing chosen so the knot sits no more than MAX_DEPTH below the ceiling.
    const ta = Math.tan(a), tb = Math.tan(b);
    const span = Math.min(400, (MAX_DEPTH * (ta + tb)) / (ta * tb));
    const A1 = [260 - span / 2, TOP], A2 = [260 + span / 2, TOP];
    const K = [A1[0] + (span * tb) / (ta + tb), TOP + (span * ta * tb) / (ta + tb)];
    attr("cab1", { d: path([A1, K]) });
    attr("cab2", { d: path([A2, K]) });
    attr("knot", { cx: K[0].toFixed(1), cy: K[1].toFixed(1) });
    attr("hang", { x1: K[0].toFixed(1), y1: K[1].toFixed(1), x2: K[0].toFixed(1), y2: (K[1] + 26).toFixed(1) });
    attr("wt", { x: (K[0] - 50).toFixed(1), y: (K[1] + 26).toFixed(1) });
    attr("wt-label", { x: K[0].toFixed(1), y: (K[1] + 48).toFixed(1) });
    set("wt-label", "W = " + fmt(v.W) + " N");

    const arc = (A, sign, ang) => "M" + (A[0] + sign * 30).toFixed(1) + " " + TOP + " A30 30 0 0 " + (sign > 0 ? 1 : 0) + " " +
      (A[0] + sign * 30 * Math.cos(ang)).toFixed(1) + " " + (TOP + 30 * Math.sin(ang)).toFixed(1);
    attr("arc1", { d: arc(A1, 1, a) });
    attr("arc2", { d: arc(A2, -1, b) });
    attr("arc1-label", { x: (A1[0] + 36).toFixed(1), y: TOP + 20 });
    attr("arc2-label", { x: (A2[0] - 36).toFixed(1), y: TOP + 20 });

    attr("t1-label", { x: ((A1[0] + K[0]) / 2 - 8).toFixed(1), y: ((TOP + K[1]) / 2 + 10).toFixed(1) });
    attr("t2-label", { x: ((A2[0] + K[0]) / 2 + 8).toFixed(1), y: ((TOP + K[1]) / 2 + 10).toFixed(1) });
    set("t1-label", "T₁ = " + fmt(T1) + " N");
    set("t2-label", "T₂ = " + fmt(T2) + " N");

    const Tmax = Math.max(T1, T2);
    set("out-T1", fmt(T1) + " N");
    set("out-T2", fmt(T2) + " N");
    set("out-H", fmt(H) + " N");
    set("out-Tmax", fmt(Tmax) + " N");
    let note = T1 > T2 * 1.0005 ? "The left cable, the steeper one, carries more." : T2 > T1 * 1.0005 ? "The right cable, the steeper one, carries more." : "The cables share the load equally.";
    note += " Each anchor is also pulled sideways by " + fmt(H) + " N.";
    if (Tmax > v.W) note += " The larger tension is " + fmt(Tmax / v.W) + " times the weight itself.";
    set("readout", note);

    set("g-W", fmt(v.W) + " N");
    set("g-a", v.a + "°");
    set("g-b", v.b + "°");
    const den = "sin(" + v.a + "° + " + v.b + "°)";
    set("w-T1", "= " + fmt(v.W, 4) + nb + "N × cos " + v.b + "° / " + den + " = " + fmt(T1) + nb + "N");
    set("w-T2", "= " + fmt(v.W, 4) + nb + "N × cos " + v.a + "° / " + den + " = " + fmt(T2) + nb + "N");
    set("w-ans", "T₁ = " + fmt(T1) + " N, T₂ = " + fmt(T2) + " N");
    set("w-note", "Check: T₁ sin θ₁ + T₂ sin θ₂ = " + fmt(T1 * Math.sin(a) + T2 * Math.sin(b)) + " N, the weight.");
  });
})();
