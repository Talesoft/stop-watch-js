"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HighResolutionTime_1 = __importDefault(require("./HighResolutionTime"));
const TickLoop_1 = __importStar(require("./TickLoop"));
class Stopwatch {
    constructor(tickLoop = TickLoop_1.default.DEFAULT) {
        this.startTime = null;
        this.lastElapsedTime = new HighResolutionTime_1.default();
        this.tickLoop = tickLoop;
        this.onTick = this.onTick.bind(this);
    }
    get elapsedTime() {
        return this.lastElapsedTime;
    }
    start() {
        this.reset();
        this.tickLoop.addHandler(this.onTick, TickLoop_1.TickLoopPriority.TIMER);
    }
    reset() {
        this.startTime = null;
        this.lastElapsedTime = new HighResolutionTime_1.default(0);
    }
    stop() {
        this.tickLoop.removeHandler(this.onTick);
    }
    toString() {
        return `stopwatch(elapsedTime=${this.lastElapsedTime})`;
    }
    onTick(tick) {
        if (this.startTime === null) {
            this.startTime = tick.elapsedTime.milliseconds;
            return;
        }
        this.lastElapsedTime = new HighResolutionTime_1.default(tick.elapsedTime.milliseconds - this.startTime);
    }
}
exports.default = Stopwatch;
