import HighResolutionTime from './HighResolutionTime';
import TickLoop, { Tick } from './TickLoop';
export default class Stopwatch {
    readonly tickLoop: TickLoop;
    private startTime;
    private lastElapsedTime;
    constructor(tickLoop?: TickLoop);
    readonly elapsedTime: HighResolutionTime;
    start(): void;
    reset(): void;
    stop(): void;
    toString(): string;
    protected onTick(tick: Tick): void;
}
