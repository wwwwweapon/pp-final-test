// 宝箱礼物链接
export const TREASURE_LINK = "https://i.tb.cn/h.RgzL6mE?tk=mWPE5zTa03B";

// 网格
export const GRID_SIZE = 8;
export const CELL_SIZE = 54;
export const GAP = 2;
export const PIXEL_SCALE = 3;

// 障碍物数量
export const STONE_COUNT = { min: 8, max: 10 };
export const GRASS_COUNT = { min: 6, max: 8 };
export const RIVER_LENGTH = { min: 2, max: 4 };

// 动画
export const FPS = 30;
export const OPENING_SECONDS = 5;
export const VICTORY_SECONDS = 4;

// ──── 莫兰迪色系 ────
export const COLORS = {
  // 天空大地
  sky: "#B5C9D6",
  skyTop: "#C8D9E3",
  grassGreen: "#B2C4A8",
  grassDark: "#96A88D",
  // 网格
  gridBg: "#D4CFC4",
  gridBgAlt: "#CBC5B9",
  cellBg: "#ECE8DF",
  cellBgAlt: "#E4DFD4",
  // HUD & UI
  hudBg: "rgba(120, 110, 100, 0.50)",
  hudText: "#F5F0E8",
  overlay: "rgba(80, 70, 60, 0.58)",
  // 标题 & 按钮
  titleYellow: "#C9A97A",
  titleRed: "#C48B7A",
  treasureGold: "#C9A97A",
  treasureGlow: "#D4C0A0",
  buttonBg: "#B8957A",
  buttonHover: "#C9A990",
  // 格子边框
  cellBorder: "#D0CABE",
};

// ──── 精灵色（莫兰迪）────
export const SPRITE = {
  rabbitBody: "#F5F0E8",    // 奶油白
  rabbitPink: "#C9A0A0",    // 灰粉
  rabbitEye: "#5C4033",     // 深棕
  treasureGold: "#C9A97A",
  treasureBrown: "#A8947A",
  treasureDark: "#8B7860",
  stone: "#BCB0A6",
  stoneLight: "#D2C8C0",
  bush: "#A3B89A",
  bushDark: "#889E7E",
  river: "#A3BBC8",
  riverLight: "#BCCDD5",
  cloud: "#F5F3F0",
};
