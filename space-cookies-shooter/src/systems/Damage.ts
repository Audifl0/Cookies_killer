import Phaser from 'phaser';

import Enemy from '@entities/Enemy';

export interface DamageEvent {
  target: Enemy | Phaser.Physics.Arcade.Sprite;
  amount: number;
  statusEffects?: string[];
}

export default class DamageSystem {
  apply(event: DamageEvent): boolean {
    const sprite = event.target as Enemy;
    return sprite.applyDamage(event.amount);
  }
}
