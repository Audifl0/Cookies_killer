/** Utility mathematical helpers used across gameplay systems. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function getAngleBetween(x1: number, y1: number, x2: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function xpForLevel(level: number): number {
  return Math.floor(50 * Math.pow(level, 1.6));
}

export function critChance(base: number, modifiers: number): number {
  return clamp(base + modifiers, 0, 1);
}

export function weightedChoice<T>(items: { value: T; weight: number }[], rand: () => number): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let target = rand() * total;
  for (const item of items) {
    target -= item.weight;
    if (target <= 0) {
      return item.value;
    }
  }
  return items[items.length - 1].value;
}
