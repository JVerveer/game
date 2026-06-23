export type RouteDirection = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW";

export const PORTAL_POS: Record<RouteDirection, { x: number; y: number }> = {
  N: { x: 27, y: 0 },
  S: { x: 27, y: 33 },
  W: { x: 0, y: 18 },
  E: { x: 55, y: 18 },
  NE: { x: 55, y: 6 },
  NW: { x: 0, y: 6 },
  SE: { x: 55, y: 29 },
  SW: { x: 0, y: 29 },
};

export const makeBlankMap = (width: number, height: number, fill = "T") =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => fill));

export const rect = (map: string[][], x: number, y: number, w: number, h: number, tile: string) => {
  for (let ry = y; ry < y + h; ry++) {
    for (let cx = x; cx < x + w; cx++) {
      if (map[ry]?.[cx] !== undefined) map[ry][cx] = tile;
    }
  }
};

export const hline = (map: string[][], x1: number, x2: number, y: number, tile: string) =>
  rect(map, x1, y, x2 - x1 + 1, 1, tile);

export const vline = (map: string[][], x: number, y1: number, y2: number, tile: string) =>
  rect(map, x, y1, 1, y2 - y1 + 1, tile);

export const roadLine = (map: string[][], start: { x: number; y: number }, end: { x: number; y: number }, width = 2) => {
  const steps = Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y), 1);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = Math.round(start.x + (end.x - start.x) * t);
    const y = Math.round(start.y + (end.y - start.y) * t);
    rect(map, x - Math.floor(width / 2), y - Math.floor(width / 2), width + 1, width + 1, "R");
  }
};

export const addRouteRoads = (map: string[][], directions: RouteDirection[]) => {
  directions.forEach(direction => {
    const pos = PORTAL_POS[direction];
    roadLine(map, { x: 27, y: 18 }, pos, 2);
    rect(map, pos.x - 1, pos.y - 1, 3, 3, "R");
  });
};
