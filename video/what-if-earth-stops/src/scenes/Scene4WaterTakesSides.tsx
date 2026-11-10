import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SceneSpec } from "../story";
import { BulgeGlobe } from "../components/Earth";
import { Boat, Lighthouse } from "../components/Props";

/**
 * S4 — "Water Takes Sides" (334 frames)
 * Split diptych: drained equator (left) vs polar rising tide (right).
 * Center: the globe's bulge slowly relaxing. Slow lateral camera drift.
 */

export const Scene4WaterTakesSides: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const D = scene.durationInFrames;

  // slow lateral drift left -> right
  const drift = interpolate(frame, [0, D], [-34, 34], { extrapolateRight: "clamp" });

  // bulge relaxation and water migration both begin once narration sets it up (~frame 30)
  const relax = interpolate(frame, [30, D - 20], [0, 0.96], { extrapolateRight: "clamp" });
  const tide = interpolate(frame, [40, D - 20], [0, 1], { extrapolateRight: "clamp" });

  const mudReveal = interpolate(frame, [20, 70], [0, 1], { extrapolateRight: "clamp" });
  const boatTilt = interpolate(frame, [20, 90], [0, 26], { extrapolateRight: "clamp" });
  const lighthouseSink = interpolate(frame, [40, 200], [0, 46], { extrapolateRight: "clamp" });
  const wipeIn = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #0f3a52 0%, #164e63 55%, #3e8e9e 100%)" }}>
      {/* slow lateral camera drift */}
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${drift}px) scale(1.05)` }}>
      {/* central bulge globe */}
      <div style={{ position: "absolute", top: 330, left: 260, opacity: 0.97 }}>
        <BulgeGlobe progress={relax} size={560} />
      </div>

      {/* LEFT panel: equatorial drain (mud flats) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 950,
          width: 540,
          height: 970,
          background: "linear-gradient(180deg, #7a6a4b 0%, #9c855a 30%, #b8a06c 100%)",
          borderRadius: "0 40px 0 0",
          opacity: wipeIn,
          transform: `translateY(${(1 - mudReveal) * 60}px)`,
        }}
      >
        <div style={{ position: "absolute", top: 60, left: 70, transform: `rotate(${boatTilt}deg)` }}>
          <Boat tilt={boatTilt} size={220} />
        </div>
        <div style={{ position: "absolute", top: 30, left: 90, fontSize: 40, fontWeight: 800, color: "#ffffff", opacity: 0.9, fontFamily: "Inter, 'Segoe UI', Arial, sans-serif" }}>
          EQUATOR
        </div>
        {/* cracked mud lines */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", top: 350 + i * 140, left: 30, right: 60, height: 5, background: "#63512f", borderRadius: 99, opacity: 0.6 * mudReveal }} />
        ))}
        {/* retiring waterline */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 90 * (1 - tide), background: "linear-gradient(180deg, #7fc6df, #5aa7c4)", transition: "height 0.4s", borderRadius: "0 40px 0 0" }} />
      </div>

      {/* RIGHT panel: polar rise */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 950,
          width: 540,
          height: 970,
          background: "linear-gradient(180deg, #bfe7f2 0%, #8fc6dd 40%, #6aa5c0 100%)",
          borderRadius: "40px 0 0 0",
          opacity: wipeIn,
        }}
      >
        <div style={{ position: "absolute", top: 240, left: 150 }}>
          <Lighthouse sink={lighthouseSink} size={180} />
        </div>
        <div style={{ position: "absolute", top: 30, left: 90, fontSize: 40, fontWeight: 800, color: "#0d3f5e", opacity: 0.9, fontFamily: "Inter, 'Segoe UI', Arial, sans-serif" }}>
          POLES
        </div>
        {/* rising tide inside panel: cresting floor height grows */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${tide * 44}%`, background: "linear-gradient(180deg, rgba(43,127,158,0.9), rgba(29,101,128,0.95))", borderRadius: "26px 26px 0 0" }} />
        {/* wave crest */}
        <div style={{ position: "absolute", bottom: `${tide * 44 - 0.6}%`, left: 0, right: 0, height: 12, background: "#e8f7fd", opacity: 0.85, borderRadius: 99 }} />
      </div>

      {/* drifting droplets between panels */}
      {Array.from({ length: 12 }).map((_, i) => {
        const p = ((frame * 0.7 + i * 31) % 260) / 260;
        const y = 1000 + p * 900;
        const x = 520 + Math.sin(i * 2.1 + frame * 0.04) * 30;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 10 + (i % 3) * 5, height: 10 + (i % 3) * 5, borderRadius: 99, background: "#d9f4ff", opacity: (1 - p) * 0.7 * wipeIn * tide }} />;
      })}
      </div>
    </AbsoluteFill>
  );
};
