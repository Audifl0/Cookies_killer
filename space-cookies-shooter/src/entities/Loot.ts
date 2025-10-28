import Phaser from 'phaser';

export type LootType = 'crumbs' | 'xp' | 'heal' | 'module';

export default class Loot extends Phaser.Physics.Arcade.Image {
  lootType: LootType;
  value: number;

  constructor(scene: Phaser.Scene, lootType: LootType, value: number) {
    super(scene, 0, 0, `loot-${lootType}`);
    this.lootType = lootType;
    this.value = value;
    this.createTexture();
  }

  createTexture(): void {
    const g = this.scene.add.graphics();
    const colors: Record<LootType, number> = {
      crumbs: 0xf6c177,
      xp: 0x95a2ff,
      heal: 0x4caf50,
      module: 0xff6f91
    };
    g.fillStyle(colors[this.lootType], 1);
    g.fillCircle(10, 10, 10);
    g.generateTexture(`loot-${this.lootType}`, 20, 20);
    g.destroy();
    this.setTexture(`loot-${this.lootType}`);
  }
}
