// Server-side ElevenLabs TTS. Usage: node scripts/gen-narration.mjs sample | all
// Reads ELEVENLABS_API_KEY / ELEVENLABS_VOICE_ID from ../.env (never printed).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const env = fs.readFileSync(new URL("../../.env", import.meta.url), "utf8");
const get = (k) => env.match(new RegExp(`^${k}=(.+)$`, "m"))?.[1]?.trim();
const key = get("ELEVENLABS_API_KEY");
const voice = get("ELEVENLABS_VOICE_ID");
if (!key || !voice) { console.error("Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID"); process.exit(1); }

const lines = JSON.parse(fs.readFileSync(new URL("./narration-lines.json", import.meta.url), "utf8"));
const outDir = fileURLToPath(new URL("../public/audio/narration/", import.meta.url));
fs.mkdirSync(outDir, { recursive: true });
const mode = process.argv[2];
const jobs = mode === "sample" ? [{ file: "sample.mp3", text: lines[0] }]
  : lines.map((text, i) => ({ file: `scene-${String(i + 1).padStart(2, "0")}.mp3`, text }));

for (const { file, text } of jobs) {
  const target = path.join(outDir, file);
  if (mode !== "sample" && fs.existsSync(target)) { console.log("skip", file); continue; }
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({ text, model_id: "eleven_multilingual_v2" }),
  });
  if (!r.ok) { console.error(file, "failed", r.status, (await r.text()).slice(0, 200)); process.exit(1); }
  fs.writeFileSync(target, Buffer.from(await r.arrayBuffer()));
  console.log("wrote", file);
}
