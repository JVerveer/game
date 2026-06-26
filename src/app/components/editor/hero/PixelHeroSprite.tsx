import React from "react";
import type { HeroAppearance } from "./heroAppearance";
import { getHeroOptionColor, getHeroOption } from "./heroAppearance";

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

const WIDTH = 24;
const HEIGHT = 32;
const OUTLINE = "#252018";
const EYE = "#171411";
const WHITE = "#fffef0";
const SHADOW = "rgba(37,32,24,0.24)";

type Pixel = string;
type Canvas = Pixel[][];

function makeCanvas(): Canvas {
  return Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => "."));
}

function put(canvas: Canvas, x: number, y: number, value: Pixel) {
  if (canvas[y]?.[x] !== undefined) canvas[y][x] = value;
}

function rect(canvas: Canvas, x: number, y: number, w: number, h: number, value: Pixel) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) {
      put(canvas, xx, yy, value);
    }
  }
}

function ellipse(canvas: Canvas, cx: number, cy: number, rx: number, ry: number, value: Pixel) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y += 1) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x += 1) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) put(canvas, x, y, value);
    }
  }
}

function line(canvas: Canvas, x1: number, y1: number, x2: number, y2: number, value: Pixel) {
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
    const e2 = 2 * err;
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

function shade(hex: string, amount: number) {
  if (!hex.startsWith("#") || hex.length !== 7) return hex;
  const clamp = (value: number) => Math.max(0, Math.min(255, value));
  const r = clamp(parseInt(hex.slice(1, 3), 16) + amount);
  const g = clamp(parseInt(hex.slice(3, 5), 16) + amount);
  const b = clamp(parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function outlineLayer(canvas: Canvas, layerCodes: Set<string>) {
  const next = canvas.map(row => [...row]);

  for (let y = 0; y < HEIGHT; y += 1) {
    for (let x = 0; x < WIDTH; x += 1) {
      if (!layerCodes.has(canvas[y][x])) continue;

      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        if (next[ny]?.[nx] === ".") next[ny][nx] = "O";
      }
    }
  }

  return next;
}

function poseParts(pose: HeroPose) {
  const side = pose.startsWith("side");
  const back = pose.startsWith("back");
  const walk1 = pose.endsWith("Walk1");
  const walk2 = pose.endsWith("Walk2");

  return {
    side,
    back,
    walk1,
    walk2,
    step: walk1 ? -1 : walk2 ? 1 : 0,
  };
}

function drawSkin(canvas: Canvas, pose: HeroPose) {
  const { side, back, step } = poseParts(pose);

  if (side) {
    rect(canvas, 10, 14, 5, 3, "S");
    ellipse(canvas, 12, 9, 5, 6, "S");
    rect(canvas, 16, 9, 2, 3, "S");
    rect(canvas, 14, 18 + (step === -1 ? 1 : 0), 3, 8, "s");
    rect(canvas, 14, 25 + (step === -1 ? 1 : 0), 3, 3, "S");
    return;
  }

  rect(canvas, 10, 14, 4, 3, "S");

  if (!back) {
    ellipse(canvas, 11, 9, 6, 6, "S");
    rect(canvas, 5, 9, 2, 4, "S");
    rect(canvas, 17, 9, 2, 4, "S");
    rect(canvas, 4, 17 + (step === -1 ? 1 : 0), 3, 8, "S");
    rect(canvas, 17, 17 + (step === 1 ? 1 : 0), 3, 8, "S");
    rect(canvas, 4, 24 + (step === -1 ? 1 : 0), 3, 3, "S");
    rect(canvas, 17, 24 + (step === 1 ? 1 : 0), 3, 3, "S");
  } else {
    ellipse(canvas, 11, 9, 6, 6, "H");
  }
}

function drawClothes(canvas: Canvas, pose: HeroPose) {
  const { side, back, step } = poseParts(pose);

  if (side) {
    rect(canvas, 8, 17, 9, 8, "T");
    rect(canvas, 8, 17, 2, 7, "t");
    rect(canvas, 9, 24, 4, step === -1 ? 7 : 6, "P");
    rect(canvas, 14, 24, 4, step === 1 ? 7 : 6, "P");
    rect(canvas, step === -1 ? 7 : 8, 30, 6, 2, "K");
    rect(canvas, step === 1 ? 15 : 14, step === 1 ? 30 : 29, 6, 2, "K");
    return;
  }

  rect(canvas, 7, 17, 10, 8, "T");
  rect(canvas, 8, 18, 2, 6, "t");
  rect(canvas, 14, 18, 2, 6, "L");

  if (back) {
    rect(canvas, 4, 17 + (step === -1 ? 1 : 0), 3, 8, "T");
    rect(canvas, 17, 17 + (step === 1 ? 1 : 0), 3, 8, "T");
  }

  rect(canvas, 8, 24, 4, step === -1 ? 7 : 6, "P");
  rect(canvas, 13, 24, 4, step === 1 ? 7 : 6, "P");
  rect(canvas, step === -1 ? 6 : 8, 30, 6, 2, "K");
  rect(canvas, step === 1 ? 14 : 13, step === 1 ? 30 : 29, 6, 2, "K");
}

function drawHair(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hair === "none") return;

  const { side, back } = poseParts(pose);
  const hairOption = getHeroOption("hair", appearance.hair) as { style?: string };
  const style = hairOption.style ?? "messy";

  if (side) {
    rect(canvas, 7, 3, 9, 4, "H");
    rect(canvas, 6, 6, 4, 8, "H");
    rect(canvas, 14, 6, 4, 6, "H");

    if (style === "spiky") {
      line(canvas, 8, 4, 5, 1, "H");
      line(canvas, 11, 3, 10, 0, "H");
      line(canvas, 15, 5, 19, 2, "H");
    } else if (style === "short") {
      rect(canvas, 7, 4, 10, 3, "H");
      rect(canvas, 7, 7, 2, 5, "H");
    } else {
      put(canvas, 16, 8, "H");
      put(canvas, 15, 9, "H");
      put(canvas, 14, 10, "H");
      put(canvas, 7, 12, "h");
    }

    return;
  }

  if (back) {
    rect(canvas, 5, 3, 13, 5, "H");
    rect(canvas, 5, 7, 13, 8, "H");
    rect(canvas, 7, 14, 9, 3, "H");
    if (style === "spiky") {
      line(canvas, 6, 4, 4, 1, "H");
      line(canvas, 10, 3, 10, 0, "H");
      line(canvas, 15, 3, 18, 1, "H");
    }
    return;
  }

  rect(canvas, 5, 3, 13, 4, "H");
  rect(canvas, 4, 7, 4, 7, "H");
  rect(canvas, 16, 7, 4, 7, "H");

  if (style === "spiky") {
    line(canvas, 6, 5, 4, 1, "H");
    line(canvas, 9, 4, 9, 0, "H");
    line(canvas, 13, 4, 15, 0, "H");
    line(canvas, 16, 5, 20, 2, "H");
  } else if (style === "short") {
    rect(canvas, 6, 6, 12, 3, "H");
    rect(canvas, 5, 8, 2, 4, "H");
    rect(canvas, 17, 8, 2, 4, "H");
  } else {
    put(canvas, 7, 7, "H");
    put(canvas, 8, 8, "H");
    put(canvas, 9, 9, "H");
    put(canvas, 11, 7, "H");
    put(canvas, 11, 8, "H");
    put(canvas, 12, 9, "H");
    put(canvas, 14, 7, "H");
    put(canvas, 14, 8, "H");
    put(canvas, 13, 9, "H");
  }

  rect(canvas, 7, 4, 5, 1, "h");
}

function drawFace(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  const { side, back } = poseParts(pose);
  if (back) return;

  if (appearance.sunglasses === "none") {
    if (side) {
      rect(canvas, 14, 9, 2, 3, "E");
      put(canvas, 14, 9, "W");
    } else {
      rect(canvas, 8, 9, 2, 3, "E");
      rect(canvas, 14, 9, 2, 3, "E");
      put(canvas, 8, 9, "W");
      put(canvas, 14, 9, "W");
      rect(canvas, 7, 8, 3, 1, "O");
      rect(canvas, 14, 8, 3, 1, "O");
    }
  } else {
    if (side) {
      rect(canvas, 13, 9, 4, 2, "E");
    } else {
      rect(canvas, 7, 9, 5, 2, "E");
      rect(canvas, 13, 9, 5, 2, "E");
      rect(canvas, 12, 10, 1, 1, "E");
    }
  }

  if (side) rect(canvas, 14, 13, 3, 1, "M");
  else rect(canvas, 9, 13, 6, 1, "M");

  if (appearance.facialHair === "mustache") {
    if (side) rect(canvas, 13, 12, 4, 1, "M");
    else rect(canvas, 8, 12, 8, 1, "M");
  }

  if (appearance.facialHair === "beard") {
    if (side) {
      rect(canvas, 13, 12, 4, 3, "M");
      rect(canvas, 12, 14, 3, 2, "M");
    } else {
      rect(canvas, 7, 12, 10, 3, "M");
      rect(canvas, 9, 14, 6, 2, "M");
    }
  }
}

function drawHat(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hat === "none") return;

  const { side, back } = poseParts(pose);

  if (side) {
    rect(canvas, 6, 2, 12, 3, "C");
    rect(canvas, 9, 0, 6, 3, "C");
    rect(canvas, 15, 5, 5, 1, "C");
    rect(canvas, 10, 1, 4, 1, "c");
    return;
  }

  rect(canvas, 4, 2, 16, 3, "C");
  rect(canvas, 8, 0, 8, 3, "C");
  rect(canvas, 10, 1, 4, 1, "c");
  if (!back) rect(canvas, 15, 5, 5, 1, "C");
}

function buildSprite(appearance: HeroAppearance, pose: HeroPose) {
  let canvas = makeCanvas();

  drawSkin(canvas, pose);
  drawClothes(canvas, pose);
  drawHair(canvas, appearance, pose);
  drawFace(canvas, appearance, pose);
  drawHat(canvas, appearance, pose);

  canvas = outlineLayer(canvas, new Set(["S", "s", "H", "h", "T", "t", "L", "P", "p", "K", "k", "C", "c", "E", "M", "W"]));
  return canvas;
}

function paletteFor(appearance: HeroAppearance) {
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
    s: shade(skin, -25),
    H: appearance.hair === "none" ? skin : hair,
    h: appearance.hair === "none" ? skin : shade(hair, 35),
    E: appearance.sunglasses === "none" ? EYE : "#111111",
    W: WHITE,
    M: OUTLINE,
    T: shirt,
    t: shade(shirt, -35),
    L: shade(shirt, 42),
    P: pants,
    p: shade(pants, -30),
    K: shoes,
    k: shade(shoes, -25),
    C: appearance.hat === "none" ? "transparent" : hat,
    c: appearance.hat === "none" ? "transparent" : shade(hat, 38),
  };
}

export function heroPoseFor(
  facing: HeroFacing,
  isWalking: boolean,
  walkFrame = 0,
): HeroPose {
  const walkSuffix = walkFrame % 2 === 0 ? "Walk1" : "Walk2";

  if (facing === "up") return isWalking ? `back${walkSuffix}` as HeroPose : "backIdle";
  if (facing === "left" || facing === "right") return isWalking ? `side${walkSuffix}` as HeroPose : "sideIdle";
  return isWalking ? `front${walkSuffix}` as HeroPose : "frontIdle";
}

export function PixelHeroSprite({
  appearance,
  pose,
  pixelSize = 4,
  showShadow = true,
}: {
  appearance: HeroAppearance;
  pose: HeroPose;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const palette = paletteFor(appearance);
  const sprite = buildSprite(appearance, pose);

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
            left: 5 * pixelSize,
            top: (HEIGHT - 2) * pixelSize,
            width: 14 * pixelSize,
            height: 2 * pixelSize,
            backgroundColor: SHADOW,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${WIDTH}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${HEIGHT}, ${pixelSize}px)`,
        }}
      >
        {sprite.flatMap((row, y) =>
          row.map((cell, x) => {
            const backgroundColor = palette[cell as keyof typeof palette] ?? "transparent";
            return (
              <div
                key={`${pose}-${x}-${y}`}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor,
                }}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
