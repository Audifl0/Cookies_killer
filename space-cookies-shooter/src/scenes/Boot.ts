import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    this.load.setPath('assets');
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.canvas.width = 64;
      ctx.canvas.height = 64;
      ctx.fillStyle = '#f6c177';
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5a3312';
      ctx.beginPath();
      ctx.arc(24, 24, 6, 0, Math.PI * 2);
      ctx.arc(40, 28, 5, 0, Math.PI * 2);
      ctx.arc(32, 40, 7, 0, Math.PI * 2);
      ctx.fill('evenodd');
      this.textures.addCanvas('cookie', ctx.canvas);
    }
  }

  create(): void {
    this.scene.start('Preload');
  }
}
