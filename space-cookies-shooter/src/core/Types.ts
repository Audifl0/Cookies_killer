export interface EnemyData {
  id: string;
  name: string;
  type: string;
  hp: number;
  speed: number;
  damage: number;
  xp: number;
  crumbs: number;
}

export interface MiniBossData {
  id: string;
  name: string;
  hp: number;
  speed: number;
  damage: number;
  patterns: string[];
}

export interface BossPhaseData {
  threshold: number;
  pattern: string;
}

export interface BossData {
  id: string;
  name: string;
  hp: number;
  phases: BossPhaseData[];
}

export interface WaveEntry {
  type: string;
  count: number;
}

export interface WaveData {
  id: number;
  enemies: WaveEntry[];
  miniBoss?: string;
  boss?: string;
}

export interface WeaponData {
  id: string;
  name: string;
  rate: number;
  damage: number;
  spread: number;
  projectileSpeed: number;
  effects: string[];
}

export interface ShopItemData {
  id: string;
  name?: string;
  cost: number;
  modifier: Record<string, unknown>;
}

export interface ShopCategory {
  category: string;
  items: ShopItemData[];
}

export interface SkillNodeData {
  id: string;
  name: string;
  description: string;
  cost: number;
  requires?: string;
}

export interface SkillBranchData {
  id: string;
  name: string;
  color: string;
  nodes: SkillNodeData[];
}

export interface SaveGame {
  version: number;
  meta: {
    created: number;
    lastPlayed: number;
    playTime: number;
  };
  progression: {
    wave: number;
    xp: number;
    level: number;
    crumbs: number;
    unlockedWeapons: string[];
  };
  tree: {
    spentPoints: number;
    unlockedNodes: string[];
  };
  inventory: {
    weapons: string[];
    equippedWeapon: string;
    modifiers: Record<string, number>;
  };
  settings: {
    audio: {
      music: number;
      sfx: number;
      muted: boolean;
    };
    video: {
      particles: number;
      shake: number;
      colorBlindMode: boolean;
    };
    input: {
      bindings: Record<string, string>;
      gamepadEnabled: boolean;
      autoFire: boolean;
    };
    accessibility: {
      uiScale: number;
      subtitles: boolean;
    };
  };
}
