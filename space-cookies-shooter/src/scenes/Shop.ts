import Phaser from 'phaser';

import ShopSystem from '@systems/ShopSystem';
import ShopUI from '@ui/ShopUI';
import { SaveGame, ShopCategory } from '@core/Types';

export default class Shop extends Phaser.Scene {
  system!: ShopSystem;
  ui!: ShopUI;

  constructor() {
    super('Shop');
  }

  init(data: { save: SaveGame; categories: ShopCategory[] }): void {
    this.system = new ShopSystem(data.save, data.categories);
    this.ui = new ShopUI(this, this.system);
  }

  create(): void {
    this.ui.create();
  }
}
