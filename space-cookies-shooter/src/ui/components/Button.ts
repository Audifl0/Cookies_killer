import Phaser from 'phaser';

export default class UIButton extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, text: string, callback: () => void) {
    super(scene, x, y);
    this.background = scene.add.rectangle(0, 0, 220, 64, 0x1e2436, 0.9);
    this.background.setStrokeStyle(2, 0xf6c177);
    this.label = scene.add.text(0, 0, text, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.add([this.background, this.label]);
    scene.add.existing(this);
    this.setSize(220, 64);
    this.setInteractive(new Phaser.Geom.Rectangle(-110, -32, 220, 64), Phaser.Geom.Rectangle.Contains);
    this.on('pointerup', callback);
    this.on('pointerover', () => this.background.setFillStyle(0x2f3752, 0.95));
    this.on('pointerout', () => this.background.setFillStyle(0x1e2436, 0.9));
  }
}
