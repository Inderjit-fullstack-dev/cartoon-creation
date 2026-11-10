# What-if storyboard — "What if humans could breathe underwater?"

**Composition:** `WhatIfBreatheUnderwater` · 1920×1080 · 30 fps · **68.0 s** (2040 frames)
**Style:** flat cartoon, code-drawn SVG scenes, ambient bubble field, word-by-word narration captions
**Audio:** ElevenLabs TTS voice-over per scene (`public/audio/S1.mp3` … `S6.mp3`, regenerated via `gen-audio.mjs`); scene durations = narration length + ~0.6 s

## Scene table

| # | ID | Title | Does Audio | Duration |
|---|----|-------|-----------|----------|
| 1 | S1 | The Question | S1.mp3 (10.5 s) | 12 s |

## Scene priorities / notes

- Single source of truth: `src/whatif/story.ts` (timings, palette, narration). Scenes read from it via the `SceneSpec` prop.
- Springs & interpolates are all deterministic → identical frame output on every render.
- Caption reveal is word-proportional across each scene, so narration timing matches scene length.
- If narration audio is added later, extend `SceneSpec` with a `src` field and render `<Audio>` per `Sequence`.
