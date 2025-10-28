import Phaser from 'phaser';

export default class Bullet extends Phaser.Physics.Arcade.Image {
  damage = 10;
  lifespan = 1200;
  elapsed = 0;
  statusEffects: string[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'bullet');
    this.createTexture();
  }

  createTexture(): void {
    const g = this.scene.add.graphics();
    g.fillStyle(0xf4e3b2, 1);
    g.fillCircle(4, 4, 4);
    g.generateTexture('bullet', 8, 8);
    g.destroy();
    this.setTexture('bullet');
  }

  fire(x: number, y: number, angle: number, speed: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
    this.setRotation(angle);
    this.elapsed = 0;
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.elapsed += delta;
    if (this.elapsed >= this.lifespan) {
      this.setActive(false);
      this.setVisible(false);
      this.body.stop();
    }
  }
}
