import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VISUAL_FRAMES, type SceneSpec } from "../story";
import { Bubbles, Captions, SceneBadge } from "../components/Atmosphere";

export const Scene2Change: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame() * (VISUAL_FRAMES / scene.durationInFrames);
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - 24);

  // Gills "unfold" one after another
  const gillFold = (i: number) =>
    spring({ frame: local - i * 12, fps, config: { damping: 12, mass: 0.6 } });
  const glowPulse = 0.55 + Math.sin(frame * 0.12) * 0.25;
  const heartScale = 1 + Math.sin(frame * 0.16) * 0.08;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${scene.bg[0]}, ${scene.bg[1]})` }}>
      <Bubbles count={18} />

      {/* swimmer figure, center */}
      <svg width={760} height={760} viewBox="0 0 400 400" style={{ position: "absolute", top: 60, left: 580 }}>
        {/* glow behind character */}
        <circle cx="200" cy="212" r="168" fill={scene.accent} opacity={0.1 * glowPulse} />
        {/* head */}
        <circle cx="200" cy="120" r="62" fill="#0c2d42" stroke="#dff4ff" strokeWidth="7" />
        {/* face plate */}
        <path d="M148 116 Q 200 96 252 116" stroke="#dff4ff" strokeWidth="5" fill="none" />
        {/* torso */}
        <path d="M200 182 Q 200 240 200 268" stroke="#0c2d42" strokeWidth="98" strokeLinecap="round" />
        <path d="M200 268 Q 158 320 148 366" stroke="#0c2d42" strokeWidth="30" strokeLinecap="round" fill="none" />
        <path d="M200 268 Q 242 320 252 366" stroke="#0c2d42" strokeWidth="30" strokeLinecap="round" fill="none" />
        {/* arms */}
        <path d="M200 196 Q 120 240 96 300" stroke="#0c2d42" strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M200 196 Q 280 240 304 300" stroke="#0c2d42" strokeWidth="26" strokeLinecap="round" fill="none" />

        {/* ribs / gills */}
        {[0, 1, 2, 3, 4].map((i) => {
          const f = gillFold(i);
          const side = i % 2 === 0 ? -1 : 1;
          const y = 206 + Math.floor(i / 2) * 22;
          const cx = 200 + side * 54;
          return (
            <g key={i} opacity={f}>
              <path
                d={`M ${cx} ${y} q ${side * 34} ${10} ${side * 58} ${-6}`}
                stroke={scene.accent}
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
                transform={`scale(${0.6 + f * 0.4})`}
                style={{ transformOrigin: `${cx}px ${y}px` }}
              />
              {f > 0.65 && (
                <circle
                  cx={cx + side * 60}
                  cy={y - 4}
                  r={8 + 4 * Math.sin(frame * 0.2 + i)}
                  fill={scene.accent}
                  opacity={0.5}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* "AIR: OPTIONAL" tag */}
      {(() => {
        const f = interpolate(Math.min(frame, 160), [130, 160], [0, 1], { easing: Easing.out(Easing.back(2)) });
        return (
          <div
            style={{
              position: "absolute",
              top: 130,
              right: 200,
              fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
              fontWeight: 900,
              fontSize: 56,
              color: scene.accent,
              border: `5px solid ${scene.accent}`,
              borderRadius: 24,
              padding: "18px 38px",
              transform: `scale(${f}) rotate(${(1 - f) * -12}deg)`,
              opacity: f,
              background: "rgba(6, 40, 55, 0.55)",
              boxShadow: "0 0 50px rgba(126,247,210,0.25)",
            }}
          >
            AIR = OPTIONAL
          </div>
        );
      })()}

      {/* heartbeat trace */}
      <svg width="480" height="120" viewBox="0 0 480 120" style={{ position: "absolute", left: 120, bottom: 250 }}>
        <path
          d="M0 60 L60 60 L80 30 L100 90 L120 44 L140 60 L240 60 L260 34 L280 86 L300 48 L320 60 L480 60"
          fill="none"
          stroke={scene.accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="540"
          strokeDashoffset={interpolate(Math.min(frame, 140), [60, 140], [540, 0], { easing: Easing.linear })}
          opacity={0.9 * heartScale}
        />
      </svg>

      <SceneBadge scene={scene} />
      <Captions scene={scene} startFrom={24} />
    </AbsoluteFill>
  );
};
