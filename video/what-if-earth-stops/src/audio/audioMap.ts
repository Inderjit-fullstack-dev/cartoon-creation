// Audio map — single source of truth for every sound in the composition.
// All files resolve through staticFile() using --public-dir=what-if-earth-stops/public

export const narration = (id: string) => `audio/narration/${id}.mp3`;
export const musicTheme = "audio/music/theme.mp3";
export const sfx = (name: string) => `audio/sound-effects/${name}.mp3`;

/** Per-scene spot SFX: [sfxName, offsetInSceneFrames, gain] */
export type SfxCue = [string, number, number];

export const sceneSfx: Record<string, SfxCue[]> = {
  S1: [["whoosh", 0, 0.35]],
  S2: [
    ["skid", 0, 0.85],
    ["boing", 30, 0.7],
    ["whoosh", 150, 0.5],
  ],
  S3: [
    ["storm", 0, 0.42],
    ["whoosh", 24, 0.5],
    ["whoosh", 120, 0.45],
  ],
  S4: [
    ["rumble", 0, 0.32],
    ["slosh", 20, 0.4],
  ],
  S5: [
    ["rumble", 0, 0.3],
    ["chime", 148, 0.55],
  ],
  S6: [
    ["windsoft", 0, 0.4],
    ["chirp", 232, 0.45],
  ],
};

export const MUSIC_GAIN = 0.45;
