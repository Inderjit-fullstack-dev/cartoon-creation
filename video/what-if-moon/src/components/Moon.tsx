import React from "react";
import { C } from "../theme";

const CRATERS = [
  [0.32, 0.3, 0.16], [0.66, 0.26, 0.1], [0.55, 0.55, 0.2], [0.25, 0.65, 0.12],
  [0.78, 0.62, 0.11], [0.45, 0.82, 0.09], [0.7, 0.82, 0.07], [0.16, 0.42, 0.07],
];

export const Moon: React.FC<{
  size: number; x: number; y: number; rotate?: number; glow?: number; basin?: boolean; style?: React.CSSProperties;
}> = ({ size, x, y, rotate = 0, glow = 0, basin = false, style }) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, transform: `rotate(${rotate}deg)`, ...style }}>
    <div style={{
      width: "100%", height: "100%", borderRadius: "50%",
      background: `radial-gradient(circle at 32% 28%, #FFFDF4 0%, ${C.moon} 35%, ${C.crater} 70%, ${C.moonShade} 100%)`,
      boxShadow: `0 0 ${size * 0.12}px ${size * 0.02}px rgba(200,210,255,0.25), 0 0 ${size * glow}px ${C.orange}`,
      position: "relative", overflow: "hidden",
    }}>
      {CRATERS.map(([cx, cy, cr], i) => (
        <div key={i} style={{
          position: "absolute", left: `${(cx - cr) * 100}%`, top: `${(cy - cr) * 100}%`, width: `${cr * 200}%`, height: `${cr * 200}%`,
          borderRadius: "50%", background: `radial-gradient(circle at 60% 65%, ${C.crater} 0%, ${C.moonShade} 100%)`,
          boxShadow: "inset 4px 5px 8px rgba(0,0,0,0.35), 2px 2px 2px rgba(255,255,255,0.4)",
        }} />
      ))}
      {basin && (
        <div style={{
          position: "absolute", left: "18%", top: "52%", width: "56%", height: "44%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(70,90,160,0.55) 0%, rgba(70,90,160,0.25) 100%)",
        }} />
      )}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 70% 75%, rgba(10,12,40,0.55) 0%, rgba(10,12,40,0) 60%)" }} />
    </div>
  </div>
);
