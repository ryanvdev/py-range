type PyRangeCallbackFn<T> = (value: number, index: number) => T;
type NullOrUndefined = null | undefined;

function isFiniteNumber(value: unknown): value is number {
    return typeof value === 'number' && isFinite(value);
}

function isNullOrUndefined(value: unknown): value is NullOrUndefined {
    return value === undefined || value === null;
}

export class PyRange {
    private _start: number = 0;
    private _stop: number = 0;
    private _step: number = 1;

    //! start
    public get start() {
        return this._start;
    }
    public set start(value: number) {
        if (!isFiniteNumber(value)) {
            throw new Error(`[PyRange] value of start must be a number`);
        }

        this._start = value;
    }

    //! stop
    public get stop() {
        return this._stop;
    }
    public set stop(value: number) {
        if (!isFiniteNumber(value)) {
            throw new Error(`[PyRange] value of stop must be a number`);
        }

        this._stop = value;
    }

    //! step
    public get step() {
        return this._step;
    }
    public set step(value: number) {
        if (!isFiniteNumber(value) || value === 0) {
            throw new Error(
                `[PyRange] The value of step must be a number and step must be different from 0.`,
            );
        }

        this._step = value;
    }

    public constructor(start: number, stop: number, step: number) {
        this.start = start;
        this.stop = stop;
        this.step = step;
    }

    public map<T>(callbackFn: PyRangeCallbackFn<T>): T[] {
        const sum: T[] = [];
        let index: number = 0;

        if (this._step < 0) {
            for (let i = this._start; i > this._stop; i += this._step) {
                sum.push(callbackFn(i, index));
                index++;
            }
        } else {
            for (let i = this._start; i < this._stop; i += this._step) {
                sum.push(callbackFn(i, index));
                index++;
            }
        }

        return sum;
    }

    public async mapAsync<T>(callbackFn: PyRangeCallbackFn<T>): Promise<T[]> {
        return await Promise.all(this.map(callbackFn));
    }

    public forEach(callbackFn: PyRangeCallbackFn<any>): void {
        let index: number = 0;

        if (this._step < 0) {
            for (let i = this._start; i > this._stop; i += this._step) {
                callbackFn(i, index);
                index++;
            }
        } else {
            for (let i = this._start; i < this._stop; i += this._step) {
                callbackFn(i, index);
                index++;
            }
        }
    }

    public async forEachAsync(callbackFn: PyRangeCallbackFn<any>): Promise<void> {
        await Promise.all(this.map(callbackFn));
    }

    public fill<T>(value: T): T[] {
        return this.map(() => value);
    }

    public toArray(): number[] {
        return this.map((value) => value);
    }

    public *toIterator() {
        if (this._step < 0) {
            for (let i = this._start; i > this._stop; i += this._step) {
                yield i;
            }
        } else {
            for (let i = this._start; i < this._stop; i += this._step) {
                yield i;
            }
        }
    }

    public toObject() {
        return {
            start: this._start,
            stop: this._stop,
            step: this._step,
        };
    }
}

/**
 * @param arg1 If arg2 is undefined then the start is the value of arg1, the stop is 0 and the step is 1.
 * @param arg2 start=arg1; stop=arg2. If arg3 is undefined and start > stop then step is -1, else stop is 1.
 * @param arg3 start=arg1 ; stop=arg2 ; step=arg3.
 * @returns An object that stores three values { start: number, stop:number, stop:step } and their respective methods.
 */
export function pyRange(
    arg1: number,
    arg2: number | NullOrUndefined = undefined,
    arg3: number | NullOrUndefined = undefined,
): PyRange {
    if (!isFiniteNumber(arg1)) {
        throw new Error('[pyRange] The value of start must be a finite number.');
    }

    let start: number = 0;
    let stop: number = 0;
    let step: number | undefined = undefined;

    if (isNullOrUndefined(arg2) && isNullOrUndefined(arg3)) {
        start = 0;
        stop = arg1;
    } else if (isNullOrUndefined(arg3)) {
        if (!isFiniteNumber(arg2)) {
            throw new Error('[pyRange] The value of stop must be a finite number.');
        }
        start = arg1;
        stop = arg2;
    } else {
        if (!isFiniteNumber(arg2) || !isFiniteNumber(arg3)) {
            throw new Error('[pyRange] The value of start, stop, step must be a finite number.');
        }
        start = arg1;
        stop = arg2;
        step = arg3;
    }

    if (step === undefined) {
        step = start > stop ? -1 : 1;
    }

    return new PyRange(start, stop, step);
}
