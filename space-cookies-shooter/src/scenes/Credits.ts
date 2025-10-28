import Phaser from 'phaser';

export default class Credits extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#04050d');
    this.add.text(this.scale.width / 2, 100, 'Crédits', {
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '48px',
      color: '#f6c177'
    }).setOrigin(0.5);

    const lines = [
      'Design & Code: Codex AI',
      'Audio: Génération procédurale',
      'Assets: Placeholders Canvas',
      'Merci d’avoir joué !'
    ];

    lines.forEach((line, index) => {
      this.add.text(this.scale.width / 2, 200 + index * 60, line, {
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
        color: '#ffffff'
      }).setOrigin(0.5);
    });

    const back = this.add.text(this.scale.width / 2, this.scale.height - 80, 'Retour', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '26px',
      backgroundColor: '#1e2436',
      color: '#ffffff',
      padding: { left: 24, right: 24, top: 12, bottom: 12 }
    }).setOrigin(0.5);
    back.setInteractive({ useHandCursor: true });
    back.on('pointerup', () => this.scene.start('MainMenu'));
  }
}
