import Phaser from 'phaser';

import Config from '@core/Config';
import { loadSave } from '@core/Save';

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#060713');
    this.add.text(this.scale.width / 2, 120, Config.gameTitle, {
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '64px',
      color: '#f6c177'
    }).setOrigin(0.5);

    const buttonStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Inter, sans-serif',
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#1e2436',
      padding: { left: 32, right: 32, top: 12, bottom: 12 }
    };

    const menuItems = [
      { label: 'Nouvelle Partie', action: () => this.startNewGame() },
      { label: 'Continuer', action: () => this.continueGame() },
      { label: 'Options', action: () => this.scene.start('Options', { returnTo: 'MainMenu' }) },
      { label: 'Crédits', action: () => this.scene.start('Credits') }
    ];

    menuItems.forEach((item, index) => {
      const text = this.add.text(this.scale.width / 2, 240 + index * 80, item.label, buttonStyle);
      text.setOrigin(0.5);
      text.setInteractive({ useHandCursor: true });
      text.on('pointerup', item.action);
      text.on('pointerover', () => text.setStyle({ backgroundColor: '#2f3752' }));
      text.on('pointerout', () => text.setStyle({ backgroundColor: '#1e2436' }));
    });

    this.add.text(
      this.scale.width / 2,
      this.scale.height - 60,
      'Astuce: Activez l’autotir avec F ou via le menu Options',
      {
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px',
        color: '#95a2ff'
      }
    ).setOrigin(0.5);
  }

  startNewGame(): void {
    const save = loadSave();
    save.progression.wave = 1;
    save.progression.xp = 0;
    save.progression.crumbs = 0;
    save.inventory.equippedWeapon = 'basic_cannon';
    this.scene.start('Game', { save, newGame: true });
  }

  continueGame(): void {
    const save = loadSave();
    this.scene.start('Game', { save, newGame: false });
  }
}
