import { cancelFrame, requestFrame } from './common';
import HighResolutionTime from './HighResolutionTime';

export interface Tick {
    loop: TickLoop;
    elapsedTime: HighResolutionTime;
}

export type TickHandler = (tick: Tick) => void;

export enum TickLoopPriority {
    LOW = 191,
    MEDIUM = 127,
    HIGH = 63,
    TIMER = 31,
}

export default class TickLoop {
    public static DEFAULT = new TickLoop();

    private readonly autoStart: boolean;
    private handlers: Array<[TickHandler, number]> = [];
    private frameId: number|null = null;

    constructor(autoStart: boolean = true) {
        this.autoStart = autoStart;
    }

    public addHandler(handler: TickHandler, priority: number = TickLoopPriority.MEDIUM): void {
        let found = false;
        const len = this.handlers.length;
        for (let i = 0; i < len; i += 1) {
            const [existingHandler] = this.handlers[i];
            if (existingHandler === handler) {
                // Handler already defined, change priority
                this.handlers[i][1] = priority;
                found = true;
            }
        }
        if (!found) {
            this.handlers.push([handler, priority]);
        }
        this.handlers.sort(([, aPrio], [, bPrio]) => bPrio - aPrio);
        if (this.autoStart && this.frameId === null) {
            this.start();
        }
    }

    public removeHandler(handler: TickHandler): void {
        this.handlers = this.handlers.filter(([existingHandler]) => existingHandler !== handler);
        if (this.handlers.length === 0 && this.autoStart) {
            this.stop();
        }
    }

    public start(): void {
        if (this.frameId !== null) {
            throw Error('Already running');
        }
        let startTime: number;
        const loop = (elapsedTime: number) => {
            this.frameId = requestFrame(loop);
            if (typeof startTime === 'undefined') {
                startTime = elapsedTime;
            }
            this.onTick(elapsedTime - startTime);
        };
        this.frameId = requestFrame(loop);
    }

    public stop(): void {
        if (this.frameId === null) {
            throw Error('Not running');
        }
        cancelFrame(this.frameId);
        this.frameId = null;
    }

    protected onTick(elapsedTime: number): void {
        const tick = { loop: this, elapsedTime: new HighResolutionTime(elapsedTime) };
        for (const [handler] of this.handlers) {
            handler(tick);
        }
    }
}
