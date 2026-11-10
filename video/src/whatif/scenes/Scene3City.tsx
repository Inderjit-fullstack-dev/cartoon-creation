import React from "react";
import { AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VISUAL_FRAMES, type SceneSpec } from "../story";
import { Bubbles, Captions, Fish, SceneBadge } from "../components/Atmosphere";

export const Scene3City: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame() * (VISUAL_FRAMES / scene.durationInFrames);
  const { fps } = useVideoConfig();
  const rise = interpolate(frame, [0, 60], [34, 0], { easing: Easing.out(Easing.cubic) });

  // Kelp strand wave
  const kelpWave = (x: number, h: number, phase: number, i: number) => {
    const bend = Math.sin(frame * 0.05 + phase) * 34;
    return (
      <path
        key={i}
        d={`M ${x} 1080 C ${x + bend} ${1080 - h * 0.4}, ${x - bend} ${1080 - h * 0.7}, ${x + bend * 0.6} ${1080 - h}`}
        stroke={scene.accent}
        strokeWidth={14}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
    );
  };

  // Window lights flicking on
  const windowOn = (d: number) => spring({ frame: frame - d, fps, config: { damping: 20 } });

  const tower = (x: number, w: number, h: number, seed: number, delay: number) => {
    const cols = 3;
    const rows = Math.max(2, Math.floor(h / 120));
    const cells: React.ReactNode[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (random(`win-${seed}-${r}-${c}`) < 0.4) continue;
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={x + 16 + c * ((w - 34) / cols + 2)}
            y={1080 - h + 26 + r * ((h - 60) / rows)}
            width={(w - 40) / cols}
            height={(h - 80) / rows - 10}
            rx={6}
            fill="#ffe9a8"
            opacity={0.85 * windowOn(delay + (r * cols + c) * 3)}
          />,
        );
      }
    }
    const head = spring({ frame: frame - delay, fps, config: { damping: 13, mass: 0.9 } });
    return (
      <g key={seed} style={{ transform: `translateY(${(1 - head) * rise * 12}px)` }}>
        <rect x={x} y={1080 - h} width={w} height={h + 40} rx={28} fill="#0a2b3e" stroke="#79dfe1" strokeWidth="4" opacity={0.92} />
        {/* dome top */}
        <ellipse cx={x + w / 2} cy={1080 - h} rx={w / 2} ry={26} fill="#0d3548" stroke="#79dfe1" strokeWidth="4" />
        {cells}
      </g>
    );
  };

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${scene.bg[0]}, ${scene.bg[1]})` }}>
      <Bubbles count={16} />

      <Fish y={140} size={54} color="#5cc9e5" speed={3.4} offset={0} />
      <Fish y={250} size={34} color="#f0a35c" speed={2.8} offset={40} reverse delay={70} />
      <Fish y={430} size={70} color="#79e3ff" speed={2.2} offset={80} delay={140} />

      {/* kelp field */}
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", left: 0, top: 0 }}>
        {/* seafloor */}
        <path d="M0 1080 L0 960 Q 480 890 960 950 T 1920 930 L1920 1080 Z" fill="#08303c" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
          kelpWave(120 + i * 250 - (i % 3) * 60, 240 + (i % 4) * 90, i * 1.1, i),
        )}
        {/* city towers */}
        {tower(280, 190, 480, 1, 20)}
        {tower(520, 150, 380, 2, 32)}
        {tower(820, 230, 610, 3, 8)}
        {tower(1150, 160, 420, 4, 48)}
        {tower(1420, 260, 680, 5, 14)}
        {tower(1700, 150, 330, 6, 60)}
        {/* connecting habitat tubes */}
        <path d="M360 800 Q 540 650 900 620 Q 1200 600 1290 720" stroke="#79dfe1" strokeWidth="10" fill="none" opacity={0.6 * windowOn(70)} strokeDasharray="26 18" />
      </svg>

      <SceneBadge scene={scene} />
      <Captions scene={scene} startFrom={20} />
    </AbsoluteFill>
  );
};
