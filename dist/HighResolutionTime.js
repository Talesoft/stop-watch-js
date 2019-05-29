"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HighResolutionTime {
    constructor(milliseconds = 0) {
        this.milliseconds = milliseconds;
    }
    get seconds() {
        return this.milliseconds / 1000;
    }
    get minutes() {
        return this.milliseconds / 60000;
    }
    get hours() {
        return this.milliseconds / 360000;
    }
    add(time) {
        return new HighResolutionTime(this.milliseconds + time.milliseconds);
    }
    subtract(time) {
        return new HighResolutionTime(this.milliseconds - time.milliseconds);
    }
    toString() {
        return `${this.seconds.toFixed(3)} seconds`;
    }
}
exports.default = HighResolutionTime;
