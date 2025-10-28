import Phaser from 'phaser';

import { EnemyData } from '@core/Types';
import Player from './Player';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  data: EnemyData;
  hp: number;
  state: 'patrol' | 'chase' | 'attack' | 'flee';
  attackCooldown = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, data: EnemyData) {
    super(scene, x, y, 'enemy');
    this.data = data;
    this.hp = data.hp;
    this.state = 'patrol';
    this.createTexture();
    scene.physics.add.existing(this);
    this.setCircle(20);
    this.setCollideWorldBounds(true);
    this.setData('type', data.type);
  }

  createTexture(): void {
    const g = this.scene.add.graphics();
    g.fillStyle(0xc47a28, 1);
    g.fillCircle(24, 24, 22);
    g.lineStyle(4, 0x5a3312);
    g.strokeCircle(24, 24, 22);
    g.generateTexture('enemy', 48, 48);
    g.destroy();
    this.setTexture('enemy');
  }

  updateBehavior(player: Player, delta: number): void {
    const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    switch (this.data.type) {
      case 'basic':
      case 'kamikaze':
        this.state = distance < 380 ? 'chase' : 'patrol';
        break;
      case 'tank':
        this.state = distance < 420 ? 'chase' : 'patrol';
        break;
      case 'swarm':
        this.state = 'chase';
        break;
      case 'shooter':
      case 'freezer':
        this.state = distance < 500 ? 'attack' : 'patrol';
        break;
      default:
        this.state = 'patrol';
    }

    this.attackCooldown -= delta;
    const direction = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y).normalize();

    if (this.state === 'chase') {
      this.body?.velocity.copy(direction.scale(this.data.speed));
    } else if (this.state === 'attack') {
      this.body?.velocity.scale(0.9);
      if (this.attackCooldown <= 0) {
        this.scene.events.emit('enemy-shoot', this, direction, this.data.type);
        this.attackCooldown = 1500;
      }
    } else if (this.state === 'patrol') {
      this.body?.velocity.setToPolar(this.rotation, this.data.speed * 0.4);
    }

    if (this.data.type === 'kamikaze' && distance < 60) {
      this.scene.events.emit('enemy-explode', this);
    }
  }

  applyDamage(amount: number): boolean {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.scene.events.emit('enemy-killed', this);
      this.destroy();
      return true;
    }
    return false;
  }
}
