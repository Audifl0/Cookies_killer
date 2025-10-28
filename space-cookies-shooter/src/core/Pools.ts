export interface Poolable<T> {
  reset(...args: unknown[]): void;
  instance: T;
}

export default class ObjectPool<T extends Poolable<unknown>> {
  pool: T[] = [];
  factory: () => T;

  constructor(factory: () => T, initial = 0) {
    this.factory = factory;
    for (let i = 0; i < initial; i += 1) {
      this.pool.push(this.factory());
    }
  }

  acquire(...args: unknown[]): T {
    const item = this.pool.pop() ?? this.factory();
    item.reset(...args);
    return item;
  }

  release(item: T): void {
    this.pool.push(item);
  }
}
