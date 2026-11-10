// Single source of truth for the "What if the Earth stopped rotating?" video.
// Every scene component, the storyboard doc, and the composition timing derive from here.
//
// Durations below are LOCKED from the actual generated narration MP3s:
// durationInFrames = narration length + ~0.55 s breathing room
// (S6 adds a ~1.5 s music-only tail after the last line).
// Regenerating narration? Re-measure with ffprobe and update.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export type SceneSpec = {
  id: string;
  title: string;
  /** Voice-over narration, generated via ElevenLabs (what-if/gen-audio.mjs) */
  narration: string;
  durationInFrames: number;
  /** Background gradient (top -> bottom), 9:16 vertical */
  bg: [string, string];
  /** Scene accent color for highlights, stamps, Pip's world */
  accent: string;
};

export const scenes: SceneSpec[] = [
  {
    id: "S1",
    title: "We Are Moving",
    narration:
      "Right now, you're spinning through space at 1,670 kilometers per hour — and you can't feel it, because Earth has been turning your whole life.",
    durationInFrames: 283,
    bg: ["#7ec8ff", "#bfe8ff"],
    accent: "#ff8a3d",
  },
  {
    id: "S2",
    title: "The Stop",
    narration:
      "But what if it stopped right now? You wouldn't brake. Everything loose keeps moving eastward — at up to 1,670 kilometers per hour.",
    durationInFrames: 278,
    bg: ["#a8cef0", "#d8ecfb"],
    accent: "#ff5a3c",
  },
  {
    id: "S3",
    title: "The Wind",
    narration:
      "The air wouldn't stop either. It would keep going, scouring the planet with permanent, planet-wide hurricanes.",
    durationInFrames: 231,
    bg: ["#2f4d75", "#6e93c2"],
    accent: "#ffd54f",
  },
  {
    id: "S4",
    title: "Water Takes Sides",
    narration:
      "And the oceans take sides. Without the spin, Earth's equatorial bulge relaxes — water slowly migrates toward the poles. The map redraws itself.",
    durationInFrames: 334,
    bg: ["#164e63", "#3e8e9e"],
    accent: "#8ef0d2",
  },
  {
    id: "S5",
    title: "One Day, One Year",
    narration:
      "Daylight only flips because the planet rotates. Take that away, and one day becomes a full orbit: six months of day, six months of night.",
    durationInFrames: 313,
    bg: ["#0b0e2a", "#1d2a55"],
    accent: "#ffc46b",
  },
  {
    id: "S6",
    title: "The Longest Sunset",
    narration:
      "The world wouldn't end in fire or ice. It would just stop turning — and begin the longest, most beautiful sunset in its history.",
    durationInFrames: 305,
    bg: ["#1a1030", "#3c1a3f"],
    accent: "#ffb36b",
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
