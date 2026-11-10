import React from "react";
import { useCurrentFrame } from "remotion";
import type { SceneSpec } from "../story";

/**
 * Ambient rising-bubble field. Deterministic per random seed so renders
 * are reproducible.
 */
export const Bubbles: React.FC<{ count?: number }> = ({ count = 22 }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        // Cheap deterministic pseudo-random per bubble
        const seed = i * 137.5;
        const left = ((Math.sin(seed) + 1) / 2) * 100;
        const size = 6 + (((Math.sin(seed * 3.7) + 1) / 2) * 26);
        const speed = 0.55 + (((Math.sin(seed * 1.3) + 1) / 2) * 1.1);
        const wobbleAmount = 12 + (((Math.sin(seed * 2.1) + 1) / 2) * 22);
        const travel = 700 + size * 6;
        const y = 1080 + 80 - ((speed * frame + seed * 29) % travel);
        const x = (left / 100) * 1920 + Math.sin(frame * 0.045 + seed) * wobbleAmount;
        const phase = (((speed * frame + seed * 29) % travel) / travel);
        const opacity = phase < 0.08 ? phase / 0.08 : phase > 0.9 ? (1 - phase) / 0.1 : 1;

        return (
          <svg
            key={i}
            style={{
              position: "absolute",
              left: x - size,
              top: y,
              opacity: opacity * 0.55,
            }}
            width={size * 2}
            height={size * 2}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" fill="none" stroke="#bfeaff" strokeWidth="8" />
            <circle cx="36" cy="34" r="10" fill="#ffffff" opacity="0.6" />
          </svg>
        );
      })}
    </>
  );
};

/** Simple looping flat-cartoon fish, swims left-to-right (or reverse). */
export const Fish: React.FC<{
  y: number;
  size: number;
  color: string;
  speed?: number;
  offset?: number;
  reverse?: boolean;
  delay?: number;
}> = ({ y, size, color, speed = 2.6, offset = 0, reverse = false, delay = 0 }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const range = 1920 + size * 4;
  const progress = ((f * speed) % (range + 300));
  const x = reverse ? 1920 + size * 2 - progress : progress - size * 2;
  const tail = Math.sin((f + offset) * 0.25) * 10;

  return (
    <svg
      width={size * 2.2}
      height={size * 1.3}
      viewBox="0 0 220 130"
      style={{ position: "absolute", top: y, left: x }}
    >
      <g>
        {/* tail */}
        <polygon
          points={reverse ? "178,65 225,35 225,95" : "42,65 -5,35 -5,95"}
          fill={color}
          opacity="0.8"
          style={{ transform: `rotate(${tail}deg)`, transformOrigin: reverse ? "180px 65px" : "40px 65px" }}
        />
        {/* body */}
        <ellipse cx="110" cy="65" rx="85" ry="38" fill={color} />
        {/* fin */}
        <ellipse cx="110" cy="82" rx="34" ry="12" fill={color} opacity="0.75" />
        {/* eye */}
        <circle cx={reverse ? 58 : 162} cy="52" r="12" fill="#f4fbff" />
        <circle cx={reverse ? 55 : 165} cy="52" r="5.5" fill="#0c2438" />
      </g>
    </svg>
  );
};

/** Word-by-word animated narration captions (block layout, centered lines). */
export const Captions: React.FC<{ scene: SceneSpec; startFrom?: number; bottom?: number }> = ({
  scene,
  startFrom = 20,
  bottom = 120,
}) => {
  const frame = useCurrentFrame();
  const words = scene.narration.split(" ");
  // Total caption span = scene length - small tail margin
  const span = Math.max(1, scene.durationInFrames - startFrom - 5);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        padding: "0 160px",
        textAlign: "center",
        fontFamily: "Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: 700,
        fontSize: 46,
        lineHeight: 1.35,
        textShadow: "0 3px 18px rgba(0,0,0,0.55)",
      }}
    >
      {words.map((w, i) => {
        const t = (i / words.length) * span;
        const life = Math.min(Math.max(frame - startFrom - t, 0), 1);
        const fade = life < 0.9 ? life / 0.9 : 1;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: 14,
              opacity: fade,
              transform: `translateY(${(1 - fade) * 14}px)`,
              color: "#f2fbff",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Scene id chip + narration label, top-left, for studio diagnostics. */
export const SceneBadge: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 56,
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: 2,
        color: scene.accent,
        opacity: 0.85,
      }}
    >
      <span
        style={{
          border: `3px solid ${scene.accent}`,
          borderRadius: 999,
          padding: "8px 22px",
        }}
      >
        {scene.id}
      </span>
      <span style={{ color: "#ffffff", opacity: 0.75 }}>{scene.title.toUpperCase()}</span>
    </div>
  );
};
