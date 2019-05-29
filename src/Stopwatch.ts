import HighResolutionTime from './HighResolutionTime';
import TickLoop, { Tick, TickLoopPriority } from './TickLoop';

export default class Stopwatch {
    public readonly tickLoop: TickLoop;
    private startTime: number|null = null;
    private lastElapsedTime: HighResolutionTime = new HighResolutionTime();

    constructor(tickLoop: TickLoop = TickLoop.DEFAULT) {
        this.tickLoop = tickLoop;
        this.onTick = this.onTick.bind(this);
    }

    get elapsedTime(): HighResolutionTime {
        return this.lastElapsedTime;
    }

    public start(): void {
        this.reset();
        this.tickLoop.addHandler(this.onTick, TickLoopPriority.TIMER);
    }

    public reset(): void {
        this.startTime = null;
        this.lastElapsedTime = new HighResolutionTime(0);
    }

    public stop(): void {
        this.tickLoop.removeHandler(this.onTick);
    }

    public toString(): string {
        return `stopwatch(elapsedTime=${this.lastElapsedTime})`;
    }

    protected onTick(tick: Tick): void {
        if (this.startTime === null) {
            this.startTime = tick.elapsedTime.milliseconds;
            return;
        }
        this.lastElapsedTime = new HighResolutionTime(tick.elapsedTime.milliseconds - this.startTime);
    }
}
