import React, { useMemo } from "react";
import { C, rand } from "../theme";

export const Flash: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{ position: "absolute", inset: 0, background: "#fff", opacity, pointerEvents: "none" }} />
);

/** Flat expanding ring (ellipse) for ground impacts. progress 0..1 */
export const Shockwave: React.FC<{ x: number; y: number; progress: number; max?: number }> = ({ x, y, progress, max = 1200 }) => {
  const s = progress * max;
  return (
    <div style={{
      position: "absolute", left: x - s / 2, top: y - (s * 0.35) / 2, width: s, height: s * 0.35, borderRadius: "50%",
      border: `${Math.max(2, 18 * (1 - progress))}px solid rgba(255,220,160,${1 - progress})`, boxShadow: `0 0 40px rgba(255,155,61,${1 - progress})`,
    }} />
  );
};

/** Debris on parabolic arcs. t = seconds since launch. */
export const Debris: React.FC<{ x: number; y: number; t: number; count?: number; seed?: number; gravity?: number; glow?: boolean; fade?: number }> = ({
  x, y, t, count = 26, seed = 3, gravity = 700, glow = true, fade = 6,
}) => {
  const parts = useMemo(() => {
    const r = rand(seed);
    return Array.from({ length: count }, () => ({
      vx: (r() - 0.5) * 1100, vy: -(400 + r() * 900), s: 8 + r() * 26, rot: r() * 360, c: r() > 0.5 ? "#8A6A4C" : "#D8D2BE",
    }));
  }, [count, seed]);
  if (t < 0) return null;
  return (
    <>
      {parts.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: x + p.vx * t, top: y + p.vy * t + 0.5 * gravity * t * t, width: p.s, height: p.s,
          background: p.c, borderRadius: "30%", transform: `rotate(${p.rot + t * 200}deg)`,
          boxShadow: glow ? `0 0 ${p.s}px ${C.orange}` : "none", opacity: Math.max(0, 1 - t / fade),
        }} />
      ))}
    </>
  );
};

export const SpeedLines: React.FC<{ opacity: number; frame: number }> = ({ opacity, frame }) => {
  const lines = useMemo(() => {
    const r = rand(11);
    return Array.from({ length: 22 }, () => ({ x: r() * 1080, h: 200 + r() * 500, o: r(), s: 1 + r() * 2 }));
  }, []);
  return (
    <>
      {lines.map((l, i) => (
        <div key={i} style={{
          position: "absolute", left: l.x, top: ((frame * 40 * l.s + l.o * 2000) % 2400) - 300, width: 4, height: l.h,
          background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.7))", opacity,
        }} />
      ))}
    </>
  );
};
