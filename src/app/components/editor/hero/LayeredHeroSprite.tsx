import React from "react";
import type { HeroAppearance } from "./heroAppearance";

export type HeroFacing = "up" | "down" | "left" | "right";

export type HeroPose =
  | "front_idle"
  | "front_walk_1"
  | "front_walk_2"
  | "back_idle"
  | "back_walk_1"
  | "back_walk_2"
  | "side_idle"
  | "side_walk_1"
  | "side_walk_2";

const SPRITE_WIDTH = 32;
const SPRITE_HEIGHT = 48;
const HERO_ASSET_ROOT = "/sprites/hero/v1";

const hairFolder: Record<HeroAppearance["hair"], string> = {
  "none": "none",
  "messy-brown": "messy_brown",
  "messy-black": "messy_black",
  "spiky-blonde": "spiky_blonde",
  "short-red": "short_red",
  "swept-black": "swept_black",
};

const hatFolder: Record<HeroAppearance["hat"], string> = {
  "none": "none",
  "red-cap": "red_cap",
  "blue-cap": "blue_cap",
  "green-cap": "green_cap",
  "dark-beanie": "dark_beanie",
};

const shirtFolder: Record<HeroAppearance["shirt"], string> = {
  "red-jacket": "red_jacket",
  "blue-jacket": "blue_jacket",
  "green-hoodie": "green_hoodie",
  "yellow-tee": "yellow_tee",
  "black-coat": "black_coat",
};

function accessoryFolder(appearance: HeroAppearance) {
  if (appearance.sunglasses !== "none") return "sunglasses_black";
  if (appearance.facialHair === "mustache") return "mustache";
  if (appearance.facialHair === "beard") return "beard";
  return "none";
}

function layerSrc(layer: string, option: string, pose: HeroPose) {
  return `${HERO_ASSET_ROOT}/${layer}/${option}/${pose}.png`;
}

function poseFor(facing: HeroFacing, isWalking: boolean, walkFrame: number): HeroPose {
  const frame = walkFrame % 2 === 0 ? "walk_1" : "walk_2";
  if (facing === "up") return isWalking ? `back_${frame}` as HeroPose : "back_idle";
  if (facing === "left" || facing === "right") return isWalking ? `side_${frame}` as HeroPose : "side_idle";
  return isWalking ? `front_${frame}` as HeroPose : "front_idle";
}

export const heroPoseFor = poseFor;

export function LayeredHeroSprite({
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
  const layers = [
    layerSrc("body", appearance.skin, pose),
    layerSrc("pants", appearance.pants, pose),
    layerSrc("shoes", appearance.shoes, pose),
    layerSrc("shirt", shirtFolder[appearance.shirt], pose),
    layerSrc("face", "default", pose),
    layerSrc("hair", hairFolder[appearance.hair], pose),
    layerSrc("hat", hatFolder[appearance.hat], pose),
    layerSrc("accessory", accessoryFolder(appearance), pose),
  ];

  return (
    <div
      style={{
        position: "relative",
        width: SPRITE_WIDTH * pixelSize,
        height: SPRITE_HEIGHT * pixelSize,
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
            backgroundColor: "rgba(0,0,0,0.28)",
          }}
        />
      )}

      {layers.map(src => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: SPRITE_WIDTH * pixelSize,
            height: SPRITE_HEIGHT * pixelSize,
            imageRendering: "pixelated",
          }}
        />
      ))}
    </div>
  );
}
