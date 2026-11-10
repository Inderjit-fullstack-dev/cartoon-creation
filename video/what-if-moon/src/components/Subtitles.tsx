import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import type { Word } from "../timing";

const CHUNK = 4;

/** Shows the current group of ~4 words with the active word highlighted. Lower-third, clear of the Shorts UI zone. */
export const Subtitles: React.FC<{ words: Word[] }> = ({ words }) => {
  const frame = useCurrentFrame();
  const idx = words.findIndex((w) => frame >= w.start && frame < w.end);
  if (idx < 0) return null;
  const g = Math.floor(idx / CHUNK) * CHUNK;
  const group = words.slice(g, g + CHUNK);
  return (
    <div style={{
      position: "absolute", left: 90, right: 90, bottom: 330, textAlign: "center", fontFamily: FONT, fontWeight: 900, fontSize: 82, lineHeight: 1.15,
      color: C.white, textTransform: "uppercase", WebkitTextStroke: "10px #000", paintOrder: "stroke fill", textShadow: "0 6px 16px rgba(0,0,0,0.7)",
    }}>
      {group.map((w, i) => (
        <span key={g + i} style={{ color: g + i === idx ? C.yellow : C.white, marginRight: 18, display: "inline-block" }}>{w.w}</span>
      ))}
    </div>
  );
};
