import Phaser from 'phaser';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  damage = 10;
  lifespan = 1200;
  elapsed = 0;
  statusEffects: string[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'bullet');
    this.createTexture();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setActive(false);
    this.setVisible(false);
    (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;
  }

  createTexture(): void {
    if (!this.scene.textures.exists('bullet')) {
      const g = this.scene.add.graphics();
      g.fillStyle(0xf4e3b2, 1);
      g.fillCircle(4, 4, 4);
      g.generateTexture('bullet', 8, 8);
      g.destroy();
    }
    this.setTexture('bullet');
  }

  fire(x: number, y: number, angle: number, speed: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    const body = this.body as Phaser.Physics.Arcade.Body | undefined;
    if (body) {
      this.scene.physics.velocityFromRotation(angle, speed, body.velocity);
    }
    this.setRotation(angle);
    this.elapsed = 0;
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.elapsed += delta;
    if (this.elapsed >= this.lifespan) {
      this.setActive(false);
      this.setVisible(false);
      const body = this.body as Phaser.Physics.Arcade.Body | undefined;
      body?.stop();
    }
  }
}
