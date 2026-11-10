import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { scenes, sceneStarts } from "./story";
import { Scene1Title } from "./scenes/Scene1Title";
import { Scene2Change } from "./scenes/Scene2Change";
import { Scene3City } from "./scenes/Scene3City";
import { Scene4Wrecks } from "./scenes/Scene4Wrecks";
import { Scene5Catch } from "./scenes/Scene5Catch";
import { Scene6Home } from "./scenes/Scene6Home";

const sceneComponents = [Scene1Title, Scene2Change, Scene3City, Scene4Wrecks, Scene5Catch, Scene6Home];

/**
 * "What if humans could breathe underwater?" — main composition.
 * Each scene is a Sequence so timings stay in sync with story.ts.
 */
export const WhatIfVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#04182e" }}>
      {scenes.map((scene, i) => {
        const Scene = sceneComponents[i];
        return (
          <Sequence key={scene.id} from={sceneStarts[i]} durationInFrames={scene.durationInFrames} name={scene.id}>
            <Scene scene={scene} />
            {/* Narration voice-over, timed from the scene start */}
            <Audio src={staticFile(`audio/${scene.id}.mp3`)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
