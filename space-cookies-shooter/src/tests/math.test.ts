import { clamp, lerp, xpForLevel, critChance } from '@core/MathUtil';

describe('Math utilities', () => {
  test('clamp bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(12, 0, 10)).toBe(10);
  });

  test('lerp', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });

  test('xpForLevel increases non linearly', () => {
    expect(xpForLevel(2)).toBeGreaterThan(xpForLevel(1));
  });

  test('critChance clamps between 0 and 1', () => {
    expect(critChance(0.5, 0.6)).toBeLessThanOrEqual(1);
    expect(critChance(-0.5, 0)).toBeGreaterThanOrEqual(0);
  });
});
