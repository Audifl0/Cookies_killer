import Config from './Config';
import { SaveGame } from './Types';

const defaultBindings = {
  up: 'KeyW',
  down: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
  fire: 'MouseLeft',
  dash: 'Space',
  autofire: 'KeyF',
  menu: 'Escape'
};

export function createDefaultSave(): SaveGame {
  const now = Date.now();
  return {
    version: Config.saveVersion,
    meta: {
      created: now,
      lastPlayed: now,
      playTime: 0
    },
    progression: {
      wave: 1,
      xp: 0,
      level: 1,
      crumbs: 0,
      unlockedWeapons: ['basic_cannon']
    },
    tree: {
      spentPoints: 0,
      unlockedNodes: []
    },
    inventory: {
      weapons: ['basic_cannon'],
      equippedWeapon: 'basic_cannon',
      modifiers: {}
    },
    settings: {
      audio: {
        music: 0.6,
        sfx: 0.8,
        muted: false
      },
      video: {
        particles: 1,
        shake: 0.4,
        colorBlindMode: false
      },
      input: {
        bindings: { ...defaultBindings },
        gamepadEnabled: true,
        autoFire: false
      },
      accessibility: {
        uiScale: 1,
        subtitles: true
      }
    }
  };
}

export function migrateSave(data: SaveGame): SaveGame {
  if (!data.version || data.version < Config.saveVersion) {
    data.version = Config.saveVersion;
  }
  return data;
}

export function loadSave(): SaveGame {
  try {
    const raw = localStorage.getItem(Config.saveKey);
    if (!raw) {
      return createDefaultSave();
    }
    const parsed = JSON.parse(raw) as SaveGame;
    return migrateSave(parsed);
  } catch (err) {
    console.warn('Failed to load save, returning default', err);
    return createDefaultSave();
  }
}

export function saveGame(data: SaveGame): void {
  try {
    const updated = { ...data, meta: { ...data.meta, lastPlayed: Date.now() } };
    localStorage.setItem(Config.saveKey, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to persist save', err);
  }
}
