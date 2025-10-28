import Phaser from 'phaser';

import { EnemyData, WeaponData } from '@core/Types';
import Enemy from '@entities/Enemy';
import Player from '@entities/Player';
import Loot from '@entities/Loot';

export default class Spawner {
  scene: Phaser.Scene;
  enemyGroup: Phaser.Physics.Arcade.Group;
  lootGroup: Phaser.Physics.Arcade.Group;
  enemies: EnemyData[];
  weapons: WeaponData[];

  constructor(scene: Phaser.Scene, enemies: EnemyData[], weapons: WeaponData[]) {
    this.scene = scene;
    this.enemies = enemies;
    this.weapons = weapons;
    this.enemyGroup = this.scene.physics.add.group({ runChildUpdate: true });
    this.lootGroup = this.scene.physics.add.group();

    this.scene.events.on('enemy-killed', (enemy: Enemy) => {
      this.dropLoot(enemy);
    });
  }

  spawnEnemy(typeId: string, position?: Phaser.Math.Vector2): void {
    const data = this.enemies.find((e) => e.id === typeId);
    if (!data) return;
    const spawnX = position?.x ?? Phaser.Math.Between(0, this.scene.scale.width);
    const spawnY = position?.y ?? -32;
    const enemy = new Enemy(this.scene, spawnX, spawnY, data);
    this.enemyGroup.add(enemy);
  }

  update(delta: number, player: Player): void {
    this.enemyGroup.getChildren().forEach((child) => {
      const enemy = child as Phaser.Physics.Arcade.Sprite & {
        updateBehavior?: (player: Player, delta: number) => void;
      };
      enemy.updateBehavior?.(player, delta);
    });
  }

  dropLoot(enemy: Enemy): void {
    const loot = new Loot(this.scene, 'crumbs', Phaser.Math.Between(3, 8));
    loot.setPosition(enemy.x, enemy.y);
    this.lootGroup.add(loot);
    (loot.body as Phaser.Physics.Arcade.Body).setVelocity(Phaser.Math.Between(-20, 20), Phaser.Math.Between(-20, 20));
  }

  clear(): void {
    this.enemyGroup.clear(true, true);
    this.lootGroup.clear(true, true);
  }
}
