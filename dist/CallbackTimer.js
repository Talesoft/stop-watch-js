"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TickLoop_1 = __importDefault(require("./TickLoop"));
const Timer_1 = __importDefault(require("./Timer"));
class CallbackTimer extends Timer_1.default {
    constructor(duration, finishHandler = () => { }, progressHandler = () => { }, startHandler = () => { }, tickLoop = TickLoop_1.default.DEFAULT) {
        super(duration, tickLoop);
        this.finishHandler = finishHandler;
        this.progressHandler = progressHandler;
        this.startHandler = startHandler;
    }
    start() {
        super.start();
        this.startHandler(this);
    }
    onTick(tick) {
        super.onTick(tick);
        this.progressHandler(this);
    }
    // @ts-ignore
    onFinish(tick) {
        this.stop();
        this.finishHandler(this);
    }
}
exports.default = CallbackTimer;
