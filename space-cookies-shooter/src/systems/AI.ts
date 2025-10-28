import Enemy from '@entities/Enemy';
import Player from '@entities/Player';

export default class AISystem {
  enemies: Enemy[] = [];

  register(enemy: Enemy): void {
    this.enemies.push(enemy);
  }

  update(player: Player, delta: number): void {
    this.enemies = this.enemies.filter((enemy) => enemy.active);
    this.enemies.forEach((enemy) => enemy.updateBehavior(player, delta));
  }
}
