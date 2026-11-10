import React from "react";
import { useCurrentFrame } from "remotion";

/** Backdrops, celestial bodies and overlay effects. All deterministic per seed. */

const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/** Layered field + sky backdrop (scenes 1-2), vertical 1080x1920. */
export const FieldBackdrop: React.FC<{ skyTop: string; skyBottom: string; grassTop: string; grassBottom: string }> = ({
  skyTop,
  skyBottom,
  grassTop,
  grassBottom,
}) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${skyTop} 0%, ${skyBottom} 62%)` }} />
    <div
      style={{
        position: "absolute",
        left: -40,
        right: -40,
        bottom: 0,
        height: "44%",
        background: `linear-gradient(180deg, ${grassTop}, ${grassBottom})`,
        borderRadius: "50% 50% 0 0 / 12% 12% 0 0",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: -60,
        right: 320,
        bottom: "34%",
        height: 90,
        background: grassTop,
        opacity: 0.55,
        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
      }}
    />
  </>
);

/** Puffy clouds drifting; `drift` px per frame, wind-only world. */
export const CloudLayer: React.FC<{ count?: number; drift?: number; yTop?: number; spread?: number }> = ({
  count = 7,
  drift = 1.4,
  yTop = 180,
  spread = 700,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const base = yTop + rand(i * 3.7) * spread;
        const scale = 0.55 + rand(i * 9.1) * 0.9;
        const span = 1080 + 460;
        const x = ((base * 3 + frame * drift * (0.6 + rand(i * 5.3))) % span) - 230;
        const s = scale * 170;
        return (
          <svg key={i} width={s} height={s * 0.42} viewBox="0 0 200 84" style={{ position: "absolute", top: base, left: x, opacity: 0.92 }}>
            <ellipse cx="70" cy="52" rx="52" ry="26" fill="#ffffff" />
            <ellipse cx="118" cy="42" rx="44" ry="30" fill="#ffffff" />
            <ellipse cx="150" cy="56" rx="36" ry="20" fill="#f2fbff" />
          </svg>
        );
      })}
    </>
  );
};

/** Star field (scene 5). */
export const Stars: React.FC<{ count?: number }> = ({ count = 90 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => {
      const x = rand(i * 1.3) * 1080;
      const y = rand(i * 2.7) * 1000; // mostly upper area
      const r = 1 + rand(i * 5.1) * 2.4;
      const tw = 0.55 + 0.45 * Math.sin(i * 9.7);
      return <div key={i} style={{ position: "absolute", left: x, top: y, width: r * 2, height: r * 2, borderRadius: 99, background: "#e8f1ff", opacity: 0.35 + tw * 0.5 }} />;
    })}
  </>
);

/** Sun with adjustable clipped horizon (0=full, fraction visible). */
export const SunDisc: React.FC<{ size?: number; glide?: number; colorTop?: string }> = ({
  size = 300,
  glide = 0,
  colorTop = "#ffdf8f",
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
    <circle cx="100" cy="100" r="140" fill="rgba(255,214,132,0.13)" />
    <circle cx="100" cy="100" r="96" fill="rgba(255,214,132,0.22)" />
    <circle cx="100" cy="100" r="70" fill={colorTop} />
    <g transform={`rotate(${72 + glide} 100 100)`}>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 100 + Math.cos(a) * 82;
        const y1 = 100 + Math.sin(a) * 82;
        const x2 = 100 + Math.cos(a) * 104;
        const y2 = 100 + Math.sin(a) * 104;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffdf8f" strokeWidth="9" strokeLinecap="round" opacity="0.85" />;
      })}
    </g>
  </svg>
);

/** Dashed orbit arc path — draws itself via dash offset over `progress`. */
export const OrbitDash: React.FC<{ progress: number; width?: number }> = ({ progress, width = 1080 }) => (
  <svg width={width} height={520} viewBox="0 0 1080 520" style={{ position: "absolute", pointerEvents: "none" }}>
    <path
      d="M 40 430 Q 540 -60 1040 430"
      fill="none"
      stroke="#8fa7ff"
      strokeWidth="5"
      strokeDasharray="18 26"
      strokeDashoffset={900 * (1 - progress)}
      opacity={0.55 * Math.min(1, progress * 2)}
    />
  </svg>
);

/** Speed ribbon: dashes orbiting the globe (scene 1). */
export const SpeedRibbon: React.FC<{ spin: number; size?: number; color?: string }> = ({
  spin,
  size = 640,
  color = "#ffffff",
}) => (
  <svg width={size} height={size} viewBox="0 0 400 400" style={{ overflow: "visible" }}>
    <g transform={`rotate(${spin} 200 200)`}>
      <ellipse cx="200" cy="200" rx="196" ry="196" fill="none" stroke={color} strokeWidth="7" strokeDasharray="34 44" opacity="0.75" />
      <ellipse cx="200" cy="200" rx="206" ry="196" fill="none" stroke={color} strokeWidth="3" strokeDasharray="8 60" opacity="0.4" />
    </g>
  </svg>
);

/** Horizontal speed streaks (scene 2/3 foreground). */
export const Streaks: React.FC<{ count?: number; speed: number; color?: string; opacity?: number }> = ({
  count = 14,
  speed,
  color = "#ffffff",
  opacity = 0.8,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const y = 160 + rand(i * 4.1) * 1600;
        const len = 120 + rand(i * 7.7) * 320;
        const span = 1080 + len;
        const x = 1080 - ((frame * speed * (0.5 + rand(i * 2.3))) % span);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: len, height: 6 + rand(i * 3.3) * 8, borderRadius: 99, background: color, opacity: opacity * (0.35 + rand(i * 9.9) * 0.5) }} />
        );
      })}
    </>
  );
};

/** Diagonal rain-hash texture for the storm scene. */
export const RainStreaks: React.FC<{ opacity?: number }> = ({ opacity = 0.22 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => {
        const y = ((i * 53 + frame * 26) % 2100) - 60;
        const x = rand(i * 8.9) * 1180 - 140;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 3,
              height: 90,
              borderRadius: 99,
              background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #dceaff 60%, rgba(255,255,255,0) 100%)",
              transform: "rotate(14deg)",
              opacity,
            }}
          />
        );
      })}
    </>
  );
};

/** Bird silhouettes drifting upward-right (scene 6). */
export const Birds: React.FC<{ count?: number }> = ({ count = 2 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const speed = 0.9 + i * 0.5;
        const x = 200 + ((frame * speed * 3) % 900);
        const y = 700 - i * 150 - Math.sin(frame * 0.03 + i) * 30;
        const flap = Math.sin(frame * 0.2 + i * 2);
        return (
          <svg key={i} width={56 + i * 16} height={40 + i * 8} viewBox="0 0 100 50" style={{ position: "absolute", left: x, top: y, opacity: 0.85 }}>
            <path d={`M 50 28 Q ${28 - flap * 10} ${8 - flap * 12} 8 20 Q 28 26 50 30 Q 72 26 92 20 Q ${72 - flap * 10} ${8 - flap * 12} 50 28 Z`} fill="#2c3540" />
          </svg>
        );
      })}
    </>
  );
};
