import TickLoop, { Tick } from './TickLoop';
import Timer from './Timer';
export declare type TimerHandler = (timer: Timer) => void;
export default class CallbackTimer extends Timer {
    private readonly finishHandler;
    private readonly progressHandler;
    private readonly startHandler;
    constructor(duration: number, finishHandler?: TimerHandler, progressHandler?: TimerHandler, startHandler?: TimerHandler, tickLoop?: TickLoop);
    start(): void;
    protected onTick(tick: Tick): void;
    protected onFinish(tick: Tick): void;
}
