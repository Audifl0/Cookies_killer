import Phaser from 'phaser';

import { WaveData, SaveGame } from '@core/Types';
import Spawner from './Spawner';

export default class Waves {
  scene: Phaser.Scene;
  waves: WaveData[];
  spawner: Spawner;
  save: SaveGame;
  currentWave = 1;
  timer = 0;
  breakDuration = 8000;
  inBreak = false;
  skillTreeTimer = 0;

  constructor(scene: Phaser.Scene, waves: WaveData[], spawner: Spawner, save: SaveGame) {
    this.scene = scene;
    this.waves = waves;
    this.spawner = spawner;
    this.save = save;
    this.currentWave = save.progression.wave;
    this.breakDuration = scene.cache.json.get('waves').settings.breakDuration * 1000;
    this.startWave(this.currentWave);
  }

  startWave(index: number): void {
    const wave = this.waves.find((w) => w.id === index) ?? this.waves[0];
    if (!wave) return;
    wave.enemies.forEach((entry) => {
      for (let i = 0; i < entry.count; i += 1) {
        this.scene.time.delayedCall(i * 400, () => this.spawner.spawnEnemy(entry.type));
      }
    });
    if (wave.miniBoss) {
      this.scene.time.delayedCall(4000, () => this.scene.events.emit('spawn-miniboss', wave.miniBoss));
    }
    if (wave.boss) {
      this.scene.time.delayedCall(6000, () => this.scene.events.emit('spawn-boss', wave.boss));
    }
    this.inBreak = false;
    this.timer = 0;
  }

  update(delta: number): void {
    if (this.spawner.enemyGroup.countActive(true) === 0 && !this.inBreak) {
      this.inBreak = true;
      this.timer = this.breakDuration;
      this.save.progression.wave += 1;
      this.skillTreeTimer += 1;
    }

    if (this.inBreak) {
      this.timer -= delta;
      if (this.timer <= 0) {
        this.inBreak = false;
        this.startWave(this.save.progression.wave);
      }
    }
  }

  isBreakTime(): boolean {
    return this.inBreak;
  }

  shouldLaunchSkillTree(): boolean {
    if (this.skillTreeTimer >= 2) {
      this.skillTreeTimer = 0;
      return true;
    }
    return false;
  }
}
