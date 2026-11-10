import timing from "./timing.json";

export type Word = { w: string; start: number; end: number };
export type SceneTiming = {
  id: string;
  audio: string;
  narrationStart: number;
  narrationFrames: number;
  durationFrames: number;
  words: Word[];
};

export const scenesTiming = timing.scenes as SceneTiming[];
export const sceneStarts = scenesTiming.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + scenesTiming[i - 1].durationFrames);
  return acc;
}, []);
export const totalFrames: number = timing.totalFrames;
