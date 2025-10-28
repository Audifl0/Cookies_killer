// Minimal Jest type declarations for offline environments.
declare function describe(name: string, fn: () => void): void;
declare function describe(name: string, fn: () => Promise<void>): void;
declare function it(name: string, fn: () => void): void;
declare function it(name: string, fn: () => Promise<void>): void;
declare function test(name: string, fn: () => void): void;
declare function test(name: string, fn: () => Promise<void>): void;
declare function beforeEach(fn: () => void): void;
declare function beforeEach(fn: () => Promise<void>): void;
declare function afterEach(fn: () => void): void;
declare function afterEach(fn: () => Promise<void>): void;

declare function expect<T>(actual: T): jest.Matchers<T>;

declare namespace jest {
  interface Matchers<R> {
    toBe(expected: unknown): R;
    toEqual(expected: unknown): R;
    toBeCloseTo(expected: number, precision?: number): R;
    toBeGreaterThan(expected: number): R;
    toBeGreaterThanOrEqual(expected: number): R;
    toBeLessThan(expected: number): R;
    toBeLessThanOrEqual(expected: number): R;
    toThrow(error?: unknown): R;
  }

  interface Mock<TArgs extends any[] = any[], TReturn = any> {
    (...args: TArgs): TReturn;
    mockImplementation(fn: (...args: TArgs) => TReturn): Mock<TArgs, TReturn>;
  }

  function fn<TArgs extends any[] = any[], TReturn = any>(
    implementation?: (...args: TArgs) => TReturn
  ): Mock<TArgs, TReturn>;
}

declare const jest: {
  fn: typeof jest.fn;
};
