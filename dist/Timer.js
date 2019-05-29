"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stopwatch_1 = __importDefault(require("./Stopwatch"));
const TickLoop_1 = __importDefault(require("./TickLoop"));
const { min, max } = Math;
class Timer extends Stopwatch_1.default {
    constructor(duration, tickLoop = TickLoop_1.default.DEFAULT) {
        super(tickLoop);
        this.lastProgress = 0;
        this.duration = duration;
    }
    get progress() {
        return this.lastProgress;
    }
    toString() {
        return `timer(duration=${this.duration}, elapsedTime=${this.elapsedTime}, progress=${this.lastProgress})`;
    }
    onTick(tick) {
        super.onTick(tick);
        this.lastProgress = max(0, min(this.elapsedTime.milliseconds / this.duration, 1));
        if (this.lastProgress >= 1) {
            this.onFinish(tick);
        }
    }
    // @ts-ignore
    onFinish(tick) {
        this.stop();
    }
}
exports.default = Timer;
