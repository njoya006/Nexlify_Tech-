declare module 'lenis' {
  interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    direction?: string;
    gestureDirection?: string;
    smoothTouch?: boolean;
    touchMultiplier?: number;
  }
  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    destroy(): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
  }
}
