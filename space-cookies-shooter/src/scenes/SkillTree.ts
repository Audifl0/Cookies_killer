import Phaser from 'phaser';

import SkillSystem from '@systems/SkillSystem';
import SkillTreeUI from '@ui/SkillTreeUI';
import { SaveGame, SkillBranchData } from '@core/Types';

export default class SkillTree extends Phaser.Scene {
  system!: SkillSystem;
  ui!: SkillTreeUI;

  constructor() {
    super('SkillTree');
  }

  init(data: { save: SaveGame; branches: SkillBranchData[] }): void {
    this.system = new SkillSystem(data.save, data.branches);
    this.ui = new SkillTreeUI(this, this.system);
  }

  create(): void {
    this.ui.create();
  }
}
