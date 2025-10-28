import Phaser from 'phaser';

import { SaveGame } from '@core/Types';

export default class HUDManager {
  scene: Phaser.Scene;
  save: SaveGame;
  crumbText!: Phaser.GameObjects.Text;
  xpText!: Phaser.GameObjects.Text;
  waveText!: Phaser.GameObjects.Text;
  weaponText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, save: SaveGame) {
    this.scene = scene;
    this.save = save;
  }

  create(): void {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Inter, sans-serif',
      fontSize: `${18 * this.save.settings.accessibility.uiScale}px`,
      color: '#ffffff'
    };

    this.crumbText = this.scene.add.text(20, 60, 'Crumbs: 0', style);
    this.xpText = this.scene.add.text(20, 90, 'XP: 0', style);
    this.waveText = this.scene.add.text(20, 120, 'Vague: 1', style);
    this.weaponText = this.scene.add.text(20, 150, 'Arme: Canon', style);

    [this.crumbText, this.xpText, this.waveText, this.weaponText].forEach((text) => text.setScrollFactor(0));
  }

  update(): void {
    this.crumbText.setText(`Crumbs: ${this.save.progression.crumbs}`);
    this.xpText.setText(`XP: ${this.save.progression.xp}`);
    this.waveText.setText(`Vague: ${this.save.progression.wave}`);
    this.weaponText.setText(`Arme: ${this.save.inventory.equippedWeapon}`);
  }
}
