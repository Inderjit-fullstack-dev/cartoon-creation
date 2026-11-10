// Original music + SFX composer for "What if the Earth stopped rotating?".
// Everything is synthesized from scratch — no samples, no licensing concerns.
//
// Usage (from video/):  node what-if-earth-stops/gen-fx.mjs
// Outputs:
//   what-if-earth-stops/public/audio/music/theme.mp3        (58.5 s tension->wonder bed)
//   what-if-earth-stops/public/audio/sound-effects/*.mp3    (spot SFX)
//
// Raw float math -> 44.1 kHz mono PCM -> MP3 via ffmpeg. The API key is never touched here.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "public", "audio");
fs.mkdirSync(path.join(outDir, "music"), { recursive: true });
fs.mkdirSync(path.join(outDir, "sound-effects"), { recursive: true });

const SR = 44100;

// ---------- note helpers ----------
const NOTE = (n) => {
  // n = midi number; A4 = 69
  return 440 * Math.pow(2, (n - 69) / 12);
};
// MIDI note numbers: C=60, so A2=45, C3=48, E3=52, ...
const CHORDS = {
  Am: [45, 48, 52, 57], // A2 C3 E3 A3
  Dm: [50, 53, 57, 60], // D3 F3 A3 C4
  F: [41, 48, 53, 57], // F2 C3 F3 A3
  C: [48, 55, 60, 64], // C3 G3 C4 E4
  G: [43, 50, 55, 59], // G2 D3 G3 B3
  Cadd9: [48, 55, 59, 62], // C3 G3 B3 D4
};

// ---------- synthesis helpers ----------
// Ensemble pad voice: filtered sine partials with a warm roll-off
function padVoice(out, buf, startSec, durSec, freq, amp, tone = 0.18) {
  const start = Math.floor(startSec * SR);
  const len = Math.floor(durSec * SR);
  const attack = Math.min(0.8, durSec * 0.25);
  const release = Math.min(1.2, durSec * 0.35);
  const partials = [
    { f: freq * 0.999, g: 1.0 },
    { f: freq * 1.003, g: 0.8 },
    { f: freq * 2.0, g: tone },
    { f: freq * 3.0, g: tone * 0.35 },
  ];
  let lp = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const env =
      Math.min(1, t / attack) * Math.min(1, Math.max(0, (durSec - t) / release));
    const wobble = 1 + 0.002 * Math.sin(2 * Math.PI * 1.7 * t + freq);
    let s = 0;
    for (const p of partials) s += p.g * Math.sin(2 * Math.PI * p.f * wobble * t + freq * 0.37);
    // gentle lowpass to tame brightness
    lp += 0.22 * (s * amp * env - lp);
    if (start + i < buf.length) out[start + i] += lp;
  }
}

// Percussive sub pulse (heartbeat kick)
function pulseKick(out, buf, startSec, freq, amp, decay = 0.55) {
  const start = Math.floor(startSec * SR);
  const len = Math.floor(decay * 2.2 * SR);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const env = Math.exp(-t / decay);
    const f = freq * (1 + 0.28 * Math.exp(-t / 0.055));
    if (start + i < buf.length) out[start + i] += amp * env * Math.sin(2 * Math.PI * f * t);
  }
}

// Sparkle pluck (bell-shaped sine, exponential decay)
function pluck(out, buf, startSec, freq, amp, decay = 0.5) {
  const start = Math.floor(startSec * SR);
  const len = Math.floor(decay * 4 * SR);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const env = Math.exp(-t / decay);
    const s =
      Math.sin(2 * Math.PI * freq * t) + 0.4 * Math.sin(2 * Math.PI * freq * 2 * t) + 0.15 * Math.sin(2 * Math.PI * freq * 3.01 * t);
    if (start + i < buf.length) out[start + i] += amp * env * s;
  }
}

// Filtered noise bed (storm/wind) — brown-noise base + whistle band air
function noiseBed(out, buf, startSec, durSec, { low = 0.02, whistle = 0.01, amp = 1, lfo = 0.1 } = {}) {
  const start = Math.floor(startSec * SR);
  const len = Math.floor(durSec * SR);
  let brown = 0, lp = 0, wh = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.02 * white) / 1.02;
    lp += 0.04 * (white - lp);
    wh += 0.012 * (white - wh);
    const breath = 1 + 0.45 * Math.sin(2 * Math.PI * lfo * t + 1.2);
    const s = (low * brown * 24 + lp * whistle * 40) * breath;
    if (start + i < buf.length) out[start + i] += s * amp;
  }
}

function delayEffect(buf, delaySec, mix) {
  const d = Math.floor(delaySec * SR);
  for (let i = buf.length - 1; i >= d; i--) buf[i] += mix * buf[i - d];
}

function masterNormalize(buf, targetPeak) {
  let peak = 1e-9;
  for (const v of buf) peak = Math.max(peak, Math.abs(v));
  const g = targetPeak / peak;
  for (let i = 0; i < buf.length; i++) buf[i] *= g;
  return peak;
}

function writeMp3(floatBuf, dest, { gain = 1 } = {}) {
  const ints = Buffer.alloc(floatBuf.length * 2);
  for (let i = 0; i < floatBuf.length; i++) {
    const v = Math.max(-1, Math.min(1, floatBuf[i] * gain));
    ints.writeInt16LE(Math.round(v * 32767), i * 2);
  }
  const raw = dest.replace(/\.mp3$/, ".raw");
  fs.writeFileSync(raw, ints);
  execFileSync("ffmpeg", ["-y", "-v", "error", "-f", "s16le", "-ar", `${SR}`, "-ac", "1", "-i", raw, "-codec:a", "libmp3lame", "-b:a", "128k", dest]);
  fs.unlinkSync(raw);
  console.log(`wrote ${path.basename(dest)} -> ${path.relative(process.cwd(), dest)}`);
}

const seconds = (n) => Math.ceil(n * SR);

// ---------- MUSIC THEME (58.5 s tension -> wonder) ----------
{
  const TOTAL = seconds(58.5);
  const buf = new Float32Array(TOTAL);

  // Sections (locked timing):
  // S1 calm-curious      0.0 - 9.4   Am pad + soft pulse
  // S2 the stop          9.4 - 18.7  Dm pad + heartbeat pulse quickens
  // S3 the wind (peak)   18.7- 26.4  dissonant swell + faster pulse
  // S4 water (release)   26.4- 37.5  F -> C washes, slow
  // S5 wonder            37.5- 47.9  Cadd9 -> G warm pads + sparkles
  // S6 resolution        47.9- 58.5  held Cadd9, fade

  const chord = (name, t0, t1, amp) => {
    for (const n of CHORDS[name]) padVoice(buf, buf, t0, t1 - t0, NOTE(n), amp);
  };

  chord("Am", 0.2, 9.9, 0.16);
  chord("Dm", 9.4, 18.9, 0.20);
  chord("Dm", 18.7, 26.9, 0.22);
  chord("F", 26.4, 32.0, 0.20);
  chord("C", 31.8, 37.4, 0.18);
  chord("Cadd9", 37.5, 43.0, 0.20);
  chord("G", 42.8, 48.6, 0.18);
  chord("Cadd9", 48.2, 58.4, 0.16);

  // heartbeat pulses
  for (let t = 9.6; t < 26.2; t += 1.05) pulseKick(buf, buf, t, 44, 0.35, 0.42);
  for (let t = 18.9; t < 26.2; t += 0.55) pulseKick(buf, buf, t, 44, 0.3, 0.3);
  // mystery ticks during intro
  for (let t = 2.0; t < 9.0; t += 1.0) pluck(buf, buf, t, NOTE(93), 0.05, 0.35);
  // wind-swell noise under the storm section
  noiseBed(buf, buf, 18.4, 8.6, { low: 0.05, whistle: 0.03, amp: 0.55, lfo: 0.4 });
  // sparkles (wonder arpeggio, pentatonic)
  const spar = [84, 88, 91, 96, 91, 88]; // C E G C G E
  for (let bar = 0; bar < 3; bar++)
    for (let i = 0; i < 6; i++)
      pluck(buf, buf, 38.0 + bar * 3.3 + i * 0.55, NOTE(spar[i]), 0.10, 0.4);
  // final gentle sparkle + sub tail
  pluck(buf, buf, 48.6, NOTE(84 + 12), 0.16, 1.1);
  pulseKick(buf, buf, 49.2, 33, 0.3, 1.4);

  delayEffect(buf, 0.24, 0.22);
  delayEffect(buf, 0.36, 0.12);
  masterNormalize(buf, 0.72);
  writeMp3(buf, path.join(outDir, "music", "theme.mp3"));
}

// ---------- SOUND EFFECTS ----------
const sfx = {};

// record-stop skid: descending pitch + noise screech, 2.2 s
sfx["skid"] = () => {
  const b = new Float32Array(seconds(2.2));
  const N = b.length;
  for (let i = 0; i < N; i++) {
    const t = i / SR, p = t / 2.2;
    const f = 900 * Math.pow(0.07, p) + 70;
    const wob = 0.6 * Math.sin(2 * Math.PI * 27 * t);
    b[i] = (Math.sin(2 * Math.PI * f * wob * t) * 0.5 + (Math.random() * 2 - 1) * 0.35 * Math.pow(1 - p, 1.4)) * Math.min(t / 0.02, 1) * Math.exp(-t / 0.75);
  }
  masterNormalize(b, 0.8);
  return b;
};

// elastic boing: 1.6 s
sfx["boing"] = () => {
  const b = new Float32Array(seconds(1.6));
  const N = b.length;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const f = 340 * Math.exp(-t * 2.2) * (1 + 0.25 * Math.sin(2 * Math.PI * 9 * t)) + 40;
    b[i] = Math.sin(2 * Math.PI * f * t) * Math.exp(-t / 0.42);
  }
  masterNormalize(b, 0.75);
  return b;
};

// debris/transition whoosh (usable both directions), 1.8 s
sfx["whoosh"] = () => {
  const b = new Float32Array(seconds(1.8));
  let lp = 0, hp = 0;
  const N = b.length;
  for (let i = 0; i < N; i++) {
    const t = i / SR, p = t / 1.8;
    const white = Math.random() * 2 - 1;
    lp += 0.15 * (white - lp);
    hp = lp - (hp + 0.02 * (lp - hp)) / 1.02;
    const env = Math.sin(Math.PI * Math.pow(p, 1.35));
    b[i] = hp * 1.4 * env;
  }
  masterNormalize(b, 0.7);
  return b;
};

// sustained storm bed 14 s (loops well for scene bg)
sfx["storm"] = () => {
  const b = new Float32Array(seconds(14));
  noiseBed(b, b, 0, 14, { low: 0.06, whistle: 0.035, amp: 1, lfo: 0.35 });
  masterNormalize(b, 0.55);
  return b;
};

// water migration slosh 10 s
sfx["slosh"] = () => {
  const b = new Float32Array(seconds(10));
  let brown = 0, lp = 0;
  const N = b.length;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.015 * white) / 1.015;
    lp += 0.008 * (white - lp);
    const breath = 1 + 0.6 * Math.sin(2 * Math.PI * 0.22 * t + 0.8);
    b[i] = (brown * 5 + lp * 0.35) * breath;
  }
  masterNormalize(b, 0.5);
  return b;
};

// soft chime (end of "six months") 3.2 s
sfx["chime"] = () => {
  const b = new Float32Array(seconds(3.2));
  const f = NOTE(88); // E6-ish
  for (let i = 0; i < b.length; i++) {
    const t = i / SR;
    const fm = Math.sin(2 * Math.PI * f * 1.4 * t) * Math.exp(-t / 0.4) * 3;
    b[i] = (Math.sin(2 * Math.PI * f * t + fm) * 0.7 + 0.3 * Math.sin(2 * Math.PI * f * 2.76 * t)) * Math.exp(-t / 0.9);
  }
  masterNormalize(b, 0.6);
  return b;
};

// soft wind bed 14 s (scene 6 underlay)
sfx["windsoft"] = () => {
  const b = new Float32Array(seconds(14));
  noiseBed(b, b, 0, 14, { low: 0.05, whistle: 0.008, amp: 1, lfo: 0.15 });
  masterNormalize(b, 0.42);
  return b;
};

// bird chirp 1.1 s
sfx["chirp"] = () => {
  const b = new Float32Array(seconds(1.1));
  const warble = [0.1, 0.35, 0.62];
  for (const w of warble) {
    const start = Math.floor(w * SR);
    const dur = Math.floor(0.18 * SR);
    for (let i = 0; i < dur && start + i < b.length; i++) {
      const t = i / SR;
      const f = 2600 + 1200 * Math.sin(2 * Math.PI * 60 * t) + 900 * t;
      b[start + i] += 0.8 * Math.sin(2 * Math.PI * f * t) * Math.exp(-t / 0.07);
    }
  }
  masterNormalize(b, 0.55);
  return b;
};

// comical backflip slide 1.3 s
sfx["flip"] = () => {
  const b = new Float32Array(seconds(1.3));
  const N = b.length;
  for (let i = 0; i < N; i++) {
    const t = i / SR, p = t / 1.3;
    const f = 220 + 660 * Math.pow(p, 0.6) + 120 * Math.sin(2 * Math.PI * 11 * t);
    b[i] = Math.sin(2 * Math.PI * f * t) * Math.exp(-p * 2.4) * Math.min(t / 0.01, 1);
  }
  masterNormalize(b, 0.7);
  return b;
};

// deep sub rumble bed 12 s (scene 4 water migration, scene 5 space hum)
sfx["rumble"] = () => {
  const b = new Float32Array(seconds(12));
  let brown = 0;
  const N = b.length;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const white = Math.random() * 2 - 1;
    brown = (brown + 0.01 * white) / 1.01;
    const wobble = 1 + 0.35 * Math.sin(2 * Math.PI * 0.18 * t);
    b[i] = brown * 3 * wobble + 0.12 * Math.sin(2 * Math.PI * 36 * t) * Math.sin(2 * Math.PI * 0.1 * t);
  }
  masterNormalize(b, 0.5);
  return b;
};

for (const [name, gen] of Object.entries(sfx)) {
  const buf = gen();
  writeMp3(buf, path.join(outDir, "sound-effects", `${name}.mp3`));
}

console.log("audio plan complete");
