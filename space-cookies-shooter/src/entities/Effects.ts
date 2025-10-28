import Phaser from 'phaser';

export default class EffectsFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  explosion(x: number, y: number, color = 0xffc857): void {
    const particles = this.scene.add.particles(0, 0, 'particle', {
      x,
      y,
      speed: { min: 60, max: 200 },
      scale: { start: 0.6, end: 0 },
      tint: color,
      lifespan: 600,
      quantity: 12
    });
    this.scene.time.delayedCall(600, () => particles.destroy());
  }

  trail(target: Phaser.GameObjects.GameObject): Phaser.GameObjects.Particles.ParticleEmitterManager {
    const manager = this.scene.add.particles(0, 0, 'particle', {
      speed: 20,
      scale: { start: 0.4, end: 0 },
      lifespan: 300,
      tint: 0x95a2ff,
      frequency: 50
    });
    manager.emitters.list.forEach((emitter) => {
      emitter.startFollow(target);
    });
    return manager;
  }
}
