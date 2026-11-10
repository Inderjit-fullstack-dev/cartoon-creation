import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from "remotion";
import { scenes, sceneStarts, totalDurationInFrames, FPS } from "./story";
import { narration, musicTheme, sfx, sceneSfx, MUSIC_GAIN } from "./audio/audioMap";
import { Scene1WeAreMoving } from "./scenes/Scene1WeAreMoving";
import { Scene2TheStop } from "./scenes/Scene2TheStop";
import { Scene3TheWind } from "./scenes/Scene3TheWind";
import { Scene4WaterTakesSides } from "./scenes/Scene4WaterTakesSides";
import { Scene5OneDayOneYear } from "./scenes/Scene5OneDayOneYear";
import { Scene6TheLongestSunset } from "./scenes/Scene6TheLongestSunset";

const sceneComponents = [
  Scene1WeAreMoving,
  Scene2TheStop,
  Scene3TheWind,
  Scene4WaterTakesSides,
  Scene5OneDayOneYear,
  Scene6TheLongestSunset,
];

/**
 * "What if the Earth stopped rotating?" — main composition (1080x1920 @ 30fps).
 * Each scene is a Sequence whose timing derives from story.ts (locked from the
 * generated narration lengths). Narration starts at its scene boundary; the
 * music bed spans the whole runtime with a resolved tail fade.
 */
export const WhatIfEarthStopsVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0d0618" }}>
      {/* music bed: tension -> wonder, baked section changes; tail fade over last 1.5 s */}
      <Audio
        src={staticFile(musicTheme)}
        volume={(f) =>
          interpolate(
            f,
            [0, FPS * 1.2, totalDurationInFrames - 46, totalDurationInFrames - 2],
            [0, MUSIC_GAIN, MUSIC_GAIN, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />

      {scenes.map((scene, i) => {
        const Scene = sceneComponents[i];
        return (
          <Sequence
            key={scene.id}
            from={sceneStarts[i]}
            durationInFrames={scene.durationInFrames}
            name={scene.title}
          >
            {/* narration voice-over from the scene start */}
            <Audio src={staticFile(narration(scene.id))} volume={1} />
            {/* spot SFX */}
            {(sceneSfx[scene.id] ?? []).map(([name, offset, gain], j) => (
              <Sequence key={j} from={offset} durationInFrames={scene.durationInFrames - offset}>
                <Audio src={staticFile(sfx(name))} volume={gain} />
              </Sequence>
            ))}
            <Scene scene={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
