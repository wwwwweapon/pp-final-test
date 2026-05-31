import React from "react";
import { useGameLogic } from "./useGameLogic";
import { GameMap } from "./GameMap";
import { HUD } from "./HUD";
import { GameOver } from "./GameOver";

interface Props {
  onPlayAgain: () => void;
}

const F = "'ZCOOL KuaiLe', cursive, sans-serif";

export const GameBoard: React.FC<Props> = ({ onPlayAgain }) => {
  const { state, direction, moving } = useGameLogic();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <HUD steps={state.steps} time={state.time} />

      <div style={{ position: "relative" }}>
        <GameMap
          grid={state.grid}
          rabbitPos={state.rabbitPos}
          treasurePos={state.treasurePos}
          direction={direction}
          moving={moving}
        />
        {state.isGameOver && (
          <GameOver
            steps={state.steps}
            time={state.time}
            onPlayAgain={onPlayAgain}
          />
        )}
      </div>

      {/* 移动端方向键（触屏优化） */}
      <div
        className="mobile-dpad"
        style={{
          display: "grid",
          gridTemplateColumns: "64px 64px 64px",
          gridTemplateRows: "64px 64px 64px",
          gap: "5px",
          marginTop: "14px",
          userSelect: "none",
          touchAction: "manipulation",
        }}
      >
        <div />
        <DpadBtn label="▲" keyCode="ArrowUp" />
        <div />
        <DpadBtn label="◀" keyCode="ArrowLeft" />
        <div style={{ ...btnBase, background: "transparent", boxShadow: "none" }} />
        <DpadBtn label="▶" keyCode="ArrowRight" />
        <div />
        <DpadBtn label="▼" keyCode="ArrowDown" />
        <div />
      </div>
    </div>
  );
};

const btnBase: React.CSSProperties = {
  width: 58,
  height: 58,
  borderRadius: "14px",
  border: "3px solid #B8957A",
  background: "rgba(245, 240, 232, 0.80)",
  backdropFilter: "blur(6px)",
  fontSize: "26px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 3px 8px rgba(80,70,60,0.18)",
  color: "#8B7860",
  fontFamily: F,
  touchAction: "manipulation",
  WebkitTapHighlightColor: "transparent",
};

const DpadBtn: React.FC<{ label: string; keyCode: string }> = ({ label, keyCode }) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      style={btnBase}
      onPointerDown={(e) => {
        e.preventDefault();
        (e.target as HTMLElement).style.transform = "scale(0.92)";
        (e.target as HTMLElement).style.background = "rgba(184, 149, 122, 0.5)";
        window.dispatchEvent(new KeyboardEvent("keydown", { key: keyCode }));
      }}
      onPointerUp={(e) => {
        (e.target as HTMLElement).style.transform = "scale(1)";
        (e.target as HTMLElement).style.background = "rgba(245, 240, 232, 0.80)";
      }}
      onPointerLeave={(e) => {
        (e.target as HTMLElement).style.transform = "scale(1)";
        (e.target as HTMLElement).style.background = "rgba(245, 240, 232, 0.80)";
      }}
    >
      {label}
    </button>
  );
};
