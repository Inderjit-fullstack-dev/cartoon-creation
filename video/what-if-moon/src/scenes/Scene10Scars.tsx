import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Label } from "../components/Label";
import type { SceneTiming } from "../timing";

export const Scene10Scars: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const size = interpolate(f, [0, t.durationFrames], [780, 860]);
  return (
    <SceneFrame t={t} seed={10} push={0.02} sfx={[{ file: "shimmer", at: 0, volume: 0.35 }]}>
      <Moon size={size} x={540} y={720} />
      <Label text="FOLLOW FOR MORE" y={1190} size={84} color="#FFD84D" sub="WHAT IFs" delay={80} />
    </SceneFrame>
  );
};
