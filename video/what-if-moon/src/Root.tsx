import React from "react";
import { Composition } from "remotion";
import { VideoComposition } from "./VideoComposition";
import { totalFrames } from "./timing";
import { FPS, H, W } from "./theme";

export const RemotionRoot: React.FC = () => (
  <Composition id="MoonAsteroid" component={VideoComposition} durationInFrames={totalFrames} fps={FPS} width={W} height={H} />
);
