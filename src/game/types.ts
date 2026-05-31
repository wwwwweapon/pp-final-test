export type TileType = "empty" | "stone" | "grass" | "river" | "treasure";

export interface Position {
  row: number;
  col: number;
}

export type Direction = "up" | "down" | "left" | "right";

export type FlowState = "opening" | "game" | "victory";

export interface Tile {
  type: TileType;
}

export interface GameState {
  grid: Tile[][];
  rabbitPos: Position;
  treasurePos: Position;
  steps: number;
  time: number; // 毫秒
  isGameOver: boolean;
}
