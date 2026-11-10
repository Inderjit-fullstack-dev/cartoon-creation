import React from "react";

export const Earth: React.FC<{ size: number; x: number; y: number; atmosphere?: number }> = ({ size, x, y, atmosphere = 3 }) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size }}>
    <div style={{
      width: "100%", height: "100%", borderRadius: "50%", position: "relative", overflow: "hidden",
      background: "radial-gradient(circle at 32% 28%, #7FC3FF 0%, #2A78D6 45%, #0E3A8C 100%)",
      boxShadow: `0 0 ${size * 0.15}px ${size * atmosphere * 0.03}px rgba(120,190,255,0.55)`,
    }}>
      <div style={{ position: "absolute", left: "18%", top: "22%", width: "34%", height: "30%", borderRadius: "45% 55% 50% 50%", background: "#4DB36B" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "30%", height: "28%", borderRadius: "50% 40% 55% 45%", background: "#4DB36B" }} />
      <div style={{ position: "absolute", left: "10%", top: "60%", width: "36%", height: "10%", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
      <div style={{ position: "absolute", left: "50%", top: "14%", width: "38%", height: "9%", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 70% 75%, rgba(5,10,40,0.6) 0%, rgba(5,10,40,0) 60%)" }} />
    </div>
  </div>
);
