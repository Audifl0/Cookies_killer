import Phaser from 'phaser';

import { loadSave } from '@core/Save';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload(): void {
    this.load.setPath('assets');
    this.load.json('enemies', 'data/enemies.json');
    this.load.json('waves', 'data/waves.json');
    this.load.json('weapons', 'data/weapons.json');
    this.load.json('shop', 'data/shop.json');
    this.load.json('skills', 'data/skills.json');

    const musicBuffer = this.sound.context.createBuffer(1, 44100, 44100);
    const data = musicBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.sin(i / 32) * 0.2 * Math.sin(i / 128);
    }
    const musicKey = 'bg-music';
    this.cache.audio.add(musicKey, { buffer: musicBuffer });

    const sfxBuffer = this.sound.context.createBuffer(1, 8000, 44100);
    const sfx = sfxBuffer.getChannelData(0);
    for (let i = 0; i < sfx.length; i += 1) {
      sfx[i] = Math.random() * 0.4 - 0.2;
    }
    this.cache.audio.add('sfx-shot', { buffer: sfxBuffer });
    this.cache.audio.add('sfx-hit', { buffer: sfxBuffer });

    this.load.on('progress', (value: number) => {
      this.cameras.main.setBackgroundColor('#0d0f1a');
      const width = this.scale.width * 0.6;
      const height = 24;
      const x = this.scale.width / 2 - width / 2;
      const y = this.scale.height / 2 - height / 2;
      const graphics = this.add.graphics();
      graphics.fillStyle(0x1e2436, 1);
      graphics.fillRect(x, y, width, height);
      graphics.fillStyle(0xf6c177, 1);
      graphics.fillRect(x, y, width * value, height);
      this.add.text(this.scale.width / 2, y + height + 10, 'Chargement...', {
        fontSize: '16px',
        color: '#ffffff'
      }).setOrigin(0.5);
    });
  }

  create(): void {
    loadSave();
    this.scene.start('MainMenu');
  }
}
