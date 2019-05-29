import HighResolutionTime from './HighResolutionTime';
export interface Tick {
    loop: TickLoop;
    elapsedTime: HighResolutionTime;
}
export declare type TickHandler = (tick: Tick) => void;
export declare enum TickLoopPriority {
    LOW = 191,
    MEDIUM = 127,
    HIGH = 63,
    TIMER = 31
}
export default class TickLoop {
    static DEFAULT: TickLoop;
    private readonly autoStart;
    private handlers;
    private frameId;
    constructor(autoStart?: boolean);
    addHandler(handler: TickHandler, priority?: number): void;
    removeHandler(handler: TickHandler): void;
    start(): void;
    stop(): void;
    protected onTick(elapsedTime: number): void;
}
