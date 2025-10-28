import Phaser from 'phaser';

import SkillSystem from '@systems/SkillSystem';
import { SkillBranchData, SkillNodeData } from '@core/Types';

export default class SkillTreeUI {
  scene: Phaser.Scene;
  system: SkillSystem;

  constructor(scene: Phaser.Scene, system: SkillSystem) {
    this.scene = scene;
    this.system = system;
  }

  create(): void {
    this.scene.cameras.main.setBackgroundColor('rgba(2, 5, 12, 0.95)');
    this.scene.add.text(this.scene.scale.width / 2, 60, 'Arbre de Compétences', {
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '48px',
      color: '#f6c177'
    }).setOrigin(0.5);

    this.system.branches.forEach((branch, index) => {
      this.renderBranch(branch, 160 + index * 360);
    });

    const close = this.scene.add.text(this.scene.scale.width - 180, this.scene.scale.height - 80, 'Fermer', {
      fontFamily: 'Inter, sans-serif',
      fontSize: '26px',
      backgroundColor: '#2f3752',
      color: '#ffffff',
      padding: { left: 16, right: 16, top: 12, bottom: 12 }
    }).setOrigin(0.5);
    close.setInteractive({ useHandCursor: true });
    close.on('pointerup', () => {
      this.scene.scene.stop('SkillTree');
      this.scene.scene.resume('Game');
    });
  }

  renderBranch(branch: SkillBranchData, x: number): void {
    this.scene.add.text(x, 140, branch.name, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '26px',
      color: branch.color
    }).setOrigin(0.5);

    branch.nodes.forEach((node, index) => {
      const nodeCircle = this.scene.add.circle(x, 220 + index * 120, 40, Phaser.Display.Color.HexStringToColor(branch.color).color);
      const label = this.scene.add.text(x, 220 + index * 120, node.name, {
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px',
        color: '#0a0d1d',
        align: 'center',
        wordWrap: { width: 120 }
      }).setOrigin(0.5);
      nodeCircle.setInteractive({ useHandCursor: true });
      nodeCircle.on('pointerover', () => this.showTooltip(node, nodeCircle.x, nodeCircle.y));
      nodeCircle.on('pointerout', () => this.hideTooltip());
      nodeCircle.on('pointerup', () => {
        if (this.system.spendPoint(node.id)) {
          nodeCircle.setFillStyle(0x4caf50);
          label.setColor('#ffffff');
        }
      });
    });
  }

  tooltip?: Phaser.GameObjects.Text;

  showTooltip(node: SkillNodeData, x: number, y: number): void {
    this.tooltip = this.scene.add.text(x + 60, y, `${node.description}\nCoût: ${node.cost}`, {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#1e2436',
      padding: { left: 8, right: 8, top: 6, bottom: 6 }
    }).setOrigin(0, 0.5);
  }

  hideTooltip(): void {
    this.tooltip?.destroy();
  }
}
