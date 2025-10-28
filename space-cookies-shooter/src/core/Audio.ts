import Phaser from 'phaser';

interface AudioSettings {
  music: number;
  sfx: number;
  muted: boolean;
}

export default class AudioManager {
  scene: Phaser.Scene;
  music?: Phaser.Sound.BaseSound;
  settings: AudioSettings;

  constructor(scene: Phaser.Scene, settings: AudioSettings) {
    this.scene = scene;
    this.settings = settings;
  }

  playMusic(key: string): void {
    if (this.music) {
      this.music.stop();
    }
    this.music = this.scene.sound.add(key, { loop: true, volume: this.settings.music });
    if (!this.settings.muted) {
      this.music.play();
    }
  }

  playSfx(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    if (this.settings.muted) {
      return;
    }
    this.scene.sound.play(key, { volume: this.settings.sfx, ...config });
  }

  updateSettings(settings: AudioSettings): void {
    this.settings = settings;
    if (this.music) {
      const music = this.music as Phaser.Sound.BaseSound & {
        setMute?: (muted: boolean) => void;
        setVolume?: (volume: number) => void;
        mute?: boolean;
        volume?: number;
      };
      if (music.setMute) {
        music.setMute(settings.muted);
      } else {
        music.mute = settings.muted;
      }
      if (music.setVolume) {
        music.setVolume(settings.music);
      } else {
        music.volume = settings.music;
      }
      if (settings.muted && this.music.isPlaying) {
        this.music.pause();
      } else if (!settings.muted && !this.music.isPlaying) {
        this.music.resume();
      }
    }
  }
}
