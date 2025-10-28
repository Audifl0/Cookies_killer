import Phaser from 'phaser';

import { SaveGame } from '@core/Types';
import { clamp } from '@core/MathUtil';

import { InputState } from '@core/Input';

interface PlayerStats {
  hp: number;
  maxHp: number;
  shield: number;
  maxShield: number;
  speed: number;
  dashCooldown: number;
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  stats: PlayerStats;
  save: SaveGame;
  dashTimer = 0;
  healthBar!: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, save: SaveGame) {
    super(scene, scene.scale.width / 2, scene.scale.height / 2 + 140, 'player');
    this.save = save;
    this.stats = {
      hp: 100,
      maxHp: 100,
      shield: 60,
      maxShield: 60,
      speed: 260,
      dashCooldown: 2000
    };
    this.createPlaceholderTexture();
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(10);
    this.setCircle(20);
    this.setCollideWorldBounds(true);
    this.setName('player');
    this.healthBar = scene.add.graphics();
    this.healthBar.setScrollFactor(0);
  }

  createPlaceholderTexture(): void {
    if (this.scene.textures.exists('player')) return;
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0x95a2ff, 1);
    graphics.fillTriangle(0, 32, 16, 0, 32, 32);
    graphics.generateTexture('player', 32, 32);
    graphics.destroy();
    this.setTexture('player');
  }

  update(input: InputState, delta: number): void {
    const velocity = new Phaser.Math.Vector2();
    if (input.left) velocity.x -= 1;
    if (input.right) velocity.x += 1;
    if (input.up) velocity.y -= 1;
    if (input.down) velocity.y += 1;
    velocity.normalize().scale(this.stats.speed);
    this.body?.velocity.copy(velocity);

    this.rotation = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.scene.input.activePointer.worldX,
      this.scene.input.activePointer.worldY
    );

    if (input.dash && this.dashTimer <= 0) {
      const dashVector = velocity.clone().normalize().scale(500);
      this.body?.velocity.copy(dashVector);
      this.dashTimer = this.stats.dashCooldown;
    }
    this.dashTimer -= delta;

    this.healthBar.clear();
    this.healthBar.fillStyle(0x1e2436, 0.8);
    this.healthBar.fillRect(20, 20, 200, 12);
    this.healthBar.fillStyle(0xf76d57, 1);
    this.healthBar.fillRect(20, 20, (this.stats.hp / this.stats.maxHp) * 200, 12);
    this.healthBar.fillStyle(0x69e6f7, 1);
    this.healthBar.fillRect(20, 34, (this.stats.shield / this.stats.maxShield) * 200, 8);
  }

  damage(amount: number): void {
    if (this.stats.shield > 0) {
      const absorbed = Math.min(this.stats.shield, amount);
      this.stats.shield -= absorbed;
      amount -= absorbed;
    }
    this.stats.hp = clamp(this.stats.hp - amount, 0, this.stats.maxHp);
    if (this.stats.hp <= 0) {
      this.scene.scene.start('MainMenu');
    }
  }

  heal(amount: number): void {
    this.stats.hp = clamp(this.stats.hp + amount, 0, this.stats.maxHp);
  }

  rechargeShield(delta: number): void {
    this.stats.shield = clamp(this.stats.shield + delta * 0.02, 0, this.stats.maxShield);
  }
}
