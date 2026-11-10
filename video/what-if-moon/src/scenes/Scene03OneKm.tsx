import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Asteroid } from "../components/Asteroid";
import { Label } from "../components/Label";
import { SpeedLines } from "../components/Effects";
import { SURFACE_Y } from "./surface";
import type { SceneTiming } from "../timing";

export const Scene03OneKm: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const fall = Easing.in(Easing.cubic)(interpolate(f, [60, t.durationFrames - 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const y = interpolate(fall, [0, 1], [520, SURFACE_Y - 90]);
  const labelOpacity = interpolate(f, [60, 80], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneFrame t={t} seed={3} push={0.02} sfx={[{ file: "riser", at: 40, volume: 0.5 }]}>
      <Moon size={2600} x={540} y={SURFACE_Y + 1300} />
      <SpeedLines opacity={fall * 0.9} frame={f} />
      <Asteroid size={interpolateSize(fall)} x={540} y={y} rotate={f * 3} hot={0.4 + fall * 0.4} trail={120 + fall * 500} />
      <div style={{ opacity: labelOpacity }}>
        <Label text="1 KM WIDE" y={800} size={96} delay={10} color="#FFD84D" sub="about 10 football fields" />
      </div>
    </SceneFrame>
  );
};

const interpolateSize = (k: number) => 360 - 100 * k;
