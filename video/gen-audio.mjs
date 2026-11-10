// One-off: generates narration MP3s for each scene via the ElevenLabs TTS API.
// Narrations are read from src/whatif/story.ts so the audio always matches the captions.
import fs from "node:fs";
import path from "node:path";

const env = fs.readFileSync(".env", "utf8");
const apiKey = env.match(/^ELEVENLABS_API_KEY=(.+)$/m)?.[1]?.trim();
const voiceId = env.match(/^ELEVENLABS_VOICE_ID=(.+)$/m)?.[1]?.trim();

if (!apiKey || !voiceId) {
  console.error("Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID in .env");
  process.exit(1);
}

const storySrc = fs.readFileSync("src/whatif/story.ts", "utf8");
const sceneRe = /id:\s*"(S\d)"[\s\S]*?narration:\s*\n?\s*"([^"]+)"/g;
const items = [...storySrc.matchAll(sceneRe)].map((m) => ({ id: m[1], text: m[2] }));

if (items.length === 0) {
  console.error("No scenes parsed from story.ts");
  process.exit(1);
}

const outDir = "public/audio";
fs.mkdirSync(outDir, { recursive: true });

for (const { id, text } of items) {
  const dest = path.join(outDir, `${id}.mp3`);
  process.stdout.write(`Generating ${id} (${text.length} chars)... `);
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_turbo_v2_5",
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
    }),
  });

  if (!res.ok) {
    console.error(`FAILED (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`);
    continue;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`saved ${(buf.length / 1024).toFixed(0)} KB -> ${dest}`);
}

console.log("done");
