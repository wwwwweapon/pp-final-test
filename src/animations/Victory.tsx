import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";
import { TREASURE_SPRITE, TREASURE_COLORS } from "../game/sprites";
import { COLORS, FPS, PIXEL_SCALE } from "../config";

const T = PIXEL_SCALE * 3;
const F = "'ZCOOL KuaiLe', cursive, sans-serif";
const cfColors = ["#C9A0A0", "#C9A97A", "#A3B89A", "#A3BBC8", "#C48B7A", "#B8957A"];

const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const particles = useMemo(() =>
    Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * width, startY: -(Math.random() * 60 + 20), endY: height + 20,
      size: Math.random() * 6 + 3, color: cfColors[i % cfColors.length],
      delay: Math.random() * 25, speed: Math.random() * 0.6 + 0.4,
      wobble: Math.random() * 2 - 1, rotation: Math.random() * 360,
    })), [width, height]);

  return (<>
    {particles.map((p, i) => {
      const t = Math.max(0, frame - p.delay);
      const progress = Math.min(1, t * p.speed * 0.025);
      const y = interpolate(progress, [0, 1], [p.startY, p.endY]);
      const x = p.x + Math.sin(t * 0.04 * p.wobble) * 30;
      const alpha = interpolate(progress, [0, 0.75, 1], [1, 1, 0]);
      return <div key={i} style={{ position: "absolute", left: x, top: y,
        width: p.size, height: p.size * 0.6, background: p.color,
        borderRadius: "1px", opacity: alpha,
        transform: `rotate(${p.rotation + t * p.wobble * 2}deg)` }} />;
    })}
  </>);
};

const Stars: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const frame = useCurrentFrame();
  const particles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.2,
      distance: 60 + Math.random() * 100, size: Math.random() * 8 + 4,
      delay: Math.random() * 8,
    })), []);

  return (<>
    {particles.map((p, i) => {
      const t = Math.max(0, frame - 15 - p.delay);
      const prog = spring({ frame: t, fps: FPS, config: { damping: 15 }, from: 0, to: 1 });
      const dist = interpolate(prog, [0, 1], [0, p.distance]);
      const x = cx + Math.cos(p.angle) * dist;
      const y = cy + Math.sin(p.angle) * dist;
      const alpha = interpolate(prog, [0, 0.5, 1], [1, 1, 0]);
      const s = interpolate(prog, [0, 0.2, 1], [0.3, 1.2, 0.5]);
      return <svg key={i} x={x - p.size / 2} y={y - p.size / 2}
        width={p.size * s} height={p.size * s} viewBox="0 0 20 20"
        style={{ position: "absolute", opacity: alpha }}>
        <polygon points="10,0 13,7 20,7 14.5,11.5 16.5,19 10,14.5 3.5,19 5.5,11.5 0,7 7,7"
          fill="#C9A97A" />
      </svg>;
    })}
  </>);
};

export const Victory: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cx = width / 2, cy = height / 2 - 30;

  const chestScale = spring({ frame: Math.max(0, frame - 8), fps: FPS,
    config: { damping: 10, stiffness: 80 }, from: 0.2, to: 1 });
  const glowAlpha = interpolate(Math.sin((frame - 15) * 0.14), [-1, 1], [0.2, 0.5]);
  const titleOpacity = interpolate(frame, [45, 65], [0, 1]);
  const titleY = spring({ frame: Math.max(0, frame - 45), fps: FPS,
    config: { damping: 10, stiffness: 70 }, from: 25, to: 0 });

  return (
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse at 50% 40%, #3A3230, #1F1C1A)",
      display: "flex", alignItems: "center", justifyContent: "center",
      imageRendering: "pixelated", fontFamily: F,
    }}>
      <Confetti />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", left: cx - 90, top: cy - 90,
          width: 180, height: 180, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.treasureGlow}, transparent)`,
          opacity: glowAlpha, filter: "blur(15px)" }} />
        <div style={{ position: "absolute",
          left: cx - 16 * T / 2, top: cy - 16 * T / 2,
          transform: `scale(${chestScale})`, imageRendering: "pixelated" }}>
          <svg width={16 * T} height={16 * T} viewBox={`0 0 ${16 * T} ${16 * T}`}
            shapeRendering="crispEdges">
            {TREASURE_SPRITE.map((row, ri) => row.map((ch, ci) => {
              const c = TREASURE_COLORS[ch];
              if (!c) return null;
              return <rect key={`${ri}-${ci}`} x={ci * T} y={ri * T} width={T} height={T}
                fill={c} shapeRendering="crispEdges" />;
            }))}
          </svg>
        </div>
        <Stars cx={cx} cy={cy} />
      </div>

      <div style={{ position: "absolute", top: "52%", left: 0, right: 0,
        textAlign: "center", opacity: titleOpacity, transform: `translateY(${titleY}px)`, zIndex: 3 }}>
        <h1 style={{ fontFamily: F, fontSize: "68px", fontWeight: 400, margin: 0,
          color: "#C9A97A",
          textShadow: "0 0 30px rgba(200,180,150,0.5), 0 3px 6px rgba(0,0,0,0.4), 4px 4px 0 #9B8B78",
          letterSpacing: "8px" }}>
          恭喜找到宝藏！
        </h1>
        <p style={{ fontFamily: F, fontSize: "26px", color: "#D4C0A0",
          textShadow: "0 2px 4px rgba(0,0,0,0.4)",
          margin: "10px 0 0", letterSpacing: "5px" }}>
          小兔的冒险之旅，圆满完成！
        </p>
      </div>
    </AbsoluteFill>
  );
};
