import React from "react";
import { COLORS, TREASURE_LINK } from "../config";

interface Props {
  steps: number;
  time: number;
  onPlayAgain: () => void;
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "2")}`;
}

const F = "'ZCOOL KuaiLe', cursive, sans-serif";

export const GameOver: React.FC<Props> = ({ steps, time, onPlayAgain }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.overlay,
        backdropFilter: "blur(8px)",
        zIndex: 10,
        borderRadius: "12px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ECE8DF, #DFD8CC)",
          borderRadius: "24px",
          padding: "28px 32px",
          textAlign: "center",
          boxShadow: "0 10px 36px rgba(60, 50, 40, 0.35)",
          maxWidth: "320px",
          animation: "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <div style={{ fontSize: "56px", marginBottom: "2px" }}>🎉</div>
        <h2
          style={{
            fontFamily: F,
            color: "#8B7860",
            margin: "0 0 10px",
            fontSize: "30px",
            letterSpacing: "4px",
          }}
        >
          恭喜找到宝藏！
        </h2>
        <div
          style={{
            fontFamily: F,
            fontSize: "20px",
            color: "#9B8B78",
            marginBottom: "8px",
          }}
        >
          步数 {steps} &nbsp;|&nbsp; 时间 {formatTime(time)}
        </div>
        <a
          href={TREASURE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            margin: "14px 0 6px",
            padding: "14px 32px",
            background: `linear-gradient(135deg, ${COLORS.buttonBg}, ${COLORS.buttonHover})`,
            color: "#FFF",
            borderRadius: "34px",
            textDecoration: "none",
            fontFamily: F,
            fontSize: "22px",
            boxShadow: "0 5px 16px rgba(160, 130, 100, 0.4)",
            transition: "transform 0.12s ease",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.transform = "scale(1)")
          }
        >
          🎁 打开宝箱，领取礼物！
        </a>
        <div style={{ marginTop: "18px" }}>
          <button
            onClick={onPlayAgain}
            style={{
              padding: "12px 32px",
              borderRadius: "24px",
              border: "3px solid #B8957A",
              background: "transparent",
              color: "#8B7860",
              fontSize: "20px",
              cursor: "pointer",
              fontFamily: F,
              transition: "all 0.12s ease",
            }}
            onMouseEnter={(e) => {
              const t = e.target as HTMLElement;
              t.style.background = "#B8957A";
              t.style.color = "#FFF";
            }}
            onMouseLeave={(e) => {
              const t = e.target as HTMLElement;
              t.style.background = "transparent";
              t.style.color = "#8B7860";
            }}
          >
            ▶ 再玩一次
          </button>
        </div>
      </div>
    </div>
  );
};
