import React from "react";
import type { HeroAppearance } from "./heroAppearance";
import { getHeroOption, getHeroOptionColor } from "./heroAppearance";

export type HeroPose =
  | "frontIdle"
  | "frontWalk1"
  | "frontWalk2"
  | "backIdle"
  | "backWalk1"
  | "backWalk2"
  | "sideIdle"
  | "sideWalk1"
  | "sideWalk2";

export type HeroFacing = "up" | "down" | "left" | "right";

const WIDTH = 32;
const HEIGHT = 48;

const OUTLINE = "#1d1712";
const EYE = "#14100d";
const WHITE = "#fff9e8";
const BLUSH = "#d77666";

type PixelKey =
  | "."
  | "O"
  | "S"
  | "s"
  | "R"
  | "H"
  | "h"
  | "x"
  | "E"
  | "W"
  | "M"
  | "T"
  | "t"
  | "l"
  | "v"
  | "P"
  | "p"
  | "K"
  | "k"
  | "C"
  | "c";

type Canvas = PixelKey[][];

function canvas(): Canvas {
  return Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => "."));
}

function put(c: Canvas, x: number, y: number, v: PixelKey) {
  if (c[y]?.[x] !== undefined) c[y][x] = v;
}

function hline(c: Canvas, y: number, x1: number, x2: number, v: PixelKey) {
  for (let x = x1; x <= x2; x += 1) put(c, x, y, v);
}

function rect(c: Canvas, x: number, y: number, w: number, h: number, v: PixelKey) {
  for (let yy = y; yy < y + h; yy += 1) hline(c, yy, x, x + w - 1, v);
}

function line(c: Canvas, x1: number, y1: number, x2: number, y2: number, v: PixelKey) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  let x = x1;
  let y = y1;

  while (true) {
    put(c, x, y, v);
    if (x === x2 && y === y2) break;
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}

function outline(c: Canvas): Canvas {
  const out = c.map(row => [...row]);
  const solid = new Set<PixelKey>([
    "S", "s", "R", "H", "h", "x", "E", "W", "M",
    "T", "t", "l", "v", "P", "p", "K", "k", "C", "c",
  ]);

  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      if (!solid.has(c[y][x])) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (out[ny]?.[nx] === ".") out[ny][nx] = "O";
      }
    }
  }

  return out;
}

function shade(hex: string, amount: number) {
  if (!hex.startsWith("#") || hex.length !== 7) return hex;
  const clamp = (value: number) => Math.max(0, Math.min(255, value));
  const r = clamp(parseInt(hex.slice(1, 3), 16) + amount);
  const g = clamp(parseInt(hex.slice(3, 5), 16) + amount);
  const b = clamp(parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function info(pose: HeroPose) {
  const back = pose.startsWith("back");
  const side = pose.startsWith("side");
  const step = pose.endsWith("Walk1") ? -1 : pose.endsWith("Walk2") ? 1 : 0;
  return { back, side, step };
}

function drawFrontFace(c: Canvas, appearance: HeroAppearance) {
  hline(c, 8, 13, 18, "S");
  hline(c, 9, 11, 20, "S");
  hline(c, 10, 10, 21, "S");
  hline(c, 11, 10, 21, "S");
  hline(c, 12, 9, 22, "S");
  hline(c, 13, 9, 22, "S");
  hline(c, 14, 9, 22, "S");
  hline(c, 15, 10, 21, "S");
  hline(c, 16, 10, 21, "S");
  hline(c, 17, 11, 20, "S");
  hline(c, 18, 12, 19, "S");
  hline(c, 19, 13, 18, "S");

  rect(c, 8, 13, 2, 4, "S");
  rect(c, 22, 13, 2, 4, "S");
  put(c, 8, 16, "s");
  put(c, 23, 16, "s");

  if (appearance.sunglasses !== "none") {
    rect(c, 12, 13, 5, 3, "E");
    rect(c, 18, 13, 5, 3, "E");
    put(c, 17, 14, "E");
    put(c, 13, 13, "W");
    put(c, 19, 13, "W");
  } else {
    rect(c, 13, 13, 2, 4, "E");
    rect(c, 18, 13, 2, 4, "E");
    put(c, 13, 13, "W");
    put(c, 18, 13, "W");
    hline(c, 12, 12, 15, "O");
    hline(c, 12, 18, 20, "O");
  }

  put(c, 11, 17, "R");
  put(c, 21, 17, "R");
  hline(c, 19, 14, 18, "M");

  if (appearance.facialHair === "mustache") hline(c, 18, 13, 18, "M");
  if (appearance.facialHair === "beard") {
    hline(c, 18, 12, 19, "M");
    hline(c, 19, 13, 18, "M");
    hline(c, 20, 14, 17, "M");
  }
}

function drawBackHead(c: Canvas) {
  hline(c, 8, 13, 18, "H");
  hline(c, 9, 11, 20, "H");
  hline(c, 10, 10, 21, "H");
  hline(c, 11, 9, 22, "H");
  hline(c, 12, 9, 22, "H");
  hline(c, 13, 9, 22, "H");
  hline(c, 14, 9, 22, "H");
  hline(c, 15, 10, 21, "H");
  hline(c, 16, 10, 21, "H");
  hline(c, 17, 11, 20, "H");
  hline(c, 18, 12, 19, "H");
  hline(c, 19, 13, 18, "H");
  hline(c, 20, 14, 17, "H");
}

function drawSideFace(c: Canvas, appearance: HeroAppearance) {
  hline(c, 8, 13, 18, "S");
  hline(c, 9, 11, 20, "S");
  hline(c, 10, 10, 22, "S");
  hline(c, 11, 10, 23, "S");
  hline(c, 12, 10, 23, "S");
  hline(c, 13, 10, 22, "S");
  hline(c, 14, 11, 22, "S");
  hline(c, 15, 11, 21, "S");
  hline(c, 16, 12, 21, "S");
  hline(c, 17, 13, 20, "S");
  hline(c, 18, 14, 19, "S");
  hline(c, 19, 15, 18, "S");

  if (appearance.sunglasses !== "none") {
    rect(c, 17, 13, 5, 3, "E");
    put(c, 18, 13, "W");
  } else {
    rect(c, 18, 13, 2, 4, "E");
    put(c, 18, 13, "W");
    hline(c, 12, 17, 20, "O");
  }

  put(c, 21, 15, "s");
  hline(c, 18, 17, 20, "M");

  if (appearance.facialHair === "mustache") hline(c, 17, 17, 21, "M");
  if (appearance.facialHair === "beard") {
    hline(c, 17, 17, 22, "M");
    hline(c, 18, 16, 20, "M");
    hline(c, 19, 16, 18, "M");
  }
}

function drawHair(c: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hair === "none") return;

  const { back, side } = info(pose);
  const style = ((getHeroOption("hair", appearance.hair) as { style?: string }).style ?? "messy");

  if (side) {
    hline(c, 4, 12, 19, "H");
    hline(c, 5, 10, 21, "H");
    hline(c, 6, 9, 22, "H");
    hline(c, 7, 8, 22, "H");
    hline(c, 8, 8, 16, "H");
    hline(c, 9, 8, 13, "H");
    hline(c, 10, 8, 12, "H");
    hline(c, 11, 8, 11, "H");
    hline(c, 8, 21, 23, "H");
    hline(c, 9, 22, 22, "H");
    hline(c, 10, 22, 22, "H");

    if (style === "spiky") {
      line(c, 10, 6, 6, 1, "H");
      line(c, 14, 5, 14, 0, "H");
      line(c, 18, 6, 25, 2, "H");
    } else if (style === "swept") {
      line(c, 13, 8, 25, 10, "H");
      line(c, 14, 10, 23, 14, "H");
    } else if (style === "short") {
      hline(c, 8, 10, 21, "H");
      hline(c, 9, 10, 19, "H");
    } else {
      put(c, 22, 11, "H");
      put(c, 21, 12, "H");
      put(c, 20, 13, "H");
    }

    hline(c, 6, 11, 16, "h");
    return;
  }

  if (back) {
    hline(c, 4, 11, 20, "H");
    hline(c, 5, 9, 22, "H");
    hline(c, 6, 8, 23, "H");
    hline(c, 7, 8, 23, "H");
    hline(c, 8, 8, 23, "H");
    hline(c, 9, 8, 23, "H");
    hline(c, 10, 8, 23, "H");
    hline(c, 11, 9, 22, "H");
    hline(c, 12, 9, 22, "H");
    hline(c, 13, 10, 21, "H");
    hline(c, 14, 10, 21, "H");
    hline(c, 15, 11, 20, "H");
    hline(c, 16, 12, 19, "H");
    hline(c, 17, 13, 18, "H");
    hline(c, 18, 14, 17, "H");
    hline(c, 6, 12, 18, "h");

    if (style === "spiky") {
      line(c, 9, 6, 6, 1, "H");
      line(c, 15, 5, 15, 0, "H");
      line(c, 21, 6, 26, 2, "H");
    }
    return;
  }

  hline(c, 4, 11, 20, "H");
  hline(c, 5, 9, 22, "H");
  hline(c, 6, 8, 23, "H");
  hline(c, 7, 7, 24, "H");
  hline(c, 8, 7, 24, "H");
  hline(c, 9, 7, 12, "H");
  hline(c, 9, 19, 24, "H");
  hline(c, 10, 7, 11, "H");
  hline(c, 10, 20, 23, "H");
  hline(c, 11, 8, 10, "H");
  hline(c, 11, 21, 22, "H");
  hline(c, 6, 11, 17, "h");

  if (style === "spiky") {
    line(c, 9, 6, 5, 1, "H");
    line(c, 13, 5, 13, 0, "H");
    line(c, 17, 5, 20, 0, "H");
    line(c, 21, 6, 27, 2, "H");
  } else if (style === "short") {
    hline(c, 8, 9, 22, "H");
    hline(c, 9, 9, 21, "H");
    hline(c, 10, 10, 20, "H");
  } else if (style === "swept") {
    line(c, 9, 9, 23, 7, "H");
    line(c, 10, 10, 24, 10, "H");
    line(c, 12, 12, 22, 15, "H");
  } else {
    put(c, 11, 11, "H");
    put(c, 12, 12, "H");
    put(c, 15, 11, "H");
    put(c, 16, 12, "H");
    put(c, 19, 11, "H");
    put(c, 18, 12, "H");
  }
}

function drawHat(c: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hat === "none") return;

  const { back, side } = info(pose);
  const beanie = appearance.hat === "dark-beanie";

  if (beanie) {
    hline(c, 4, 11, 20, "C");
    hline(c, 5, 9, 22, "C");
    hline(c, 6, 8, 23, "C");
    hline(c, 7, 9, 22, "c");
    hline(c, 8, 10, 21, "c");
    return;
  }

  hline(c, 3, 10, 21, "C");
  hline(c, 4, 8, 23, "C");
  hline(c, 5, 7, 24, "C");
  hline(c, 6, 9, 22, "c");

  if (!back) {
    if (side) hline(c, 8, 21, 28, "C");
    else hline(c, 8, 20, 28, "C");
  }
}

function drawClothesAndBody(c: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  const { back, side, step } = info(pose);
  const shirtStyle = ((getHeroOption("shirt", appearance.shirt) as { style?: string }).style ?? "jacket");

  if (side) drawSideFace(c, appearance);
  else if (back) drawBackHead(c);
  else drawFrontFace(c, appearance);

  // neck
  rect(c, 14, 20, 4, 4, back ? "H" : "S");

  // torso
  if (side) {
    hline(c, 23, 12, 20, "T");
    hline(c, 24, 11, 21, "T");
    hline(c, 25, 11, 21, "T");
    hline(c, 26, 10, 21, "T");
    hline(c, 27, 10, 21, "T");
    hline(c, 28, 11, 20, "T");
    hline(c, 29, 12, 19, "T");
    hline(c, 30, 12, 19, "T");
    hline(c, 24, 12, 14, "t");
    hline(c, 25, 12, 14, "t");
    hline(c, 26, 19, 20, "l");

    if (shirtStyle === "hoodie") {
      hline(c, 22, 12, 19, "v");
      put(c, 20, 23, "v");
    }
    if (shirtStyle === "coat") {
      hline(c, 31, 12, 19, "T");
      hline(c, 32, 13, 18, "T");
    }

    rect(c, 20, 24 + (step < 0 ? 1 : 0), 3, 10, "s");
    rect(c, 20, 33 + (step < 0 ? 1 : 0), 4, 4, "S");
  } else {
    hline(c, 23, 10, 21, "T");
    hline(c, 24, 9, 22, "T");
    hline(c, 25, 9, 22, "T");
    hline(c, 26, 9, 22, "T");
    hline(c, 27, 9, 22, "T");
    hline(c, 28, 10, 21, "T");
    hline(c, 29, 10, 21, "T");
    hline(c, 30, 11, 20, "T");

    hline(c, 24, 10, 12, "t");
    hline(c, 25, 10, 12, "t");
    hline(c, 26, 19, 21, "l");

    if (shirtStyle === "jacket" || shirtStyle === "coat") {
      line(c, 15, 23, 15, 30, "O");
      put(c, 16, 26, "l");
    }
    if (shirtStyle === "hoodie") {
      hline(c, 22, 11, 20, "v");
      put(c, 12, 23, "v");
      put(c, 20, 23, "v");
    }
    if (shirtStyle === "coat") {
      hline(c, 31, 10, 21, "T");
      hline(c, 32, 11, 20, "T");
    }

    if (back) {
      rect(c, 6, 24 + (step < 0 ? 1 : 0), 4, 11, "T");
      rect(c, 22, 24 + (step > 0 ? 1 : 0), 4, 11, "T");
    } else {
      rect(c, 5, 24 + (step < 0 ? 1 : 0), 4, 10, "S");
      rect(c, 23, 24 + (step > 0 ? 1 : 0), 4, 10, "S");
      rect(c, 5, 33 + (step < 0 ? 1 : 0), 4, 4, "S");
      rect(c, 23, 33 + (step > 0 ? 1 : 0), 4, 4, "S");
    }
  }

  // legs and shoes
  const leftLegH = step < 0 ? 10 : 8;
  const rightLegH = step > 0 ? 10 : 8;

  if (side) {
    rect(c, 12, 31, 5, leftLegH, "P");
    rect(c, 18, 31, 5, rightLegH, "P");
    rect(c, step < 0 ? 9 : 11, 40, 8, 3, "K");
    rect(c, step > 0 ? 18 : 17, step > 0 ? 40 : 39, 8, 3, "K");
    put(c, 13, 32, "p");
    put(c, 19, 32, "p");
  } else {
    rect(c, 10, 31, 5, leftLegH, "P");
    rect(c, 17, 31, 5, rightLegH, "P");
    rect(c, step < 0 ? 7 : 9, 40, 8, 3, "K");
    rect(c, step > 0 ? 17 : 16, step > 0 ? 40 : 39, 8, 3, "K");
    put(c, 11, 32, "p");
    put(c, 18, 32, "p");
  }

  put(c, side ? 13 : 11, 40, "k");
  put(c, side ? 20 : 18, step > 0 ? 40 : 39, "k");
}

function buildSprite(appearance: HeroAppearance, pose: HeroPose) {
  let c = canvas();
  drawClothesAndBody(c, appearance, pose);
  drawHair(c, appearance, pose);
  drawHat(c, appearance, pose);
  c = outline(c);
  return c;
}

function palette(appearance: HeroAppearance): Record<PixelKey, string> {
  const skin = getHeroOptionColor("skin", appearance.skin);
  const hair = getHeroOptionColor("hair", appearance.hair);
  const hat = getHeroOptionColor("hat", appearance.hat);
  const shirt = getHeroOptionColor("shirt", appearance.shirt);
  const pants = getHeroOptionColor("pants", appearance.pants);
  const shoes = getHeroOptionColor("shoes", appearance.shoes);

  return {
    ".": "transparent",
    O: OUTLINE,
    S: skin,
    s: shade(skin, -24),
    R: BLUSH,
    H: appearance.hair === "none" ? skin : hair,
    h: appearance.hair === "none" ? skin : shade(hair, 34),
    x: appearance.hair === "none" ? skin : shade(hair, -36),
    E: appearance.sunglasses === "none" ? EYE : "#111111",
    W: WHITE,
    M: OUTLINE,
    T: shirt,
    t: shade(shirt, -38),
    l: shade(shirt, 42),
    v: shade(shirt, -58),
    P: pants,
    p: shade(pants, -34),
    K: shoes,
    k: shade(shoes, -24),
    C: appearance.hat === "none" ? "transparent" : hat,
    c: appearance.hat === "none" ? "transparent" : shade(hat, 38),
  };
}

export function heroPoseFor(
  facing: HeroFacing,
  isWalking: boolean,
  walkFrame = 0,
): HeroPose {
  const suffix = walkFrame % 2 === 0 ? "Walk1" : "Walk2";
  if (facing === "up") return isWalking ? (`back${suffix}` as HeroPose) : "backIdle";
  if (facing === "left" || facing === "right") {
    return isWalking ? (`side${suffix}` as HeroPose) : "sideIdle";
  }
  return isWalking ? (`front${suffix}` as HeroPose) : "frontIdle";
}

export function BetterHeroSprite({
  appearance,
  pose,
  pixelSize = 1,
  showShadow = true,
}: {
  appearance: HeroAppearance;
  pose: HeroPose;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const sprite = buildSprite(appearance, pose);
  const colors = palette(appearance);

  return (
    <div
      style={{
        position: "relative",
        width: WIDTH * pixelSize,
        height: HEIGHT * pixelSize,
        imageRendering: "pixelated",
      }}
    >
      {showShadow && (
        <div
          style={{
            position: "absolute",
            left: 8 * pixelSize,
            top: 43 * pixelSize,
            width: 16 * pixelSize,
            height: 3 * pixelSize,
            backgroundColor: "rgba(37,32,24,0.28)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${WIDTH}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${HEIGHT}, ${pixelSize}px)`,
        }}
      >
        {sprite.flatMap((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${pose}-${x}-${y}`}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: colors[cell],
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}
