import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Moon } from "../components/Moon";
import { Earth } from "../components/Earth";
import { Label } from "../components/Label";
import type { SceneTiming } from "../timing";

const CX = 540, CY = 860, RX = 400, RY = 150;

export const Scene08Orbit: React.FC<{ t: SceneTiming }> = ({ t }) => {
  const f = useCurrentFrame();
  const a = 0.6 + f * 0.018;
  const x = CX + RX * Math.cos(a);
  const y = CY + RY * Math.sin(a);
  const depth = 0.8 + 0.2 * Math.sin(a); // bigger when in front
  const front = Math.sin(a) > 0;
  const moon = <Moon size={150 * depth} x={x} y={y} />;
  return (
    <SceneFrame t={t} seed={8} push={0.03}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={4} strokeDasharray="14 14" />
      </svg>
      {!front && moon}
      <Earth size={300} x={CX} y={CY} atmosphere={3} />
      {front && moon}
      <Label text="ORBIT & TIDES" y={330} size={86} color="#FFD84D" sub="unchanged" delay={20} />
    </SceneFrame>
  );
};
