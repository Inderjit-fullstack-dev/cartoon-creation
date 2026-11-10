# Storyboard — What If an Asteroid Hit the Moon?

1080×1920 · 30 fps · 80.6 s (2418 frames) · 10 scenes · Stylized 3D cartoon (SVG/CSS art in Remotion) · Subtitles lower-third (bold white, dark outline, yellow active word)

Status: **approved by user**. Scene lengths are derived from the real ElevenLabs clip durations (lead 0.5 s + clip + tail 0.8 s); see `src/timing.json`.

## Visual direction
Rounded, glossy 3D-look shapes with radial-gradient lighting. Deep navy-to-indigo space, soft twinkling stars. Palette: navy #0B1030, moon cream #E9E4D4, crater grey #B9B3A1, asteroid brown #6B4F3A, impact orange #FF9B3D, flash white, subtitle yellow #FFD84D.

## Characters (no humans)
- **Moon:** cream sphere with soft craters, same design in every scene.
- **Asteroid:** lumpy dark-brown rock; orange glow when hot.
- **Earth:** blue sphere, green continents, white clouds, atmosphere glow.

## Scenes
| # | Title | Start (s) | Len (s) | Visual / camera | Animation | SFX | Transition |
|---|---|---|---|---|---|---|---|
| 1 | Incoming | 0.0 | 4.2 | Wide Moon, asteroid speck top-right, slow push-in | Asteroid grows toward Moon; "WHAT IF?" title | rumble | fade in |
| 2 | No shield | 4.2 | 10.8 | Split: Earth above (burning rock), Moon below (rock survives) | Small rock burns up; big asteroid streaks through | whoosh | dissolve |
| 3 | One kilometre | 15.0 | 5.4 | Asteroid with "1 km" label, then rushes down at surface | Speed lines, rising tension | riser | flash cut |
| 4 | Impact | 20.4 | 7.2 | Surface close-up, slow motion | White flash, shockwave, crater, debris | impact | dissolve |
| 5 | Silence | 27.6 | 10.7 | Wide dark landscape, debris arcs | Debris on parabolas; muted-speaker icon, "NO SOUND" | none (music drops) | fade |
| 6 | Seen from Earth | 38.3 | 10.1 | Moon with small flash on limb, Earth below | Flash pulse, "2013" label | ping | dissolve |
| 7 | Moon rocks on Earth | 48.4 | 7.4 | Moon top, Earth bottom, debris travelling | Glowing meteorite falls to Earth | whoosh | dissolve |
| 8 | Orbit unchanged | 55.8 | 7.1 | Earth centre, Moon on calm orbit path | Orbit line, steady motion, "NO CHANGE" | none | dissolve |
| 9 | Ancient giants | 62.9 | 11.0 | Moon with highlighted basin "2,500 km", then giant-collision cartoon | Basin pulse; two bodies collide | shimmer, impact (low) | fade |
| 10 | Scars | 73.9 | 6.8 | Big Moon, craters glow, CTA | "Follow for more" | shimmer | fade out |

## Audio plan
- Narration: ElevenLabs, existing `.env` voice, same voice in all scenes, no speed-up.
- Music: synthesized cinematic drone (original); builds into scene 4, drops almost to silence in scene 5, returns, swells in scene 9, fades out in 10. Ducked under narration.
- SFX: synthesized with FFmpeg (rumble, whoosh, riser, impact, ping, shimmer).
- Subtitles: ≥330 px bottom margin to clear the Shorts UI. Word timing is distributed over each clip's real duration by character weight (no word-level timestamps from the API).
