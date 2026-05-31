import React from "react";
import { STONE_SPRITE, STONE_COLORS, GRASS_SPRITE, GRASS_COLORS, RIVER_SPRITE, RIVER_COLORS } from "./sprites";
import { PIXEL_SCALE } from "../config";

const SIZE = 16 * PIXEL_SCALE;

export const Stone: React.FC = () => (
  <svg
    width={SIZE}
    height={SIZE}
    viewBox={`0 0 ${SIZE} ${SIZE}`}
    style={{ imageRendering: "pixelated" }}
    shapeRendering="crispEdges"
  >
    {STONE_SPRITE.map((row, r) =>
      row.map((ch, c) => {
        const color = STONE_COLORS[ch];
        if (!color) return null;
        return (
          <rect key={`${r}-${c}`} x={c * PIXEL_SCALE} y={r * PIXEL_SCALE} width={PIXEL_SCALE} height={PIXEL_SCALE} fill={color} shapeRendering="crispEdges" />
        );
      }),
    )}
  </svg>
);

export const Grass: React.FC = () => (
  <svg
    width={SIZE}
    height={SIZE}
    viewBox={`0 0 ${SIZE} ${SIZE}`}
    style={{ imageRendering: "pixelated" }}
    shapeRendering="crispEdges"
  >
    {GRASS_SPRITE.map((row, r) =>
      row.map((ch, c) => {
        const color = GRASS_COLORS[ch];
        if (!color) return null;
        return (
          <rect key={`${r}-${c}`} x={c * PIXEL_SCALE} y={r * PIXEL_SCALE} width={PIXEL_SCALE} height={PIXEL_SCALE} fill={color} shapeRendering="crispEdges" />
        );
      }),
    )}
  </svg>
);

// 河流带波浪动画：奇偶数帧切换 R/r 颜色
const RiverFrame0 = RIVER_SPRITE;
const RiverFrame1 = RIVER_SPRITE.map(row => row.map(ch => ch === "R" ? "r" : ch === "r" ? "R" : ch));

export const River: React.FC = () => {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(id);
  }, []);
  const frame = tick % 2 === 0 ? RiverFrame0 : RiverFrame1;

  const colors = RIVER_COLORS;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {frame.map((row, r) =>
        row.map((ch, c) => {
          const color = colors[ch];
          if (!color) return null;
          return (
            <rect key={`${r}-${c}`} x={c * PIXEL_SCALE} y={r * PIXEL_SCALE} width={PIXEL_SCALE} height={PIXEL_SCALE} fill={color} shapeRendering="crispEdges" />
          );
        }),
      )}
    </svg>
  );
};
