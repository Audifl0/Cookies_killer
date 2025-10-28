import Phaser from 'phaser';

export default class Missile extends Phaser.Physics.Arcade.Image {
  damage = 40;
  target?: Phaser.Physics.Arcade.Sprite;
  speed = 300;
  elapsed = 0;
  lifespan = 4000;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 'missile');
    this.createTexture();
  }

  createTexture(): void {
    const g = this.scene.add.graphics();
    g.fillStyle(0xffc857, 1);
    g.fillRect(0, 0, 12, 20);
    g.generateTexture('missile', 12, 20);
    g.destroy();
    this.setTexture('missile');
  }

  launch(x: number, y: number, target?: Phaser.Physics.Arcade.Sprite): void {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(x, y);
    this.target = target;
    this.elapsed = 0;
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.elapsed += delta;
    if (!this.target || !this.target.active) {
      this.body.velocity.y = -this.speed;
    } else {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
      this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
      this.setRotation(angle);
    }
    if (this.elapsed > this.lifespan) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
