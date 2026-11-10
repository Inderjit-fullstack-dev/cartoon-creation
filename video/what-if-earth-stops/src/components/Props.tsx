import React from "react";

/** World props shared across scenes; each draws in its own SVG box (overflow visible). */

export const Tree: React.FC<{ bend?: number; size?: number; tone?: string }> = ({
  bend = 0,
  size = 150,
  tone = "#3f8f4f",
}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" style={{ overflow: "visible" }}>
    <g transform={`rotate(${bend} 50 118)`}>
      <path d="M 46 118 L 50 70 L 54 118 Z" fill="#8a5a33" />
      <ellipse cx="50" cy="48" rx="34" ry="30" fill={tone} />
      <ellipse cx="34" cy="58" rx="22" ry="18" fill="#4da05e" />
      <ellipse cx="66" cy="56" rx="20" ry="16" fill="#4da05e" />
    </g>
  </svg>
);

export const Lamppost: React.FC<{ bend?: number; size?: number }> = ({ bend = 0, size = 220 }) => (
  <svg width={size} height={size * 1.35} viewBox="0 0 100 135" style={{ overflow: "visible" }}>
    <g transform={`rotate(${bend} 50 120)`}>
      <rect x="44" y="10" width="12" height="112" rx="5" fill="#41576b" />
      <ellipse cx="50" cy="124" rx="16" ry="6" fill="#33455a" />
      <circle cx="50" cy="8" r="11" fill="#ffd54f" />
    </g>
  </svg>
);

export const Car: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <svg width={size} height={size * 0.55} viewBox="0 0 220 120" style={{ overflow: "visible" }}>
    <rect x="18" y="42" width="184" height="44" rx="18" fill="#e2564a" />
    <path d="M 70 44 Q 92 12 138 18 L 160 42 Z" fill="#e2564a" />
    <path d="M 84 42 Q 100 20 126 24 L 140 42 Z" fill="#bfe4f2" />
    <circle cx="62" cy="90" r="16" fill="#2c3a46" />
    <circle cx="62" cy="90" r="7" fill="#93a4b3" />
    <circle cx="160" cy="90" r="16" fill="#2c3a46" />
    <circle cx="160" cy="90" r="7" fill="#93a4b3" />
  </svg>
);

export const Cow: React.FC<{ size?: number; running?: number }> = ({ size = 170, running = 0 }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 160 120" style={{ overflow: "visible" }}>
    <g transform={`rotate(${running * -8} 80 60)`}>
      <ellipse cx="80" cy="58" rx="52" ry="30" fill="#f5f2ea" />
      <ellipse cx="62" cy="50" rx="16" ry="12" fill="#37332e" />
      <ellipse cx="102" cy="66" rx="10" ry="8" fill="#37332e" />
      <circle cx="122" cy="44" r="17" fill="#f5f2ea" />
      <circle cx="126" cy="40" r="2.6" fill="#26323c" />
      <ellipse cx="132" cy="50" rx="7" ry="5" fill="#f4b7ad" />
      <g stroke="#f5f2ea" strokeWidth="8" strokeLinecap="round">
        <line x1="56" y1="84" x2={52 - running * 7} y2={104 - Math.sin(running * 9) * 5} />
        <line x1="74" y1="86" x2={74 + running * 7} y2={106 + Math.sin(running * 9) * 5} />
        <line x1="96" y1="86" x2={100 - running * 7} y2={104 - Math.sin(running * 9) * 5} />
        {/* tail */}
        <line x1="132" y1="60" x2="144" y2={80 + Math.sin(running * 9) * 6} />
      </g>
    </g>
  </svg>
);

export const LaundryLine: React.FC<{ sway?: number; size?: number }> = ({ sway = 0, size = 260 }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 260 104" style={{ overflow: "visible" }}>
    <path d={`M 8 22 Q 130 ${44 + sway * 8} 252 22`} stroke="#59708a" strokeWidth="5" fill="none" />
    <g transform={`rotate(${sway * 14} 70 30)`}>
      <rect x="52" y="30" width="38" height="46" rx="6" fill="#7ea2d8" />
    </g>
    <g transform={`rotate(${-sway * 18} 130 34)`}>
      <rect x="112" y="34" width="34" height="40" rx="6" fill="#f0b64f" />
    </g>
    <g transform={`rotate(${sway * 12} 190 28)`}>
      <path d={`M 172 28 q 18 ${18 + sway * 6} 38 0 l -4 38 q -16 8 -30 0 Z`} fill="#e8788a" />
    </g>
  </svg>
);

export type DebrisKind = "pan" | "umbrella" | "board";

export const DebrisItem: React.FC<{ kind: DebrisKind; spin?: number; size?: number }> = ({
  kind,
  spin = 0,
  size = 140,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible", transform: `rotate(${spin}deg)` }}>
    {kind === "pan" && (
      <g>
        <circle cx="50" cy="50" r="30" fill="#55606c" />
        <circle cx="50" cy="50" r="24" fill="#2f3943" />
        <rect x="76" y="42" width="20" height="14" rx="6" fill="#55606c" transform="rotate(-18 86 50)" />
      </g>
    )}
    {kind === "umbrella" && (
      <g>
        <path d="M 12 66 Q 50 22 88 66 Q 68 58 50 66 Q 32 58 12 66 Z" fill="#e94f6d" />
        <line x1="50" y1="64" x2="42" y2="92" stroke="#3c4753" strokeWidth="5" />
      </g>
    )}
    {kind === "board" && (
      <g>
        <rect x="8" y="42" width="84" height="14" rx="4" fill="#c98d55" />
        <circle cx="24" cy="49" r="3" fill="#8a5a33" />
        <circle cx="74" cy="49" r="3" fill="#8a5a33" />
      </g>
    )}
  </svg>
);

export const Boat: React.FC<{ tilt?: number; size?: number }> = ({ tilt = 0, size = 180 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 170 120" style={{ overflow: "visible" }}>
    <g transform={`rotate(${tilt} 85 70)`}>
      <path d="M 24 66 Q 85 84 146 66 L 132 92 Q 85 104 38 92 Z" fill="#b8723f" />
      <line x1="85" y1="66" x2="85" y2="18" stroke="#8a5a33" strokeWidth="6" />
      <path d="M 88 24 Q 128 40 96 62 Z" fill="#f3ecd9" />
    </g>
  </svg>
);

export const Lighthouse: React.FC<{ sink?: number; size?: number }> = ({ sink = 0, size = 190 }) => (
  <svg width={size} height={size * 1.55} viewBox="0 0 120 186" style={{ overflow: "visible" }}>
    <g transform={`translate(0 ${sink})`}>
      <path d="M 38 176 L 46 40 L 74 40 L 82 176 Z" fill="#f2ede2" />
      <path d="M 40 138 L 80 138 L 79 156 L 41 156 Z" fill="#e2564a" />
      <path d="M 42 96 L 78 96 L 77 114 L 43 114 Z" fill="#e2564a" />
      <rect x="48" y="18" width="24" height="24" rx="3" fill="#41576b" />
      <circle cx="60" cy="30" r="7" fill="#ffd54f" />
      <path d="M 44 18 L 76 18 L 60 8 Z" fill="#e2564a" />
    </g>
  </svg>
);

export const Bird: React.FC<{ size?: number; flap?: number }> = ({ size = 70, flap = 0 }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 100 50" style={{ overflow: "visible" }}>
    <g>
      <path d={`M 50 30 Q ${28 - flap * 14} ${4 - flap * 20} 6 22 Q 28 26 50 32 Q 72 26 94 22 Q ${72 - flap * 14} ${4 - flap * 20} 50 30 Z`} fill="#3c4753" />
    </g>
  </svg>
);
