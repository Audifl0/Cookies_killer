import Phaser from 'phaser';

export function createButton(
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  callback: () => void,
  width = 220,
  height = 60
): Phaser.GameObjects.Text {
  const background = scene.add.rectangle(x, y, width, height, 0x1e2436, 0.9);
  background.setStrokeStyle(2, 0xf6c177);
  const text = scene.add.text(x, y, label, {
    fontFamily: 'Inter, sans-serif',
    fontSize: '24px',
    color: '#ffffff'
  });
  text.setOrigin(0.5);
  background.setInteractive({ useHandCursor: true });
  background.on('pointerup', callback);
  background.on('pointerover', () => background.setFillStyle(0x2f3752, 0.95));
  background.on('pointerout', () => background.setFillStyle(0x1e2436, 0.9));
  return text;
}
