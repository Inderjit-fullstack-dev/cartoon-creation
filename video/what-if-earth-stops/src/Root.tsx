import React from "react";
import { Composition } from "remotion";
import { WhatIfEarthStopsVideo } from "./VideoComposition";
import { FPS, HEIGHT, WIDTH, totalDurationInFrames } from "./story";

export const WhatIfEarthStopsRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WhatIfEarthStops"
        component={WhatIfEarthStopsVideo}
        durationInFrames={totalDurationInFrames}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
