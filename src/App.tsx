import React, { useState, useCallback } from "react";
import { OpeningScreen } from "./animations/OpeningScreen";
import { VictoryScreen } from "./animations/VictoryScreen";
import { GameBoard } from "./game/GameBoard";
import { FlowState } from "./game/types";
import { playVictoryJingle, resumeAudio } from "./audio";

const F = "'ZCOOL KuaiLe', cursive, sans-serif";

export const App: React.FC = () => {
  const [flowState, setFlowState] = useState<FlowState>("opening");
  const [gameKey, setGameKey] = useState(0);

  const handleOpeningEnd = useCallback(() => {
    resumeAudio();
    setFlowState("game");
  }, []);

  const handleGameWin = useCallback(() => {
    resumeAudio();
    playVictoryJingle();
    setFlowState("victory");
  }, []);

  const handleVictoryEnd = useCallback(() => {
    setGameKey((k) => k + 1);
    setFlowState("opening");
  }, []);

  if (flowState === "opening") return <OpeningScreen onEnd={handleOpeningEnd} />;
  if (flowState === "victory") return <VictoryScreen onEnd={handleVictoryEnd} />;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, #C8D9E3 0%, #B5C9D6 38%, #B2C4A8 38%, #96A88D 100%)",
        padding: "6px 16px 4px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: F,
          fontSize: "24px",
          color: "#F5F0E8",
          textShadow: "2px 2px 0px rgba(80,70,60,0.35)",
          marginBottom: "8px",
          userSelect: "none",
          letterSpacing: "3px",
        }}
      >
        🐰 方向键控制小兔移动 🐰
      </div>
      <GameBoard key={gameKey} onPlayAgain={handleGameWin} />
      <div
        className="desktop-hint"
        style={{
          fontFamily: F,
          fontSize: "14px",
          color: "rgba(245, 240, 232, 0.55)",
          marginTop: "8px",
          userSelect: "none",
          letterSpacing: "2px",
        }}
      >
        ↑ ↓ ← → 移动小兔
      </div>
    </div>
  );
};
