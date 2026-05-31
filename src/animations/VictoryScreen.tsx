import React, { useEffect, useState } from "react";
import { TREASURE_SPRITE, TREASURE_COLORS } from "../game/sprites";
import { PIXEL_SCALE, COLORS } from "../config";

interface Props {
  onEnd: () => void;
}

const T = PIXEL_SCALE * 3;
const F = "'ZCOOL KuaiLe', cursive, sans-serif";
const cfColors = ["#C9A0A0", "#C9A97A", "#A3B89A", "#A3BBC8", "#C48B7A", "#B8957A"];

export const VictoryScreen: React.FC<Props> = ({ onEnd }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 32 }, (_, i) => ({
      left: Math.random() * 90 + "%",
      delay: Math.random() * 1.5,
      color: cfColors[i % cfColors.length],
      size: Math.random() * 6 + 3,
      animDuration: 2 + Math.random() * 2.5,
    })),
  );

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 1000);
    const t2 = setTimeout(() => onEnd(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onEnd]);

  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "radial-gradient(ellipse at 50% 35%, #3A3230, #1F1C1A)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", fontFamily: F,
    }}>
      {particles.map((p, i) => (
        <div key={i} className="confetti-fall" style={{
          position: "absolute", left: p.left, top: "-10px",
          width: p.size, height: p.size * 0.6, background: p.color,
          borderRadius: "2px", animationDelay: `${p.delay}s`,
          animationDuration: `${p.animDuration}s`,
        }} />
      ))}

      <div className="chest-bounce" style={{ position: "relative", marginBottom: "20px" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", width: 160, height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.treasureGlow}, transparent 70%)`,
          animation: "treasureGlow 1s ease-in-out infinite",
        }} />
        <svg width={16 * T} height={16 * T} viewBox={`0 0 ${16 * T} ${16 * T}`}
          shapeRendering="crispEdges" style={{ imageRendering: "pixelated", position: "relative", zIndex: 1 }}>
          {TREASURE_SPRITE.map((row, ri) => row.map((ch, ci) => {
            const c = TREASURE_COLORS[ch];
            if (!c) return null;
            return <rect key={`${ri}-${ci}`} x={ci * T} y={ri * T} width={T} height={T}
              fill={c} shapeRendering="crispEdges" />;
          }))}
        </svg>
      </div>

      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)" }}>
        {Array.from({ length: 14 }, (_, i) => {
          const angle = (Math.PI * 2 * i) / 14;
          const dist = 70 + Math.random() * 50;
          return (
            <div key={i} className="star-burst" style={{
              position: "absolute", left: `${Math.cos(angle) * dist}px`,
              top: `${Math.sin(angle) * dist}px`, width: 12, height: 12,
              background: "#C9A97A", animationDelay: `${i * 0.07}s`,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }} />
          );
        })}
      </div>

      {showTitle && (
        <div className="title-pop" style={{ textAlign: "center", zIndex: 3, position: "relative" }}>
          <h1 style={{
            fontFamily: F, fontSize: "64px", margin: 0,
            color: "#C9A97A",
            textShadow: "0 0 30px rgba(200, 180, 150, 0.5), 0 3px 6px rgba(0,0,0,0.4), 3px 3px 0 #9B8B78",
            letterSpacing: "6px",
          }}>
            恭喜找到宝藏！
          </h1>
          <p style={{
            fontFamily: F, fontSize: "24px", color: "#D4C0A0",
            textShadow: "0 2px 4px rgba(0,0,0,0.4)",
            margin: "8px 0 0", letterSpacing: "4px",
          }}>
            🎉 小兔的冒险之旅，圆满完成！🎉
          </p>
        </div>
      )}
    </div>
  );
};
