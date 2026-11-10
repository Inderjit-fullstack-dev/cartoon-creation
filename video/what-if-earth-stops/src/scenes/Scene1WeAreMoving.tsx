import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SceneSpec } from "../story";
import { Pip } from "../components/Pip";
import { GlobeFace } from "../components/Earth";
import { FieldBackdrop, CloudLayer, SpeedRibbon } from "../components/Sky";

/**
 * S1 — "We Are Moving" (283 frames)
 * Calm, playful: Pip stands in a field while the globe spins hard and
 * decelerates to a crawl in the final half-second (record-stall → S2).
 */
export const Scene1WeAreMoving: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const D = scene.durationInFrames;

  // globe velocity profile: 7 deg/frame, then decays over the last 18 frames
  const stall = frame > D - 18 ? Math.pow((D - frame) / 18, 2) : 1;
  const deg = frame < D - 18 ? frame * 7 : (D - 18) * 7 - (7 * 18) / 2 * Math.pow((frame - (D - 18)) / 18, 2) * 2 - 7 * 18 * ((frame - (D - 18)) / 18);
  const blur = stall; // streaks tied to remaining velocity

  const zoom = interpolate(frame, [0, D], [1.0, 1.09], { extrapolateRight: "clamp" });
  const pipIn = interpolate(frame, [4, 26], [0, 1], { extrapolateRight: "clamp" });
  const globeIn = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });
  const stampIn = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <FieldBackdrop
        skyTop="#5fb6f0"
        skyBottom="#bfe8ff"
        grassTop="#7fd069"
        grassBottom="#4f9d47"
      />
      <CloudLayer count={7} drift={7} yTop={120} spread={560} />
      <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})` }}>
        {/* spinning globe, upper-left-of-center */}
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 140,
            opacity: globeIn,
            transform: `translateY(${(1 - globeIn) * 40}px)`,
          }}
        >
          <div style={{ position: "absolute", top: 40, left: 40 }}>
            <SpeedRibbon spin={deg * 0.28} color="#ffffff" />
          </div>
          <GlobeFace deg={deg} blur={blur} size={520} />
        </div>

        {/* speed stamp (motion graphic, moves with the world) */}
        <div
          style={{
            position: "absolute",
            top: 1000,
            left: -40,
            right: -40,
            textAlign: "center",
            opacity: stampIn,
            transform: `translateY(${(1 - stampIn) * 26}px) rotate(-4deg)`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "18px 44px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.82)",
              color: "#1c4e7c",
              fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
              fontWeight: 900,
              fontSize: 64,
              letterSpacing: 1,
              boxShadow: "0 10px 30px rgba(16,52,84,0.25)",
            }}
          >
            1,670 km/h
          </div>
          <div style={{ marginTop: 12, color: "#2c6d94", fontWeight: 800, fontSize: 34, fontFamily: "Inter, 'Segoe UI', Arial, sans-serif", opacity: 0.85 }}>
            that's you, right now
          </div>
        </div>

        {/* Pip, planted like a passenger */}
        <div
          style={{
            position: "absolute",
            bottom: 90,
            right: 60,
            opacity: pipIn,
            transform: `translateY(${(1 - pipIn) * 40}px)`,
          }}
        >
          <Pip pose="stand" window={0.5} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
