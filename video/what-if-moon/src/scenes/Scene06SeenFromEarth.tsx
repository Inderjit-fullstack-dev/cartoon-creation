import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Earth } from "../components/Earth";
import { Label } from "../components/Label";
import type { SceneTiming } from "../timing";

export const Scene06SeenFromEarth: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const pulse = Math.max(0, Math.sin((f - 30) / 12)) * (f > 30 ? 1 : 0);
  const fx = 808, fy = 480; // flash on the Moon's limb
  return (
    <SceneFrame t={t} seed={6} sfx={[{ file: "ping", at: 45, volume: 0.5 }, { file: "ping", at: 150, volume: 0.35 }]}>
      <Moon size={700} x={540} y={720} />
      <div style={{
        position: "absolute", left: fx - 70, top: fy - 70, width: 140, height: 140, borderRadius: "50%", opacity: pulse,
        background: "radial-gradient(circle, #fff 0%, rgba(255,240,200,0.9) 25%, rgba(255,200,120,0) 70%)", transform: `scale(${0.6 + pulse})`,
      }} />
      <Earth size={230} x={300} y={1230} />
      <Label text="2013" y={190} size={150} color="#FFD84D" sub="a real flash, seen from Earth" />
    </SceneFrame>
  );
};
