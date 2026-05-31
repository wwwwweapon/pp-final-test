import React from "react";
import { Direction } from "./types";
import { RABBIT_SPRITE, RABBIT_COLORS } from "./sprites";
import { PIXEL_SCALE } from "../config";

interface Props {
  direction: Direction;
  moving: boolean;
}

const directionAngle: Record<Direction, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: -90,
};

export const Rabbit: React.FC<Props> = ({ direction, moving }) => {
  const angle = directionAngle[direction];
  const spriteW = 16 * PIXEL_SCALE;
  const spriteH = 16 * PIXEL_SCALE;

  return (
    <div
      style={{
        width: spriteW,
        height: spriteH,
        imageRendering: "pixelated",
        animation: moving
          ? "rabbitBounce 0.2s ease-in-out"
          : "rabbitIdle 0.8s ease-in-out infinite",
      }}
    >
      <svg
        width={spriteW}
        height={spriteH}
        viewBox={`0 0 ${spriteW} ${spriteH}`}
        style={{
          transform: `rotate(${angle}deg)`,
          transition: "transform 0.08s ease",
          imageRendering: "pixelated",
        }}
        shapeRendering="crispEdges"
      >
        {RABBIT_SPRITE.map((row, r) =>
          row.map((ch, c) => {
            const color = RABBIT_COLORS[ch];
            if (!color) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * PIXEL_SCALE}
                y={r * PIXEL_SCALE}
                width={PIXEL_SCALE}
                height={PIXEL_SCALE}
                fill={color}
                shapeRendering="crispEdges"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
};
