import Stopwatch from './Stopwatch';
import TickLoop, { Tick } from './TickLoop';
export default class Timer extends Stopwatch {
    readonly duration: number;
    private lastProgress;
    constructor(duration: number, tickLoop?: TickLoop);
    readonly progress: number;
    toString(): string;
    protected onTick(tick: Tick): void;
    protected onFinish(tick: Tick): void;
}
