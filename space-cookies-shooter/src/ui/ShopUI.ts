import Phaser from 'phaser';

import ShopSystem from '@systems/ShopSystem';
import { ShopItemData } from '@core/Types';

export default class ShopUI {
  scene: Phaser.Scene;
  system: ShopSystem;

  constructor(scene: Phaser.Scene, system: ShopSystem) {
    this.scene = scene;
    this.system = system;
  }

  create(): void {
    this.scene.cameras.main.setBackgroundColor('rgba(5, 8, 18, 0.9)');
    this.scene.add.text(this.scene.scale.width / 2, 60, 'Boutique Galactique', {
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '48px',
      color: '#f6c177'
    }).setOrigin(0.5);

    this.system.categories.forEach((category, index) => {
      this.scene.add.text(120, 140 + index * 120, category.category.toUpperCase(), {
        fontFamily: 'Inter, sans-serif',
        fontSize: '28px',
        color: '#95a2ff'
      });
      category.items.forEach((item, itemIndex) => {
        this.createItemButton(item, 380 + itemIndex * 220, 150 + index * 120);
      });
    });

    const resume = this.scene.add.text(this.scene.scale.width / 2, this.scene.scale.height - 80, 'Retour au combat', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '26px',
      backgroundColor: '#2f3752',
      color: '#ffffff',
      padding: { left: 16, right: 16, top: 12, bottom: 12 }
    }).setOrigin(0.5);
    resume.setInteractive({ useHandCursor: true });
    resume.on('pointerup', () => {
      this.scene.scene.stop('Shop');
      this.scene.scene.resume('Game');
    });
  }

  createItemButton(item: ShopItemData, x: number, y: number): void {
    const button = this.scene.add.rectangle(x, y, 200, 80, 0x1e2436, 0.9);
    button.setStrokeStyle(2, 0xf6c177);
    const label = this.scene.add.text(x, y, `${item.name ?? item.id}\n${item.cost} Crumbs`, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerup', () => {
      if (this.system.purchase(item)) {
        label.setText(`${item.name ?? item.id}\nAcheté`);
        button.setFillStyle(0x4caf50, 0.9);
      } else {
        label.setText(`${item.name ?? item.id}\nCrumbs insuffisants`);
        button.setFillStyle(0x9e2a2b, 0.9);
      }
    });
  }
}
