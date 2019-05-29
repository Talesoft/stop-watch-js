"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function supports(prop) {
    return typeof window !== 'undefined' && typeof window[prop] !== 'undefined';
}
exports.supports = supports;
// TODO: Support Node.js process.hrtime.bigint()?
const timeProvider = supports('performance') ? window.performance : Date;
exports.now = timeProvider.now.bind(timeProvider);
exports.requestFrame = supports('requestAnimationFrame')
    ? requestAnimationFrame
    : (callback) => setTimeout(() => callback(exports.now()), 16.66667);
exports.cancelFrame = supports('cancelAnimationFrame')
    ? cancelAnimationFrame
    : clearTimeout;
