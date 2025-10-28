import { SaveGame, ShopCategory, ShopItemData } from '@core/Types';

export default class ShopSystem {
  save: SaveGame;
  categories: ShopCategory[];

  constructor(save: SaveGame, categories: ShopCategory[]) {
    this.save = save;
    this.categories = categories;
  }

  canAfford(item: ShopItemData): boolean {
    return this.save.progression.crumbs >= item.cost;
  }

  purchase(item: ShopItemData): boolean {
    if (!this.canAfford(item)) {
      return false;
    }
    this.save.progression.crumbs -= item.cost;
    if (item.id.includes('shield')) {
      this.save.inventory.modifiers.shield = (this.save.inventory.modifiers.shield ?? 0) + 10;
    }
    if (item.id.includes('thruster')) {
      this.save.inventory.modifiers.speed = (this.save.inventory.modifiers.speed ?? 0) + 10;
    }
    if (item.id.includes('drone')) {
      this.save.inventory.modifiers.drones = (this.save.inventory.modifiers.drones ?? 0) + 1;
    }
    if (item.id.includes('magnet')) {
      this.save.inventory.modifiers.pickupRange = (this.save.inventory.modifiers.pickupRange ?? 0) + 10;
    }
    if (item.id.includes('railgun') || item.id.includes('beam') || item.id.includes('missile')) {
      if (!this.save.inventory.weapons.includes(item.id)) {
        this.save.inventory.weapons.push(item.id);
      }
      this.save.inventory.equippedWeapon = item.id;
    }
    return true;
  }
}
