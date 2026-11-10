# Production Brief — "What if the Earth Stopped Rotating?"

> Status: **Approved by user** (Phase 2 confirmation)
> 📦 **Relocated** from `video/what-if/` to `video/what-if-earth-stops/` at the user's request after files began disappearing from `video/what-if/` due to an external process.

Idea: *What if the Earth suddenly stopped rotating?*

## Video settings

| Setting | Value |
|---|---|
| Platform | YouTube Shorts |
| Dimensions | 1080 × 1920 (9:16 vertical) |
| Frame rate | 30 fps (repo standard) |
| Target duration | 30–60 s → **locked 58.1 s / 1744 frames**, 6 scenes |
| Visual style | 2D cartoon — hand-coded SVG frame-by-frame animation (consistent with repo's existing component style) |
| Output folder | `video/what-if-earth-stops/` |

## Narration

| Setting | Value |
|---|---|
| Provider | ElevenLabs TTS (default) |
| Voice | Stored `ELEVENLABS_VOICE_ID` from `video/.env` (same voice as previous production) |
| Language | English · neutral accent · normal speed |
| Voice style | Storytelling (stability 0.5 · similarity 0.75 · style 0.12) |
| Model | `eleven_turbo_v2_5` |
| Subtitles | **Disabled** (no burned-in captions, no SRT) |
| Sample approval | Voice sample approved by user before full generation |
| Full generation | ✅ 790 chars / 6 clips, all QC'd (no clipping, consistent levels) |

## Audio

| Setting | Value |
|---|---|
| Background music | Yes — tension→wonder theme, ~58 s, original (procedurally composed) |
| Sound effects | Yes — skid, whoosh, boing, storm, slosh, chime, wind, chirp |
| Assets | All original — no licensing concerns |

## Story direction

- Hook: you are riding a spinning planet at 1,670 km/h without feeling it
- Arc: inertia → supersonic/hurricane winds → oceans migrate → day = year → planet of stripes
- Ending: no CTA — closes on "the longest, most beautiful sunset in its history"
- Science ledger with fact/assumption flags is in `story.md`

## Infrastructure

- npm + Remotion 4.0.542, React 19.3.1, TypeScript 5.9.3 (repo-standard, reused)
- `story.ts` single-source-of-truth pattern (proven in `video/src/whatif/`)
- Server-side ElevenLabs script (`gen-audio.mjs`, key read from `.env`, never exposed)
- `--public-dir` CLI flag confirmed available → assets stay in production folder
- FFmpeg/FFprobe for QC + final verification (both available)
