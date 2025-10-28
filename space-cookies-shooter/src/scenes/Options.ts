import Phaser from 'phaser';

import { loadSave, saveGame } from '@core/Save';
import { SaveGame } from '@core/Types';

export default class Options extends Phaser.Scene {
  save!: SaveGame;
  returnTo?: string;

  constructor() {
    super('Options');
  }

  init(data: { returnTo?: string }): void {
    this.returnTo = data?.returnTo ?? 'MainMenu';
  }

  create(): void {
    this.save = loadSave();
    this.cameras.main.setBackgroundColor('#0a0d1d');
    this.add.text(this.scale.width / 2, 80, 'Options', {
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '52px',
      color: '#f6c177'
    }).setOrigin(0.5);

    this.createSlider('Volume musique', this.save.settings.audio.music, 160, (value) => {
      this.save.settings.audio.music = value;
      saveGame(this.save);
    });

    this.createSlider('Volume effets', this.save.settings.audio.sfx, 240, (value) => {
      this.save.settings.audio.sfx = value;
      saveGame(this.save);
    });

    this.createSlider('Taille UI', this.save.settings.accessibility.uiScale, 320, (value) => {
      this.save.settings.accessibility.uiScale = value;
      saveGame(this.save);
    }, { min: 0.8, max: 1.5 });

    this.createToggle('Mode daltonien', this.save.settings.video.colorBlindMode, 400, (value) => {
      this.save.settings.video.colorBlindMode = value;
      saveGame(this.save);
    });

    this.createToggle('Autotir', this.save.settings.input.autoFire, 460, (value) => {
      this.save.settings.input.autoFire = value;
      saveGame(this.save);
    });

    const back = this.add.text(this.scale.width / 2, this.scale.height - 80, 'Retour', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '26px',
      backgroundColor: '#1e2436',
      color: '#ffffff',
      padding: { left: 24, right: 24, top: 12, bottom: 12 }
    });
    back.setOrigin(0.5).setInteractive({ useHandCursor: true });
    back.on('pointerup', () => this.scene.start(this.returnTo || 'MainMenu'));
  }

  createSlider(
    label: string,
    value: number,
    y: number,
    onChange: (value: number) => void,
    options: { min?: number; max?: number } = {}
  ): void {
    const min = options.min ?? 0;
    const max = options.max ?? 1;
    const text = this.add.text(120, y, `${label}: ${(value * 100).toFixed(0)}%`, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '22px',
      color: '#f0f4ff'
    });
    const slider = this.add.rectangle(420, y + 10, 320, 12, 0x20263a).setOrigin(0, 0.5);
    const knob = this.add.circle(420 + ((value - min) / (max - min)) * 320, y + 10, 12, 0xf6c177);
    knob.setInteractive({ draggable: true, useHandCursor: true });
    knob.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number) => {
      const clamped = Phaser.Math.Clamp(dragX, 420, 740);
      knob.x = clamped;
      const normalized = (knob.x - 420) / 320;
      const sliderValue = min + normalized * (max - min);
      text.setText(`${label}: ${(sliderValue * 100).toFixed(0)}%`);
      onChange(Number(sliderValue.toFixed(2)));
    });
    slider.setInteractive(new Phaser.Geom.Rectangle(0, -6, 320, 12), Phaser.Geom.Rectangle.Contains);
    slider.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const clamped = Phaser.Math.Clamp(pointer.x, 420, 740);
      knob.x = clamped;
      const normalized = (clamped - 420) / 320;
      const sliderValue = min + normalized * (max - min);
      text.setText(`${label}: ${(sliderValue * 100).toFixed(0)}%`);
      onChange(Number(sliderValue.toFixed(2)));
    });
  }

  createToggle(label: string, value: boolean, y: number, onChange: (value: boolean) => void): void {
    const text = this.add.text(120, y, `${label}: ${value ? 'ON' : 'OFF'}`, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '22px',
      color: '#f0f4ff'
    });
    const button = this.add.rectangle(420, y + 8, 120, 36, value ? 0x4caf50 : 0x9e2a2b);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerup', () => {
      value = !value;
      button.fillColor = value ? 0x4caf50 : 0x9e2a2b;
      text.setText(`${label}: ${value ? 'ON' : 'OFF'}`);
      onChange(value);
    });
  }
}
