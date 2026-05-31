import React, { useEffect, useState, useRef } from "react";
import { RABBIT_SPRITE, RABBIT_COLORS } from "../game/sprites";
import { PIXEL_SCALE, COLORS } from "../config";

interface Props {
  onEnd: () => void;
}

const R = PIXEL_SCALE * 3;
const F = "'ZCOOL KuaiLe', cursive, sans-serif";

// 像素云朵（莫兰迪白）
const PixelCloud: React.FC<{ left: string; top: string; delay: number }> = ({
  left, top, delay,
}) => (
  <div className="cloud-drift" style={{ position: "absolute", left, top, animationDelay: `${delay}s` }}>
    <svg width={96} height={36} viewBox="0 0 96 36" shapeRendering="crispEdges">
      {[
        "..CCCCCCCCCCCCCCCCCCCC..........",
        ".CCCCCCCCCCCCCCCCCCCCCC........",
        "CCCCCCCCCCCCCCCCCCCCCCCC.......",
        "CCCCCCCCCCCCCCCCCCCCCCCCCC.....",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCC...",
        "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC.",
        ".CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        "..CCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      ].map((row, ri) =>
        row.split("").map((ch, ci) => {
          if (ch !== "C") return null;
          return (
            <rect key={`${ri}-${ci}`} x={ci * 2} y={ri * 2} width={2} height={2}
              fill="#F5F3F0" opacity={0.88} shapeRendering="crispEdges" />
          );
        }),
      )}
    </svg>
  </div>
);

export const OpeningScreen: React.FC<Props> = ({ onEnd }) => {
  const [phase, setPhase] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const times = [600, 1100, 2600, 5000];
    let idx = 0;
    const next = () => {
      idx++;
      if (idx < times.length) {
        setPhase(idx);
        timerRef.current = window.setTimeout(next, times[idx] - times[idx - 1]);
      } else {
        onEnd();
      }
    };
    timerRef.current = window.setTimeout(next, times[0]);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [onEnd]);

  const rabbitCentered = phase >= 2;
  const showTitle = phase >= 3;

  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: `linear-gradient(180deg, ${COLORS.skyTop} 0%, ${COLORS.sky} 100%)`,
      fontFamily: F,
    }}>
      {/* 太阳 */}
      <div className="sun-pulse" style={{ position: "absolute", right: "14%", top: "10%", width: 72, height: 72 }}>
        <svg width={72} height={72} viewBox="0 0 72 72" shapeRendering="crispEdges">
          {[
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
          ].map((row, ri) => row.split("").map((ch, ci) => {
            if (ch !== "Y") return null;
            return <rect key={`${ri}-${ci}`} x={ci * 4} y={ri * 4} width={4} height={4}
              fill="#D4C0A0" shapeRendering="crispEdges" />;
          }))}
        </svg>
      </div>

      <PixelCloud left="5%" top="12%" delay={0} />
      <PixelCloud left="52%" top="6%" delay={0.3} />
      <PixelCloud left="30%" top="18%" delay={0.6} />

      {/* 草地 */}
      <div className="grass-slide-up" style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "40%",
        background: `linear-gradient(180deg, ${COLORS.grassGreen} 0%, ${COLORS.grassDark} 80%)`,
        borderRadius: "40% 50% 0 0 / 30px 30px 0 0",
        borderTop: "4px solid #96A88D",
        boxShadow: "0 -6px 20px rgba(80,70,60,0.1)",
      }} />

      {/* 小兔 */}
      <div className="rabbit-enter" style={{
        position: "absolute", left: rabbitCentered ? "50%" : "-60px", bottom: "32%",
        transform: "translateX(-50%)",
        transition: rabbitCentered ? "none" : "left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        <svg width={16 * R} height={16 * R} viewBox={`0 0 ${16 * R} ${16 * R}`}
          shapeRendering="crispEdges" style={{ imageRendering: "pixelated" }}>
          {RABBIT_SPRITE.map((row, ri) => row.map((ch, ci) => {
            const c = RABBIT_COLORS[ch];
            if (!c) return null;
            return <rect key={`${ri}-${ci}`} x={ci * R} y={ri * R} width={R} height={R}
              fill={c} shapeRendering="crispEdges" />;
          }))}
        </svg>
      </div>

      {/* 标题 */}
      {showTitle && (
        <div className="title-pop" style={{ position: "absolute", top: "26%", left: 0, right: 0, textAlign: "center" }}>
          <h1 style={{
            fontFamily: F, fontSize: "80px", margin: 0,
            color: "#C9A97A",
            textShadow: "4px 4px 0px #9B8B78, 0 0 12px rgba(200, 180, 150, 0.3)",
            letterSpacing: "10px", lineHeight: 1.2,
          }}>
            寻宝大冒险
          </h1>
          <p style={{
            fontFamily: F, fontSize: "26px", color: "#F5F0E8",
            textShadow: "2px 2px 0px rgba(80,70,60,0.4)",
            margin: "8px 0 0", letterSpacing: "4px",
          }}>
            🐰 方向键控制小兔移动！找到宝藏！🐰
          </p>
        </div>
      )}
    </div>
  );
};
