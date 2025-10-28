import Phaser from 'phaser';

import AudioManager from '@core/Audio';
import DebugOverlay from '@core/Debug';
import InputManager from '@core/Input';
import {
  SaveGame,
  EnemyData,
  WaveData,
  WeaponData,
  ShopCategory,
  SkillBranchData,
  MiniBossData,
  BossData
} from '@core/Types';
import Player from '@entities/Player';
import Spawner from '@systems/Spawner';
import Waves from '@systems/Waves';
import Combat from '@systems/Combat';
import Economy from '@systems/Economy';
import Parallax from '@systems/Parallax';
import Particles from '@systems/Particles';
import Collisions from '@systems/Collisions';
import { saveGame } from '@core/Save';
import Enemy from '@entities/Enemy';
import Boss from '@entities/Boss';

export default class GameScene extends Phaser.Scene {
  save!: SaveGame;
  inputManager!: InputManager;
  audio!: AudioManager;
  debug!: DebugOverlay;
  player!: Player;
  spawner!: Spawner;
  waves!: Waves;
  combat!: Combat;
  economy!: Economy;
  parallax!: Parallax;
  particles!: Particles;
  collisions!: Collisions;
  hudLaunched = false;
  enemies!: EnemyData[];
  miniBosses!: MiniBossData[];
  bosses!: BossData[];
  weapons!: WeaponData[];
  wavesData!: WaveData[];
  shopData!: ShopCategory[];
  skillsData!: SkillBranchData[];

  constructor() {
    super('Game');
  }

  init(data: { save: SaveGame }): void {
    this.save = data.save;
  }

  create(): void {
    const enemyBundle = this.cache.json.get('enemies');
    this.enemies = enemyBundle.enemies;
    this.miniBosses = enemyBundle.miniBosses;
    this.bosses = enemyBundle.bosses;
    this.wavesData = this.cache.json.get('waves').waves;
    this.weapons = this.cache.json.get('weapons').weapons;
    this.shopData = this.cache.json.get('shop').tiers;
    this.skillsData = this.cache.json.get('skills').branches;

    this.cameras.main.setBackgroundColor('#050510');
    this.parallax = new Parallax(this);
    this.parallax.create();
    this.particles = new Particles(this);
    this.particles.create();

    this.player = new Player(this, this.save);
    this.add.existing(this.player);

    this.inputManager = new InputManager(
      this,
      this.save.settings.input.bindings,
      this.save.settings.input.autoFire,
      this.save.settings.input.gamepadEnabled
    );

    this.audio = new AudioManager(this, this.save.settings.audio);
    this.audio.playMusic('bg-music');
    this.debug = new DebugOverlay(this);

    this.spawner = new Spawner(this, this.enemies, this.weapons);
    this.waves = new Waves(this, this.wavesData, this.spawner, this.save);
    this.combat = new Combat(this, this.player, this.weapons);
    this.economy = new Economy(this, this.save, this.player);
    this.collisions = new Collisions(this, this.player, this.combat, this.economy, this.particles);

    this.physics.add.collider(this.player, this.spawner.enemyGroup, (player, enemy) => {
      this.combat.handlePlayerCollision(player as Player, enemy as Phaser.Physics.Arcade.Sprite);
    });

    this.physics.add.overlap(this.combat.playerBullets, this.spawner.enemyGroup, (bullet, enemy) => {
      this.combat.handleBulletHit(bullet as Phaser.GameObjects.GameObject, enemy as Phaser.Physics.Arcade.Sprite);
    });

    this.physics.add.overlap(this.player, this.spawner.lootGroup, (_player, loot) => {
      this.economy.collectLoot(loot as Phaser.Physics.Arcade.Image);
    });

    this.events.on('spawn-miniboss', (id: string) => this.spawnMiniBoss(id));
    this.events.on('spawn-boss', (id: string) => this.spawnBoss(id));
    this.events.on('boss-defeated', () => {
      this.save.progression.crumbs += 200;
      this.save.progression.xp += 200;
    });

    this.scene.launch('HUD', { save: this.save });
    this.hudLaunched = true;
  }

  spawnMiniBoss(id: string): void {
    const data = this.miniBosses.find((b) => b.id === id);
    if (!data) return;
    const enemyData: EnemyData = {
      id: data.id,
      name: data.name,
      type: 'miniboss',
      hp: data.hp,
      speed: data.speed,
      damage: data.damage,
      xp: 100,
      crumbs: 80
    };
    const enemy = new Enemy(this, this.scale.width / 2, -80, enemyData);
    this.spawner.enemyGroup.add(enemy);
  }

  spawnBoss(id: string): void {
    const data = this.bosses.find((b) => b.id === id);
    if (!data) return;
    const boss = new Boss(this, this.scale.width / 2, -140, data);
    this.spawner.enemyGroup.add(boss as unknown as Enemy);
  }

  update(time: number, delta: number): void {
    this.parallax.update(delta);
    this.particles.update(delta);
    const input = this.inputManager.update();
    this.player.update(input, delta);
    this.waves.update(delta);
    this.spawner.update(delta, this.player);
    this.combat.update(time, delta, input);
    this.economy.update(delta);
    this.collisions.update();

    this.debug.update(this.save, this.game.loop.actualFps);

    if (this.waves.isBreakTime() && !this.scene.isActive('Shop')) {
      this.scene.pause('Game');
      this.scene.launch('Shop', { save: this.save, categories: this.shopData });
    }

    if (this.waves.shouldLaunchSkillTree() && !this.scene.isActive('SkillTree')) {
      this.scene.pause('Game');
      this.scene.launch('SkillTree', { save: this.save, branches: this.skillsData });
    }

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard!.addKey('ESC'))) {
      this.scene.launch('Pause');
      this.scene.pause();
    }

    this.save.meta.playTime += delta / 1000;
    saveGame(this.save);
  }
}
