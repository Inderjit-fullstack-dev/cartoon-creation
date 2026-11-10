import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VISUAL_FRAMES, type SceneSpec } from "../story";
import { Bubbles, Captions, Fish, SceneBadge } from "../components/Atmosphere";

export const Scene6Home: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame() * (VISUAL_FRAMES / scene.durationInFrames);
  const { fps } = useVideoConfig();

  const floaty = Math.sin(frame * 0.05) * 16;
  const headline = spring({ frame: frame - 12, fps, config: { damping: 15 } });
  // Fade the headline out before the end card takes over the frame
  const headlineFade = interpolate(Math.min(frame, 100), [76, 100], [1, 0], { easing: Easing.inOut(Easing.cubic) });
  const endCard = interpolate(Math.min(frame, 118), [88, 118], [0, 1], { easing: Easing.out(Easing.cubic) });
  // Water veil brightening at the end
  const veil = interpolate(Math.min(frame, 130), [80, 130], [0, 0.5], { easing: Easing.inOut(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${scene.bg[0]}, ${scene.bg[1]})` }}>
      <Bubbles count={20} />

      <Fish y={180} size={44} color="#8fd8f2" speed={2.4} offset={20} delay={10} />
      <Fish y={640} size={30} color="#c5b3ff" speed={2.9} offset={60} reverse delay={40} />
      <Fish y={880} size={56} color="#79e3ff" speed={2.0} offset={100} delay={90} />
      <Fish y={380} size={26} color="#f0a35c" speed={3.4} offset={130} reverse delay={60} />

      {/* relaxed human floating in the middle of the traffic */}
      <svg
        width={300}
        height={260}
        viewBox="0 0 300 260"
        style={{ position: "absolute", top: 470 + floaty, left: 380 }}
        opacity={0.95 * headlineFade}
      >
        <circle cx="150" cy="130" r="115" fill={scene.accent} opacity="0.12" />
        {/* head back, arms spread */}
        <ellipse cx="150" cy="120" rx="86" ry="52" fill="#123a5c" stroke={scene.accent} strokeWidth="5" />
        <circle cx="62" cy="112" r="26" fill="#123a5c" stroke={scene.accent} strokeWidth="5" />
        <circle cx="50" cy="108" r="9" fill="#bfeaff" />
        {/* arms spread */}
        <path d="M96 92 Q 40 74 12 60" stroke="#123a5c" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M210 130 Q 270 118 298 100" stroke="#123a5c" strokeWidth="14" strokeLinecap="round" fill="none" />
        {/* legs crossed */}
        <path d="M150 168 Q 120 254 60 268" stroke="#123a5c" strokeWidth="18" strokeLinecap="round" fill="none" />
        <path d="M160 170 Q 190 252 250 260" stroke="#123a5c" strokeWidth="18" strokeLinecap="round" fill="none" />
      </svg>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
            fontWeight: 900,
            fontSize: 110,
            color: "#f4fbff",
            textAlign: "center",
            transform: `scale(${0.85 + headline * 0.15})`,
            opacity: headline * headlineFade,
            textShadow: "0 6px 30px rgba(0,0,0,0.6)",
          }}
        >
          The sea becomes <span style={{ color: scene.accent }}>home</span>
        </div>
      </AbsoluteFill>

      {/* end card */}
      {endCard > 0 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: `rgba(12, 16, 40, ${veil})`,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
              fontWeight: 900,
              fontSize: 92,
              letterSpacing: 10,
              color: scene.accent,
              opacity: endCard,
              transform: `translateY(${(1 - endCard) * 30}px)`,
            }}
          >
            WHAT IF #01
          </div>
          <div
            style={{
              marginTop: 22,
              fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
              fontWeight: 700,
              fontSize: 48,
              color: "#f4fbff",
              opacity: endCard * 0.9,
              transform: `translateY(${(1 - endCard) * 22}px)`,
            }}
          >
            …we could breathe underwater. Where do you go first?
          </div>
        </AbsoluteFill>
      )}

      <SceneBadge scene={scene} />
      <Captions scene={scene} startFrom={16} bottom={70} />
    </AbsoluteFill>
  );
};
