import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SceneSpec } from "../story";
import { Pip } from "../components/Pip";
import { RainStreaks, Streaks } from "../components/Sky";
import { Tree, Lamppost, DebrisItem } from "../components/Props";
import type { DebrisKind } from "../components/Props";

/**
 * S3 — "The Wind" (231 frames)
 * Low angle: Pip clings to a lamppost against the global gale. Continuous
 * debris conveyor, handheld wobble, opening dust from the S2 wipe.
 */

const rand = (seed: number) => {
  const x = Math.sin(seed * 91.7) * 24634.63;
  return x - Math.floor(x);
};

export const Scene3TheWind: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const frame = useCurrentFrame();

  // handheld wobble
  const wobX = Math.sin(frame * 0.16) * 7 + Math.sin(frame * 0.43) * 4;
  const wobY = Math.cos(frame * 0.21) * 5;

  // gust intensity ramps in (clamped — interpolation extrapolates otherwise!)
  const gust = interpolate(frame, [0, 26], [0.25, 1], { extrapolateRight: "clamp" });

  // debris conveyor: items loop right-on-cue from left
  const kinds: DebrisKind[] = ["pan", "umbrella", "board"];
  const debris = Array.from({ length: 6 }).map((_, i) => {
    const cycle = 5.5;
    const per = (i % 3) * 0.4 + rand(i * 2.9) * 0.8;
    const p = ((frame / (cycle * 30) + per) % 1.6) - 0.3;
    const x = -320 + p * 1700;
    const y = 560 + rand(i * 7.3) * 980;
    const spin = frame * (2 + rand(i * 3.1) * 4) + i * 40;
    return { x, y, spin, kind: kinds[i % 3], size: 110 + rand(i * 5.5) * 120 };
  });

  return (
    <AbsoluteFill style={{ transform: `translate(${wobX}px, ${wobY}px) scale(1.03)` }}>
      {/* storm sky */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #233b5e 0%, #4a6fa5 46%, #77917f 100%)" }} />
      {/* ground strip */}
      <div style={{ position: "absolute", left: -60, right: -60, bottom: 0, height: "30%", background: "linear-gradient(180deg, #57764e, #37562f)", borderRadius: "50% 50% 0 0 / 10% 10% 0 0" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,16,30,0.18)" }} />

      {/* trees bowing flat (wind blows east/right) */}
      <div style={{ position: "absolute", bottom: 300, left: 40, transformOrigin: "50% 100%", transform: `rotate(${42 * gust}deg)` }}>
        <Tree size={210} tone="#33693d" />
      </div>
      <div style={{ position: "absolute", bottom: 340, left: 280, transformOrigin: "50% 100%", transform: `rotate(${54 * gust}deg)` }}>
        <Tree size={170} tone="#3a7a45" />
      </div>
      <div style={{ position: "absolute", bottom: 290, right: 40, transformOrigin: "50% 100%", transform: `rotate(${48 * gust}deg)` }}>
        <Tree size={190} tone="#33693d" />
      </div>

      {/* lamppost bends with the gale, Pip grips it base and braces west */}
      <div style={{ position: "absolute", bottom: 200, right: 300, transformOrigin: "50% 100%", transform: `rotate(${16 * gust}deg)` }}>
        <Lamppost bend={10 * gust} size={230} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 200,
          right: 360,
          transform: `rotate(${-14 * gust}deg)`,
          transformOrigin: "50% 100%",
        }}
      >
        <Pip pose="cling" window={1} />
      </div>

      {/* debris streaks past */}
      <Streaks count={16} speed={26} color="#cfe0f2" opacity={0.55} />
      {debris.map((d, i) => (
        <div key={i} style={{ position: "absolute", left: d.x, top: d.y }}>
          <DebrisItem kind={d.kind} spin={d.spin} size={d.size} />
        </div>
      ))}

      <RainStreaks opacity={0.25} />

      {/* dust reveal from S2 transition */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(198,178,132,0.95) 0%, rgba(198,178,132,0.5) 40%, rgba(198,178,132,0) 75%)",
          transform: `translateX(${interpolate(frame, [0, 26], [0, 1200], { extrapolateRight: "clamp" })}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
