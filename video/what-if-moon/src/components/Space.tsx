import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, H, rand, W } from "../theme";

export const Space: React.FC<{ seed?: number; count?: number }> = ({ seed = 7, count = 140 }) => {
  const frame = useCurrentFrame();
  const stars = useMemo(() => {
    const r = rand(seed);
    return Array.from({ length: count }, () => ({
      x: r() * W, y: r() * H, s: 1.5 + r() * 3.5, p: r() * 6.28, sp: 0.04 + r() * 0.08,
    }));
  }, [seed, count]);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, ${C.indigo} 0%, ${C.navy} 70%, #050818 100%)` }}>
      <svg width={W} height={H} style={{ position: "absolute" }}>
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#fff" opacity={0.35 + 0.65 * Math.abs(Math.sin(frame * s.sp + s.p))} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
