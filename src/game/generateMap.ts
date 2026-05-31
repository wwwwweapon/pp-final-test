import { Tile, TileType, Position } from "./types";
import { GRID_SIZE, STONE_COUNT, GRASS_COUNT, RIVER_LENGTH } from "../config";

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function bfsReachable(grid: TileType[][], start: Position, end: Position): boolean {
  const visited = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
  const queue: Position[] = [start];
  visited[start.row][start.col] = true;

  const blocked: TileType[] = ["stone", "river"];

  while (queue.length > 0) {
    const { row, col } = queue.shift()!;
    if (row === end.row && col === end.col) return true;

    const neighbors: Position[] = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ];

    for (const n of neighbors) {
      if (
        n.row >= 0 &&
        n.row < GRID_SIZE &&
        n.col >= 0 &&
        n.col < GRID_SIZE &&
        !visited[n.row][n.col] &&
        !blocked.includes(grid[n.row][n.col])
      ) {
        visited[n.row][n.col] = true;
        queue.push(n);
      }
    }
  }

  return false;
}

export function generateMap(): Tile[][] {
  for (let attempt = 0; attempt < 100; attempt++) {
    // 初始化全空
    const grid: TileType[][] = Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill("empty"),
    );

    const start: Position = { row: 0, col: 0 };
    const end: Position = { row: GRID_SIZE - 1, col: GRID_SIZE - 1 };

    // 生成所有可能的位置（排除起点和终点）
    const allPositions: Position[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!(r === start.row && c === start.col) && !(r === end.row && c === end.col)) {
          allPositions.push({ row: r, col: c });
        }
      }
    }

    // 放置石头
    const stoneCount = randBetween(STONE_COUNT.min, STONE_COUNT.max);
    const shuffled = shuffle(allPositions);
    for (let i = 0; i < stoneCount; i++) {
      const p = shuffled[i];
      grid[p.row][p.col] = "stone";
    }

    // 放置草丛（在剩余的格子里）
    const grassCount = randBetween(GRASS_COUNT.min, GRASS_COUNT.max);
    const grassStart = stoneCount;
    for (let i = 0; i < grassCount; i++) {
      const idx = grassStart + i;
      if (idx >= shuffled.length) break;
      const p = shuffled[idx];
      grid[p.row][p.col] = "grass";
    }

    // 放置河流（连续线段）
    const riverLen = randBetween(RIVER_LENGTH.min, RIVER_LENGTH.max);
    const horizontal = Math.random() > 0.5;
    let placed = 0;
    const remaining = shuffled.slice(grassStart + grassCount);
    for (const p of shuffle(remaining)) {
      if (placed >= riverLen) break;
      if (horizontal) {
        // 横向河流：检查是否超出边界
        if (p.col + 1 >= GRID_SIZE) continue;
        if (
          grid[p.row][p.col] === "empty" &&
          grid[p.row][p.col + 1] === "empty"
        ) {
          grid[p.row][p.col] = "river";
          grid[p.row][p.col + 1] = "river";
          placed += 2;
        }
      } else {
        if (p.row + 1 >= GRID_SIZE) continue;
        if (
          grid[p.row][p.col] === "empty" &&
          grid[p.row + 1][p.col] === "empty"
        ) {
          grid[p.row][p.col] = "river";
          grid[p.row + 1][p.col] = "river";
          placed += 2;
        }
      }
    }

    // 放置宝箱
    grid[end.row][end.col] = "treasure";

    // BFS 验证可达性
    if (bfsReachable(grid, start, end)) {
      return grid.map((row) => row.map((type) => ({ type })));
    }
  }

  // 兜底：极简地图，保证可达
  const simple: TileType[][] = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill("empty"),
  );
  simple[4][3] = "stone";
  simple[3][5] = "stone";
  simple[5][4] = "grass";
  simple[2][2] = "grass";
  simple[GRID_SIZE - 1][GRID_SIZE - 1] = "treasure";
  return simple.map((row) => row.map((type) => ({ type })));
}
