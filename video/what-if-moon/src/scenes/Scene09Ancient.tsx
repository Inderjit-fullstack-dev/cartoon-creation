import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Earth } from "../components/Earth";
import { Label } from "../components/Label";
import { Flash } from "../components/Effects";
import type { SceneTiming } from "../timing";

export const Scene09Ancient: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const phaseA = interpolate(f, [170, 195], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phaseB = interpolate(f, [175, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 1 + 0.04 * Math.sin(f / 6);
  const k = interpolate(f, [195, 270], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const flash = interpolate(f, [268, 272, 300], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SceneFrame t={t} seed={9} sfx={[{ file: "shimmer", at: 0, volume: 0.4 }, { file: "impact", at: 270, volume: 0.35 }]}>
      <div style={{ opacity: phaseA }}>
        <Moon size={800} x={540} y={800} basin />
        <div style={{
          position: "absolute", left: 508 - 240 * pulse, top: 972 - 120 * pulse, width: 480 * pulse, height: 240 * pulse, borderRadius: "50%",
          border: "6px dashed #FFD84D",
        }} />
        <Label text="2,500 KM" y={290} size={130} color="#FFD84D" sub="one ancient impact basin" delay={20} />
      </div>
      <div style={{ opacity: phaseB }}>
        <Earth size={420} x={interpolate(k, [0, 1], [250, 440])} y={interpolate(k, [0, 1], [820, 900])} atmosphere={2} />
        <Moon size={260} x={interpolate(k, [0, 1], [900, 620])} y={interpolate(k, [0, 1], [640, 880])} rotate={f * 3} />
        <Label text="THE MOON'S BIRTH" y={290} size={84} color="#FF9B3D" sub="most likely a giant collision" delay={200} />
      </div>
      <Flash opacity={flash} />
    </SceneFrame>
  );
};
