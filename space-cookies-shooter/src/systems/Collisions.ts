import Phaser from 'phaser';

import Player from '@entities/Player';
import Combat from './Combat';
import Economy from './Economy';
import Particles from './Particles';

export default class Collisions {
  scene: Phaser.Scene;
  player: Player;
  combat: Combat;
  economy: Economy;
  particles: Particles;

  constructor(scene: Phaser.Scene, player: Player, combat: Combat, economy: Economy, particles: Particles) {
    this.scene = scene;
    this.player = player;
    this.combat = combat;
    this.economy = economy;
    this.particles = particles;
  }

  update(): void {
    // Additional collision logic could be expanded here.
  }
}
