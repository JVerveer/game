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

const W = 24;
const H = 32;

const OUTLINE = "#201913";
const EYE = "#17120f";
const WHITE = "#fffef0";
const BLUSH = "#d46b5b";

type PixelCode =
  | "."
  | "O"
  | "S"
  | "s"
  | "B"
  | "H"
  | "h"
  | "E"
  | "W"
  | "M"
  | "T"
  | "t"
  | "L"
  | "V"
  | "P"
  | "p"
  | "K"
  | "k"
  | "C"
  | "c";

type Canvas = PixelCode[][];

function createCanvas(): Canvas {
  return Array.from({ length: H }, () => Array.from({ length: W }, () => "."));
}

function setPx(canvas: Canvas, x: number, y: number, c: PixelCode) {
  if (canvas[y]?.[x] !== undefined) canvas[y][x] = c;
}

function rect(canvas: Canvas, x: number, y: number, w: number, h: number, c: PixelCode) {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      setPx(canvas, xx, yy, c);
    }
  }
}

function rows(canvas: Canvas, y: number, x1: number, x2: number, c: PixelCode) {
  for (let x = x1; x <= x2; x++) setPx(canvas, x, y, c);
}

function line(canvas: Canvas, x1: number, y1: number, x2: number, y2: number, c: PixelCode) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  let x = x1;
  let y = y1;
  while (true) {
    setPx(canvas, x, y, c);
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

function outline(canvas: Canvas) {
  const next = canvas.map(row => [...row]);
  const solid = new Set<PixelCode>(["S", "s", "B", "H", "h", "E", "W", "M", "T", "t", "L", "V", "P", "p", "K", "k", "C", "c"]);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!solid.has(canvas[y][x])) continue;
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
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
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp(parseInt(hex.slice(1, 3), 16) + amount);
  const g = clamp(parseInt(hex.slice(3, 5), 16) + amount);
  const b = clamp(parseInt(hex.slice(5, 7), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function poseInfo(pose: HeroPose) {
  return {
    back: pose.startsWith("back"),
    side: pose.startsWith("side"),
    walk1: pose.endsWith("Walk1"),
    walk2: pose.endsWith("Walk2"),
    step: pose.endsWith("Walk1") ? -1 : pose.endsWith("Walk2") ? 1 : 0,
  };
}

function drawFrontHead(canvas: Canvas, appearance: HeroAppearance) {
  rows(canvas, 6, 9, 14, "S");
  rows(canvas, 7, 7, 16, "S");
  rows(canvas, 8, 6, 17, "S");
  rows(canvas, 9, 6, 17, "S");
  rows(canvas, 10, 6, 17, "S");
  rows(canvas, 11, 7, 16, "S");
  rows(canvas, 12, 7, 16, "S");
  rows(canvas, 13, 8, 15, "S");
  rows(canvas, 14, 9, 14, "S");

  setPx(canvas, 5, 9, "S");
  setPx(canvas, 18, 9, "S");
  setPx(canvas, 5, 10, "s");
  setPx(canvas, 18, 10, "s");

  if (appearance.sunglasses !== "none") {
    rect(canvas, 8, 10, 4, 2, "E");
    rect(canvas, 13, 10, 4, 2, "E");
    setPx(canvas, 12, 11, "E");
    setPx(canvas, 9, 10, "W");
    setPx(canvas, 14, 10, "W");
  } else {
    rect(canvas, 9, 10, 2, 3, "E");
    rect(canvas, 14, 10, 2, 3, "E");
    setPx(canvas, 9, 10, "W");
    setPx(canvas, 14, 10, "W");
    rows(canvas, 9, 8, 10, "O");
    rows(canvas, 9, 14, 16, "O");
  }

  setPx(canvas, 8, 13, "B");
  setPx(canvas, 16, 13, "B");
  rows(canvas, 14, 10, 13, "M");

  if (appearance.facialHair === "mustache") rows(canvas, 13, 9, 14, "M");
  if (appearance.facialHair === "beard") {
    rows(canvas, 13, 8, 15, "M");
    rows(canvas, 14, 9, 14, "M");
    rows(canvas, 15, 10, 13, "M");
  }
}

function drawBackHead(canvas: Canvas) {
  rows(canvas, 6, 9, 14, "H");
  rows(canvas, 7, 7, 16, "H");
  rows(canvas, 8, 6, 17, "H");
  rows(canvas, 9, 6, 17, "H");
  rows(canvas, 10, 6, 17, "H");
  rows(canvas, 11, 7, 16, "H");
  rows(canvas, 12, 7, 16, "H");
  rows(canvas, 13, 8, 15, "H");
  rows(canvas, 14, 9, 14, "H");
  rows(canvas, 15, 10, 13, "H");
}

function drawSideHead(canvas: Canvas, appearance: HeroAppearance) {
  rows(canvas, 6, 9, 14, "S");
  rows(canvas, 7, 7, 16, "S");
  rows(canvas, 8, 6, 17, "S");
  rows(canvas, 9, 6, 18, "S");
  rows(canvas, 10, 6, 18, "S");
  rows(canvas, 11, 7, 17, "S");
  rows(canvas, 12, 8, 17, "S");
  rows(canvas, 13, 9, 16, "S");
  rows(canvas, 14, 10, 15, "S");

  if (appearance.sunglasses !== "none") {
    rect(canvas, 14, 10, 4, 2, "E");
    setPx(canvas, 15, 10, "W");
  } else {
    rect(canvas, 14, 10, 2, 3, "E");
    setPx(canvas, 14, 10, "W");
    rows(canvas, 9, 14, 16, "O");
  }

  setPx(canvas, 17, 12, "s");
  rows(canvas, 14, 14, 14, "M");

  if (appearance.facialHair === "mustache") rows(canvas, 13, 14, 16, "M");
  if (appearance.facialHair === "beard") {
    rows(canvas, 13, 13, 17, "M");
    rows(canvas, 14, 12, 16, "M");
    rows(canvas, 15, 13, 15, "M");
  }
}

function drawHair(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hair === "none") return;
  const { back, side } = poseInfo(pose);
  const option = getHeroOption("hair", appearance.hair) as { style?: string };
  const style = option.style ?? "messy";

  if (side) {
    rows(canvas, 3, 8, 15, "H");
    rows(canvas, 4, 7, 17, "H");
    rows(canvas, 5, 6, 18, "H");
    rows(canvas, 6, 5, 9, "H");
    rows(canvas, 7, 5, 9, "H");
    rows(canvas, 8, 5, 8, "H");
    rows(canvas, 9, 5, 7, "H");
    rows(canvas, 6, 16, 19, "H");
    rows(canvas, 7, 17, 18, "H");
    if (style === "spiky") {
      line(canvas, 7, 4, 4, 0, "H");
      line(canvas, 11, 3, 12, 0, "H");
      line(canvas, 15, 4, 20, 1, "H");
    } else if (style === "swept") {
      line(canvas, 9, 6, 20, 8, "H");
      line(canvas, 11, 7, 19, 10, "H");
    } else {
      setPx(canvas, 18, 8, "H");
      setPx(canvas, 17, 9, "H");
      setPx(canvas, 16, 10, "H");
    }
    rows(canvas, 4, 9, 12, "h");
    return;
  }

  if (back) {
    rows(canvas, 3, 7, 16, "H");
    rows(canvas, 4, 6, 17, "H");
    rows(canvas, 5, 5, 18, "H");
    rows(canvas, 6, 5, 18, "H");
    rows(canvas, 7, 5, 18, "H");
    rows(canvas, 8, 5, 18, "H");
    rows(canvas, 9, 5, 18, "H");
    rows(canvas, 10, 6, 17, "H");
    rows(canvas, 11, 7, 16, "H");
    rows(canvas, 12, 8, 15, "H");
    rows(canvas, 13, 9, 14, "H");
    rows(canvas, 14, 10, 13, "H");
    rows(canvas, 5, 9, 14, "h");
    return;
  }

  rows(canvas, 3, 8, 15, "H");
  rows(canvas, 4, 7, 17, "H");
  rows(canvas, 5, 5, 18, "H");
  rows(canvas, 6, 4, 19, "H");
  rows(canvas, 7, 4, 19, "H");
  rows(canvas, 8, 4, 8, "H");
  rows(canvas, 8, 15, 19, "H");
  rows(canvas, 9, 5, 8, "H");
  rows(canvas, 9, 16, 18, "H");

  if (style === "spiky") {
    line(canvas, 7, 4, 4, 0, "H");
    line(canvas, 10, 3, 10, 0, "H");
    line(canvas, 14, 3, 17, 0, "H");
    line(canvas, 17, 4, 22, 2, "H");
  } else if (style === "short") {
    rows(canvas, 7, 6, 17, "H");
    rows(canvas, 8, 6, 18, "H");
  } else if (style === "swept") {
    line(canvas, 7, 8, 20, 5, "H");
    line(canvas, 8, 9, 21, 8, "H");
    line(canvas, 10, 10, 19, 12, "H");
  } else {
    setPx(canvas, 8, 8, "H");
    setPx(canvas, 9, 9, "H");
    setPx(canvas, 12, 8, "H");
    setPx(canvas, 13, 9, "H");
    setPx(canvas, 16, 8, "H");
    setPx(canvas, 15, 9, "H");
  }

  rows(canvas, 4, 9, 13, "h");
}

function drawHat(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  if (appearance.hat === "none") return;

  const { back, side } = poseInfo(pose);
  const beanie = appearance.hat === "dark-beanie";

  if (beanie) {
    rows(canvas, 2, 8, 15, "C");
    rows(canvas, 3, 6, 17, "C");
    rows(canvas, 4, 5, 18, "C");
    rows(canvas, 5, 6, 17, "c");
    return;
  }

  rows(canvas, 2, 8, 15, "C");
  rows(canvas, 3, 6, 17, "C");
  rows(canvas, 4, 5, 18, "C");
  rows(canvas, 5, 7, 16, "c");

  if (!back) {
    if (side) rows(canvas, 6, 16, 21, "C");
    else rows(canvas, 6, 16, 21, "C");
  }
}

function drawBody(canvas: Canvas, appearance: HeroAppearance, pose: HeroPose) {
  const { back, side, step } = poseInfo(pose);
  const shirt = getHeroOption("shirt", appearance.shirt) as { style?: string };
  const shirtStyle = shirt.style ?? "jacket";

  // neck
  rect(canvas, 10, 15, 4, 3, back ? "H" : "S");

  if (side) drawSideHead(canvas, appearance);
  else if (back) drawBackHead(canvas);
  else drawFrontHead(canvas, appearance);

  // torso
  if (side) {
    rows(canvas, 18, 9, 16, "T");
    rows(canvas, 19, 8, 17, "T");
    rows(canvas, 20, 8, 17, "T");
    rows(canvas, 21, 8, 17, "T");
    rows(canvas, 22, 8, 17, "T");
    rows(canvas, 23, 9, 16, "T");
    rows(canvas, 24, 10, 15, "T");
    rows(canvas, 25, 10, 15, "T");
    if (shirtStyle === "coat") {
      rows(canvas, 26, 10, 15, "T");
      rows(canvas, 27, 11, 14, "T");
    }
    rect(canvas, 15, 19 + (step < 0 ? 1 : 0), 3, 8, "s");
    rect(canvas, 15, 26 + (step < 0 ? 1 : 0), 3, 3, "S");
    rows(canvas, 19, 9, 10, "t");
    rows(canvas, 20, 9, 10, "t");
    rows(canvas, 21, 15, 16, "L");
  } else {
    rows(canvas, 18, 8, 16, "T");
    rows(canvas, 19, 7, 17, "T");
    rows(canvas, 20, 7, 17, "T");
    rows(canvas, 21, 7, 17, "T");
    rows(canvas, 22, 7, 17, "T");
    rows(canvas, 23, 8, 16, "T");
    rows(canvas, 24, 9, 15, "T");
    rows(canvas, 25, 9, 15, "T");

    if (shirtStyle === "jacket" || shirtStyle === "coat") {
      line(canvas, 11, 18, 11, 25, "O");
      setPx(canvas, 12, 20, "L");
    }
    if (shirtStyle === "hoodie") {
      rows(canvas, 17, 8, 15, "V");
      setPx(canvas, 9, 18, "V");
      setPx(canvas, 15, 18, "V");
    }
    if (shirtStyle === "coat") {
      rows(canvas, 26, 8, 16, "T");
      rows(canvas, 27, 9, 15, "T");
    }

    if (back) {
      rect(canvas, 5, 19 + (step < 0 ? 1 : 0), 3, 8, "T");
      rect(canvas, 16, 19 + (step > 0 ? 1 : 0), 3, 8, "T");
    }

    if (!back) {
      rect(canvas, 4, 19 + (step < 0 ? 1 : 0), 3, 8, "S");
      rect(canvas, 17, 19 + (step > 0 ? 1 : 0), 3, 8, "S");
      rect(canvas, 4, 26 + (step < 0 ? 1 : 0), 3, 3, "S");
      rect(canvas, 17, 26 + (step > 0 ? 1 : 0), 3, 3, "S");
    }

    rows(canvas, 19, 8, 9, "t");
    rows(canvas, 20, 8, 9, "t");
    rows(canvas, 21, 15, 16, "L");
  }

  // legs
  const leftLegExtra = step < 0 ? 2 : 0;
  const rightLegExtra = step > 0 ? 2 : 0;
  if (side) {
    rect(canvas, 10, 25, 4, 6 + leftLegExtra, "P");
    rect(canvas, 15, 25, 4, 6 + rightLegExtra, "P");
    rect(canvas, step < 0 ? 7 : 9, 30, 7, 2, "K");
    rect(canvas, step > 0 ? 15 : 14, step > 0 ? 30 : 29, 7, 2, "K");
  } else {
    rect(canvas, 8, 25, 4, 6 + leftLegExtra, "P");
    rect(canvas, 13, 25, 4, 6 + rightLegExtra, "P");
    rect(canvas, step < 0 ? 6 : 8, 30, 7, 2, "K");
    rect(canvas, step > 0 ? 14 : 13, step > 0 ? 30 : 29, 7, 2, "K");
  }

  setPx(canvas, side ? 11 : 9, 26, "p");
  setPx(canvas, side ? 16 : 14, 26, "p");
  setPx(canvas, side ? 11 : 10, 30, "k");
  setPx(canvas, side ? 17 : 15, step > 0 ? 30 : 29, "k");
}

function buildSprite(appearance: HeroAppearance, pose: HeroPose) {
  let canvas = createCanvas();
  drawBody(canvas, appearance, pose);
  drawHair(canvas, appearance, pose);
  drawHat(canvas, appearance, pose);
  canvas = outline(canvas);
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
    B: BLUSH,
    H: appearance.hair === "none" ? skin : hair,
    h: appearance.hair === "none" ? skin : shade(hair, 35),
    E: appearance.sunglasses === "none" ? EYE : "#111111",
    W: WHITE,
    M: OUTLINE,
    T: shirt,
    t: shade(shirt, -35),
    L: shade(shirt, 42),
    V: shade(shirt, -55),
    P: pants,
    p: shade(pants, -35),
    K: shoes,
    k: shade(shoes, -25),
    C: appearance.hat === "none" ? "transparent" : hat,
    c: appearance.hat === "none" ? "transparent" : shade(hat, 38),
  } satisfies Record<PixelCode, string>;
}

export function heroPoseFor(
  facing: HeroFacing,
  isWalking: boolean,
  walkFrame = 0,
): HeroPose {
  const walkSuffix = walkFrame % 2 === 0 ? "Walk1" : "Walk2";
  if (facing === "up") return isWalking ? (`back${walkSuffix}` as HeroPose) : "backIdle";
  if (facing === "left" || facing === "right") {
    return isWalking ? (`side${walkSuffix}` as HeroPose) : "sideIdle";
  }
  return isWalking ? (`front${walkSuffix}` as HeroPose) : "frontIdle";
}

export function PolishedHeroSprite({
  appearance,
  pose,
  pixelSize = 1.5,
  showShadow = true,
}: {
  appearance: HeroAppearance;
  pose: HeroPose;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const sprite = buildSprite(appearance, pose);
  const palette = paletteFor(appearance);

  return (
    <div
      style={{
        position: "relative",
        width: W * pixelSize,
        height: H * pixelSize,
        imageRendering: "pixelated",
      }}
    >
      {showShadow && (
        <div
          style={{
            position: "absolute",
            left: 5 * pixelSize,
            top: 30 * pixelSize,
            width: 14 * pixelSize,
            height: 2 * pixelSize,
            backgroundColor: "rgba(37,32,24,0.26)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${W}, ${pixelSize}px)`,
          gridTemplateRows: `repeat(${H}, ${pixelSize}px)`,
        }}
      >
        {sprite.flatMap((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${pose}-${x}-${y}`}
              style={{
                width: pixelSize,
                height: pixelSize,
                backgroundColor: palette[cell],
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}
