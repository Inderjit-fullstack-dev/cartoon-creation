import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { sceneStarts, scenesTiming, totalFrames } from "./timing";
import { Scene01Incoming } from "./scenes/Scene01Incoming";
import { Scene02NoShield } from "./scenes/Scene02NoShield";
import { Scene03OneKm } from "./scenes/Scene03OneKm";
import { Scene04Impact } from "./scenes/Scene04Impact";
import { Scene05Silence } from "./scenes/Scene05Silence";
import { Scene06SeenFromEarth } from "./scenes/Scene06SeenFromEarth";
import { Scene07MoonRocks } from "./scenes/Scene07MoonRocks";
import { Scene08Orbit } from "./scenes/Scene08Orbit";
import { Scene09Ancient } from "./scenes/Scene09Ancient";
import { Scene10Scars } from "./scenes/Scene10Scars";

const SCENES = [
  Scene01Incoming, Scene02NoShield, Scene03OneKm, Scene04Impact, Scene05Silence,
  Scene06SeenFromEarth, Scene07MoonRocks, Scene08Orbit, Scene09Ancient, Scene10Scars,
];

const s = sceneStarts;
/** Music bed: builds into the impact, almost silent for scene 5, swells in scene 9, fades out. */
const musicVolume = (frame: number) =>
  interpolate(
    frame,
    [0, 30, s[3] - 60, s[3], s[3] + 90, s[4] - 10, s[4] + 15, s[5] - 30, s[5], s[8] - 30, s[8] + 60, s[9], totalFrames - 60, totalFrames],
    [0, 0.14, 0.2, 0.38, 0.2, 0.2, 0.03, 0.03, 0.16, 0.16, 0.32, 0.22, 0.2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

export const VideoComposition: React.FC = () => (
  <>
    <Audio src={staticFile("audio/music/cinematic-drone.mp3")} volume={musicVolume} />
    {scenesTiming.map((t, i) => {
      const Scene = SCENES[i];
      return (
        <Sequence key={t.id} from={sceneStarts[i]} durationInFrames={t.durationFrames} premountFor={30}>
          <Scene t={t} />
        </Sequence>
      );
    })}
  </>
);
