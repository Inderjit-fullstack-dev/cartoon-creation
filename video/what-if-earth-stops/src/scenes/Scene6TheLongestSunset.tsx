import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SceneSpec } from "../story";
import { Pip } from "../components/Pip";
import { Birds } from "../components/Sky";

/**
 * S6 — "The Longest Sunset" (305 frames)
 * Pip (rear view) sits on the cliff edge, back to camera. The sun sinks to
 * 87% and holds — it never finishes setting. Gradient stripe sky slowly
 * deepens. Music carries the final ~1.5 s after the narration ends.
 */

export const Scene6TheLongestSunset: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const D = scene.durationInFrames;

  // sky deepens over the scene
  const deepen = frame / D;

  // sun sinks from full -> 87% then holds (never finishes)
  const sink = interpolate(frame, [10, D * 0.62], [0, 0.87], { extrapolateRight: "clamp" });
  const rayPulse = 0.85 + 0.15 * Math.sin(frame * 0.055);
  const pipBreath = Math.sin(frame * 0.07) * 5;

  const horizonY = 1150;

  return (
    <AbsoluteFill style={{ background: "#0d0618" }}>
      {/* stripe gradient sky — colors deepen with `deepen` */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          bottom: `${100 - (horizonY / 1920) * 100}%`,
          background: `linear-gradient(180deg,
            rgba(${24 - deepen * 10}, ${12 - deepen * 5}, ${52 - deepen * 16}, 1) 0%,
            rgba(${70 - deepen * 24}, ${26 - deepen * 10}, ${86 - deepen * 26}, 1) 34%,
            rgba(${158 - deepen * 40}, ${56 - deepen * 20}, ${102 - deepen * 22}, 1) 58%,
            rgba(${238 - deepen * 34}, ${126 - deepen * 34}, ${92 - deepen * 18}, 1) 80%,
            rgba(255, ${186 - deepen * 30}, ${112 - deepen * 28}, 1) 100%)`,
        }}
      />
      {/* sea-less haze below horizon */}
      <div style={{ position: "absolute", left: 0, right: 0, top: horizonY, bottom: 0, background: "linear-gradient(180deg, rgba(255,166,92,0.0) 0%, rgba(40,20,50,0.0) 100%)" }} />

      {/* sun first, then horizon covers its lower half — sunk to 87% but never gone */}
      <div
        style={{
          position: "absolute",
          top: horizonY - 178 + sink * 120,
          left: 410,
          opacity: rayPulse,
        }}
      >
        <svg width={260} height={260} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
          <circle cx="100" cy="100" r="130" fill="rgba(255,208,120,0.2)" />
          <circle cx="100" cy="100" r="96" fill="rgba(255,214,140,0.38)" />
          <circle cx="100" cy="100" r="62" fill="#fff2c2" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2 + 0.3 + frame * 0.008;
            const x1 = 100 + Math.cos(a) * 70;
            const y1 = 100 + Math.sin(a) * 70;
            const x2 = 100 + Math.cos(a) * 90;
            const y2 = 100 + Math.sin(a) * 90;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffc97b" strokeWidth="6" strokeLinecap="round" opacity="0.85" />;
          })}
        </svg>
      </div>

      {/* sunlit haze gilding the horizon, then the land below it */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: horizonY,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(255,140,80,0.42) 0%, rgba(190,90,110,0.25) 30%, rgba(122,52,92,0.12) 60%, rgba(23,16,43,0) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 0, right: 0, top: horizonY, bottom: 0, background: "linear-gradient(180deg, rgba(74,32,74,0.35) 0%, #170f2b 55%)" }} />

      {/* birds coasting up-right */}
      <Birds count={2} />

      {/* Pip after the cliff stack so his dangling legs draw over the cliff face */}
      <div
        style={{
          position: "absolute",
          bottom: 150 + pipBreath,
          left: 400,
          transform: `scale(1.18)`,
          transformOrigin: "bottom center",
        }}
      >
        <Pip pose="rear" window={0.2} />
      </div>
      {/* cliff edge */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 260, background: "linear-gradient(180deg, #241233, #120a20)" }} />
      <div style={{ position: "absolute", left: -30, right: -30, bottom: 200, height: 34, borderRadius: 99, background: "#2c1740" }} />

      {/* gentle closing vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(120% 90% at 50% 42%, rgba(0,0,0,0) 55%, rgba(4,2,10,0.5) 100%)",
        }}
      />
      {/* final fade to black over the last 30 frames (music tail) */}
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: interpolate(frame, [D - 32, D], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }} />
    </AbsoluteFill>
  );
};
