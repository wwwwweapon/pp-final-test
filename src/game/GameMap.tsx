import React from "react";
import { Tile, Position, Direction } from "./types";
import { Rabbit } from "./Rabbit";
import { Treasure } from "./Treasure";
import { Stone, Grass, River } from "./Obstacles";
import { CELL_SIZE, GAP, COLORS } from "../config";

interface Props {
  grid: Tile[][];
  rabbitPos: Position;
  treasurePos: Position;
  direction: Direction;
  moving: boolean;
}

const tileRenderer: Record<string, React.FC> = {
  stone: Stone,
  grass: Grass,
  river: River,
};

export const GameMap: React.FC<Props> = ({
  grid, rabbitPos, treasurePos, direction, moving,
}) => {
  const size = grid.length;
  const totalSize = size * CELL_SIZE + (size + 1) * GAP;

  return (
    <div style={{
      position: "relative", width: totalSize, height: totalSize,
      background: COLORS.gridBg,
      border: `${GAP * 2}px solid #B8AFA0`,
      borderRadius: "6px",
      boxShadow: "inset 0 0 0 2px #C5BDB0, 0 6px 20px rgba(80,70,60,0.2)",
      imageRendering: "pixelated",
    }}>
      {grid.map((row, r) =>
        row.map((tile, c) => (
          <div key={`${r}-${c}`} style={{
            position: "absolute",
            left: GAP + c * (CELL_SIZE + GAP),
            top: GAP + r * (CELL_SIZE + GAP),
            width: CELL_SIZE, height: CELL_SIZE,
            background: tile.type === "treasure"
              ? COLORS.cellBg
              : (r + c) % 2 === 0 ? COLORS.cellBg : COLORS.cellBgAlt,
            border: `2px solid ${COLORS.cellBorder}`,
            borderRadius: "2px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {tileRenderer[tile.type] && React.createElement(tileRenderer[tile.type])}
          </div>
        )),
      )}

      <div style={{
        position: "absolute",
        left: GAP + treasurePos.col * (CELL_SIZE + GAP),
        top: GAP + treasurePos.row * (CELL_SIZE + GAP),
        width: CELL_SIZE, height: CELL_SIZE,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", zIndex: 2,
      }}>
        <Treasure />
      </div>

      <div style={{
        position: "absolute",
        left: GAP + rabbitPos.col * (CELL_SIZE + GAP),
        top: GAP + rabbitPos.row * (CELL_SIZE + GAP),
        width: CELL_SIZE, height: CELL_SIZE,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", zIndex: 3,
        transition: "left 0.1s ease, top 0.1s ease",
      }}>
        <Rabbit direction={direction} moving={moving} />
      </div>
    </div>
  );
};
