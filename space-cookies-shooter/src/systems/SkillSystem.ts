import { SaveGame, SkillBranchData, SkillNodeData } from '@core/Types';

export default class SkillSystem {
  save: SaveGame;
  branches: SkillBranchData[];

  constructor(save: SaveGame, branches: SkillBranchData[]) {
    this.save = save;
    this.branches = branches;
  }

  getAvailableNodes(): SkillNodeData[] {
    const unlocked = new Set(this.save.tree.unlockedNodes);
    const result: SkillNodeData[] = [];
    this.branches.forEach((branch) => {
      branch.nodes.forEach((node) => {
        if (unlocked.has(node.id)) {
          return;
        }
        if (!node.requires || unlocked.has(node.requires)) {
          result.push(node);
        }
      });
    });
    return result;
  }

  spendPoint(nodeId: string): boolean {
    const node = this.branches.flatMap((b) => b.nodes).find((n) => n.id === nodeId);
    if (!node) return false;
    if (this.save.tree.spentPoints < node.cost) return false;
    if (this.save.tree.unlockedNodes.includes(nodeId)) return false;
    this.save.tree.spentPoints -= node.cost;
    this.save.tree.unlockedNodes.push(nodeId);
    return true;
  }

  grantPoints(points: number): void {
    this.save.tree.spentPoints += points;
  }
}
