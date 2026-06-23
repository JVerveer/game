
import Phaser from 'phaser';

class VillageScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<string, Phaser.Input.Keyboard.Key>;
  private message!: Phaser.GameObjects.Text;

  preload() {
    this.load.tilemapTiledJSON('village', 'assets/maps/village-demo.json');
    this.load.image('villageTiles', 'assets/tilesets/village-tiles.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'village' });
    const tiles = map.addTilesetImage('village-tiles', 'villageTiles')!;

    map.createLayer('Ground', tiles, 0, 0);
    map.createLayer('Roads', tiles, 0, 0);
    map.createLayer('Buildings', tiles, 0, 0);
    map.createLayer('Decorations', tiles, 0, 0);

    const collision = map.createLayer('Collision', tiles, 0, 0)!;
    collision.setVisible(false);
    collision.setCollisionByExclusion([-1, 0]);

    this.player = this.physics.add.sprite(640, 720, '');
    this.player.setSize(20, 26);
    this.player.setDisplaySize(20, 26);
    this.player.body.setCollideWorldBounds(true);
    this.player.setTint(0xfff2b0);
    this.add.circle(this.player.x, this.player.y, 10, 0xfff2b0).setName('playerDot');
    this.physics.add.collider(this.player, collision);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys('W,A,S,D') as Record<string, Phaser.Input.Keyboard.Key>;

    const hotspots = map.getObjectLayer('Hotspots')!.objects;
    hotspots.forEach((obj) => {
      const zone = this.add.zone(obj.x!, obj.y!, obj.width!, obj.height!).setOrigin(0).setInteractive();
      this.add.rectangle(obj.x! + obj.width! / 2, obj.y! + obj.height! / 2, obj.width!, obj.height!, 0xffffff, 0.06).setStrokeStyle(1, 0xffffff, 0.25);
      zone.on('pointerdown', () => this.showMessage(`${obj.name}: ${obj.properties?.find((p: any) => p.name === 'message')?.value ?? 'Hello!'}`));
    });

    this.message = this.add.text(16, 560, 'Ready', { fontSize: '18px', backgroundColor: '#000000aa', padding: { x: 8, y: 6 } }).setScrollFactor(0);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  update() {
    const speed = 160;
    const vx = (this.cursors.left.isDown || this.wasd.A.isDown ? -speed : 0) + (this.cursors.right.isDown || this.wasd.D.isDown ? speed : 0);
    const vy = (this.cursors.up.isDown || this.wasd.W.isDown ? -speed : 0) + (this.cursors.down.isDown || this.wasd.S.isDown ? speed : 0);
    this.player.setVelocity(vx, vy);
    const dot = this.children.getByName('playerDot') as Phaser.GameObjects.Arc;
    dot.setPosition(this.player.x, this.player.y);
  }

  private showMessage(text: string) {
    this.message.setText(text);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 640,
  pixelArt: true,
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: VillageScene,
});
