// Single source of truth for the "What if humans could breathe underwater?" video.
// Every scene component, the storyboard doc, and the composition timing derive from here.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export type SceneSpec = {
  id: string;
  /** Short name shown in the storyboard / review */
  title: string;
  /** Voice-over narration, rendered as animated captions */
  narration: string;
  durationInFrames: number;
  /** Deep background gradient (top -> bottom) */
  bg: [string, string];
  /** Scene accent color used for glow, captions, highlights */
  accent: string;
};

const s = (frames: number) => frames * FPS;

/**
 * All scene animations are authored against a 180-frame (6 s) visual timeline.
 * Scene-local frame is scaled by VISUAL_FRAMES / scene.durationInFrames so the
 * Voice-over narration: voiced via ElevenLabs (public/audio/S*.mp3, generated
 * with gen-audio.mjs). Scene durations are set to narration length + ~0.6 s.
 */
export const VISUAL_FRAMES = 180;

export const scenes: SceneSpec[] = [
  {
    id: "S1",
    title: "The Question",
    narration:
      "Today, you can't swim across a deep pool without a breath. But imagine waking up tomorrow, pressing your face below the surface, and realizing you don't need air anymore.",
    durationInFrames: s(12),
    bg: ["#04182e", "#0b3a5c"],
    accent: "#79e3ff",
  },
  {
    id: "S2",
    title: "The Change",
    narration:
      "The first shift would be in our bodies. Gills along our ribs, lungs tuned for water. Air wouldn't vanish, it would simply become optional.",
    durationInFrames: s(10),
    bg: ["#0a2a3f", "#0e4d5e"],
    accent: "#7ef7d2",
  },
  {
    id: "S3",
    title: "The Ocean Opens Up",
    narration:
      "The sea would stop being a wall. Cities would bloom on the seafloor, kelp farms would feed millions, and no coastline would ever hold humanity back again.",
    durationInFrames: s(11),
    bg: ["#07304d", "#0d5e46"],
    accent: "#9fe870",
  },
  {
    id: "S4",
    title: "Hidden Worlds",
    narration:
      "Wrecks and ruins sealed for centuries would open overnight. Suddenly we would realize: most of the Earth's living space was always one breath away.",
    durationInFrames: s(11),
    bg: ["#061b30", "#123a52"],
    accent: "#ffd54f",
  },
  {
    id: "S5",
    title: "The Catch",
    narration:
      "But every puddle, pool, and river becomes a trap for anyone who forgets to look down. And the ecosystems that took millions of years to perfect would get us as new, clumsy neighbors.",
    durationInFrames: s(12),
    bg: ["#2a0d33", "#4a1638"],
    accent: "#ff8a65",
  },
  {
    id: "S6",
    title: "Home",
    narration:
      "Me? I'd do it in a heartbeat. The sea would finally be home: not a boundary, but a boulevard. So tell me, what is the first thing YOU would explore?",
    durationInFrames: s(12),
    bg: ["#101b3f", "#1d2f66"],
    accent: "#c5b3ff",
  },
];

export const totalDurationInFrames = scenes.reduce(
  (acc, sc) => acc + sc.durationInFrames,
  0,
);

/** Frame offsets of each scene inside the main composition */
export const sceneStarts = scenes.map((_, i) =>
  scenes.slice(0, i).reduce((acc, sc) => acc + sc.durationInFrames, 0),
);
