import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SceneSpec } from "../story";
import { SplitEarth, TinyPip } from "../components/Earth";
import { Stars, SunDisc, OrbitDash } from "../components/Sky";

/**
 * S5 — "One Day, One Year" (313 frames)
 * The stillest shot: Earth locked facing the sun. Day/night edge creeps
 * clockwise a few degrees/s; tiny Pip waves on the terminator; the orbit
 * dashed arc slowly draws itself.
 */

export const Scene5OneDayOneYear: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const D = scene.durationInFrames;

  const reveal = interpolate(frame, [0, 26], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  // terminator creeps clockwise: full creep across the scene (slow)
  const creep = interpolate(frame, [26, D - 14], [0.12, 0.62], { extrapolateRight: "clamp" });
  // dash arc draws through the scene
  const orbit = interpolate(frame, [40, D - 20], [0.03, 1], { extrapolateRight: "clamp" });
  const sunGlow = 0.9 + 0.1 * Math.sin(frame * 0.06);
  const wave = frame > 90 && frame % 40 < 20 ? 1 : 0.25 + 0.2 * Math.sin(frame * 0.1);

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #07091d 0%, #131a3d 55%, #1d2a55 100%)" }}>
      <Stars count={100} />

      {/* sun on the left */}
      <div style={{ position: "absolute", top: 700, left: -120, transform: `scale(${sunGlow}) rotate(${frame * 0.08}deg)` }}>
        <SunDisc size={430} colorTop="#ffdf8f" />
      </div>

      {/* earth on the right, locked */}
      <div style={{ position: "absolute", top: 470, left: 480, opacity: reveal, transform: `translateY(${(1 - reveal) * 60}px)` }}>
        <SplitEarth creep={creep} size={620} />
      </div>

      {/* tiny Pip standing on the terminator line */}
      <div
        style={{
          position: "absolute",
          top: 500,
          left: 480 + (310 - creep * 200) * 1.116 - 37,
          opacity: reveal,
        }}
      >
        <TinyPip wave={wave} size={74} />
      </div>

      {/* orbit dash behind everything above? draw in front so visible on dark */}
      <div style={{ position: "absolute", top: 1280, left: 0 }}>
        <OrbitDash progress={orbit} />
      </div>

      {/* caption-like stamp (motion graphic, echoes narration only at the turn) */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [140, 190, D - 20, D], [0, 0.95, 0.95, 0.8], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          transform: `translateY(${interpolate(frame, [140, 190], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 22,
            background: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(255,255,255,0.25)",
            color: "#ffd76b",
            fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 2,
          }}
        >
          6 MONTHS DAY · 6 MONTHS NIGHT
        </div>
      </div>
    </AbsoluteFill>
  );
};
