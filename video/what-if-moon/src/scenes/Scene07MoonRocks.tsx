import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Earth } from "../components/Earth";
import { Asteroid } from "../components/Asteroid";
import { Label } from "../components/Label";
import { Flash } from "../components/Effects";
import type { SceneTiming } from "../timing";

const FROM = { x: 300, y: 420 };
const TO = { x: 700, y: 1000 };

export const Scene07MoonRocks: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const rocks = [0, 1, 2, 3, 4].map((i) => {
    const k = interpolate(f, [15 + i * 14, 140 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
    return { i, k, x: interpolate(k, [0, 1], [FROM.x + i * 25, TO.x - 80 + i * 35]), y: interpolate(k, [0, 1], [FROM.y + 80, TO.y - 160 + i * 14]) };
  });
  const land = interpolate(f, [150, 160, 185], [0, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneFrame t={t} seed={7} sfx={[{ file: "whoosh", at: 15, volume: 0.4 }, { file: "shimmer", at: 150, volume: 0.4 }]}>
      <Moon size={420} x={300} y={400} />
      <Earth size={520} x={700} y={1030} atmosphere={4} />
      {rocks.map((r) => r.k > 0 && r.k < 1 && (
        <Asteroid key={r.i} size={34 + r.i * 6} x={r.x} y={r.y} angle={-30} hot={r.k > 0.7 ? 1 : 0.2} trail={r.k > 0.6 ? 140 : 60} rotate={f * 4} />
      ))}
      <Label text="LUNAR METEORITES" y={120} size={74} color="#FFD84D" sub="pieces of the Moon, found on Earth" />
      <Flash opacity={land} />
    </SceneFrame>
  );
};
