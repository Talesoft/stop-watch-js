import TickLoop, { Tick } from './TickLoop';
import Timer from './Timer';

export type TimerHandler = (timer: Timer) => void;

export default class CallbackTimer extends Timer {
    private readonly finishHandler: TimerHandler;
    private readonly progressHandler: TimerHandler;
    private readonly startHandler: TimerHandler;

    constructor(
        duration: number,
        finishHandler: TimerHandler = () => {},
        progressHandler: TimerHandler = () => {},
        startHandler: TimerHandler = () => {},
        tickLoop: TickLoop = TickLoop.DEFAULT,
    ) {
        super(duration, tickLoop);
        this.finishHandler = finishHandler;
        this.progressHandler = progressHandler;
        this.startHandler = startHandler;
    }

    public start(): void {
        super.start();
        this.startHandler(this);
    }

    protected onTick(tick: Tick): void {
        super.onTick(tick);
        this.progressHandler(this);
    }

    // @ts-ignore
    protected onFinish(tick: Tick): void {
        this.stop();
        this.finishHandler(this);
    }
}
