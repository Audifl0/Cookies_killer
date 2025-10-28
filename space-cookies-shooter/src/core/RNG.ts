export default class RNG {
  seed: number;

  constructor(seed = Date.now()) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 0xffffffff;
    return this.seed / 0xffffffff;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  pick<T>(array: T[]): T {
    return array[Math.floor(this.range(0, array.length))];
  }
}
