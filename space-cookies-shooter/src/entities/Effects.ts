import Phaser from 'phaser';

export default class EffectsFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  explosion(x: number, y: number, color = 0xffc857): void {
    const emitter = this.scene.add.particles(x, y, 'particle', {
      speed: { min: 60, max: 200 },
      scale: { start: 0.6, end: 0 },
      tint: color,
      lifespan: 600,
      quantity: 12
    });
    this.scene.time.delayedCall(600, () => emitter.destroy());
  }

  trail(
    target: Phaser.GameObjects.GameObject & Phaser.Types.Math.Vector2Like
  ): Phaser.GameObjects.Particles.ParticleEmitter {
    const emitter = this.scene.add.particles(target.x, target.y, 'particle', {
      speed: 20,
      scale: { start: 0.4, end: 0 },
      lifespan: 300,
      tint: 0x95a2ff,
      frequency: 50
    });
    emitter.startFollow(target);
    return emitter;
  }
}
