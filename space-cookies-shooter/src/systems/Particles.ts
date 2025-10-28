import Phaser from 'phaser';

export default class Particles {
  scene: Phaser.Scene;
  emitter?: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(): void {
    if (!this.scene.textures.exists('particle')) {
      const g = this.scene.add.graphics();
      g.fillStyle(0xffffff, 1);
      g.fillCircle(2, 2, 2);
      g.generateTexture('particle', 4, 4);
      g.destroy();
    }
    this.emitter = this.scene.add.particles(0, 0, 'particle', {
      x: {
        onEmit: () => Phaser.Math.Between(0, this.scene.scale.width)
      },
      y: {
        onEmit: () => 0
      },
      lifespan: 5000,
      speedY: { min: 30, max: 120 },
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
      quantity: 2
    });
    this.emitter.setScrollFactor(0);
  }

  update(_delta: number): void {
    // Width is resolved lazily inside the emitter configuration callbacks, so no per-frame work is required here.
  }
}
