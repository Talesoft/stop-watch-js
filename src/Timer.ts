import Stopwatch from './Stopwatch';
import TickLoop, { Tick } from './TickLoop';

const { min, max } = Math;

export default class Timer extends Stopwatch {
    public readonly duration: number;
    private lastProgress: number = 0;

    constructor(duration: number, tickLoop: TickLoop = TickLoop.DEFAULT) {
        super(tickLoop);
        this.duration = duration;
    }

    get progress(): number {
        return this.lastProgress;
    }

    public toString(): string {
        return `timer(duration=${this.duration}, elapsedTime=${this.elapsedTime}, progress=${this.lastProgress})`;
    }

    protected onTick(tick: Tick): void {
        super.onTick(tick);
        this.lastProgress = max(0, min(this.elapsedTime.milliseconds / this.duration, 1));
        if (this.lastProgress >= 1) {
            this.onFinish(tick);
        }
    }

    // @ts-ignore
    protected onFinish(tick: Tick): void {
        this.stop();
    }
}
