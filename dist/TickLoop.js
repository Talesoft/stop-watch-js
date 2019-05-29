"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const HighResolutionTime_1 = __importDefault(require("./HighResolutionTime"));
var TickLoopPriority;
(function (TickLoopPriority) {
    TickLoopPriority[TickLoopPriority["LOW"] = 191] = "LOW";
    TickLoopPriority[TickLoopPriority["MEDIUM"] = 127] = "MEDIUM";
    TickLoopPriority[TickLoopPriority["HIGH"] = 63] = "HIGH";
    TickLoopPriority[TickLoopPriority["TIMER"] = 31] = "TIMER";
})(TickLoopPriority = exports.TickLoopPriority || (exports.TickLoopPriority = {}));
class TickLoop {
    constructor(autoStart = true) {
        this.handlers = [];
        this.frameId = null;
        this.autoStart = autoStart;
    }
    addHandler(handler, priority = TickLoopPriority.MEDIUM) {
        let found = false;
        const len = this.handlers.length;
        for (let i = 0; i < len; i += 1) {
            const [existingHandler] = this.handlers[i];
            if (existingHandler === handler) {
                // Handler already defined, change priority
                this.handlers[i][1] = priority;
                found = true;
            }
        }
        if (!found) {
            this.handlers.push([handler, priority]);
        }
        this.handlers.sort(([, aPrio], [, bPrio]) => bPrio - aPrio);
        if (this.autoStart && this.frameId === null) {
            this.start();
        }
    }
    removeHandler(handler) {
        this.handlers = this.handlers.filter(([existingHandler]) => existingHandler !== handler);
        if (this.handlers.length === 0 && this.autoStart) {
            this.stop();
        }
    }
    start() {
        if (this.frameId !== null) {
            throw Error('Already running');
        }
        let startTime;
        const loop = (elapsedTime) => {
            this.frameId = common_1.requestFrame(loop);
            if (typeof startTime === 'undefined') {
                startTime = elapsedTime;
            }
            this.onTick(elapsedTime - startTime);
        };
        this.frameId = common_1.requestFrame(loop);
    }
    stop() {
        if (this.frameId === null) {
            throw Error('Not running');
        }
        common_1.cancelFrame(this.frameId);
        this.frameId = null;
    }
    onTick(elapsedTime) {
        const tick = { loop: this, elapsedTime: new HighResolutionTime_1.default(elapsedTime) };
        for (const [handler] of this.handlers) {
            handler(tick);
        }
    }
}
TickLoop.DEFAULT = new TickLoop();
exports.default = TickLoop;
