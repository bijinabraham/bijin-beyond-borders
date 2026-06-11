export async function register() {
  // --localstorage-file is injected by the Claude Code runtime into every
  // Node.js process. Without a valid file path the flag creates a broken
  // localStorage stub where getItem / setItem are not functions.
  // Replace it with a working in-memory implementation so SSR doesn't 500.
  if (typeof globalThis.localStorage !== "undefined") {
    const store: Record<string, string> = {};
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      writable: true,
      value: {
        getItem: (key: string): string | null => store[key] ?? null,
        setItem: (key: string, value: string): void => {
          store[key] = String(value);
        },
        removeItem: (key: string): void => {
          delete store[key];
        },
        clear: (): void => {
          for (const k in store) delete store[k];
        },
        key: (i: number): string | null => Object.keys(store)[i] ?? null,
        get length(): number {
          return Object.keys(store).length;
        },
      },
    });
  }
}
