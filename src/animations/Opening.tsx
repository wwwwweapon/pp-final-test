import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";
import { RABBIT_SPRITE, RABBIT_COLORS } from "../game/sprites";
import { COLORS, FPS, PIXEL_SCALE } from "../config";

const R = PIXEL_SCALE * 3;
const F = "'ZCOOL KuaiLe', cursive, sans-serif";

const PixelCloud: React.FC<{ x: number; y: number; scale: number; speed: number }> = ({
  x, y, scale, speed,
}) => {
  const frame = useCurrentFrame();
  const sx = x + frame * speed * 0.5;
  return (
    <svg x={sx} y={y} width={96 * scale} height={36 * scale}
      viewBox="0 0 96 36" style={{ position: "absolute" }} shapeRendering="crispEdges">
      {[
        "..CCCCCCCCCCCCCCCCCCCC..........",
        ".CCCCCCCCCCCCCCCCCCCCCC........",
        "CCCCCCCCCCCCCCCCCCCCCCCC.......",
        "CCCCCCCCCCCCCCCCCCCCCCCCCC.....",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCC...",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC.",
        ".CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "..CCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      ].map((row, ri) => row.split("").map((ch, ci) => {
        if (ch !== "C") return null;
        return <rect key={`${ri}-${ci}`} x={ci * 2 * scale} y={ri * 2 * scale}
          width={2 * scale} height={2 * scale} fill="#F5F3F0" opacity={0.88}
          shapeRendering="crispEdges" />;
      }))}
    </svg>
  );
};

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const grassY = spring({ frame: Math.max(0, frame - 25), fps: FPS,
    config: { damping: 12, stiffness: 60 }, from: height, to: height * 0.55 });

  const rabbitX = spring({ frame: Math.max(0, frame - 45), fps: FPS,
    config: { damping: 10, stiffness: 50 }, from: -100, to: width * 0.35 });

  const bounce = interpolate(
    spring({ frame: Math.max(0, frame - 45), fps: FPS, config: { damping: 6 } }),
    [0, 0.5, 1], [0, 1.12, 1]);

  const titleScale = spring({ frame: Math.max(0, frame - 80), fps: FPS,
    config: { damping: 8, stiffness: 80 } });

  const titleY = interpolate(titleScale, [0, 1], [height * 0.05, height * 0.16]);
  const titleOpacity = interpolate(frame, [80, 100], [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", imageRendering: "pixelated", fontFamily: F }}>
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${COLORS.skyTop} 0%, ${COLORS.sky} 100%)` }} />

      {/* 太阳 */}
      <div style={{ position: "absolute", right: 100, top: 50, width: 80, height: 80,
        opacity: interpolate(frame, [0, 20], [0, 1]) }}>
        <svg width={80} height={80} viewBox="0 0 80 80" shapeRendering="crispEdges">
          {([
            "............YYYY............",
            "...........YYYYYY...........",
            "..........YYYYYYYY..........",
            ".........YYYYYYYYYY.........",
            "........YYYYYYYYYYYY........",
            ".......YYYYYYYYYYYYYY.......",
            ".......YYYYYYYYYYYYYY.......",
            ".......YYYYYYYYYYYYYY.......",
            ".......YYYYYYYYYYYYYY.......",
            ".......YYYYYYYYYYYYYY.......",
            ".......YYYYYYYYYYYYYY.......",
            ".......YYYYYYYYYYYYYY.......",
            "........YYYYYYYYYYYY........",
            ".........YYYYYYYYYY.........",
            "..........YYYYYYYY..........",
            "...........YYYYYY...........",
            "............YYYY............",
          ] as string[]).map((row, ri) => row.split("").map((ch, ci) => {
            if (ch !== "Y") return null;
            return <rect key={`${ri}-${ci}`} x={ci * 4} y={ri * 4} width={4} height={4}
              fill="#D4C0A0" shapeRendering="crispEdges" />;
          }))}
        </svg>
      </div>

      <PixelCloud x={-50} y={70} scale={0.8} speed={0.8} />
      <PixelCloud x={180} y={30} scale={0.6} speed={0.5} />
      <PixelCloud x={600} y={90} scale={0.7} speed={0.6} />
      <PixelCloud x={900} y={20} scale={0.5} speed={0.4} />

      {/* 草地 */}
      <div style={{ position: "absolute", left: 0, right: 0, top: grassY, bottom: 0,
        background: `linear-gradient(180deg, ${COLORS.grassGreen} 0%, ${COLORS.grassDark} 70%)`,
        borderRadius: "40% 50% 0 0 / 30px 30px 0 0",
        borderTop: "4px solid #96A88D",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)" }} />

      {/* 小兔 */}
      <div style={{ position: "absolute", left: rabbitX, top: height * 0.56,
        transform: `translateY(${(bounce - 1) * 40}px) scale(${bounce})`, imageRendering: "pixelated" }}>
        <svg width={16 * R} height={16 * R} viewBox={`0 0 ${16 * R} ${16 * R}`}
          shapeRendering="crispEdges">
          {RABBIT_SPRITE.map((row, ri) => row.map((ch, ci) => {
            const c = RABBIT_COLORS[ch];
            if (!c) return null;
            return <rect key={`${ri}-${ci}`} x={ci * R} y={ri * R} width={R} height={R}
              fill={c} shapeRendering="crispEdges" />;
          }))}
        </svg>
      </div>

      {/* 标题 */}
      <div style={{ position: "absolute", top: titleY, left: 0, right: 0,
        textAlign: "center", opacity: titleOpacity, transform: `scale(${titleScale})` }}>
        <h1 style={{ fontFamily: F, fontSize: "84px", fontWeight: 400, margin: 0,
          color: "#C9A97A",
          textShadow: "5px 5px 0px #9B8B78, 0 0 14px rgba(200,180,150,0.3)",
          letterSpacing: "12px", lineHeight: 1.2 }}>
          寻宝大冒险
        </h1>
        <p style={{ fontFamily: F, fontSize: "28px", color: "#F5F0E8",
          textShadow: "3px 3px 0px rgba(80,70,60,0.4)",
          margin: "10px 0 0", letterSpacing: "5px" }}>
          用方向键控制小兔，找到宝藏！
        </p>
      </div>
    </AbsoluteFill>
  );
};
