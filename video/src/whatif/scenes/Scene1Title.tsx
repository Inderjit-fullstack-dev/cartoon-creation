import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VISUAL_FRAMES, type SceneSpec } from "../story";
import { Bubbles, Captions, SceneBadge } from "../components/Atmosphere";

export const Scene1Title: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame() * (VISUAL_FRAMES / scene.durationInFrames);
  const { fps } = useVideoConfig();

  const q = spring({ frame, fps, config: { damping: 14, mass: 0.7 } });
  const line2 = interpolate(Math.min(frame, 50), [24, 50], [0, 1], {
    easing: Easing.out(Easing.cubic),
  });
  const diverX = interpolate(Math.min(frame, 150), [0, 150], [2070, 1455], {
    easing: Easing.inOut(Easing.cubic),
  });
  const diverBob = Math.sin(frame * 0.06) * 14;
  const glow = spring({ frame: frame - 40, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${scene.bg[0]}, ${scene.bg[1]})` }}>
      {/* light shafts */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(115deg, rgba(180,240,255,0.12) 0%, transparent 30%), linear-gradient(65deg, rgba(180,240,255,0.09) 40%, transparent 75%)",
        }}
      />
      <Bubbles count={26} />

      {/* diver with a question bubble cloud — parks top-right, clear of the headline and captions */}
      <svg
        width={440}
        height={365}
        viewBox="0 0 520 430"
        style={{ position: "absolute", top: 165 + diverBob, left: diverX, opacity: 0.95 }}
      >
        <g fill="none" stroke="#dff4ff" strokeWidth="9" strokeLinecap="round">
          {/* helmet */}
          <circle cx="130" cy="250" r="62" fill="#123a5a" stroke="#9fdcff" strokeWidth="10" />
          <circle cx="130" cy="250" r="26" fill="#79e3ff" opacity="0.35" stroke="none" />
          {/* view slit */}
          <rect x="94" y="236" width="72" height="12" rx="6" fill="#dff4ff" stroke="none" />
          {/* body */}
          <path d="M186 268 Q 300 262 372 300" stroke="#9fdcff" strokeWidth="22" />
          <path d="M196 300 Q 290 306 380 330" stroke="#7fb9d6" strokeWidth="18" />
          {/* flippers */}
          <path d="M370 296 L 468 276" stroke="#9fdcff" strokeWidth="16" />
          <path d="M378 332 L 478 318" stroke="#7fb9d6" strokeWidth="16" />
          {/* bubbles trailing from helmet */}
          <circle cx="180" cy="150" r="16" stroke="#bfeaff" />
          <circle cx="216" cy="110" r="23" stroke="#bfeaff" />
          <circle cx="255" cy="62" r="31" stroke="#bfeaff" />
          {/* giant "?" rising from the mask */}
          <path
            d="M330 140 Q 396 60 446 118 Q 488 168 430 214 Q 418 224 418 244"
            stroke={scene.accent}
            strokeWidth="26"
            opacity={0.9 * glow}
          />
          <circle cx="418" cy="290" r="17" fill={scene.accent} stroke="none" opacity={0.95 * glow} />
        </g>
      </svg>

      {/* headline — explicitly stacked blocks so nothing can collide */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
            fontWeight: 900,
            fontSize: 88,
            letterSpacing: 14,
            color: scene.accent,
            opacity: q,
            transform: `scale(${0.8 + q * 0.2})`,
            textShadow: "0 0 60px rgba(121,227,255,0.5)",
          }}
        >
          WHAT IF…
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 395,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
          fontWeight: 900,
          fontSize: 128,
          color: "#f4fbff",
          opacity: line2,
          transform: `translateY(${(1 - line2) * 40}px)`,
          textShadow: "0 6px 30px rgba(0,0,0,0.6)",
          lineHeight: 1.15,
        }}
      >
        you could breathe
        <br />
        <span style={{ color: scene.accent }}>underwater?</span>
      </div>

      <SceneBadge scene={scene} />
      <Captions scene={scene} startFrom={70} bottom={100} />
    </AbsoluteFill>
  );
};
