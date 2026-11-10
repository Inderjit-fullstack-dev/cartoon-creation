import React from "react";
import { C } from "../theme";

/** Lumpy rock. `trail` draws a glowing tail (px) pointing opposite to travel; `angle` rotates the whole thing (tail included). */
export const Asteroid: React.FC<{ size: number; x: number; y: number; rotate?: number; hot?: number; trail?: number; angle?: number }> = ({
  size, x, y, rotate = 0, hot = 0, trail = 0, angle = 0,
}) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, transform: `rotate(${angle}deg)` }}>
    {trail > 0 && (
      <div style={{
        position: "absolute", left: size * 0.25, top: -trail + size * 0.3, width: size * 0.5, height: trail,
        background: `linear-gradient(to top, rgba(255,155,61,${0.8 * hot + 0.2}), rgba(255,155,61,0))`, filter: "blur(10px)", borderRadius: size,
      }} />
    )}
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: `rotate(${rotate}deg)`, filter: `drop-shadow(0 0 ${size * 0.15 * hot}px ${C.orange})`, overflow: "visible" }}>
      <defs>
        <radialGradient id="rk" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#A47B58" /><stop offset="60%" stopColor={C.rock} /><stop offset="100%" stopColor={C.rockDark} />
        </radialGradient>
      </defs>
      <path d="M50 4 L72 10 L92 30 L96 54 L84 78 L60 94 L34 92 L12 72 L6 46 L18 20 L36 8 Z" fill="url(#rk)" stroke={hot > 0 ? C.orange : C.rockDark} strokeWidth={2 + 3 * hot} strokeLinejoin="round" />
      <circle cx="38" cy="38" r="9" fill={C.rockDark} opacity="0.5" /><circle cx="64" cy="58" r="12" fill={C.rockDark} opacity="0.45" />
      <circle cx="42" cy="72" r="6" fill={C.rockDark} opacity="0.5" /><circle cx="70" cy="30" r="5" fill={C.rockDark} opacity="0.5" />
    </svg>
  </div>
);
