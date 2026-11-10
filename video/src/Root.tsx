import { Composition } from "remotion";
import { WhatIfVideo } from "./whatif/WhatIfVideo";
import { WhatIfEarthStopsRoot } from "../what-if-earth-stops/src/Root";
import { FPS, HEIGHT, WIDTH, totalDurationInFrames } from "./whatif/story";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WhatIfBreatheUnderwater"
        component={WhatIfVideo}
        durationInFrames={totalDurationInFrames}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <WhatIfEarthStopsRoot />
    </>
  );
};
