import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Earth } from "../components/Earth";
import { Asteroid } from "../components/Asteroid";
import { Label } from "../components/Label";
import type { SceneTiming } from "../timing";

export const Scene02NoShield: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  // small rock burning up in Earth's atmosphere
  const r = interpolate(f, [20, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rockSize = interpolate(r, [0, 0.45, 1], [60, 60, 0]);
  const rockX = interpolate(r, [0, 1], [220, 450]);
  const rockY = interpolate(r, [0, 1], [90, 330]);
  // big asteroid crossing to the Moon, no glow
  const a = interpolate(f, [130, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ax = interpolate(a, [0, 1], [980, 640]);
  const ay = interpolate(a, [0, 1], [640, 960]);
  return (
    <SceneFrame t={t} seed={2} sfx={[{ file: "whoosh", at: 130, volume: 0.5 }]}>
      <Earth size={420} x={540} y={420} atmosphere={5} />
      {rockSize > 1 && <Asteroid size={rockSize} x={rockX} y={rockY} angle={40} hot={1} trail={rockSize * 3.5} rotate={f * 6} />}
      <Label text="EARTH: BURNS UP" y={760} size={64} delay={30} color="#7FC3FF" />
      <Moon size={440} x={540} y={1090} />
      <Asteroid size={150} x={ax} y={ay} angle={50} hot={0} rotate={f * 2} trail={a > 0 ? 260 : 0} />
      <Label text="MOON: NOTHING" y={1350} size={64} delay={150} color="#FFD84D" />
    </SceneFrame>
  );
};
