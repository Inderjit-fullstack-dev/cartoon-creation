import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../theme";

export const Label: React.FC<{ text: string; sub?: string; x?: number; y: number; delay?: number; size?: number; color?: string }> = ({
  text, sub, x = 540, y, delay = 0, size = 96, color = C.white,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
  return (
    <div style={{
      position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${p})`, opacity: Math.min(1, p), textAlign: "center",
      fontFamily: FONT, fontWeight: 900, color, fontSize: size, letterSpacing: 2, textShadow: "0 6px 24px rgba(0,0,0,0.6)", whiteSpace: "nowrap",
    }}>
      {text}
      {sub && <div style={{ fontSize: size * 0.4, fontWeight: 700, opacity: 0.9, marginTop: 8 }}>{sub}</div>}
    </div>
  );
};
