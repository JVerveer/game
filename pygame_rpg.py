import math
import random
import sys
from dataclasses import dataclass

import pygame


SCREEN_W, SCREEN_H = 960, 640
TILE = 32
FPS = 60

INK = (34, 29, 24)
CREAM = (255, 244, 194)
PAPER = (255, 250, 218)
GOLD = (242, 197, 54)
RED = (204, 67, 48)
GREEN = (66, 143, 71)
BLUE = (73, 132, 178)
SHADOW = (73, 52, 36)


@dataclass(frozen=True)
class TownTheme:
    key: str
    name: str
    inspiration: str
    satire: str
    hook: str
    accent: str
    npc: str
    npc_lines: tuple[str, str]
    world: tuple[int, int]


TOWNS = [
    TownTheme(
        "satiria",
        "Satiria Town",
        "Starter village",
        "Tutorial-grade satire with suspiciously helpful signs.",
        "Starting location with a shop, healing center, save point, and roads outward.",
        "forest",
        "Route Guide",
        ('"The east road is open now."', '"Eleven towns, one heroic pair of shoes."'),
        (10, 64),
    ),
    TownTheme(
        "brexiton",
        "Brexiton",
        "London",
        "Endless debates, bureaucracy, and exit negotiations.",
        "Gates constantly open and close depending on town votes.",
        "city",
        "Queue Minister",
        ('"We voted to open this gate, then formed a committee to close it."', '"Please enjoy the paperwork maze."'),
        (22, 58),
    ),
    TownTheme(
        "tweetsburg",
        "Tweetsburg",
        "San Francisco",
        "Social media discourse and online outrage.",
        "NPCs spread rumors that alter quests in real time.",
        "water",
        "Trend Watcher",
        ('"A rumor just patched itself into the main quest."', '"Do not read the replies unless you brought potions."'),
        (34, 50),
    ),
    TownTheme(
        "cryptonia",
        "Cryptonia City",
        "Miami",
        "Crypto hype, speculation, and sudden crashes.",
        "Currency value changes every few minutes.",
        "sand",
        "Token Baron",
        ('"My wallet was full this morning. Now it is a learning experience."', '"The beach is real. The yield is theoretical."'),
        (48, 62),
    ),
    TownTheme(
        "wokeshire",
        "Wokeshire",
        "Portland",
        "Culture-war debates, activism, and ideological purity tests.",
        "Every faction has different rules for acceptable behavior.",
        "forest",
        "Consensus Ranger",
        ('"The north path is approved by three factions and denounced by four."', '"Bring empathy, patience, and a spare checklist."'),
        (58, 44),
    ),
    TownTheme(
        "tariff",
        "Tariff Town",
        "Shanghai and major port cities",
        "Trade wars and import/export restrictions.",
        "Crossing districts requires paying changing tariffs.",
        "port",
        "Dock Broker",
        ('"Crossing the street costs three stamps and one surprise fee."', '"The ships are punctual. The forms are not."'),
        (72, 48),
    ),
    TownTheme(
        "factcheck",
        "Factcheck Falls",
        "Washington",
        "Competing narratives, spin, and fact-checking.",
        "Every NPC gives a different version of the same quest.",
        "water",
        "Citation Clerk",
        ('"The quest began here, unless you ask the mayor."', '"I rate that potion claim: needs context."'),
        (62, 30),
    ),
    TownTheme(
        "ragebait",
        "Ragebait Bay",
        "Los Angeles",
        "Attention economy and outrage-driven media.",
        "The more dramatic your actions, the more rewards you receive.",
        "sand",
        "Reaction Producer",
        ('"Try entering the shop with a gasp. The algorithm loves commitment."', '"Subtlety was nerfed last season."'),
        (80, 22),
    ),
    TownTheme(
        "surveillia",
        "Surveillia",
        "Beijing",
        "Surveillance technology, data collection, and monitoring.",
        "Guards know where you are unless you disable cameras.",
        "city",
        "Camera Guard",
        ('"You are currently standing exactly there."', '"Disable the cameras and I will have to guess like everyone else."'),
        (68, 14),
    ),
    TownTheme(
        "promptford",
        "Promptford",
        "Amsterdam mixed with AI startup hubs",
        "AI assistants, automation, and prompt engineering.",
        "Citizens outsource every decision to AI oracles.",
        "water",
        "Oracle Intern",
        ('"The oracle suggests the scenic route, confidence 0.51."', '"I asked it what to eat. It opened a sprint board."'),
        (50, 14),
    ),
    TownTheme(
        "inflatopolis",
        "Inflatopolis",
        "Buenos Aires",
        "Inflation, currency instability, and rising prices.",
        "Shop prices increase as you play.",
        "city",
        "Price Sprinter",
        ('"I saved up for bread. Now I can afford a receipt."', '"The shop sign updates faster than my legs."'),
        (35, 24),
    ),
]


TOWN_BY_KEY = {town.key: town for town in TOWNS}


class PixelFont:
    def __init__(self):
        self.small = pygame.font.Font(None, 20)
        self.medium = pygame.font.Font(None, 26)
        self.large = pygame.font.Font(None, 42)
        self.title = pygame.font.Font(None, 74)

    def draw(self, surf, text, pos, color=INK, font=None, shadow=False):
        font = font or self.medium
        if shadow:
            img = font.render(text, False, SHADOW)
            surf.blit(img, (pos[0] + 2, pos[1] + 2))
        img = font.render(text, False, color)
        surf.blit(img, pos)
        return img.get_rect(topleft=pos)


def draw_panel(surf, rect, fill=PAPER, border=INK):
    pygame.draw.rect(surf, SHADOW, rect.move(5, 5))
    pygame.draw.rect(surf, border, rect)
    inner = rect.inflate(-8, -8)
    pygame.draw.rect(surf, fill, inner)
    pygame.draw.rect(surf, (255, 255, 255), inner, 2)


def wrap_text(text, font, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = word if not line else f"{line} {word}"
        if font.size(test)[0] <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


class TilePainter:
    def __init__(self):
        self.cache = {}

    def tile(self, kind):
        if kind in self.cache:
            return self.cache[kind]
        surf = pygame.Surface((TILE, TILE)).convert()
        if kind == "G":
            surf.fill((114, 174, 88))
            for i in range(0, TILE, 8):
                pygame.draw.line(surf, (82, 145, 67), (i, TILE), (i + 5, TILE - 8), 2)
        elif kind == "X":
            surf.fill((91, 154, 73))
            for x in range(2, TILE, 7):
                pygame.draw.line(surf, (43, 103, 48), (x, TILE - 3), (x + 4, TILE - 18), 3)
        elif kind == "R":
            surf.fill((184, 139, 80))
            for y in range(4, TILE, 10):
                pygame.draw.line(surf, (146, 103, 61), (0, y), (TILE, y + 3), 1)
        elif kind == "W":
            surf.fill((67, 143, 188))
            for y in range(6, TILE, 12):
                pygame.draw.arc(surf, (143, 204, 219), (0, y - 5, 18, 10), 0, math.pi, 2)
                pygame.draw.arc(surf, (37, 103, 156), (15, y, 18, 10), 0, math.pi, 2)
        elif kind == "S":
            surf.fill((225, 196, 116))
            for x in range(4, TILE, 9):
                pygame.draw.circle(surf, (168, 134, 75), (x, (x * 5) % TILE), 1)
        elif kind == "T":
            surf.fill((42, 84, 38))
            pygame.draw.rect(surf, (92, 64, 38), (13, 16, 6, 16))
            pygame.draw.circle(surf, (38, 111, 48), (16, 13), 13)
            pygame.draw.circle(surf, (71, 143, 57), (11, 10), 7)
        elif kind == "B":
            surf.fill((148, 113, 84))
            pygame.draw.rect(surf, (196, 72, 54), (2, 2, 28, 10))
            pygame.draw.rect(surf, (236, 202, 126), (5, 12, 22, 18))
            pygame.draw.rect(surf, INK, (13, 18, 7, 12))
        elif kind == "H":
            surf.fill((148, 113, 84))
            pygame.draw.rect(surf, BLUE, (2, 2, 28, 10))
            pygame.draw.rect(surf, (236, 202, 126), (5, 12, 22, 18))
            pygame.draw.rect(surf, CREAM, (13, 4, 6, 6))
            pygame.draw.rect(surf, CREAM, (11, 6, 10, 2))
        elif kind == "M":
            surf.fill((96, 83, 84))
            pygame.draw.polygon(surf, (73, 67, 78), [(1, 31), (16, 4), (31, 31)])
            pygame.draw.polygon(surf, (211, 210, 195), [(16, 4), (11, 14), (20, 14)])
        elif kind == "V":
            surf.fill((184, 139, 80))
            pygame.draw.polygon(surf, GOLD, [(16, 3), (20, 13), (31, 13), (22, 20), (25, 31), (16, 24), (7, 31), (10, 20), (1, 13), (12, 13)])
        else:
            surf.fill((30, 28, 42))
        pygame.draw.rect(surf, (0, 0, 0), (0, 0, TILE, TILE), 1)
        self.cache[kind] = surf
        return surf


def make_town_map(theme):
    w, h = 56, 34
    rows = [["T" for _ in range(w)] for _ in range(h)]

    def rect(x, y, rw, rh, tile):
        for yy in range(y, y + rh):
            for xx in range(x, x + rw):
                if 0 <= xx < w and 0 <= yy < h:
                    rows[yy][xx] = tile

    def hline(x1, x2, y, tile):
        rect(x1, y, x2 - x1 + 1, 1, tile)

    def vline(x, y1, y2, tile):
        rect(x, y1, 1, y2 - y1 + 1, tile)

    rect(4, 4, 48, 24, "G")
    rect(15, 10, 24, 11, "R")
    hline(0, 55, 18, "R")
    vline(27, 7, 29, "R")
    hline(27, 55, 29, "R")
    hline(0, 27, 29, "R")

    if theme.accent in ("water", "port"):
        rect(41, 5, 8, 13, "W")
        rect(38, 18, 13, 4, "R" if theme.accent == "port" else "S")
    if theme.accent == "sand":
        rect(5, 22, 18, 5, "S")
        rect(36, 5, 10, 5, "S")
    if theme.accent == "city":
        rect(43, 7, 7, 11, "B")
    if theme.accent == "forest":
        rect(6, 6, 8, 9, "X")
        rect(39, 21, 8, 5, "X")

    rect(16, 11, 6, 4, "B")
    rect(25, 11, 6, 4, "H")
    rect(34, 11, 6, 4, "B")
    rect(18, 21, 6, 4, "B")
    rect(32, 21, 6, 4, "B")
    rows[18][27] = "V"
    return rows


class TownMap:
    def __init__(self, theme, index):
        self.theme = theme
        self.index = index
        self.rows = make_town_map(theme)
        self.w = len(self.rows[0])
        self.h = len(self.rows)
        self.spawn = pygame.Vector2(2, 18)
        self.portals = {}
        if index > 0:
            self.portals[(1, 18)] = index - 1
        if index < len(TOWNS) - 1:
            self.portals[(55, 18)] = index + 1
        self.npcs = [
            NPC(29 if index % 2 == 0 else 24, 19 if index % 2 == 0 else 17, theme.npc, theme.npc_lines, index % 5)
        ]

    def tile_at(self, x, y):
        if 0 <= x < self.w and 0 <= y < self.h:
            return self.rows[y][x]
        return "T"

    def walkable(self, x, y):
        return self.tile_at(x, y) in {"G", "R", "X", "S", "V"}

    def location_name(self, x, y):
        tile = self.tile_at(x, y)
        if x <= 3:
            return f"{self.theme.name} West Route"
        if x >= 52:
            return f"{self.theme.name} East Route"
        if tile == "X":
            return f"{self.theme.name} Tall Grass"
        if tile == "W":
            return f"{self.theme.name} Waterfront"
        if tile == "S":
            return f"{self.theme.name} Shore"
        if 14 <= x <= 41 and 9 <= y <= 25:
            return self.theme.name
        return f"{self.theme.name} Outskirts"


class SpriteFactory:
    def __init__(self):
        self.cache = {}

    def hero(self, facing="down", walk=0):
        key = ("hero", facing, walk)
        if key not in self.cache:
            self.cache[key] = self._person((215, 61, 50), BLUE, CREAM, facing, walk)
        return self.cache[key]

    def npc(self, variant=0, walk=0):
        colors = [
            ((49, 95, 42), GOLD, GREEN),
            ((122, 75, 156), BLUE, CREAM),
            (RED, GREEN, GOLD),
            ((90, 60, 34), RED, BLUE),
            (INK, CREAM, (122, 75, 156)),
        ]
        key = ("npc", variant, walk)
        if key not in self.cache:
            hair, shirt, sleeve = colors[variant % len(colors)]
            self.cache[key] = self._person(hair, shirt, sleeve, "down", walk)
        return self.cache[key]

    def _person(self, hair, shirt, sleeve, facing, walk):
        surf = pygame.Surface((32, 42), pygame.SRCALPHA)
        bob = -2 if walk else 0
        leg = 2 if walk else 0
        pygame.draw.rect(surf, hair, (9, 1 + bob, 14, 7))
        pygame.draw.rect(surf, (244, 194, 138), (8, 7 + bob, 16, 15))
        pygame.draw.rect(surf, INK, (4, 11 + bob, 4, 8))
        pygame.draw.rect(surf, INK, (24, 11 + bob, 4, 8))
        if facing != "up":
            pygame.draw.rect(surf, INK, (12, 13 + bob, 3, 3))
            pygame.draw.rect(surf, INK, (19, 13 + bob, 3, 3))
            pygame.draw.rect(surf, RED, (15, 19 + bob, 5, 2))
        pygame.draw.rect(surf, shirt, (10, 23 + bob, 12, 12))
        pygame.draw.rect(surf, sleeve, (5, 24 + bob, 5, 8))
        pygame.draw.rect(surf, sleeve, (22, 24 + bob, 5, 8))
        pygame.draw.rect(surf, INK, (9 - leg, 35 + bob, 6, 6))
        pygame.draw.rect(surf, INK, (18 + leg, 35 + bob, 6, 6))
        pygame.draw.rect(surf, (0, 0, 0), (8, 7 + bob, 16, 15), 1)
        return surf


class NPC:
    def __init__(self, x, y, name, lines, variant):
        self.x = x
        self.y = y
        self.home = pygame.Vector2(x, y)
        self.name = name
        self.lines = lines
        self.variant = variant
        self.walk_timer = 0

    def update(self, town, hero_tile, dt):
        self.walk_timer -= dt
        if self.walk_timer > 0 or random.random() > 0.012:
            return
        self.walk_timer = 0.28
        dx, dy = random.choice([(0, -1), (0, 1), (-1, 0), (1, 0)])
        nx, ny = self.x + dx, self.y + dy
        if abs(nx - self.home.x) + abs(ny - self.home.y) > 4:
            return
        if (nx, ny) == hero_tile:
            return
        if town.walkable(nx, ny):
            self.x, self.y = nx, ny


class Game:
    def __init__(self):
        pygame.init()
        pygame.display.set_caption("Cringe Quest Yellow: Pygame Edition")
        self.screen = pygame.display.set_mode((SCREEN_W, SCREEN_H))
        self.clock = pygame.time.Clock()
        self.fonts = PixelFont()
        self.tiles = TilePainter()
        self.sprites = SpriteFactory()
        self.towns = [TownMap(theme, i) for i, theme in enumerate(TOWNS)]
        self.town_i = 0
        self.hero = pygame.Vector2(27, 18)
        self.facing = "down"
        self.steps = 0
        self.dialog = None
        self.dialog_line = 0
        self.mode = "title"
        self.minimap_open = False
        self.walk_flash = 0
        self.price = 45
        self.gold = 1240
        self.message = ""
        self.message_timer = 0

    @property
    def town(self):
        return self.towns[self.town_i]

    def run(self):
        while True:
            dt = self.clock.tick(FPS) / 1000
            self.handle_events()
            self.update(dt)
            self.draw()

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if self.minimap_rect().collidepoint(event.pos):
                    self.minimap_open = not self.minimap_open
            if event.type == pygame.KEYDOWN:
                if self.mode == "title":
                    self.mode = "game"
                    continue
                if event.key in (pygame.K_ESCAPE, pygame.K_q):
                    if self.dialog:
                        self.dialog = None
                    else:
                        self.mode = "title" if self.mode == "game" else "game"
                if self.dialog:
                    if event.key in (pygame.K_SPACE, pygame.K_RETURN, pygame.K_z):
                        self.advance_dialog()
                    continue
                if event.key in (pygame.K_SPACE, pygame.K_RETURN, pygame.K_z):
                    self.interact()
                if event.key in (pygame.K_UP, pygame.K_w):
                    self.move(0, -1, "up")
                if event.key in (pygame.K_DOWN, pygame.K_s):
                    self.move(0, 1, "down")
                if event.key in (pygame.K_LEFT, pygame.K_a):
                    self.move(-1, 0, "left")
                if event.key in (pygame.K_RIGHT, pygame.K_d):
                    self.move(1, 0, "right")
                if event.key == pygame.K_m:
                    self.minimap_open = not self.minimap_open

    def update(self, dt):
        self.walk_flash = max(0, self.walk_flash - dt)
        self.message_timer = max(0, self.message_timer - dt)
        if self.mode != "game" or self.dialog:
            return
        hero_tile = (int(self.hero.x), int(self.hero.y))
        for npc in self.town.npcs:
            npc.update(self.town, hero_tile, dt)

    def move(self, dx, dy, facing):
        if self.mode != "game":
            return
        self.facing = facing
        nx, ny = int(self.hero.x + dx), int(self.hero.y + dy)
        if not self.town.walkable(nx, ny):
            return
        if any(npc.x == nx and npc.y == ny for npc in self.town.npcs):
            return
        self.hero.update(nx, ny)
        self.steps += 1
        self.price = 45 + self.steps // 12
        self.walk_flash = 0.16
        if (nx, ny) in self.town.portals:
            self.change_town(self.town.portals[(nx, ny)])

    def change_town(self, town_i):
        if town_i < 0 or town_i >= len(self.towns):
            return
        old_i = self.town_i
        self.town_i = town_i
        if town_i > old_i:
            self.hero.update(2, 18)
            self.facing = "right"
        else:
            self.hero.update(54, 18)
            self.facing = "left"
        self.toast(f"Entered {self.town.theme.name}")

    def interact(self):
        offsets = {"up": (0, -1), "down": (0, 1), "left": (-1, 0), "right": (1, 0)}
        dx, dy = offsets[self.facing]
        targets = [(int(self.hero.x + dx), int(self.hero.y + dy)), (int(self.hero.x), int(self.hero.y))]
        for tx, ty in targets:
            for npc in self.town.npcs:
                if (npc.x, npc.y) == (tx, ty):
                    self.start_dialog(npc.name, list(npc.lines))
                    return
            tile = self.town.tile_at(tx, ty)
            if tile == "V":
                self.toast("Progress saved")
                self.start_dialog("Save Point", ["Progress saved.", f"{self.town.theme.name} - Lv. 15"])
                return
            if tile == "B":
                self.start_dialog("Town Door", [f"Local shops advertise potions at {self.price} G.", self.town.theme.hook])
                return
        self.start_dialog(self.town.theme.name, [self.town.theme.satire, self.town.theme.hook])

    def start_dialog(self, name, lines):
        self.dialog = {"name": name, "lines": lines}
        self.dialog_line = 0

    def advance_dialog(self):
        self.dialog_line += 1
        if self.dialog_line >= len(self.dialog["lines"]):
            self.dialog = None
            self.dialog_line = 0

    def toast(self, text):
        self.message = text
        self.message_timer = 1.8

    def camera(self):
        map_w = self.town.w * TILE
        map_h = self.town.h * TILE
        x = SCREEN_W // 2 - (self.hero.x + 0.5) * TILE
        y = SCREEN_H // 2 - (self.hero.y + 0.5) * TILE
        x = min(0, max(x, SCREEN_W - map_w))
        y = min(0, max(y, SCREEN_H - map_h))
        return int(x), int(y)

    def draw(self):
        if self.mode == "title":
            self.draw_title()
        else:
            self.draw_game()
        pygame.display.flip()

    def draw_title(self):
        self.screen.fill((247, 219, 85))
        pygame.draw.rect(self.screen, (122, 168, 86), (0, SCREEN_H // 2, SCREEN_W, SCREEN_H // 2))
        for x in range(0, SCREEN_W, 32):
            pygame.draw.line(self.screen, (224, 180, 52), (x, 0), (x + 80, SCREEN_H), 1)
        panel = pygame.Rect(170, 94, 620, 410)
        draw_panel(self.screen, panel)
        self.fonts.draw(self.screen, "CRINGE QUEST", (250, 150), RED, self.fonts.title, True)
        self.fonts.draw(self.screen, "YELLOW", (380, 216), INK, self.fonts.large, True)
        self.fonts.draw(self.screen, "A brighter 90s monster-town RPG", (286, 280), GREEN, self.fonts.medium)
        pygame.draw.rect(self.screen, INK, (285, 326, 390, 84), 4)
        pygame.draw.rect(self.screen, (141, 180, 90), (289, 330, 382, 76))
        self.screen.blit(pygame.transform.scale(self.sprites.hero("down"), (64, 84)), (382, 320))
        self.screen.blit(pygame.transform.scale(self.sprites.npc(2), (64, 84)), (514, 320))
        if pygame.time.get_ticks() // 500 % 2 == 0:
            self.fonts.draw(self.screen, "PRESS ANY KEY", (375, 448), INK, self.fonts.medium)
        self.fonts.draw(self.screen, "WASD/ARROWS move   SPACE talk   M map   Q title", (263, 548), CREAM, self.fonts.small)

    def draw_game(self):
        self.screen.fill((36, 52, 38))
        cam_x, cam_y = self.camera()
        for y, row in enumerate(self.town.rows):
            for x, kind in enumerate(row):
                self.screen.blit(self.tiles.tile(kind), (cam_x + x * TILE, cam_y + y * TILE))

        for pos, target in self.town.portals.items():
            x, y = pos
            sx, sy = cam_x + x * TILE, cam_y + y * TILE
            pygame.draw.rect(self.screen, CREAM, (sx + 8, sy + 10, 16, 12))
            arrow = "<" if target < self.town_i else ">"
            self.fonts.draw(self.screen, arrow, (sx + 11, sy + 7), INK, self.fonts.medium)

        for npc in self.town.npcs:
            px, py = cam_x + npc.x * TILE, cam_y + npc.y * TILE - 10
            walk = 1 if npc.walk_timer > 0 else 0
            self.screen.blit(self.sprites.npc(npc.variant, walk), (px, py))

        hero_x, hero_y = cam_x + int(self.hero.x) * TILE, cam_y + int(self.hero.y) * TILE - 10
        self.screen.blit(self.sprites.hero(self.facing, 1 if self.walk_flash > 0 else 0), (hero_x, hero_y))

        self.draw_hud()
        self.draw_minimap()
        if self.message_timer > 0:
            self.draw_toast()
        if self.dialog:
            self.draw_dialog()

    def draw_hud(self):
        hud = pygame.Rect(14, 12, SCREEN_W - 28, 66)
        pygame.draw.rect(self.screen, (34, 29, 24, 180), hud)
        pygame.draw.rect(self.screen, CREAM, hud, 2)
        self.fonts.draw(self.screen, "HERO  LV.15", (30, 24), CREAM, self.fonts.small)
        pygame.draw.rect(self.screen, INK, (30, 48, 140, 13))
        pygame.draw.rect(self.screen, GREEN, (33, 51, 110, 7))
        loc = self.town.location_name(int(self.hero.x), int(self.hero.y))
        self.fonts.draw(self.screen, loc, (SCREEN_W // 2 - 160, 27), CREAM, self.fonts.medium)
        self.fonts.draw(self.screen, f"Steps {self.steps}   {self.gold} G   Potion {self.price} G", (674, 26), CREAM, self.fonts.small)

    def minimap_rect(self):
        return pygame.Rect(16, SCREEN_H - (252 if self.minimap_open else 106), 278 if self.minimap_open else 158, 234 if self.minimap_open else 88)

    def draw_minimap(self):
        rect = self.minimap_rect()
        draw_panel(self.screen, rect)
        self.fonts.draw(self.screen, "WORLD MAP", (rect.x + 12, rect.y + 10), GREEN, self.fonts.small)
        map_rect = pygame.Rect(rect.x + 12, rect.y + 34, rect.w - 24, 82 if self.minimap_open else 42)
        pygame.draw.rect(self.screen, (119, 173, 86), map_rect)
        pygame.draw.rect(self.screen, INK, map_rect, 2)
        points = []
        for town in TOWNS:
            px = map_rect.x + town.world[0] * map_rect.w // 100
            py = map_rect.y + town.world[1] * map_rect.h // 100
            points.append((px, py))
        pygame.draw.lines(self.screen, SHADOW, False, points, 2)
        for i, town in enumerate(TOWNS):
            color = RED if i == self.town_i else GOLD
            r = 6 if i == self.town_i else 4
            pygame.draw.rect(self.screen, INK, (points[i][0] - r - 1, points[i][1] - r - 1, r * 2 + 2, r * 2 + 2))
            pygame.draw.rect(self.screen, color, (points[i][0] - r, points[i][1] - r, r * 2, r * 2))
        label_y = map_rect.bottom + 8
        self.fonts.draw(self.screen, f"Hero: {self.town.location_name(int(self.hero.x), int(self.hero.y))}", (rect.x + 12, label_y), INK, self.fonts.small)
        if self.minimap_open:
            self.fonts.draw(self.screen, self.town.theme.name, (rect.x + 12, label_y + 28), RED, self.fonts.medium)
            for i, line in enumerate(wrap_text(self.town.theme.hook, self.fonts.small, rect.w - 26)[:3]):
                self.fonts.draw(self.screen, line, (rect.x + 12, label_y + 58 + i * 18), SHADOW, self.fonts.small)

    def draw_toast(self):
        w = max(230, self.fonts.medium.size(self.message)[0] + 48)
        rect = pygame.Rect((SCREEN_W - w) // 2, 92, w, 44)
        draw_panel(self.screen, rect, fill=CREAM)
        self.fonts.draw(self.screen, self.message, (rect.x + 24, rect.y + 12), RED, self.fonts.medium)

    def draw_dialog(self):
        rect = pygame.Rect(48, SCREEN_H - 160, SCREEN_W - 96, 122)
        draw_panel(self.screen, rect)
        self.fonts.draw(self.screen, self.dialog["name"], (rect.x + 22, rect.y + 14), RED, self.fonts.small)
        text = self.dialog["lines"][self.dialog_line]
        for i, line in enumerate(wrap_text(text, self.fonts.medium, rect.w - 60)[:3]):
            self.fonts.draw(self.screen, line, (rect.x + 22, rect.y + 44 + i * 24), INK, self.fonts.medium)
        self.fonts.draw(self.screen, "SPACE", (rect.right - 92, rect.bottom - 28), SHADOW, self.fonts.small)


if __name__ == "__main__":
    Game().run()
