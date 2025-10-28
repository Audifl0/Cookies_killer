import Phaser from 'phaser';

export default class Drone extends Phaser.GameObjects.Ellipse {
  owner: Phaser.GameObjects.Sprite;
  radius: number;
  speed: number;
  angleOffset: number;

  constructor(scene: Phaser.Scene, owner: Phaser.GameObjects.Sprite, radius: number, color: number) {
    super(scene, owner.x, owner.y, 16, 16, color);
    this.owner = owner;
    this.radius = radius;
    this.speed = 0.002;
    this.angleOffset = Phaser.Math.FloatBetween(0, Math.PI * 2);
    scene.add.existing(this);
  }

  update(delta: number): void {
    this.angleOffset += this.speed * delta;
    this.x = this.owner.x + Math.cos(this.angleOffset) * this.radius;
    this.y = this.owner.y + Math.sin(this.angleOffset) * this.radius;
  }
}
