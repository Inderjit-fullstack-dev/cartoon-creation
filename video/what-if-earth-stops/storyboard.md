# Storyboard — "What if the Earth Stopped Rotating?"

**Canvas:** 1080 × 1920 @ 30 fps (9:16) · **Style:** 2D cartoon (SVG, hand-coded motion)
**Protagonist:** **Pip** — round everyman in a tangerine hoodie, cream skin, one hair curl. Same design every scene.
**Palettes per scene** listed in each card; animations authored on normalized scene timelines so any duration change reflows automatically.

> Frame counts below are **provisional** and recalculated from actual narration MP3 lengths before implementation (pattern already proven in the repo's `story.ts`).

## Timeline

```
S1 We Are Moving    S2 The Stop       S3 The Wind       S4 Water Takes Sides   S5 One Day, One Year   S6 The Longest Sunset
[0s ──────────── 7.5][7.5 ──────── 15.5][15.5 ───── 24.0][24.0 ──────────── 31.5][31.5 ──────────── 39.5][39.5 ──────────── 48.5]
     calm → speed          WHAM → tumble        full gale             slow water                 frozen split              endless sunset
```

---

## Scene 1 — "We Are Moving" · ~225 frames

| Field | Detail |
|---|---|
| Number/title | S1 — We Are Moving |
| Duration | ~7.5 s (provisional; = narration + 0.5 s) |
| Visual composition | Lower third: cartoon globe with faces of continents, spinning hard (blurred motion streaks). Upper: Pip in hoodie standing in a field, hair blowing, planted like a passenger. Big word stamp "1,670 km/h" arcs around the globe as a speedometer ribbon |
| Characters | Pip (standing, slight lean into wind), Globe (cute face, worried-but-cool) |
| Background | Rolling green field, blue sky, puffy clouds; palette #7ec8ff / #8ede9a / turret of white clouds |
| Camera angle | Eye-level wide, Pip low-right, Globe center-left |
| Camera movement | Slow push-in (scale 1.0 → 1.08) over the scene |
| Animation | Globe spins with multi-streak rotation blur; speed ribbon rotates around globe; Pip's hoodie flutters; clouds drift right (they only "move" because Earth carries them) |
| Narration | "Right now, you're spinning through space at 1,670 kilometers per hour — and you can't feel it, because Earth has been turning your whole life." |
| SFX | Soft sustained whoosh under globe spin, bed volume low |
| Music cue | Theme enters calm-and-curious; tension layer builds under the final clause |
| Subtitles | Disabled |
| Transition | Record-scratch stall — globe rotation decelerates to a crawl in last 0.5 s |
| Assets | `GlobeFace`, `Pip`, `FieldBg`, `SpeedRibbon`, `CloudLayer` — all SVG components |

## Scene 2 — "The Stop" · ~240 frames

| Field | Detail |
|---|---|
| Number/title | S2 — The Stop |
| Duration | ~8 s |
| Visual composition | Globe frozen mid-spin, drawn slightly overshoot-squashed. Pip, cars, cows, streetlights, laundry — everything detaches and slides right with motion trails. Comic "SKKKRT" skid energy without text (no captions): use screech marks and debris streaks |
| Characters | Pip tumbling with limbs out; world serves as comedic counterweight |
| Background | Same field, surprised palette shift: sky dulls from #7ec8ff → #b8dff8 over scene |
| Camera angle | Same eye-level wide; slight Dutch tilt (-4°) for disorientation |
| Camera movement | Jolt: 4-frame shake at the stop, then holds still ((parallel to a world gone rigid) |
| Animation | Everything pivots eastward using inertia easing (fast at t=stop, long deceleration); Pip does one cartoon backflip; trails fade |
| Narration | "But what if it stopped right now? You wouldn't brake. Everything loose keeps moving eastward — at up to 1,670 kilometers per hour." |
| SFX | Record-stop skid, elastic-boing on Pip's flip, debris clatter (synthesized, low-pass) |
| Music cue | Tension layer fully in; low pulse starts |
| Subtitles | Disabled |
| Transition | Hard cut to Scene 3 behind a wall of dust |
| Assets | Reuse `Pip` + new `Car`, `Cow`, `Lamppost`, `LaundryLine`, `TrailStreak`, `SkidMarks` SVG components |

## Scene 3 — "The Wind" · ~255 frames

| Field | Detail |
|---|---|
| Number/title | S3 — The Wind |
| Duration | ~8.5 s |
| Visual composition | Pip clings to a lamppost, hoodie flapping violently horizontal; trees bow flat; houses lean into gale; debris (Sherlock-ish frying pan, umbrella, cardboard) streaks past |
| Characters | Pip (resilient, comedic grip), no Globe |
| Background | Storm palette #4a6fa5 / #2f4d75; rain-hash streaks angled 12° off horizontal |
| Camera angle | Low angle, looking up at Pip against gale |
| Camera movement | Handheld wobble (sin-driven, ±6 px translate) |
| Animation | Continuous horizontal debris conveyor; Pip's hood whips on spring physics; lamp bends like rubber |
| Narration | "The air wouldn't stop either. It would keep going, scouring the planet with permanent, planet-wide hurricanes." |
| SFX | Layered storm roar (brown noise + wind whistle), 3 debris whooshes |
| Music cue | Tension peaks — highest-energy 8 seconds of the piece |
| Subtitles | Disabled |
| Transition | Debris wipes across frame left→right; next scene revealed |
| Assets | `Pip`, `Lamppost` (reuse from S2), `Trees`, `DebrisItem` (procedural: pan/umbrella/plank), `Streaks` |

## Scene 4 — "Water Takes Sides" · ~225 frames

| Field | Detail |
|---|---|
| Number/title | S4 — Water Takes Sides |
| Duration | ~7.5 s |
| Visual composition | Split vertical diptych: left half — equator drying, boats sitting in mud; right half — polar coasts rising tide creeping up a lighthouse. Center: globe silhouette, bulge line at equator visibly flattening (bulge → ellipse) |
| Characters | No Pip (breather beat) — globe is the character |
| Background | Teal/slate palette #3e8e9e / #164e63; slow ripples |
| Camera angle | Top-down-ish stylized map view, subtle 3D-look via layered parallax |
| Camera movement | Very slow lateral slide left→right |
| Animation | Bulge line morphs toward flat over scene (interpolate); boats list; lighthouse sink 12 px; droplet particles migrate vertically outward |
| Narration | "And the oceans take sides. Without the spin, Earth's equatorial bulge relaxes — water slowly migrates toward the poles. The map redraws itself." |
| SFX | Low water slosh, deep sub-bass migration rumble |
| Music cue | Tension releases into drifting curiosity (music modulates minor → suspended) |
| Subtitles | Disabled |
| Transition | Vertical split collapses to single frame → S5 |
| Assets | `MudBoats`, `Lighthouse`, `BulgeGlobe`, `DropletField` |

## Scene 5 — "One Day, One Year" · ~240 frames

| Field | Detail |
|---|---|
| Number/title | S5 — One Day, One Year |
| Duration | ~8 s |
| Visual composition | Space view: Sun left, Earth right statically facing it. Half the planet glows day-orange, half is night-blue with tiny city lights. Pip tiny on the terminator line, waving. Calendar-ish orbit dashed line shows Earth stuck on one face of Sun |
| Characters | Pip (cameo, tiny), Earth (neutral face, resolute) |
| Background | Space palette #0b0e2a / #131a3d, starfield |
| Camera angle | Distant wide, planet centered |
| Camera movement | None — longest, stillest shot (contrast to S2—S4 motion) |
| Animation | Day/night gradient edge creeps clockwise a snail's 3°/s; city lights twinkle on night side; dashed orbit arc draws along path |
| Narration | "Daylight only flips because the planet rotates. Take that away, and one day becomes a full orbit: six months of day, six months of night." |
| SFX | Deep space hum, single soft chime at "six months" |
| Music cue | Wonder motif stated fully, strings pad |
| Subtitles | Disabled |
| Transition | Slow iris-to-black… continuing directly into S6 reveal |
| Assets | `SunDisc`, `SplitEarth`, `Stars`, `CityLights`, `OrbitDash`, `TinyPip` |

## Scene 6 — "The Longest Sunset" · ~270 frames

| Field | Detail |
|---|---|
| Number/title | S6 — The Longest Sunset |
| Duration | ~9 s (incl. ~2 s music-only tail) |
| Visual composition | Pip sits on a cliff edge, back to camera, legs dangling — profile sunrise/sunset band: sun half-set at horizon, sky in deep gradient stripes (tangerine → rose → violet → navy). Silhouettes of other outposts? No — Pip alone. Subtle rule-of-thirds sun |
| Characters | Pip (still, contemplative — same tangerine hoodie, now rim-lit) |
| Background | Gradient stripe sky; sea-less calm haze below |
| Camera angle | Low from behind Pip, sun centered horizon |
| Camera movement | Slow, bottom-weighted tilt up as sun refuses to fully set |
| Animation | Sun sinks to 87% then holds (never fully sets); rays pulse gently; gradient bands slowly deepen; two birds glide past |
| Narration | "The world wouldn't end in fire or ice. It would just stop turning — and begin the longest, most beautiful sunset in its history." |
| SFX | Distant soft wind, bird chirp at the last line |
| Music cue | Full wonder resolution; theme decays to single held note under the music-only tail; fade to black |
| Subtitles | Disabled |
| Transition | Fade to black, hold 0.6 s |
| Assets | `Pip` (rear view), `SunLower` (morphing half-sun), `GradientSky`, `Birds` |

---

## Asset manifest (Phase 7)

All assets are **code-drawn SVG components** (matching the repo's established production style — zero raster images needed):

| Component | Used in |
|---|---|
| `Pip` (front, rear, tumbling, tiny variants) | S1, S2, S3, S5, S6 |
| `GlobeFace` / `BulgeGlobe` / `SplitEarth` | S1, S4, S5 |
| `FieldBg` + `CloudLayer` | S1, S2 |
| `SpeedRibbon`, `SkidMarks`, `TrailStreak` | S1, S2 |
| `Car`, `Cow`, `Lamppost`, `LaundryLine` | S2, S3 |
| `Trees`, `DebrisItem`, `RainStreaks` | S3 |
| `MudBoats`, `Lighthouse`, `DropletField` | S4 |
| `SunDisc`, `SunLower`, `Stars`, `CityLights`, `OrbitDash` | S5, S6 |
| `GradientSky`, `Birds` | S6 |

Audio assets (Phase 8/10):

| File | Purpose |
|---|---|
| `public/audio/narration/scene-01.mp3` … `scene-06.mp3` | ElevenLabs narration, one per scene |
| `public/audio/music/theme.mp3` | Procedurally composed tension→wonder bed |
| `public/audio/sound-effects/*.mp3` | Skid, boing, storm, slosh, chime, wind — all synthesized |
