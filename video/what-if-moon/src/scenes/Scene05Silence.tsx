import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Label } from "../components/Label";
import { Debris } from "../components/Effects";
import { IMPACT_X, SURFACE_Y } from "./surface";
import type { SceneTiming } from "../timing";

const MutedSpeaker: React.FC = () => (
  <svg width={220} height={220} viewBox="0 0 100 100" style={{ position: "absolute", left: 430, top: 430 }}>
    <path d="M12 38 H30 L52 18 V82 L30 62 H12 Z" fill="#fff" />
    <path d="M62 36 Q74 50 62 64" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
    <line x1="10" y1="90" x2="90" y2="10" stroke="#FF5D5D" strokeWidth="9" strokeLinecap="round" />
  </svg>
);

export const Scene05Silence: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const glow = interpolate(f, [0, 150], [1, 0.1], { extrapolateRight: "clamp" });
  return (
    <SceneFrame t={t} seed={5} push={0.04}>
      <Moon size={2600} x={540} y={SURFACE_Y + 1300} />
      <div style={{
        position: "absolute", left: IMPACT_X - 260, top: SURFACE_Y - 40, width: 520, height: 110, borderRadius: "50%",
        background: "radial-gradient(ellipse, #2A1A12 0%, #5B3A22 60%, rgba(255,155,61,0.9) 100%)", boxShadow: `0 0 ${120 * glow}px rgba(255,155,61,${glow})`,
      }} />
      {[0, 1, 2].map((w) => (
        <Debris key={w} x={IMPACT_X} y={SURFACE_Y} t={(f - w * 100) / 36} count={18} seed={20 + w} gravity={1400} glow={false} fade={9} />
      ))}
      <MutedSpeaker />
      <Label text="NO AIR = NO SOUND" y={720} size={72} delay={20} />
    </SceneFrame>
  );
};
