export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const C = {
  navy: "#0B1030",
  indigo: "#1B1F5C",
  moon: "#E9E4D4",
  moonShade: "#9C957F",
  crater: "#B9B3A1",
  rock: "#6B4F3A",
  rockDark: "#3A2A1E",
  orange: "#FF9B3D",
  white: "#FFFFFF",
  yellow: "#FFD84D",
};
export const FONT = "'Trebuchet MS', 'Arial Black', Arial, sans-serif";

/** Deterministic PRNG so renders are identical on every frame/run. */
export const rand = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
