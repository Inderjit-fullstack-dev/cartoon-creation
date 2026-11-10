import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Asteroid } from "../components/Asteroid";
import { Label } from "../components/Label";
import type { SceneTiming } from "../timing";

export const Scene01Incoming: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const k = Easing.in(Easing.quad)(interpolate(f, [0, 120], [0, 1], { extrapolateRight: "clamp" }));
  const x = interpolate(k, [0, 1], [930, 720]);
  const y = interpolate(k, [0, 1], [330, 520]);
  const size = interpolate(k, [0, 1], [26, 190]);
  return (
    <SceneFrame t={t} seed={1} fadeIn={1} sfx={[{ file: "rumble", at: 0, volume: 0.35 }]}>
      <Moon size={780} x={540} y={900} rotate={f * 0.03} />
      <Asteroid size={size} x={x} y={y} rotate={f * 2} angle={35} hot={0.15} trail={size * 2.5} />
      <Label text="WHAT IF?" y={190} size={130} color="#FFD84D" />
    </SceneFrame>
  );
};
