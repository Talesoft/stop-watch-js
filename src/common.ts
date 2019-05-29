
export function supports(prop: keyof Window): boolean {
    return typeof window !== 'undefined' && typeof window[prop] !== 'undefined';
}

// TODO: Support Node.js process.hrtime.bigint()?
const timeProvider = supports('performance') ? window.performance : Date;

export const now = timeProvider.now.bind(timeProvider);

export const requestFrame = supports('requestAnimationFrame')
    ? requestAnimationFrame
    : (callback: FrameRequestCallback) => setTimeout(() => callback(now()), 16.66667);

export const cancelFrame = supports('cancelAnimationFrame')
    ? cancelAnimationFrame
    : clearTimeout;
