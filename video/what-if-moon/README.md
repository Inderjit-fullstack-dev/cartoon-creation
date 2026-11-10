# What If an Asteroid Hit the Moon?

YouTube Short: an imagined 1 km asteroid hits the airless Moon: crater, silent debris, the 2013 flash seen from Earth, lunar meteorites, unchanged orbit and tides, ancient giant impacts, and a follow CTA.

| Item | Value |
|---|---|
| Platform | YouTube Shorts |
| Resolution / ratio / fps | 1080×1920 / 9:16 / 30 |
| Duration / scenes | 80.6 s / 10 |
| Style | Stylized 3D-look cartoon (SVG/CSS art in Remotion), no humans |
| Narration | English, male, cinematic; ElevenLabs `eleven_multilingual_v2`, voice from `video/.env` (`ELEVENLABS_VOICE_ID`; ID not recorded here) |
| Subtitles | Burned in, lower-third, bold white with outline, yellow active word. Word timing is estimated from clip length, not API timestamps. No SRT |
| Music | Synthesized cinematic drone (FFmpeg), original |
| SFX | Synthesized rumble, whoosh, riser, impact, ping, shimmer (FFmpeg), original |

## Structure
- `production-brief.md`, `story.md`, `narration.md`, `storyboard.md`: production documents
- `src/`: Remotion code (`VideoComposition.tsx`, `scenes/`, `components/`, `timing.json`)
- `public/audio/{narration,music,sound-effects}/`: audio assets
- `scripts/`: `gen-narration.mjs` (ElevenLabs, reads `../.env` server-side, skips existing clips), `build-timing.mjs`, `narration-lines.json`
- `scenes/`: preview stills; `output/`: `final.mp4`, `render-report.md`

## Workflow
Dependencies (Remotion 4.0.542, React 19, TypeScript) come from the parent `video/` project.
```
cd video/what-if-moon
npm run dev        # Remotion Studio
npm run narration  # only generates missing clips (costs credits)
npm run timing     # rebuild src/timing.json after audio changes
npm run render     # -> output/final.mp4
```
To change a line: edit `scripts/narration-lines.json`, delete that scene's mp3, then run `narration`, `timing`, `render`.

Note: this project lives in `what-if-moon/` instead of `what-if/` because another process was writing a different video into `what-if/`.
