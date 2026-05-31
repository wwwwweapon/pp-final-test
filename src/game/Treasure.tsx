import React from "react";
import { TREASURE_SPRITE, TREASURE_COLORS } from "./sprites";
import { PIXEL_SCALE, COLORS } from "../config";

const SIZE = 16 * PIXEL_SCALE;

export const Treasure: React.FC = () => {
  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* 光晕 */}
      <div
        style={{
          position: "absolute",
          width: SIZE + 20,
          height: SIZE + 20,
          borderRadius: "50%",
          background: COLORS.treasureGlow,
          opacity: 0.35,
          animation: "treasureGlow 1.5s ease-in-out infinite",
          imageRendering: "pixelated",
        }}
      />
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ imageRendering: "pixelated", position: "relative", zIndex: 1 }}
        shapeRendering="crispEdges"
      >
        {TREASURE_SPRITE.map((row, r) =>
          row.map((ch, c) => {
            const color = TREASURE_COLORS[ch];
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
