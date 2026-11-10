import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneSpec } from "../story";
import { Pip } from "../components/Pip";
import { GlobeFace } from "../components/Earth";
import { FieldBackdrop, Streaks } from "../components/Sky";
import { Car, Cow, Lamppost, LaundryLine } from "../components/Props";

/**
 * S2 — "The Stop" (278 frames)
 * The hard stop: jolt shake, then everything loose coasts eastward on
 * inertia easing. Pip does one cartoon backflip mid-scene.
 */

// ease used for the inertia slide: fast start, long deceleration
const inertia = (t: number, total: number, max: number) => max * (1 - Math.pow(1 - Math.min(t / total, 1), 2.6));

export const Scene2TheStop: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const D = scene.durationInFrames;

  // violent jolt during the first 5 frames
  const jolt = frame < 5 ? (5 - frame) * 6 : 0;
  const shakeX = Math.sin(frame * 3.7) * jolt;
  const shakeY = Math.cos(frame * 4.3) * jolt;

  // dulle sky over the scene
  const dim = interpolate(frame, [0, 90], [0, 0.32], { extrapolateRight: "clamp" });

  // tumble arc for Pip: spring with a big overshoot, then settles standing
  const flipSpring = spring({ frame, fps, config: { damping: 6, stiffness: 90, mass: 0.9 } });
  const pipX = inertia(frame, D * 0.7, 210);
  const pipY = 1520 + Math.sin(Math.min(frame / 60, 1) * Math.PI) * -300 * (1 - flipSpring * 0.15);
  const pipSpin = frame < 70 ? Math.min(frame / 70, 1) * 360 : 360;

  // debris masses slide east on staggered inertia ramps
  const slideA = inertia(frame, D * 0.75, 340);
  const slideB = inertia(frame, D * 0.85, 520);
  const tilt = interpolate(frame, [0, 40], [0, -4], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ transform: `translate(${shakeX}px, ${shakeY}px) rotate(${tilt * 0.3}deg) scale(1.1)`, transformOrigin: "center" }}>
      <FieldBackdrop skyTop="#6fb1e8" skyBottom="#cfe4f7" grassTop="#71c063" grassBottom="#468a3e" />
      <div style={{ position: "absolute", inset: 0, background: `rgba(30,40,70,${dim})` }} />

      {/* frozen globe, worried */}
      <div style={{ position: "absolute", top: 250, left: 260, opacity: 0.95 }}>
        <GlobeFace deg={0} blur={0} size={480} worried />
      </div>

      {/* skid marks */}
      {[1050, 1180, 1320, 1450].map((y, i) => (
        <svg key={i} width={700} height={40} viewBox="0 0 700 40" style={{ position: "absolute", left: 190 + inertia(frame, D * 0.6, 90 * i), top: y, opacity: interpolate(frame, [6, 30], [0, 0.75], { extrapolateRight: "clamp" }) }}>
          <path d="M 0 20 Q 200 2 400 20 Q 550 34 700 14" stroke="#243846" strokeWidth={9 - i} fill="none" strokeLinecap="round" opacity="0.8" />
        </svg>
      ))}

      {/* streaking foreground */}
      <Streaks count={12} speed={10} color="#ffffff" opacity={0.5} />

      {/* flying props */}
      <div style={{ position: "absolute", top: 990, left: -260 + slideA }}>
        <Car />
      </div>
      <div style={{ position: "absolute", top: 1090, left: -220 + slideB }}>
        <Cow running={Math.min(1, frame / 40)} />
      </div>
      <div style={{ position: "absolute", top: 760, left: 120 + slideA * 0.6 }}>
        <Lamppost bend={interpolate(frame, [0, 60], [0, 22], { extrapolateRight: "clamp" })} size={190} />
      </div>
      <div style={{ position: "absolute", top: 800, left: 190 + slideA * 0.6, width: 260 }}>
        <LaundryLine sway={Math.sin(frame * 0.2)} size={260} />
      </div>

      {/* Pip tumbling east */}
      <div
        style={{
          position: "absolute",
          top: pipY,
          left: 560 + pipX,
          transform: `rotate(${pipSpin}deg)`,
          transformOrigin: "100px 130px",
        }}
      >
        <Pip pose={frame < 70 ? "tumble" : "stand"} window={0.6} />
      </div>

      {/* dust puff settling */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 420,
          background: "radial-gradient(120% 100% at 50% 100%, rgba(214,196,160,0.55) 0%, rgba(214,196,160,0) 70%)",
          opacity: interpolate(frame, [8, 90], [1, 0.15], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
