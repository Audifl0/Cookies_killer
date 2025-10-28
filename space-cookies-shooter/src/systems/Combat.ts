import Phaser from 'phaser';

import Player from '@entities/Player';
import Bullet from '@entities/Bullet';
import Missile from '@entities/Missile';
import { WeaponData } from '@core/Types';
import { InputState } from '@core/Input';

export default class Combat {
  scene: Phaser.Scene;
  player: Player;
  weapons: WeaponData[];
  currentWeapon: WeaponData;
  fireTimer = 0;
  playerBullets: Phaser.Physics.Arcade.Group;
  missiles: Phaser.Physics.Arcade.Group;

  constructor(scene: Phaser.Scene, player: Player, weapons: WeaponData[]) {
    this.scene = scene;
    this.player = player;
    this.weapons = weapons;
    this.currentWeapon = weapons.find((w) => w.id === player.save.inventory.equippedWeapon) ?? weapons[0];
    this.playerBullets = this.scene.physics.add.group({ classType: Bullet, runChildUpdate: true, maxSize: 100 });
    this.missiles = this.scene.physics.add.group({ classType: Missile, runChildUpdate: true, maxSize: 20 });
  }

  update(_time: number, delta: number, input: InputState): void {
    this.fireTimer -= delta;
    if ((input.fire || input.autofire) && this.fireTimer <= 0) {
      this.fireWeapon();
      this.fireTimer = this.currentWeapon.rate;
    }
  }

  fireWeapon(): void {
    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.scene.input.activePointer.worldX,
      this.scene.input.activePointer.worldY
    );

    const weapon = this.currentWeapon;
    const spawnBullet = (spreadOffset: number) => {
      const bullet = this.playerBullets.get(this.player.x, this.player.y, 'bullet') as Bullet;
      if (!bullet) return;
      bullet.damage = weapon.damage;
      bullet.statusEffects = [...weapon.effects];
      bullet.setData('damage', weapon.damage);
      bullet.fire(this.player.x, this.player.y, angle + spreadOffset, weapon.projectileSpeed || 400);
    };

    if (weapon.id === 'homing_missile') {
      const missile = this.missiles.get(this.player.x, this.player.y, 'missile') as Missile;
      if (missile) {
        missile.launch(this.player.x, this.player.y);
      }
    } else if (weapon.id === 'triple_shot') {
      spawnBullet(Phaser.Math.DegToRad(-8));
      spawnBullet(0);
      spawnBullet(Phaser.Math.DegToRad(8));
    } else if (weapon.id === 'beam') {
      spawnBullet(0);
      this.scene.time.delayedCall(80, () => spawnBullet(0));
    } else {
      spawnBullet(Phaser.Math.DegToRad(Phaser.Math.Between(-weapon.spread, weapon.spread)));
    }
    this.scene.sound.play('sfx-shot', { volume: 0.3 });
  }

  handleBulletHit(bullet: Phaser.GameObjects.GameObject, enemy: Phaser.Physics.Arcade.Sprite): void {
    const damage = (bullet as Bullet).damage;
    (bullet as Bullet).destroy();
    const killed = enemy.emit('apply-damage', damage);
    if (killed) {
      enemy.destroy();
    }
  }

  handlePlayerCollision(player: Player, _enemy: Phaser.Physics.Arcade.Sprite): void {
    player.damage(12);
  }
}
