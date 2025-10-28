import Phaser from 'phaser';

export default class Pause extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 400, 280, 0x1e2436, 0.92);
    this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'Pause', {
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '48px',
      color: '#f6c177'
    }).setOrigin(0.5);

    const resume = this.add.text(this.scale.width / 2, this.scale.height / 2 - 10, 'Reprendre', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '24px',
      backgroundColor: '#2f3752',
      color: '#ffffff',
      padding: { left: 16, right: 16, top: 8, bottom: 8 }
    }).setOrigin(0.5);
    resume.setInteractive({ useHandCursor: true });
    resume.on('pointerup', () => {
      this.scene.stop();
      this.scene.resume('Game');
    });

    const quit = this.add.text(this.scale.width / 2, this.scale.height / 2 + 70, 'Menu principal', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '24px',
      backgroundColor: '#9e2a2b',
      color: '#ffffff',
      padding: { left: 16, right: 16, top: 8, bottom: 8 }
    }).setOrigin(0.5);
    quit.setInteractive({ useHandCursor: true });
    quit.on('pointerup', () => {
      this.scene.stop('Game');
      this.scene.stop();
      this.scene.start('MainMenu');
    });
  }
}
