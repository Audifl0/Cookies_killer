import Phaser from 'phaser';

import { SaveGame } from '@core/Types';
import Loot from '@entities/Loot';
import Player from '@entities/Player';

export default class Economy {
  scene: Phaser.Scene;
  save: SaveGame;
  player: Player;
  pickupRange: number;

  constructor(scene: Phaser.Scene, save: SaveGame, player: Player) {
    this.scene = scene;
    this.save = save;
    this.player = player;
    this.pickupRange = 140;

    this.scene.events.on('enemy-killed', () => {
      this.save.progression.xp += 8;
      this.save.progression.crumbs += 6;
    });
  }

  update(_delta: number): void {
    const xpNeeded = Math.floor(50 * Math.pow(this.save.progression.level, 1.4));
    if (this.save.progression.xp >= xpNeeded) {
      this.save.progression.level += 1;
      this.save.progression.xp -= xpNeeded;
      this.scene.events.emit('level-up', this.save.progression.level);
    }
  }

  collectLoot(loot: Phaser.Physics.Arcade.Image): void {
    const typed = loot as Loot;
    switch (typed.lootType) {
      case 'crumbs':
        this.save.progression.crumbs += typed.value;
        break;
      case 'xp':
        this.save.progression.xp += typed.value;
        break;
      case 'heal':
        this.player.heal(typed.value);
        break;
      case 'module':
        this.scene.events.emit('temporary-module', typed.value);
        break;
      default:
        break;
    }
    loot.destroy();
  }
}
