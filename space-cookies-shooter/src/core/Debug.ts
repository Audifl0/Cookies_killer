import Phaser from 'phaser';

import { SaveGame } from './Types';

export default class DebugOverlay {
  scene: Phaser.Scene;
  text?: Phaser.GameObjects.Text;
  visible: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.visible = false;
    this.scene.input.keyboard?.on('keydown-F9', () => {
      this.toggle();
    });
  }

  toggle(): void {
    this.visible = !this.visible;
    if (this.visible) {
      this.text = this.scene.add.text(16, 16, 'DEBUG', {
        fontSize: '12px',
        color: '#00ff99'
      });
      this.text.setScrollFactor(0);
    } else {
      this.text?.destroy();
    }
  }

  update(save: SaveGame, fps: number): void {
    if (!this.visible || !this.text) {
      return;
    }
    const pointer = this.scene.input.activePointer;
    this.text.setText(
      `FPS: ${fps.toFixed(0)}\n` +
        `Wave: ${save.progression.wave}\n` +
        `XP: ${save.progression.xp}\n` +
        `Crumbs: ${save.progression.crumbs}\n` +
        `Pointer: ${pointer.x.toFixed(0)}, ${pointer.y.toFixed(0)}`
    );
  }
}
