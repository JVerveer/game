export type MapObjectCategory =
  | "Core"
  | "Interior"
  | "Satiria"
  | "Wokeshire"
  | "Brexiton"
  | "Promptford"
  | "Cryptonia"
  | "Surveillia"
  | "Tweetsburg"
  | "Inflatopolis"
  | "Tariff"
  | "Ragebait"
  | "Factcheck"
  | "Custom";

export type MapObjectDef = {
  id: string;
  label: string;
  className: string;
  category: MapObjectCategory;
};

export const UNKNOWN_OBJECT_CLASS = "world-object object-unknown";

export const MAP_OBJECT_DEFS: MapObjectDef[] = [
  // Core / generic
  { id: "SHOP", label: "Shop Marker", className: "world-object object-shop", category: "Core" },
  { id: "HEAL", label: "Healing Marker", className: "world-object object-heal", category: "Core" },
  { id: "HOME", label: "Home Marker", className: "world-object object-home", category: "Core" },
  { id: "⌂", label: "House Marker", className: "world-object object-house", category: "Core" },
  { id: "DOOR_SHOP", label: "Shop Door", className: "world-object object-door-shop", category: "Core" },
  { id: "DOOR_HEAL", label: "Healing Door", className: "world-object object-door-heal", category: "Core" },
  { id: "DOOR_HOME", label: "Home Door", className: "world-object object-door-home", category: "Core" },
  { id: "★", label: "Save Point", className: "world-object object-save", category: "Core" },
  { id: "SIGN", label: "Sign", className: "world-object object-sign", category: "Core" },
  { id: "CAVE", label: "Cave", className: "world-object object-cave", category: "Core" },
  { id: "EXIT", label: "Exit", className: "world-object object-exit", category: "Core" },
  { id: "TRAIN", label: "Train Station Object", className: "world-object object-train-station", category: "Core" },

  // Routes
  { id: "ARROW_N", label: "Route Arrow North", className: "world-object object-route object-route-n", category: "Core" },
  { id: "ARROW_S", label: "Route Arrow South", className: "world-object object-route object-route-s", category: "Core" },
  { id: "ARROW_E", label: "Route Arrow East", className: "world-object object-route object-route-e", category: "Core" },
  { id: "ARROW_W", label: "Route Arrow West", className: "world-object object-route object-route-w", category: "Core" },
  { id: "ARROW_NE", label: "Route Arrow NE", className: "world-object object-route object-route-ne", category: "Core" },
  { id: "ARROW_NW", label: "Route Arrow NW", className: "world-object object-route object-route-nw", category: "Core" },
  { id: "ARROW_SE", label: "Route Arrow SE", className: "world-object object-route object-route-se", category: "Core" },
  { id: "ARROW_SW", label: "Route Arrow SW", className: "world-object object-route object-route-sw", category: "Core" },

  // Interior
  { id: "POTN", label: "Potion", className: "world-object object-potion", category: "Interior" },
  { id: "BALL", label: "Ball", className: "world-object object-ball", category: "Interior" },
  { id: "BED", label: "Bed", className: "world-object object-bed", category: "Interior" },
  { id: "TV", label: "TV", className: "world-object object-tv", category: "Interior" },
  { id: "←", label: "Arrow Left", className: "world-object object-arrow-left", category: "Interior" },
  { id: "→", label: "Arrow Right", className: "world-object object-arrow-right", category: "Interior" },
  { id: "CLERK", label: "Clerk", className: "clerk-sprite", category: "Interior" },
  { id: "NURSE", label: "Nurse", className: "nurse-sprite", category: "Interior" },

  // Satiria
  { id: "SATIRIA_SHOP", label: "Satiria Shop", className: "world-object satiria-building satiria-shop", category: "Satiria" },
  { id: "SATIRIA_HEALING", label: "Satiria Healing", className: "world-object satiria-building satiria-healing", category: "Satiria" },
  { id: "SATIRIA_HOUSE_BLUE", label: "Satiria Blue House", className: "world-object satiria-building satiria-house-blue", category: "Satiria" },
  { id: "SATIRIA_HOUSE_RED", label: "Satiria Red House", className: "world-object satiria-building satiria-house-red", category: "Satiria" },
  { id: "SATIRIA_INN", label: "Satiria Inn", className: "world-object satiria-building satiria-inn", category: "Satiria" },
  { id: "SATIRIA_STATION", label: "Satiria Station", className: "world-object satiria-building satiria-station", category: "Satiria" },
  { id: "SATIRIA_FOUNTAIN", label: "Satiria Fountain", className: "world-object satiria-fountain", category: "Satiria" },
  { id: "SATIRIA_STATUE", label: "Satiria Statue", className: "world-object satiria-statue", category: "Satiria" },
  { id: "SATIRIA_LAMP", label: "Satiria Lamp", className: "world-object satiria-lamp", category: "Satiria" },
  { id: "SATIRIA_BENCH", label: "Satiria Bench", className: "world-object satiria-bench", category: "Satiria" },
  { id: "SATIRIA_POND_SIGN", label: "Satiria Pond Sign", className: "world-object satiria-pond-sign", category: "Satiria" },

  // Wokeshire / Amsterdam
  { id: "CANAL_BRIDGE", label: "Canal Bridge", className: "world-object object-canal-bridge", category: "Wokeshire" },
  { id: "BICYCLE", label: "Bicycle", className: "world-object object-bicycle", category: "Wokeshire" },
  { id: "BIKE_RACK", label: "Bike Rack", className: "world-object object-bike-rack", category: "Wokeshire" },
  { id: "TULIP_STAND", label: "Tulip Stand", className: "world-object object-tulip-stand", category: "Wokeshire" },
  { id: "TULIP_FIELD_SIGN", label: "Tulip Field Sign", className: "world-object object-tulip-field-sign", category: "Wokeshire" },
  { id: "WINDMILL", label: "Windmill", className: "world-object object-windmill", category: "Wokeshire" },
  { id: "CANAL_HOUSE", label: "Canal House", className: "world-object object-canal-house", category: "Wokeshire" },
  { id: "HOUSEBOAT", label: "Houseboat", className: "world-object object-houseboat", category: "Wokeshire" },

  // Brexiton
  { id: "LONDON_CLOCK", label: "Clock Tower", className: "world-object object-london-clock", category: "Brexiton" },
  { id: "PARLIAMENT", label: "Parliament", className: "world-object object-parliament", category: "Brexiton" },
  { id: "PHONE_BOX", label: "Phone Box", className: "world-object object-phone-box", category: "Brexiton" },
  { id: "BLACK_CAB", label: "Black Cab", className: "world-object object-black-cab", category: "Brexiton" },
  { id: "DOUBLE_DECKER", label: "Double Decker", className: "world-object object-double-decker", category: "Brexiton" },
  { id: "LAMP_POST", label: "Lamp Post", className: "world-object object-lamp-post", category: "Brexiton" },
  { id: "VOTE_GATE", label: "Vote Gate", className: "world-object object-vote-gate", category: "Brexiton" },

  // Promptford
  { id: "EIFFEL_TOWER", label: "Tower", className: "world-object object-eiffel-tower", category: "Promptford" },
  { id: "PARIS_CAFE", label: "Cafe", className: "world-object object-paris-cafe", category: "Promptford" },
  { id: "BAGUETTE_STAND", label: "Baguette Stand", className: "world-object object-baguette-stand", category: "Promptford" },
  { id: "METRO_SIGN", label: "Metro Sign", className: "world-object object-metro-sign", category: "Promptford" },
  { id: "SEINE_BRIDGE", label: "Seine Bridge", className: "world-object object-seine-bridge", category: "Promptford" },
  { id: "AI_ORACLE", label: "AI Oracle", className: "world-object object-ai-oracle", category: "Promptford" },

  // Cryptonia
  { id: "BURJ_TOWER", label: "Burj Tower", className: "world-object object-burj-tower", category: "Cryptonia" },
  { id: "PALM_ISLAND", label: "Palm Island", className: "world-object object-palm-island", category: "Cryptonia" },
  { id: "LUXURY_CAR", label: "Luxury Car", className: "world-object object-luxury-car", category: "Cryptonia" },
  { id: "CRYPTO_BILLBOARD", label: "Crypto Billboard", className: "world-object object-crypto-billboard", category: "Cryptonia" },
  { id: "YACHT", label: "Yacht", className: "world-object object-yacht", category: "Cryptonia" },
  { id: "GOLD_ATM", label: "Gold ATM", className: "world-object object-gold-atm", category: "Cryptonia" },

  // Surveillia
  { id: "PEARL_TOWER", label: "Pearl Tower", className: "world-object object-pearl-tower", category: "Surveillia" },
  { id: "SHANGHAI_TOWER", label: "Shanghai Tower", className: "world-object object-shanghai-tower", category: "Surveillia" },
  { id: "NEON_SIGN", label: "Neon Sign", className: "world-object object-neon-sign", category: "Surveillia" },
  { id: "CAMERA_POLE", label: "Camera Pole", className: "world-object object-camera-pole", category: "Surveillia" },
  { id: "RIVER_FERRY", label: "River Ferry", className: "world-object object-river-ferry", category: "Surveillia" },
  { id: "DATA_KIOSK", label: "Data Kiosk", className: "world-object object-data-kiosk", category: "Surveillia" },

  // Tweetsburg
  { id: "MOSCOW_CATHEDRAL", label: "Cathedral", className: "world-object object-moscow-cathedral", category: "Tweetsburg" },
  { id: "KREMLIN_WALL", label: "Wall", className: "world-object object-kremlin-wall", category: "Tweetsburg" },
  { id: "SNOW_STATUE", label: "Snow Statue", className: "world-object object-snow-statue", category: "Tweetsburg" },
  { id: "RUMOR_KIOSK", label: "Rumor Kiosk", className: "world-object object-rumor-kiosk", category: "Tweetsburg" },
  { id: "RED_STAR", label: "Red Star", className: "world-object object-red-star", category: "Tweetsburg" },

  // Inflatopolis
  { id: "OBELISCO", label: "Obelisco", className: "world-object object-obelisco", category: "Inflatopolis" },
  { id: "TANGO_STAGE", label: "Tango Stage", className: "world-object object-tango-stage", category: "Inflatopolis" },
  { id: "STEAK_GRILL", label: "Steak Grill", className: "world-object object-steak-grill", category: "Inflatopolis" },
  { id: "PESO_SIGN", label: "Peso Sign", className: "world-object object-peso-sign", category: "Inflatopolis" },
  { id: "PRICE_BOARD", label: "Price Board", className: "world-object object-price-board", category: "Inflatopolis" },
  { id: "BALCONY_HOUSE", label: "Balcony House", className: "world-object object-balcony-house", category: "Inflatopolis" },

  // Tariff
  { id: "CHRIST_STATUE", label: "Hilltop Statue", className: "world-object object-christ-statue", category: "Tariff" },
  { id: "SUGARLOAF", label: "Sugarloaf", className: "world-object object-sugarloaf", category: "Tariff" },
  { id: "BEACH_UMBRELLA", label: "Beach Umbrella", className: "world-object object-beach-umbrella", category: "Tariff" },
  { id: "CARNIVAL_DRUMS", label: "Carnival Drums", className: "world-object object-carnival-drums", category: "Tariff" },
  { id: "RIO_BOAT", label: "Rio Boat", className: "world-object object-rio-boat", category: "Tariff" },
  { id: "CABLE_CAR", label: "Cable Car", className: "world-object object-cable-car", category: "Tariff" },

  // Ragebait
  { id: "GOLDEN_GATE", label: "Golden Gate", className: "world-object object-golden-gate", category: "Ragebait" },
  { id: "TRAM_CAR", label: "Tram Car", className: "world-object object-tram-car", category: "Ragebait" },
  { id: "TECH_BILLBOARD", label: "Tech Billboard", className: "world-object object-tech-billboard", category: "Ragebait" },
  { id: "HILL_HOUSE", label: "Hill House", className: "world-object object-hill-house", category: "Ragebait" },
  { id: "FOG_HORN", label: "Fog Horn", className: "world-object object-fog-horn", category: "Ragebait" },

  // Factcheck
  { id: "INDIA_GATE", label: "Verified Gate", className: "world-object object-india-gate", category: "Factcheck" },
  { id: "TUKTUK", label: "Tuktuk", className: "world-object object-tuktuk", category: "Factcheck" },
  { id: "LOTUS_DOME", label: "Lotus Dome", className: "world-object object-lotus-dome", category: "Factcheck" },
  { id: "FACT_FOUNTAIN", label: "Fact Fountain", className: "world-object object-fact-fountain", category: "Factcheck" },
  { id: "MARKET_STALL", label: "Market Stall", className: "world-object object-market-stall", category: "Factcheck" },
  { id: "NEWS_STAND", label: "News Stand", className: "world-object object-news-stand", category: "Factcheck" },
];

export const MAP_OBJECT_CLASS_BY_ID: Record<string, string> = Object.fromEntries(
  MAP_OBJECT_DEFS.map((def) => [def.id, def.className]),
);

export const objectDefFor = (id: string) => MAP_OBJECT_DEFS.find((def) => def.id === id);

export const objectClassForId = (id: string) => MAP_OBJECT_CLASS_BY_ID[id] ?? UNKNOWN_OBJECT_CLASS;

export const objectLabelForId = (id: string) => objectDefFor(id)?.label ?? `Unknown object: ${id}`;
