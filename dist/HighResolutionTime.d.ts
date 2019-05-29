export default class HighResolutionTime {
    readonly milliseconds: number;
    constructor(milliseconds?: number);
    readonly seconds: number;
    readonly minutes: number;
    readonly hours: number;
    add(time: HighResolutionTime): HighResolutionTime;
    subtract(time: HighResolutionTime): HighResolutionTime;
    toString(): string;
}
