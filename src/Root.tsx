import "./index.css";
import { Composition } from "remotion";
import { Opening } from "./animations/Opening";
import { Victory } from "./animations/Victory";
import { App } from "./App";
import { OPENING_SECONDS, VICTORY_SECONDS, FPS } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 导出用：开场动画 5s */}
      <Composition
        id="Opening"
        component={Opening}
        durationInFrames={OPENING_SECONDS * FPS}
        fps={FPS}
        width={1280}
        height={720}
      />
      {/* 导出用：通关动画 4s */}
      <Composition
        id="Victory"
        component={Victory}
        durationInFrames={VICTORY_SECONDS * FPS}
        fps={FPS}
        width={1280}
        height={720}
      />
      {/* 互动体验：完整游戏流程（Stubio 内预览用，不支持视频导出） */}
      <Composition
        id="FullExperience"
        component={App}
        durationInFrames={900}
        fps={FPS}
        width={1280}
        height={720}
      />
    </>
  );
};
