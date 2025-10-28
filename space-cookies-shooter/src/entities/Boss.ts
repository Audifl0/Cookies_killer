import Phaser from 'phaser';

import { BossData } from '@core/Types';
import Player from './Player';

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  data: BossData;
  hp: number;
  phaseIndex = 0;
  attackTimer = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, data: BossData) {
    super(scene, x, y, data.id);
    this.data = data;
    this.hp = data.hp;
    this.createTexture();
    scene.physics.add.existing(this);
    this.setCircle(80);
    this.setDepth(20);
    this.setData('boss', true);
    this.setData('type', 'boss');
  }

  createTexture(): void {
    const g = this.scene.add.graphics();
    g.fillStyle(0x1e2436, 1);
    g.fillCircle(160, 160, 150);
    g.lineStyle(12, 0xf6c177);
    g.strokeCircle(160, 160, 150);
    g.generateTexture(this.data.id, 320, 320);
    g.destroy();
  }

  currentPhase(): string {
    const ratio = this.hp / this.data.hp;
    const phase = this.data.phases.find((p) => ratio <= p.threshold) ?? this.data.phases[this.data.phases.length - 1];
    return phase.pattern;
  }

  updateBehavior(player: Player, delta: number): void {
    this.attackTimer -= delta;
    const direction = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y).normalize();
    if (this.attackTimer <= 0) {
      const pattern = this.currentPhase();
      this.scene.events.emit('boss-attack', this, direction, pattern);
      this.attackTimer = 2000;
    }
    this.body?.velocity.copy(direction.scale(60));
  }

  applyDamage(amount: number): boolean {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.scene.events.emit('boss-defeated', this);
      this.destroy();
      return true;
    }
    return false;
  }
}
