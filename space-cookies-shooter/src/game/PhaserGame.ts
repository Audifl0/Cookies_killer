import Phaser from 'phaser';

import Boot from '@scenes/Boot';
import Preload from '@scenes/Preload';
import MainMenu from '@scenes/MainMenu';
import GameScene from '@scenes/Game';
import HUD from '@scenes/HUD';
import Pause from '@scenes/Pause';
import Shop from '@scenes/Shop';
import SkillTree from '@scenes/SkillTree';
import Options from '@scenes/Options';
import Credits from '@scenes/Credits';

import Config from '@core/Config';

export default class PhaserGame extends Phaser.Game {
  constructor(parent: HTMLElement) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#0d0f1a',
      render: {
        pixelArt: false,
        antialias: true,
        powerPreference: 'high-performance'
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          fps: 120,
          debug: Config.debugPhysics
        }
      },
      scene: [Boot, Preload, MainMenu, Options, GameScene, HUD, Pause, Shop, SkillTree, Credits]
    };

    super(config);

    window.addEventListener('resize', () => {
      this.scale.resize(window.innerWidth, window.innerHeight);
    });
  }
}
