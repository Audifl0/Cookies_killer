import Phaser from 'phaser';

import { SaveGame } from '@core/Types';
import HUDManager from '@ui/HUDManager';

export default class HUD extends Phaser.Scene {
  manager!: HUDManager;

  constructor() {
    super({ key: 'HUD', active: false });
  }

  init(data: { save: SaveGame }): void {
    this.manager = new HUDManager(this, data.save);
  }

  create(): void {
    this.manager.create();
  }

  update(): void {
    this.manager.update();
  }
}
