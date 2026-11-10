// ElevenLabs narration generator for the "What if the Earth stopped rotating?" production.
// Adapted from the repo's proven video/gen-audio.mjs pipeline.
//
// Usage (run from video/ directory):
//   node what-if/gen-audio.mjs --sample              # short approval sample
//   node what-if/gen-audio.mjs                       # all scenes, skipping existing files
//   node what-if/gen-audio.mjs --scenes S2,S4 --force
//
// Security: reads ELEVENLABS_API_KEY / ELEVENLABS_VOICE_ID from the nearest .env
// walking up from this script's folder. The key is never printed or embedded.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

// --- locate .env by walking up ----------------------------------------------
function findEnv(startDir) {
  let dir = startDir;
  for (;;) {
    const candidate = path.join(dir, ".env");
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const envPath = findEnv(here);
if (!envPath) {
  console.error("No .env found walking up from", here);
  process.exit(1);
}

function readEnvValue(name) {
  const line = fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith(`${name}=`));
  return line ? line.slice(name.length + 1).trim() : "";
}

const apiKey = readEnvValue("ELEVENLABS_API_KEY");
const voiceId = readEnvValue("ELEVENLABS_VOICE_ID");

if (!apiKey || !voiceId) {
  console.error(`Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID (looked from ${envPath})`);
  process.exit(1);
}

// --- CLI flags ----------------------------------------------------------------
const args = process.argv.slice(2);
const wantSample = args.includes("--sample");
const scenesFlagIdx = args.indexOf("--scenes");
const onlyScenes = scenesFlagIdx !== -1 ? args[scenesFlagIdx + 1]?.split(",").map((s) => s.trim()) : null;
const force = args.includes("--force");

// --- scene narration: parsed from the single source of truth ------------------
const storySrc = fs.readFileSync(path.join(here, "src", "story.ts"), "utf8");
const sceneRe = /id:\s*"(S\d+)"[\s\S]*?narration:\s*\n?\s*"([^"]+)"/g;
const items = [...storySrc.matchAll(sceneRe)].map((m) => ({ id: m[1], text: m[2] }));

if (items.length === 0) {
  console.error("No scenes parsed from src/story.ts");
  process.exit(1);
}

const outDir = path.join(here, "public", "audio", "narration");
fs.mkdirSync(outDir, { recursive: true });

// Storytelling delivery settings (calibrated: style 0.35 measured ~2.0 words/s,
// while the repo's previous production ran ~2.9 words/s at stability 0.5/style 0.
// This is the middle ground: storytelling warmth, documentary-friendly pacing.)
const voiceSettings = { stability: 0.5, similarity_boost: 0.75, style: 0.12, use_speaker_boost: true };
const MODEL_ID = "eleven_turbo_v2_5";

async function synthTo(text, dest) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: voiceSettings }),
  });
  if (!res.ok) {
    const body = (await res.text()).slice(0, 300);
    console.error(`FAILED (HTTP ${res.status}): ${body}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`  ${path.basename(dest)}  ${text.length} chars -> ${(buf.length / 1024).toFixed(0)} KB`);
  return true;
}

if (wantSample) {
  // Sample = a representative dramatic line, ~130 chars
  const sampleText =
    "But what if it stopped right now? You wouldn't brake. Everything loose keeps moving eastward — at up to 1,670 kilometers per hour.";
  console.log(`Generating voice approval sample (${sampleText.length} chars)...`);
  const ok = await synthTo(sampleText, path.join(outDir, "sample.mp3"));
  process.exit(ok ? 0 : 1);
}

let generated = 0;
let skipped = 0;
for (const { id, text } of items) {
  if (onlyScenes && !onlyScenes.includes(id)) {
    continue;
  }
  const dest = path.join(outDir, `${id}.mp3`);
  if (fs.existsSync(dest) && !force) {
    console.log(`  ${id}.mp3 already exists, skipping (use --force to regenerate)`);
    skipped++;
    continue;
  }
  process.stdout.write(`Generating ${id} (${text.length} chars)... `);
  const ok = await synthTo(text, dest);
  if (ok) generated++;
}
console.log(`done — generated: ${generated}, skipped existing: ${skipped}`);
