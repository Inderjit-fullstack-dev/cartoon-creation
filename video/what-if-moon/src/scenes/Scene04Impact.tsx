import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Label } from "../components/Label";
import { Debris, Flash, Shockwave } from "../components/Effects";
import { IMPACT_X, SURFACE_Y } from "./surface";
import type { SceneTiming } from "../timing";

export const Scene04Impact: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const flash = interpolate(f, [0, 3, 22], [1, 1, 0], { extrapolateRight: "clamp" });
  const wave = interpolate(f, [0, 70], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const crater = interpolate(f, [0, 60], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const shake = f < 14 ? Math.sin(f * 7) * (14 - f) * 1.4 : 0;
  return (
    <SceneFrame t={t} seed={4} push={0.08} fadeIn={1} sfx={[{ file: "impact", at: 0, volume: 0.65 }]}>
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px)` }}>
        <Moon size={2600} x={540} y={SURFACE_Y + 1300} />
        <div style={{
          position: "absolute", left: IMPACT_X - 260 * crater, top: SURFACE_Y - 40 * crater, width: 520 * crater, height: 110 * crater, borderRadius: "50%",
          background: "radial-gradient(ellipse, #2A1A12 0%, #5B3A22 60%, rgba(255,155,61,0.9) 100%)", boxShadow: `0 0 ${120 * crater}px #FF9B3D`,
        }} />
        <Shockwave x={IMPACT_X} y={SURFACE_Y + 20} progress={wave} max={1500} />
        <Debris x={IMPACT_X} y={SURFACE_Y} t={f / 40} count={30} seed={5} gravity={1400} />
      </div>
      <Label text="10+ KM CRATER" y={640} size={88} delay={40} color="#FF9B3D" sub="the rock melts and vaporizes" />
      <Flash opacity={flash} />
    </SceneFrame>
  );
};
