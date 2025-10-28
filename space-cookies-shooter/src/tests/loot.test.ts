import Phaser from 'phaser';

import Economy from '@systems/Economy';
import { createDefaultSave } from '@core/Save';
import Player from '@entities/Player';

class StubScene implements Partial<Phaser.Scene> {
  events = new Phaser.Events.EventEmitter();
}

describe('Economy loot collection', () => {
  test('gains crumbs from enemy kill event', () => {
    const save = createDefaultSave();
    const scene = new StubScene() as Phaser.Scene;
    const player = {
      heal: jest.fn()
    } as unknown as Player;
    const economy = new Economy(scene, save, player);
    expect(save.progression.crumbs).toBe(0);
    scene.events.emit('enemy-killed');
    expect(save.progression.crumbs).toBeGreaterThan(0);
  });
});
