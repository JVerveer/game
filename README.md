
# Phaser + Tiled village map demo

This is a small browser-game starter showing the recommended structure:

- `assets/maps/village-demo.json` is an editable Tiled map.
- `assets/tilesets/village-tiles.png` is a simple demo tileset.
- `assets/reference-map.png` is your uploaded image, included as visual reference only.
- `src/game.ts` renders the map with Phaser 3, adds collision, clickable hotspots, and a movable player.

## Run it

```bash
npm install
npm run dev
```

Open the Vite URL in your browser.

## Edit the map

Install Tiled, open `assets/maps/village-demo.json`, then edit layers named Ground, Roads, Buildings, Decorations, Collision, and Hotspots.

For production art, replace `village-tiles.png` with a proper pixel-art tileset that matches your reference image.
