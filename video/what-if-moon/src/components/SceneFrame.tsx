import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Space } from "./Space";
import { Subtitles } from "./Subtitles";
import type { SceneTiming } from "../timing";

export type Sfx = { file: string; at: number; volume?: number };

/** Shared wrapper: background, push-in camera, fade in/out, narration, SFX and subtitles. */
export const SceneFrame: React.FC<{
  t: SceneTiming; seed?: number; push?: number; fadeIn?: number; sfx?: Sfx[]; children: React.ReactNode;
}> = ({ t, seed = 7, push = 0.06, fadeIn = 8, sfx = [], children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, t.durationFrames], [1, 1 + push]);
  const opacity = Math.min(
    interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [t.durationFrames - 8, t.durationFrames], [1, 0], { extrapolateLeft: "clamp" }),
  );
  return (
    <AbsoluteFill style={{ opacity, backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Space seed={seed} />
        {children}
      </AbsoluteFill>
      <Subtitles words={t.words} />
      <Sequence from={t.narrationStart}>
        <Audio src={staticFile(t.audio)} />
      </Sequence>
      {sfx.map((s, i) => (
        <Sequence key={i} from={s.at}>
          <Audio src={staticFile(`audio/sound-effects/${s.file}.mp3`)} volume={s.volume ?? 0.5} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
