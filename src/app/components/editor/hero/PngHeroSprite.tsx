import React from "react";
import type { HeroAppearance } from "./heroAppearance";

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

const SPRITE_W = 32;
const SPRITE_H = 48;

const hairAssetFor: Record<HeroAppearance["hair"], string> = {
  "none": "none",
  "messy-brown": "messy_brown",
  "messy-black": "messy_black",
  "spiky-blonde": "spiky_blonde",
  "short-red": "short_red",
  "swept-black": "swept_black",
};

const hatAssetFor: Record<HeroAppearance["hat"], string> = {
  "none": "none",
  "red-cap": "red_cap",
  "blue-cap": "blue_cap",
  "green-cap": "green_cap",
  "dark-beanie": "dark_beanie",
};

const shirtAssetFor: Record<HeroAppearance["shirt"], string> = {
  "red-jacket": "red_jacket",
  "blue-jacket": "blue_jacket",
  "green-hoodie": "green_hoodie",
  "yellow-tee": "yellow_tee",
  "black-coat": "black_coat",
};

const accessoryAssetFor = (appearance: HeroAppearance) => {
  if (appearance.sunglasses !== "none") return "sunglasses_black";
  if (appearance.facialHair === "mustache") return "mustache";
  if (appearance.facialHair === "beard") return "beard";
  return "none";
};

function asset(path: string) {
  return `/sprites/hero/${path}`;
}

function layerStyle(pixelSize: number): React.CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    width: SPRITE_W * pixelSize,
    height: SPRITE_H * pixelSize,
    imageRendering: "pixelated",
  };
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

export function PngHeroSprite({
  appearance,
  pose,
  pixelSize = 3,
  showShadow = true,
}: {
  appearance: HeroAppearance;
  pose: HeroPose;
  pixelSize?: number;
  showShadow?: boolean;
}) {
  const skin = appearance.skin;
  const hair = hairAssetFor[appearance.hair];
  const hat = hatAssetFor[appearance.hat];
  const shirt = shirtAssetFor[appearance.shirt];
  const pants = appearance.pants;
  const shoes = appearance.shoes;
  const accessory = accessoryAssetFor(appearance);

  const layers = [
    asset(`body/${skin}/${pose}.png`),
    asset(`pants/${pants}/${pose}.png`),
    asset(`shoes/${shoes}/${pose}.png`),
    asset(`shirt/${shirt}/${pose}.png`),
    asset(`hair/${hair}/${pose}.png`),
    asset(`hat/${hat}/${pose}.png`),
    asset(`accessory/${accessory}/${pose}.png`),
  ];

  return (
    <div
      style={{
        position: "relative",
        width: SPRITE_W * pixelSize,
        height: SPRITE_H * pixelSize,
        imageRendering: "pixelated",
      }}
    >
      {showShadow && (
        <div
          style={{
            position: "absolute",
            left: 7 * pixelSize,
            top: 45 * pixelSize,
            width: 18 * pixelSize,
            height: 3 * pixelSize,
            backgroundColor: "rgba(37,32,24,0.24)",
          }}
        />
      )}

      {layers.map(src => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          style={layerStyle(pixelSize)}
        />
      ))}
    </div>
  );
}
