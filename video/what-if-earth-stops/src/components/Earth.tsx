import React from "react";

export const OCEAN = "#59b9e8";
export const OCEAN_DARK = "#3f97c9";
export const LAND = "#7fd069";
export const LAND_DARK = "#5db352";

/** Cute spinning globe with a face that never rotates (character consistency). */
export const GlobeFace: React.FC<{
  /** accumulated rotation degrees after scene-local easing */
  deg: number;
  /** 0..1 motion streak intensity */
  blur?: number;
  size?: number;
  worried?: boolean;
}> = ({ deg, blur = 0, size = 520, worried = false }) => {
  const streaks = [0.25, 0.42, 0.58, 0.74];
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" style={{ overflow: "visible" }}>
      <defs>
        <clipPath id="globeClip">
          <circle cx="200" cy="200" r="176" />
        </clipPath>
      </defs>
      {/* motion streaks behind the globe */}
      {blur > 0.02 &&
        streaks.map((s, i) => (
          <ellipse
            key={i}
            cx="200"
            cy={200 + Math.sin(i * 2.4) * 120}
            rx={176 + 34 * blur}
            ry={12}
            fill="#eaf6ff"
            opacity={blur * 0.5}
          />
        ))}
      <circle cx="200" cy="200" r="176" fill={OCEAN} />
      <g clipPath="url(#globeClip)">
        {/* continents rotating with deg (two copies for wraparound) */}
        {[0, 360].map((wrap) => (
          <g key={wrap} transform={`rotate(${deg + wrap} 200 200)`}>
            <path d="M 120 110 q 46 -20 78 8 q 18 22 -12 40 q -44 12 -70 -8 q -14 -22 4 -40 Z" fill={LAND} transform="rotate(20 200 200) translate(28 0)" />
            <path d="M 250 250 q 50 -8 66 26 q 8 30 -30 40 q -48 4 -62 -26 q -2 -26 26 -40 Z" fill={LAND_DARK} transform="rotate(-30 200 200)" />
            <path d="M 240 90 q 30 -10 44 10 q 6 18 -14 24 q -30 4 -40 -10 q -2 -16 10 -24 Z" fill={LAND} transform="rotate(-55 200 200) translate(-30 26)" />
            {/* latitude shading */}
            <ellipse cx="200" cy="200" rx="176" ry="176" fill="none" stroke={OCEAN_DARK} strokeWidth="10" opacity="0.35" />
          </g>
        ))}
      </g>
      {/* face stays put — the character is "riding" the spin */}
      <circle cx="156" cy="182" r="13" fill="#0e2b3d" />
      <circle cx="248" cy="182" r="13" fill="#0e2b3d" />
      <circle cx="160" cy="176" r="4.5" fill="#ffffff" />
      <circle cx="252" cy="176" r="4.5" fill="#ffffff" />
      <path
        d={worried ? "M 172 246 q 30 -14 60 0" : "M 172 234 q 30 22 60 0"}
        stroke="#0e2b3d"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="196" cy="210" r="7" fill="#f0a86c" opacity="0.85" />
      <circle cx="216" cy="210" r="7" fill="#f0a86c" opacity="0.85" />
      <circle cx="200" cy="200" r="176" fill="none" stroke="#2c6d94" strokeWidth="8" opacity="0.5" />
    </svg>
  );
};

/** The equatorial bulge — relaxes from wide-down-oval to true circle as `progress`->1. */
export const BulgeGlobe: React.FC<{
  progress: number; // 0 => strong bulge, 1 => relaxed sphere
  size?: number;
}> = ({ progress, size = 560 }) => {
  const rx = 1 + 0.16 * (1 - progress);
  const ry = 1 - 0.10 * (1 - progress);
  return (
    <svg width={size} height={size} viewBox="0 0 400 400">
      <ellipse cx="200" cy="200" rx={170 * rx} ry={170 * ry} fill={OCEAN} />
      <ellipse cx="200" cy="200" rx={170 * rx} ry={170 * ry} fill="none" stroke="#2c6d94" strokeWidth="7" opacity="0.5" />
      {/* equator stress ring — fades as the bulge relaxes */}
      <ellipse cx="200" cy="200" rx={170 * rx} ry={26 * ry} fill="none" stroke="#d9f4ff" strokeWidth={6 + 10 * (1 - progress)} opacity={(0.35 + 0.4 * (1 - progress)) * (1 - progress)} />
      {/* droplets migrating outward */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const drift = ((i * 37) % 100) / 100 + progress;
        const px = 200 + Math.cos(a) * (188 + drift * 26);
        const py = 200 + Math.sin(a) * (188 + drift * 26) * ry;
        return <circle key={i} cx={px} cy={py} r={5} fill="#bfeaff" opacity={0.7} />;
      })}
    </svg>
  );
};

/** Half-lit Earth for scene 5: terminator day/night split + city lights. */
export const SplitEarth: React.FC<{
  /** 0..1 = how far the twilight edge has crept (day side shrinking) */
  creep: number;
  size?: number;
}> = ({ creep, size = 560 }) => {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 560 400">
      <defs>
        <clipPath id="splitClip">
          <circle cx="280" cy="200" r="170" />
        </clipPath>
      </defs>
      <circle cx="280" cy="200" r="170" fill={OCEAN} />
      <g clipPath="url(#splitClip)">
        <path d="M 150 120 q 60 -24 100 8 q 20 26 -16 44 q -56 12 -88 -10 q -16 -26 4 -42 Z" fill={LAND} />
        <path d="M 300 260 q 60 -10 80 30 q 8 34 -36 46 q -56 4 -74 -30 q -2 -30 30 -46 Z" fill={LAND_DARK} />
        {/* night blanket: right side, creeping left */}
        <rect x={280 - creep * 200 + 30} y="0" width={560} height="400" fill="#0a1230" opacity="0.92" />
        {/* city lights in the dark side (fade as terminator covers them) */}
        {[[330, 150], [360, 180], [345, 210], [380, 140], [300, 250], [400, 240]].map(
          ([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3.4} fill="#ffd76b" opacity={(cx < 280 - creep * 200 + 30 ? 0.1 : 0.95) * 0.9} />
          ),
        )}
        {/* soft day glow edge */}
        <rect x={280 - creep * 200} y="0" width={26} height="400" fill="#ffe6a8" opacity="0.35" />
      </g>
      <circle cx="280" cy="200" r="170" fill="none" stroke="#2c6d94" strokeWidth="7" opacity="0.5" />
    </svg>
  );
};

/** Tiny Pip waving on the terminator line — scene 5 cameo. */
export const TinyPip: React.FC<{ wave: number; size?: number }> = ({ wave, size = 84 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible" }}>
    <circle cx="50" cy="34" r="17" fill="#f7e7cf" />
    <path d="M 44 16 q 8 -6 11 1" stroke="#6b4a2f" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="44" cy="34" r="2.6" fill="#26323c" />
    <circle cx="57" cy="34" r="2.6" fill="#26323c" />
    <path d="M 34 88 Q 50 62 66 88 Z" fill="#ff8a3d" />
    <line x1="66" y1="88" x2={72 + wave * 6} y2={70 - wave * 10} stroke="#ff8a3d" strokeWidth="7" strokeLinecap="round" />
  </svg>
);
