"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var CallbackTimer_1 = require("./CallbackTimer");
exports.CallbackTimer = CallbackTimer_1.default;
__export(require("./common"));
var HighResolutionTime_1 = require("./HighResolutionTime");
exports.HighResulotionTime = HighResolutionTime_1.default;
var Stopwatch_1 = require("./Stopwatch");
exports.Stopwatch = Stopwatch_1.default;
var TickLoop_1 = require("./TickLoop");
exports.TickLoop = TickLoop_1.default;
exports.TickLoopPriority = TickLoop_1.TickLoopPriority;
var Timer_1 = require("./Timer");
exports.Timer = Timer_1.default;
