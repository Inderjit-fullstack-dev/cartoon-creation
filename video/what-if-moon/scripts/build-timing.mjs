// Measures narration clips with ffprobe and writes src/timing.json (scene lengths + per-word subtitle timing).
// Word timing is distributed across each clip's real duration by character weight.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const FPS = 30, LEAD = 15, TAIL = 24;
const root = (p) => fileURLToPath(new URL(p, import.meta.url));
const lines = JSON.parse(fs.readFileSync(root("./narration-lines.json"), "utf8"));
const subtitleText = lines.map((l) => l.replace("two thousand five hundred", "2,500"));

const scenes = lines.map((_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const file = root(`../public/audio/narration/scene-${n}.mp3`);
  const sec = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString());
  const narrationFrames = Math.ceil(sec * FPS);
  const words = subtitleText[i].split(/\s+/);
  const weights = words.map((w) => w.length + (/[,.:?!]$/.test(w) ? 6 : 0));
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  const timed = words.map((w, k) => {
    const start = LEAD + Math.round((acc / total) * narrationFrames);
    acc += weights[k];
    const end = LEAD + Math.round((acc / total) * narrationFrames);
    return { w, start, end };
  });
  return { id: n, audio: `audio/narration/scene-${n}.mp3`, narrationStart: LEAD, narrationFrames, durationFrames: LEAD + narrationFrames + TAIL, words: timed };
});
const out = { fps: FPS, totalFrames: scenes.reduce((a, s) => a + s.durationFrames, 0), scenes };
fs.writeFileSync(root("../src/timing.json"), JSON.stringify(out, null, 1));
console.log("total sec", (out.totalFrames / FPS).toFixed(1), scenes.map((s) => s.durationFrames));
