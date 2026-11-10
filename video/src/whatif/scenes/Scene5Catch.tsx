import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VISUAL_FRAMES, type SceneSpec } from "../story";
import { Captions, SceneBadge } from "../components/Atmosphere";

export const Scene5Catch: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame() * (VISUAL_FRAMES / scene.durationInFrames);
  const { fps } = useVideoConfig();

  // Hazard stripes slide in
  const hazard = spring({ frame, fps, config: { damping: 16 } });
  const schoolFlee = spring({ frame: frame - 60, fps, config: { damping: 14 } });
  const puddlePulse = 0.8 + Math.sin(frame * 0.18) * 0.2;

  const stripeBand: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 96,
    opacity: hazard * 0.85,
    backgroundImage:
      "repeating-linear-gradient(45deg, #ffb64d 0px, #ffb64d 34px, #2a1030 34px, #2a1030 68px)",
  };

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${scene.bg[0]}, ${scene.bg[1]})` }}>
      {/* hazard stripe bands along both edges */}
      <div style={{ ...stripeBand, left: 0 }} />
      <div style={{ ...stripeBand, right: 0 }} />

      {/* red alert haze */}
      <AbsoluteFill style={{ background: "radial-gradient(circle at 20% 30%, rgba(255,110,80,0.16), transparent 55%)" }} />

      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", left: 0, top: 0 }}>
        {/* puddle (bottom center-right, clear of captions) */}
        <ellipse cx="1160" cy="905" rx="230" ry="56" fill="#5d2b4a" opacity={0.95 * puddlePulse} />
        <ellipse cx="1160" cy="905" rx="185" ry="40" fill="#834469" opacity={0.7 * puddlePulse} />
        <path
          d={`M ${1040} 905 q 120 ${-40 + Math.sin(frame * 0.2) * 14} 240 0`}
          stroke="#ffb0c8"
          strokeWidth="6"
          fill="none"
          opacity={0.6}
        />
        {/* crossed-out warning sign planted beside it */}
        <g transform="translate(1460 610)">
          <rect x="-9" y="60" width="18" height="240" rx="8" fill="#ffb64d" />
          <circle cx="0" cy="26" r="70" fill="#2a1030" stroke="#ff7043" strokeWidth="12" />
          <ellipse cx="-14" cy="30" rx="22" ry="10" fill="#ff8a65" transform="rotate(-24 -14 30)" />
          <circle cx="16" cy="30" r="9" fill="#ff8a65" />
          <line x1="-56" y1="-32" x2="56" y2="84" stroke="#ff7043" strokeWidth="10" strokeLinecap="round" />
        </g>

        {/* fish school fleeing the human shadow (top-left) */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const t = Math.max(0, Math.min(1, (frame - 64 - i * 5) / 50));
          return (
            <g key={i} opacity={schoolFlee}>
              <ellipse
                cx={500 - t * (260 + i * 40)}
                cy={235 + i * 52 + Math.sin(frame * 0.1 + i) * 10}
                rx={26}
                ry={12}
                fill={scene.accent}
                transform={`rotate(${180 + i * 5} ${500 - t * (260 + i * 40)} ${235 + i * 52})`}
              />
            </g>
          );
        })}
      </svg>

      {/* oblivious kid walking toward the puddle edge */}
      {(() => {
        const walk = interpolate(Math.min(frame, 110), [30, 110], [-60, 100], { easing: Easing.inOut(Easing.cubic) });
        return (
          <svg width={220} height={260} viewBox="0 0 220 260" style={{ position: "absolute", top: 500, left: 830 + walk, opacity: 0.95 }}>
            {/* legs */}
            <path d="M110 170 L 90 240" stroke="#0e2b3a" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M110 170 L 130 240" stroke="#0e2b3a" strokeWidth="16" strokeLinecap="round" fill="none" />
            {/* body */}
            <rect x="84" y="86" width="52" height="94" rx="26" fill="#0e2b3a" />
            {/* head with pigtails */}
            <circle cx="110" cy="60" r="30" fill="#0e2b3a" stroke="#ffb64d" strokeWidth="5" />
            <circle cx="80" cy="48" r="10" fill="#ffb64d" />
            <circle cx="140" cy="48" r="10" fill="#ffb64d" />
            {/* toy submarine in hand */}
            <rect x="140" y="120" width="54" height="24" rx="12" fill="#ffb64d" />
            <ellipse cx="196" cy="132" rx="10" ry="12" fill="#ff7043" />
          </svg>
        );
      })()}

      {/* the clumsy new neighbor — clean diver silhouette, mid-left */}
      <svg width={280} height={300} viewBox="0 0 280 300" style={{ position: "absolute", top: 210, left: 560 }} opacity={0.9}>
        <circle cx="150" cy="130" r="130" fill={scene.accent} opacity="0.08" />
        {/* head with mask */}
        <circle cx="130" cy="70" r="32" fill="#0b1a24" stroke={scene.accent} strokeWidth="4" />
        <rect x="98" y="62" width="46" height="12" rx="6" fill={scene.accent} />
        {/* body capsule */}
        <rect x="106" y="102" width="60" height="120" rx="30" fill="#0b1a24" stroke={scene.accent} strokeWidth="4" />
        {/* clumsy kick */}
        <path d="M138 218 q 62 16 96 52" stroke="#0b1a24" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M150 224 q 52 40 74 70" stroke="#0b1a24" strokeWidth="16" fill="none" strokeLinecap="round" />
        {/* bubbles */}
        <circle cx="122" cy="18" r="7" stroke={scene.accent} strokeWidth="4" fill="none" />
        <circle cx="140" cy="-6" r="11" stroke={scene.accent} strokeWidth="4" fill="none" />
      </svg>

      <SceneBadge scene={scene} />
      <Captions scene={scene} startFrom={20} />
    </AbsoluteFill>
  );
};
