
export default class HighResolutionTime {
    public readonly milliseconds: number;

    constructor(milliseconds: number = 0) {
        this.milliseconds = milliseconds;
    }

    get seconds(): number {
        return this.milliseconds / 1000;
    }

    get minutes(): number {
        return this.milliseconds / 60000;
    }

    get hours(): number {
        return this.milliseconds / 360000;
    }

    public add(time: HighResolutionTime): HighResolutionTime {
        return new HighResolutionTime(this.milliseconds + time.milliseconds);
    }

    public subtract(time: HighResolutionTime): HighResolutionTime {
        return new HighResolutionTime(this.milliseconds - time.milliseconds);
    }

    public toString(): string {
        return `${this.seconds.toFixed(3)} seconds`;
    }
}
