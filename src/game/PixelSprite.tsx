import React from "react";

type ColorMap = Record<string, string>;

interface Props {
  /** 16x16 字符网格，每格一个字代表颜色 */
  data: string[][];
  /** 颜色映射表 */
  colors: ColorMap;
  /** 每个逻辑像素的显示尺寸 */
  pixelSize?: number;
  /** CSS 额外样式 */
  style?: React.CSSProperties;
}

export const PixelSprite: React.FC<Props> = ({
  data,
  colors,
  pixelSize = 3,
  style,
}) => {
  const rows = data.length;
  const cols = data[0]?.length ?? 0;
  const width = cols * pixelSize;
  const height = rows * pixelSize;

  const rects: React.ReactElement[] = [];
  let key = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = data[r][c];
      const color = colors[ch];
      if (color) {
        rects.push(
          <rect
            key={key++}
            x={c * pixelSize}
            y={r * pixelSize}
            width={pixelSize}
            height={pixelSize}
            fill={color}
            shapeRendering="crispEdges"
          />,
        );
      }
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        display: "block",
        imageRendering: "pixelated",
        ...style,
      }}
      shapeRendering="crispEdges"
    >
      {rects}
    </svg>
  );
};
