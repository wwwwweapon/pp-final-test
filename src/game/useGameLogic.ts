import { useState, useEffect, useCallback, useRef } from "react";
import { GameState, Direction, Position } from "./types";
import { generateMap } from "./generateMap";
import { GRID_SIZE } from "../config";
import { playMove, playGrass, playBlocked, playVictory, resumeAudio } from "../audio";

const DIRECTION_DELTA: Record<string, Position> = {
  ArrowUp: { row: -1, col: 0 },
  ArrowDown: { row: 1, col: 0 },
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1 },
};

const DIRECTION_NAME: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

function keyToDirection(key: string): Direction | null {
  return DIRECTION_NAME[key] ?? null;
}

export function useGameLogic() {
  const [state, setState] = useState<GameState>(() => {
    const grid = generateMap();
    let treasurePos: Position = { row: GRID_SIZE - 1, col: GRID_SIZE - 1 };
    // 从 grid 中找到宝箱位置
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c].type === "treasure") {
          treasurePos = { row: r, col: c };
        }
      }
    }
    return {
      grid,
      rabbitPos: { row: 0, col: 0 },
      treasurePos,
      steps: 0,
      time: 0,
      isGameOver: false,
    };
  });

  const [direction, setDirection] = useState<Direction>("down");
  const [moving, setMoving] = useState(false);
  const grassCounterRef = useRef(false); // 草丛减速：每隔一次才移动
  const timerRef = useRef<number | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // 计时器
  useEffect(() => {
    if (state.isGameOver) return;
    timerRef.current = window.setInterval(() => {
      setState((s) => (s.isGameOver ? s : { ...s, time: s.time + 100 }));
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isGameOver]);

  const moveRabbit = useCallback(
    (dir: Direction) => {
      setDirection(dir);
      const s = stateRef.current;
      if (s.isGameOver) return;

      resumeAudio();

      const delta = DIRECTION_DELTA[dirToArrowKey(dir)] ?? { row: 0, col: 0 };
      const targetRow = s.rabbitPos.row + delta.row;
      const targetCol = s.rabbitPos.col + delta.col;

      // 边界检查
      if (targetRow < 0 || targetRow >= GRID_SIZE || targetCol < 0 || targetCol >= GRID_SIZE) {
        playBlocked();
        return;
      }

      const targetTile = s.grid[targetRow][targetCol];

      // 石头、河流不可通行
      if (targetTile.type === "stone" || targetTile.type === "river") {
        playBlocked();
        return;
      }

      // 草丛减速
      if (targetTile.type === "grass") {
        grassCounterRef.current = !grassCounterRef.current;
        if (!grassCounterRef.current) {
          return; // 跳过本次移动
        }
        playGrass();
      } else {
        playMove();
      }

      // 移动
      setMoving(true);
      setTimeout(() => setMoving(false), 200);

      const newPos: Position = { row: targetRow, col: targetCol };
      const isTreasure = targetTile.type === "treasure";

      setState((s) => ({
        ...s,
        rabbitPos: newPos,
        steps: s.steps + 1,
        isGameOver: isTreasure,
      }));

      if (isTreasure) {
        playVictory();
        if (timerRef.current) clearInterval(timerRef.current);
      }
    },
    [],
  );

  // 键盘监听
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dir = keyToDirection(e.key);
      if (dir) {
        e.preventDefault();
        moveRabbit(dir);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [moveRabbit]);

  const resetGame = useCallback(() => {
    const grid = generateMap();
    let treasurePos: Position = { row: GRID_SIZE - 1, col: GRID_SIZE - 1 };
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c].type === "treasure") {
          treasurePos = { row: r, col: c };
        }
      }
    }
    grassCounterRef.current = false;
    setState({
      grid,
      rabbitPos: { row: 0, col: 0 },
      treasurePos,
      steps: 0,
      time: 0,
      isGameOver: false,
    });
    setDirection("down");
  }, []);

  return { state, direction, moving, moveRabbit, resetGame };
}

function dirToArrowKey(dir: Direction): string {
  switch (dir) {
    case "up": return "ArrowUp";
    case "down": return "ArrowDown";
    case "left": return "ArrowLeft";
    case "right": return "ArrowRight";
  }
}
