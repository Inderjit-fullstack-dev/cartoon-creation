import React from "react";

/**
 * Pip — the recurring everyman (tangerine hoodie, cream skin, one hair curl).
 * Static SVG in local units (200 x 260). Scenes animate the wrapper <div>.
 * Identical design in every pose/appearance to keep character consistency.
 */

export type PipPose = "stand" | "tumble" | "cling" | "sit" | "rear" | "tiny";

type Vec = [number, number];

// limb endpoint offsets (relative to shoulder / hip), flipped with `flip`
const PRESETS: Record<
  PipPose,
  { arms: [Vec, Vec]; legs: [Vec, Vec]; tilt: number }
> = {
  stand: { arms: [[10, 34], [-10, 34]], legs: [[-2, 44], [2, 44]], tilt: -2 },
  tumble: { arms: [[30, 12], [-26, 20]], legs: [[18, 38], [-14, 42]], tilt: 6 },
  cling: { arms: [[6, -28], [4, -30]], legs: [[8, 40], [-2, 44]], tilt: 4 },
  sit: { arms: [[12, 30], [-12, 30]], legs: [[22, 30], [-22, 32]], tilt: 0 },
  rear: { arms: [[8, 32], [-8, 32]], legs: [[-2, 44], [2, 44]], tilt: -1 },
  tiny: { arms: [[6, 30], [-6, 30]], legs: [[0, 40], [0, 40]], tilt: 0 },
};

export const Pip: React.FC<{
  pose?: PipPose;
  /** 0..1 wind intensity for flapping details */
  window?: number;
  flip?: boolean;
}> = ({ pose = "stand", window = 0, flip = false }) => {
  const cfg = PRESETS[pose];
  const flap = window * 10;
  const HOODIE = "#ff8a3d";
  const HOODIE_DARK = "#e06f1f";
  const SKIN = "#f7e7cf";

  const limb = (origin: [number, number], off: Vec) => {
    const [dx, dy] = flip ? [-off[0], off[1]] : off;
    return `${origin[0]},${origin[1]} ${origin[0] + dx},${origin[1] + dy}`;
  };

  const showFace = pose !== "rear";

  return (
    <svg width={200} height={260} viewBox="0 0 200 260" style={{ overflow: "visible" }}>
      <g transform={`rotate(${flip ? -cfg.tilt : cfg.tilt} 100 190)`}>
        {/* legs (thin, drawn behind body) */}
        <g stroke={HOODIE_DARK} strokeWidth="12" strokeLinecap="round">
          <polyline points={limb([84, 214], cfg.legs[0])} fill="none" />
          <polyline points={limb([116, 214], cfg.legs[1])} fill="none" />
        </g>
        {/* feet */}
        <g stroke="#7c4a1e" strokeWidth="10" strokeLinecap="round">
          <line
            x1={84 + cfg.legs[0][0]}
            y1={214 + cfg.legs[0][1]}
            x2={84 + cfg.legs[0][0] + (flip ? -12 : 12)}
            y2={214 + cfg.legs[0][1] + 2}
          />
          <line
            x1={116 + cfg.legs[1][0]}
            y1={214 + cfg.legs[1][1]}
            x2={116 + cfg.legs[1][0] + (flip ? 12 : -12)}
            y2={214 + cfg.legs[1][1] + 2}
          />
        </g>
        {/* arms behind body ends */}
        <g stroke={HOODIE} strokeWidth="13" strokeLinecap="round">
          <polyline points={limb([64, 148], cfg.arms[0])} fill="none" />
          <polyline points={limb([136, 148], cfg.arms[1])} fill="none" />
        </g>
        {/* mitts */}
        <circle cx={64 + (flip ? -cfg.arms[0][0] : cfg.arms[0][0])} cy={148 + cfg.arms[0][1]} r={9} fill={SKIN} />
        <circle cx={136 + (flip ? -cfg.arms[1][0] : cfg.arms[1][0])} cy={148 + cfg.arms[1][1]} r={9} fill={SKIN} />
        {/* hoodie body */}
        <path
          d="M 60 138 Q 100 112 140 138 Q 150 182 136 220 Q 100 232 64 220 Q 50 182 60 138 Z"
          fill={HOODIE}
        />
        {/* pocket band */}
        <path d={`M 76 194 Q 100 ${202 + window * 3} 124 194`} stroke={HOODIE_DARK} strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* zipper only on rear pose */}
        {pose === "rear" && (
          <line x1="100" y1="150" x2="100" y2="214" stroke={HOODIE_DARK} strokeWidth="5" strokeDasharray="8 7" />
        )}
        {showFace ? (
          <>
            {/* head */}
            <circle cx="100" cy="82" r="44" fill={SKIN} />
            {/* hair curl */}
            <path d="M 94 36 q 17 -11 22 3 q 3 10 -9 9" stroke="#6b4a2f" strokeWidth="7" fill="none" strokeLinecap="round" />
            {/* face */}
            <circle cx="86" cy="84" r="4.5" fill="#26323c" />
            <circle cx="116" cy="84" r="4.5" fill="#26323c" />
            <path d={`M 88 104 q 13 ${7 + window * 4} 26 0`} stroke="#26323c" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <circle cx="76" cy="96" r="5" fill="#f0a86c" opacity="0.5" />
            <circle cx="126" cy="96" r="5" fill="#f0a86c" opacity="0.5" />
            {/* hood collar */}
            <path d="M 68 110 Q 100 122 132 110" stroke={HOODIE_DARK} strokeWidth="9" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* back of head + hood */}
            <circle cx="100" cy="82" r="44" fill={SKIN} />
            <path d="M 100 44 q 20 -8 24 6" stroke="#d9c19c" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path
              d={`M 62 112 Q 100 ${126 + flap} 138 112 Q 100 106 62 112 Z`}
              fill={HOODIE_DARK}
            />
            {/* hood drawn over the head crown */}
            <path d="M 64 112 Q 100 66 136 112" fill={HOODIE} opacity="0.96" />
          </>
        )}
      </g>
    </svg>
  );
};
