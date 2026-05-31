import React from "react";

interface Props {
  steps: number;
  time: number;
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "2")}`;
}

export const HUD: React.FC<Props> = ({ steps, time }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 28px",
        background: "rgba(120, 110, 100, 0.45)",
        borderRadius: "16px",
        color: "#F5F0E8",
        fontFamily: "'ZCOOL KuaiLe', cursive, sans-serif",
        fontSize: "26px",
        letterSpacing: "3px",
        backdropFilter: "blur(10px)",
        marginBottom: "12px",
        userSelect: "none",
      }}
    >
      <span>🏃 步数 {steps}</span>
      <span>⏱ {formatTime(time)}</span>
    </div>
  );
};
