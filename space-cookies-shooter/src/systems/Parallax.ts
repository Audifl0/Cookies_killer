import Phaser from 'phaser';

export default class Parallax {
  scene: Phaser.Scene;
  layers: Phaser.GameObjects.TileSprite[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(): void {
    const colors = [0x060713, 0x0b1022, 0x141b3a];
    colors.forEach((color, index) => {
      const gfx = this.scene.add.graphics();
      gfx.fillStyle(color, 1);
      gfx.fillRect(0, 0, 512, 512);
      gfx.generateTexture(`parallax-${index}`, 512, 512);
      gfx.destroy();
      const tile = this.scene.add.tileSprite(0, 0, this.scene.scale.width, this.scene.scale.height, `parallax-${index}`);
      tile.setOrigin(0);
      tile.setScrollFactor(0);
      tile.setAlpha(0.3 + index * 0.2);
      this.layers.push(tile);
    });
  }

  update(delta: number): void {
    this.layers.forEach((layer, index) => {
      layer.tilePositionY += delta * 0.01 * (index + 1);
    });
  }
}
