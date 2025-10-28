/**
 * Minimal ambient module declarations mirroring the pieces of the real
 * `vite/client` package that our TypeScript build relies on. Shipping them
 * inside the repository allows the project to compile even in environments
 * where installing npm packages is restricted.
 */
declare interface ImportMetaEnv {
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
  /** Arbitrary user-defined variables prefixed with `VITE_`. */
  readonly [key: string]: string | boolean | number | undefined;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly hot?: {
    accept: (cb?: (...modules: unknown[]) => void) => void;
    dispose: (cb: (data: unknown) => void) => void;
    data?: unknown;
  };
  readonly glob: <T = unknown>(
    pattern: string,
    options?: {
      eager?: boolean;
      as?: string;
      import?: string;
    }
  ) => Record<string, T>;
  readonly globEager: <T = unknown>(pattern: string) => Record<string, T>;
  readonly url: string;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.ogg' {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}
