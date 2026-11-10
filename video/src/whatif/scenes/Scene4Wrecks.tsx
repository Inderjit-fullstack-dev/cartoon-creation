import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VISUAL_FRAMES, type SceneSpec } from "../story";
import { Bubbles, Captions, SceneBadge } from "../components/Atmosphere";

export const Scene4Wrecks: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame() * (VISUAL_FRAMES / scene.durationInFrames);
  const { fps } = useVideoConfig();

  // Lantern flicker + slow sweep
  const flicker = 0.8 + Math.sin(frame * 0.4) * 0.08 + Math.sin(frame * 0.13) * 0.12;
  const sweep = Math.sin(frame * 0.035) * 90;

  const diverDrift = Math.sin(frame * 0.045) * 18;
  const fishScatter = spring({ frame: frame - 90, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${scene.bg[0]}, ${scene.bg[1]})` }}>
      <Bubbles count={14} />

      {/* wreck silhouette */}
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", left: 0, top: 0 }}>
        {/* seabed + ruins */}
        <path d="M0 1080 L0 940 Q 700 900 1200 950 T 1920 920 L1920 1080 Z" fill="#0a2130" />
        {/* broken hull */}
        <path
          d="M-60 1010 Q 40 830 420 800 Q 900 760 1120 850 Q 1240 905 1290 1010 Z"
          fill="#0d2c3e"
          stroke="#2c6478"
          strokeWidth="5"
        />
        {/* ribs of the ship */}
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M ${180 + i * 190} 830 q 20 80 4 150`}
            stroke="#2c6478"
            strokeWidth="8"
            fill="none"
            opacity={0.6}
          />
        ))}
        {/* snapped mast */}
        <path d="M430 812 L 520 720" stroke="#0d2c3e" strokeWidth="18" strokeLinecap="round" />
        {/* ancient columns of a ruined city */}
        {[0, 1, 2].map((i) => (
          <g key={`col-${i}`}>
            <rect x={1500 + i * 136} y={640 + i * 26} width={54} height={1010 - (640 + i * 26)} rx={12} fill="#123449" stroke="#2c6478" strokeWidth="4" />
            <rect x={1490 + i * 136} y={620 + i * 26} width={74} height={30} rx={8} fill="#123449" stroke="#2c6478" strokeWidth="4" />
          </g>
        ))}
        {/* startled little fish darting out of a porthole */}
        {[0, 1, 2, 3].map((i) => {
          const t = Math.max(0, Math.min(1, (frame - 84 - i * 6) / 40));
          const dist = t * (150 + i * 40);
          return (
            <g key={`df-${i}`} opacity={fishScatter}>
              <ellipse
                cx={280 - dist}
                cy={900 - i * 28 - dist * 0.35}
                rx={14}
                ry={7}
                fill={scene.accent}
                transform={`rotate(${-20 - i * 8} ${280 - dist} ${900 - i * 28 - dist * 0.35})`}
              />
            </g>
          );
        })}
      </svg>

      {/* freediver with lantern, swimming left toward the wreck */}
      <svg
        width={560}
        height={420}
        viewBox="0 0 560 420"
        style={{ position: "absolute", top: 330 + diverDrift, left: 940 + diverDrift * 0.4 }}
      >
        {/* lantern light cone sweeping toward the wreck */}
        <polygon
          points="300,225 0,80 0,350"
          fill={scene.accent}
          opacity={0.2 * flicker}
          transform={`rotate(${sweep * 0.3} 300 225)`}
        />
        <polygon
          points="300,225 0,140 0,290"
          fill={scene.accent}
          opacity={0.13 * flicker}
          transform={`rotate(${sweep * 0.3} 300 225)`}
        />
        {/* body leaning forward (head at left) */}
        <path d="M352 258 Q 410 300 436 350" stroke="#2a7396" strokeWidth="46" strokeLinecap="round" fill="none" />
        {/* legs + fins */}
        <path d="M432 346 L 512 376" stroke="#2a7396" strokeWidth="16" strokeLinecap="round" />
        <path d="M440 360 L 522 406" stroke="#2a7396" strokeWidth="16" strokeLinecap="round" />
        {/* arm reaching forward */}
        <path d="M344 272 L 302 240" stroke="#2a7396" strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* head */}
        <circle cx="330" cy="232" r="44" fill="#0c2d42" stroke="#dff4ff" strokeWidth="6" />
        {/* mask: band + lens */}
        <rect x="278" y="218" width="52" height="18" rx="9" fill={scene.accent} opacity="0.9" />
        <rect x="288" y="212" width="28" height="30" rx="9" fill="#bfeaff" />
        {/* lantern held out front */}
        <rect x="272" y="204" width="32" height="46" rx="8" fill="#1d4457" stroke={scene.accent} strokeWidth="5" />
        <circle cx="288" cy="227" r="10" fill={scene.accent} opacity={flicker} />
        {/* bubbles */}
        <circle cx="356" cy="158" r="8" stroke="#bfeaff" strokeWidth="5" fill="none" />
        <circle cx="376" cy="118" r="12" stroke="#bfeaff" strokeWidth="5" fill="none" />
        <circle cx="392" cy="76" r="17" stroke="#bfeaff" strokeWidth="5" fill="none" />
      </svg>

      {/* "SEALED FOR CENTURIES" tag */}
      {(() => {
        const f = interpolate(Math.min(frame, 150), [120, 150], [0, 1], { easing: Easing.out(Easing.cubic) });
        return (
          <div
            style={{
              position: "absolute",
              top: 150,
              left: 1300,
              fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
              fontWeight: 900,
              fontSize: 48,
              textAlign: "center",
              color: scene.accent,
              transform: `scale(${f})`,
              opacity: f * 0.95,
              textShadow: "0 0 40px rgba(255,213,79,0.35)",
            }}
          >
            unlocked overnight
          </div>
        );
      })()}

      <SceneBadge scene={scene} />
      <Captions scene={scene} startFrom={20} />
    </AbsoluteFill>
  );
};
