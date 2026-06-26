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

const OUTLINE = "#1b1511";
const EYE = "#120e0b";
const WHITE = "#fff8e8";
const CHEEK = "#d66d62";

type PixelKey =
  | "."
  | "O"
  | "S"
  | "s"
  | "q"
  | "R"
  | "H"
  | "h"
  | "d"
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
  | "c"
  | "w";

type Canvas = PixelKey[][];

function makeCanvas(): Canvas {
  return Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => "."));
}

function put(canvas: Canvas, x: number, y: number, value: PixelKey) {
  if (canvas[y]?.[x] !== undefined) canvas[y][x] = value;
}

function hline(canvas: Canvas, y: number, x1: number, x2: number, value: PixelKey) {
  for (let x = x1; x <= x2; x += 1) put(canvas, x, y, value);
}

function rect(canvas: Canvas, x: number, y: number, width: number, height: number, value: PixelKey) {
  for (let y = 0; y < height; y += 1) hline(canvas, y + y, x, x + width - 1, value);
}

function fillRect(canvas: Canvas, x: number, y: number, width: number, height: number, value: PixelKey) {
  for (let yy = y; yy < y + height; yy += 1) hline(canvas, yy, x, x + width - 1, value);
}

function line(canvas: Canvas, x1: number, y1: number, x2: number, y2: number, value: PixelKey) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  let x = x1;
  let y = y1;

  while (true) {
    put(canvas, x, y, value);
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

function outline(canvas: Canvas): Canvas {
  const next = canvas.map(row => [...row]);
  const solid = new Set<PixelKey>([
    "S", "s", "q", "R", "H", "h", "d", "E", "W", "M",
    "T", "t", "l", "v", "P", "p", "K", "k", "C", "c", "w",
  ]);

  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      if (!solid.has(canvas[y][x])) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx;
        const ny = y + dy;
        if (next[ny]?.[nx] === ".") next[ny][nx] = "O";
      }
    }
  }

  return next;
}

function shade(hex: string, amount: number) {
  if (!hex.startsWith("#") || hex.length !== 7) return hex;
  const clamp = (value: number) => Math.max(0, Math.min(255, value));
  const r = clamp(parseInt(hex.slice(1, 3), 16) + amount);
  const g = clamp(parseInt(hex.slice(3, 5), 16) + amount);
  const b = clamp(parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function poseInfo(pose: HeroPose) {
  return {
    back: pose.startsWith("back"),
    side: pose.startsWith("side"),
    step: pose.endsWith("Walk1") ? -1 : pose.endsWith("Walk2") ? 1 : 0,
  };
}

function drawFrontFace(canvas: Canvas, appearance: HeroAppearance) {
  // Large chibi face, short jaw, no long neck.
  hline(canvas, 7, 13, 18, "S");
  hline(canvas, 8, 11, 20, "S");
  hline(canvas, 9, 10, 21, "S");
  hline(canvas, 10, 9, 22, "S");
  hline(canvas, 11, 8, 23, "S");
  hline(canvas, 12, 8, 23, "S");
  hline(canvas, 13, 8, 23, "S");
  hline(canvas, 14, 8, 23, "S");
  hline(canvas, 15, 9, 22, "S");
  hline(canvas, 16, 9, 22, "S");
  hline(canvas, 17, 10, 21, "S");
  hline(canvas, 18, 10, 21, "S");
  hline(canvas, 19, 11, 20, "s");
  hline(canvas, 20, 12, 19, "s");
  hline(canvas, 21, 13, 18, "s");

  fillRect(canvas, 7, 13, 2, 5, "s");
  fillRect(canvas, 23, 13, 2, 5, "s");

  // brow and eyes
  if (appearance.sunglasses !== "none") {
    fillRect(canvas, 11, 13, 6, 3, "E");
    fillRect(canvas, 18, 13, 6, 3, "E");
    put(canvas, 17, 15, "E");
    put(canvas, 12, 13, "W");
    put(canvas, 19, 13, "W");
  } else {
    fillRect(canvas, 12, 13, 3, 5, "E");
    fillRect(canvas, 18, 13, 3, 5, "E");
    fillRect(canvas, 12, 13, 1, 2, "W");
    fillRect(canvas, 18, 13, 1, 2, "W");
    put(canvas, 14, 17, "q");
    put(canvas, 20, 17, "q");
    hline(canvas, 12, 11, 15, "O");
    hline(canvas, 12, 18, 21, "O");
  }

  // cheeks and mouth
  put(canvas, 10, 18, "R");
  put(canvas, 22, 18, "R");
  hline(canvas, 20, 14, 18, "M");

  if (appearance.facialHair === "mustache") hline(canvas, 19, 13, 18, "M");
  if (appearance.facialHair === "beard") {
    hline(canvas, 19, 12, 19, "M");
    hline(canvas, 20, 13, 18, "M");
    hline(canvas, 21, 14, 17, "M");
  }
}

function drawBackHead(canvas: Canvas) {
  hline(canvas, 7, 13, 18, "H");
  hline(canvas, 8, 11, 20, "H");
  hline(canvas, 9, 10, 21, "H");
  hline(canvas, 10, 9, 22, "H");
  hline(canvas, 11, 8, 23, "H");
  hline(canvas, 12, 8, 23, "H");
  hline(canvas, 13, 8, 23, "H");
  hline(canvas, 14, 8, 23, "H");
  hline(canvas, 15, 9, 22, "H");
  hline(canvas, 16, 9, 22, "H");
  hline(canvas, 17, 10, 21, "H");
  hline(canvas, 18, 10, 21, "H");
  hline(canvas, 19, 11, 20, "H");
  hline(canvas, 20, 12, 19, "H");
  hline(canvas, 21, 13, 18, "H");
  hline(canvas, 22, 14, 17, "H");
}

function drawSideFace(canvas: Canvas, appearance: HeroAppearance) {
  hline(canvas, 7, 13, 18, "S");
  hline(canvas, 8, 11, 20, "S");
  hline(canvas, 9, 10, 22, "S");
  hline(canvas, 10, 9, 23, "S");
  hline(canvas, 11, 9, 24, "S");
  hline(canvas, 12, 9, 24, "S");
  hline(canvas, 13, 10, 23, "S");
  hline(canvas, 14, 10, 23, "S");
  hline(canvas, 15, 11, 22, "S");
  hline(canvas, 16, 11, 22, "S");
  hline(canvas, 17, 12, 21, "S");
  hline(canvas, 18, 13, 21, "s");
  hline(canvas, 19, 14, 20, "s");
  hline(canvas, 20, 15, 19, "s");

  if (appearance.sunglasses !== "none") {
    fillRect(canvas, 18, 13, 6, 3, "E");
    put(canvas, 19, 13, "W");
  } else {
    fillRect(canvas, 18, 13, 3, 5, "E");
    fillRect(canvas, 18, 13, 1, 2, "W");
    hline(canvas, 12, 17, 21, "O");
  }

  put(canvas, 22, 17, "q");
  hline(canvas, 19, 18, 21, "M");

  if (appearance.facialHair === "mustache") hline(canvas, 18, 18, 22, "M");
  if (appearance.facialHair === "beard") {
    hline(canvas, 18, 18, 23, "M");
    hline(canvas, 19, 17, 21, "M");
    hline(canvas, 20, 16, 19, "M");
  }
}

function drawHair(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hair === "none") return;

  const { back, side } = poseInfo(pose);
  const style = ((getHeroOption("hair", appearance.hair) as { style?: string }).style ?? "messy");

  if (side) {
    hline(canvas, 3, 12, 20, "H");
    hline(canvas, 4, 10, 22, "H");
    hline(canvas, 5, 9, 23, "H");
    hline(canvas, 6, 8, 23, "H");
    hline(canvas, 7, 8, 17, "H");
    hline(canvas, 8, 8, 14, "H");
    hline(canvas, 9, 8, 13, "H");
    hline(canvas, 10, 8, 12, "H");
    hline(canvas, 8, 21, 24, "H");
    hline(canvas, 9, 22, 23, "H");
    hline(canvas, 10, 23, 22, "H");

    if (style === "spiky") {
      line(canvas, 10, 5, 6, 0, "H");
      line(canvas, 14, 4, 14, 0, "H");
      line(canvas, 18, 5, 25, 1, "H");
    } else if (style === "swept") {
      line(canvas, 12, 8, 26, 10, "H");
      line(canvas, 14, 10, 24, 14, "H");
    } else if (style === "short") {
      hline(canvas, 8, 10, 22, "H");
      hline(canvas, 9, 10, 20, "H");
    } else {
      put(canvas, 23, 11, "H");
      put(canvas, 22, 12, "H");
      put(canvas, 21, 13, "H");
    }

    hline(canvas, 5, 11, 17, "h");
    return;
  }

  if (back) {
    hline(canvas, 3, 11, 20, "H");
    hline(canvas, 4, 9, 22, "H");
    hline(canvas, 5, 8, 23, "H");
    hline(canvas, 6, 8, 23, "H");
    hline(canvas, 7, 8, 23, "H");
    hline(canvas, 8, 8, 23, "H");
    hline(canvas, 9, 8, 23, "H");
    hline(canvas, 10, 8, 23, "H");
    hline(canvas, 11, 9, 22, "H");
    hline(canvas, 12, 9, 22, "H");
    hline(canvas, 13, 9, 22, "H");
    hline(canvas, 14, 10, 21, "H");
    hline(canvas, 15, 10, 21, "H");
    hline(canvas, 16, 11, 20, "H");
    hline(canvas, 17, 12, 19, "H");
    hline(canvas, 18, 13, 18, "H");
    hline(canvas, 19, 14, 17, "H");
    hline(canvas, 5, 12, 18, "h");

    if (style === "spiky") {
      line(canvas, 9, 5, 6, 0, "H");
      line(canvas, 15, 4, 15, 0, "H");
      line(canvas, 21, 5, 27, 1, "H");
    }
    return;
  }

  hline(canvas, 3, 11, 20, "H");
  hline(canvas, 4, 9, 22, "H");
  hline(canvas, 5, 8, 23, "H");
  hline(canvas, 6, 7, 24, "H");
  hline(canvas, 7, 7, 24, "H");
  hline(canvas, 8, 7, 12, "H");
  hline(canvas, 8, 19, 24, "H");
  hline(canvas, 9, 7, 11, "H");
  hline(canvas, 9, 20, 23, "H");
  hline(canvas, 10, 8, 10, "H");
  hline(canvas, 10, 21, 22, "H");
  hline(canvas, 5, 11, 18, "h");

  // Hair hangs over forehead, fixing glued-on look.
  if (style === "spiky") {
    line(canvas, 9, 5, 5, 0, "H");
    line(canvas, 13, 4, 13, 0, "H");
    line(canvas, 17, 4, 20, 0, "H");
    line(canvas, 21, 5, 28, 1, "H");
    put(canvas, 11, 12, "H");
    put(canvas, 16, 12, "H");
    put(canvas, 20, 12, "H");
  } else if (style === "short") {
    hline(canvas, 8, 9, 22, "H");
    hline(canvas, 9, 9, 21, "H");
    hline(canvas, 10, 10, 20, "H");
    put(canvas, 12, 12, "H");
    put(canvas, 18, 12, "H");
  } else if (style === "swept") {
    line(canvas, 9, 9, 24, 7, "H");
    line(canvas, 10, 10, 25, 10, "H");
    line(canvas, 12, 12, 23, 15, "H");
  } else {
    put(canvas, 11, 11, "H");
    put(canvas, 12, 12, "H");
    put(canvas, 13, 13, "H");
    put(canvas, 15, 11, "H");
    put(canvas, 16, 12, "H");
    put(canvas, 17, 13, "H");
    put(canvas, 19, 11, "H");
    put(canvas, 18, 12, "H");
    put(canvas, 21, 12, "H");
  }
}

function drawHat(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hat === "none") return;

  const { back, side } = poseInfo(pose);
  const beanie = appearance.hat === "dark-beanie";

  if (beanie) {
    hline(canvas, 3, 8, 21, "C");
    hline(canvas, 4, 9, 22, "C");
    hline(canvas, 5, 8, 23, "C");
    hline(canvas, 6, 9, 22, "c");
    hline(canvas, 7, 10, 21, "c");
    return;
  }

  // Thinner cap and thinner brim.
  hline(canvas, 2, 11, 20, "C");
  hline(canvas, 3, 9, 22, "C");
  hline(canvas, 4, 8, 23, "C");
  hline(canvas, 5, 10, 21, "c");
  hline(canvas, 6, 13, 18, "w");

  if (!back) {
    if (side) hline(canvas, 7, 21, 29, "C");
    else hline(canvas, 7, 20, 29, "C");
  }
}

function drawBody(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  const { back, side, step } = poseInfo(pose);
  const shirtStyle = ((getHeroOption("shirt", appearance.shirt) as { style?: string }).style ?? "jacket");

  if (side) drawSideFace(canvas, appearance);
  else if (back) drawBackHead(canvas);
  else drawFrontFace(canvas, appearance);

  // Short neck mostly hidden by collar/head.
  fillRect(canvas, 14, 21, 4, 2, back ? "H" : "S");

  if (side) {
    // Tapered torso, no rectangle block.
    hline(canvas, 24, 12, 20, "T");
    hline(canvas, 25, 11, 21, "T");
    hline(canvas, 26, 10, 21, "T");
    hline(canvas, 27, 10, 21, "T");
    hline(canvas, 28, 11, 20, "T");
    hline(canvas, 29, 11, 20, "T");
    hline(canvas, 30, 12, 19, "T");
    hline(canvas, 31, 12, 19, "T");
    hline(canvas, 25, 12, 14, "t");
    hline(canvas, 26, 12, 14, "t");
    hline(canvas, 27, 19, 20, "l");

    if (shirtStyle === "hoodie") {
      hline(canvas, 23, 12, 19, "v");
      put(canvas, 20, 25, "v");
    }
    if (shirtStyle === "coat") {
      hline(canvas, 32, 12, 19, "T");
      hline(canvas, 33, 13, 18, "T");
    }

    // Much thinner and shorter side arm.
    fillRect(canvas, 21, 26 + (step < 0 ? 1 : 0), 2, 7, "s");
    fillRect(canvas, 20, 32 + (step < 0 ? 1 : 0), 3, 3, "S");
  } else {
    // Tapered torso.
    hline(canvas, 24, 11, 20, "T");
    hline(canvas, 25, 10, 21, "T");
    hline(canvas, 26, 9, 22, "T");
    hline(canvas, 27, 9, 22, "T");
    hline(canvas, 28, 10, 21, "T");
    hline(canvas, 29, 10, 21, "T");
    hline(canvas, 30, 11, 20, "T");
    hline(canvas, 31, 12, 19, "T");

    hline(canvas, 25, 11, 13, "t");
    hline(canvas, 26, 11, 13, "t");
    hline(canvas, 27, 19, 21, "l");

    if (shirtStyle === "jacket" || shirtStyle === "coat") {
      line(canvas, 15, 24, 15, 31, "O");
      put(canvas, 16, 27, "l");
    }
    if (shirtStyle === "hoodie") {
      hline(canvas, 23, 11, 20, "v");
      put(canvas, 12, 24, "v");
      put(canvas, 20, 24, "v");
    }
    if (shirtStyle === "coat") {
      hline(canvas, 32, 11, 20, "T");
      hline(canvas, 33, 12, 19, "T");
    }

    if (back) {
      fillRect(canvas, 7, 26 + (step < 0 ? 1 : 0), 2, 8, "T");
      fillRect(canvas, 23, 26 + (step > 0 ? 1 : 0), 2, 8, "T");
    } else {
      // Thinner and shorter arms; hands stop at waist.
      fillRect(canvas, 6, 26 + (step < 0 ? 1 : 0), 2, 7, "S");
      fillRect(canvas, 24, 26 + (step > 0 ? 1 : 0), 2, 7, "S");
      fillRect(canvas, 5, 32 + (step < 0 ? 1 : 0), 3, 3, "S");
      fillRect(canvas, 24, 32 + (step > 0 ? 1 : 0), 3, 3, "S");
    }
  }

  const leftLegH = step < 0 ? 10 : 8;
  const rightLegH = step > 0 ? 10 : 8;

  if (side) {
    fillRect(canvas, 12, 32, 5, leftLegH, "P");
    fillRect(canvas, 18, 32, 5, rightLegH, "P");
    fillRect(canvas, step < 0 ? 9 : 11, 41, 7, 3, "K");
    fillRect(canvas, step > 0 ? 18 : 17, step > 0 ? 41 : 40, 7, 3, "K");
    put(canvas, 13, 33, "p");
    put(canvas, 19, 33, "p");
  } else {
    fillRect(canvas, 10, 32, 5, leftLegH, "P");
    fillRect(canvas, 17, 32, 5, rightLegH, "P");
    fillRect(canvas, step < 0 ? 7 : 9, 41, 7, 3, "K");
    fillRect(canvas, step > 0 ? 17 : 16, step > 0 ? 41 : 40, 7, 3, "K");
    put(canvas, 11, 33, "p");
    put(canvas, 18, 33, "p");
  }

  put(canvas, side ? 13 : 11, 41, "k");
  put(canvas, side ? 20 : 18, step > 0 ? 41 : 40, "k");
}

function buildSprite(appearance: HeroAppearance, pose: HeroPose) {
  let result = makeCanvas();
  drawBody(result, appearance, pose);
  drawHair(result, appearance, pose);
  drawHat(result, appearance, pose);
  return outline(result);
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
    q: shade(skin, -42),
    R: CHEEK,
    H: appearance.hair === "none" ? skin : hair,
    h: appearance.hair === "none" ? skin : shade(hair, 34),
    d: appearance.hair === "none" ? skin : shade(hair, -36),
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
    w: appearance.hat === "none" ? "transparent" : WHITE,
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

export function ChibiHeroSprite({
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
            top: 44 * pixelSize,
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
