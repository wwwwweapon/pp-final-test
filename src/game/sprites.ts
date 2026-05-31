// ============================================================
// 像素精灵数据 — 16×16，莫兰迪色系
// 代码: W=奶油白 P=灰粉 B=深棕 Y=金 b=棕 D=深棕
//        G=灰 g=浅灰 L=绿 l=深绿 R=蓝 r=浅蓝 C=云白
// ============================================================

// ──── 兔子（正面，大头萌系）────
export const RABBIT_SPRITE: string[][] = [
  "....PP....PP....".split(""),  //  0 耳朵
  "...PPPP..PPPP...".split(""),  //  1
  "...PP......PP...".split(""),  //  2 耳朵内部
  "......WWWW......".split(""),  //  3 头顶
  "....WWWWWWWW....".split(""),  //  4 头
  "...WWWWWWWWWW...".split(""),  //  5
  "...WWWWWWWWWW...".split(""),  //  6
  "...WWBBWWBBWW...".split(""),  //  7 大眼睛（2×2）
  "...WWBWWWBWW...".split(""),  //  8 眼高光
  "...WWWWPPWWWW...".split(""),  //  9 鼻子区
  "...WWPPWWPPWW...".split(""),  // 10 腮红
  "....WWWWWWWW....".split(""),  // 11 下巴
  ".....WWWWWW.....".split(""),  // 12 身体
  ".....WWWWWW.....".split(""),  // 13
  ".....WW..WW.....".split(""),  // 14 小脚
  "................".split(""),  // 15
];

export const RABBIT_COLORS: Record<string, string> = {
  W: "#F5F0E8", // 奶油白
  P: "#C9A0A0", // 灰粉
  B: "#5C4033", // 深棕
};

// ──── 宝箱 ────
export const TREASURE_SPRITE: string[][] = [
  ".....YYYY......".split(""),
  "....YYYYYY.....".split(""),
  "....bbbbbb.....".split(""),
  "....DDDDDD.....".split(""),
  "....DDYYDD.....".split(""),
  "....DDYYDD.....".split(""),
  "....DDDDDD.....".split(""),
  ".....DDDD......".split(""),
  ".....YYYY......".split(""),
  ".....YYYY......".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
];

export const TREASURE_COLORS: Record<string, string> = {
  Y: "#C9A97A",
  b: "#A8947A",
  D: "#8B7860",
};

// ──── 石头 ────
export const STONE_SPRITE: string[][] = [
  "......GG........".split(""),
  "....GGGGG.......".split(""),
  "...GGGGGGG......".split(""),
  "..GGGgGGGGG.....".split(""),
  "..GGGGGGGGGG....".split(""),
  ".GGGGGGGGGGG....".split(""),
  "..GGGGGGGGGG....".split(""),
  "...GGGGGGGG.....".split(""),
  ".....GGG........".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
];

export const STONE_COLORS: Record<string, string> = {
  G: "#BCB0A6",
  g: "#D2C8C0",
};

// ──── 草丛 ────
export const GRASS_SPRITE: string[][] = [
  ".....lL.........".split(""),
  "....lLll........".split(""),
  "...lLllLl.......".split(""),
  "..lLllLlLl......".split(""),
  "...lLllLll......".split(""),
  "....LlLl........".split(""),
  ".....Ll.........".split(""),
  "....lL.........".split(""),
  "....lL.........".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
  "................".split(""),
];

export const GRASS_COLORS: Record<string, string> = {
  L: "#A3B89A",
  l: "#889E7E",
};

// ──── 河流 ────
export const RIVER_SPRITE: string[][] = [
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
  "RrRrRrRrRrRrRrRr".split(""),
  "rRrRrRrRrRrRrRrR".split(""),
];

export const RIVER_COLORS: Record<string, string> = {
  R: "#A3BBC8",
  r: "#BCCDD5",
};
