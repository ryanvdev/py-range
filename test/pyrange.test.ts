import { deepCompare } from 'ufer-object';
import { pyRange } from '../src';

describe('[General]', () => {
    describe('[Passing 1 arguments]', () => {
        test('pyRange(0)', () => {
            expect(pyRange(0).toObject()).toEqual({
                start: 0,
                stop: 0,
                step: 1,
            });
        });

        test('pyRange(5)', () => {
            expect(pyRange(5).toObject()).toEqual({
                start: 0,
                stop: 5,
                step: 1,
            });
        });

        test('pyRange(-5)', () => {
            expect(pyRange(-5).toObject()).toEqual({
                start: 0,
                stop: -5,
                step: -1,
            });
        });

        test('pyRange(undefined as any)', () => {
            expect(() => {
                pyRange(undefined as any);
            }).toThrow();
        });

        test('pyRange(NaN as any)', () => {
            expect(() => {
                pyRange(NaN as any);
            }).toThrow();
        });

        test('pyRange(null as any)', () => {
            expect(() => {
                pyRange(null as any);
            }).toThrow();
        });

        test(`pyRange('5' as any)`, () => {
            expect(() => {
                pyRange('5' as any);
            }).toThrow();
        });

        test('pyRange(Infinity as any)', () => {
            expect(() => {
                pyRange(Infinity as any);
            }).toThrow();
        });
    });

    describe('[Passing 2 arguments]', () => {
        test('pyRange(1, 6)', () => {
            expect(pyRange(1, 6).toObject()).toEqual({
                start: 1,
                stop: 6,
                step: 1,
            });
        });

        test('pyRange(1, 20)', () => {
            expect(pyRange(1, 20).toObject()).toEqual({
                start: 1,
                stop: 20,
                step: 1,
            });
        });

        test('pyRange(5, -20)', () => {
            expect(pyRange(5, -20).toObject()).toEqual({
                start: 5,
                stop: -20,
                step: -1,
            });
        });

        test(`pyRange(5, '5' as any)`, () => {
            expect(() => {
                pyRange(5, '5' as any);
            }).toThrow();
        });

        test('pyRange(5, NaN as any)', () => {
            expect(() => {
                pyRange(5, NaN as any);
            }).toThrow();
        });

        test('pyRange(5, Infinity as any)', () => {
            expect(() => {
                pyRange(5, Infinity as any);
            }).toThrow();
        });
    });

    describe('[Passing 3 arguments]', () => {
        test('pyRange(1, 6, 2)', () => {
            expect(pyRange(1, 6, 2).toObject()).toEqual({
                start: 1,
                stop: 6,
                step: 2,
            });
        });

        test('pyRange(1, -20, -5)', () => {
            expect(pyRange(1, -20, -5).toObject()).toEqual({
                start: 1,
                stop: -20,
                step: -5,
            });
        });

        test('pyRange(5, -20, 10)1', () => {
            expect(pyRange(5, -20, 10).toObject()).toEqual({
                start: 5,
                stop: -20,
                step: 10,
            });
        });

        test(`pyRange(5, 10, '5' as any)`, () => {
            expect(() => {
                pyRange(5, 10, '5' as any);
            }).toThrow();
        });

        test('pyRange(5, 10, NaN as any)', () => {
            expect(() => {
                pyRange(5, 10, NaN as any);
            }).toThrow();
        });

        test('pyRange(5, 10, Infinity as any)', () => {
            expect(() => {
                pyRange(5, 10, Infinity as any);
            }).toThrow();
        });

        test('pyRange(5, 10, 0)', () => {
            expect(() => {
                pyRange(5, 10, 0);
            }).toThrow();
        });
    });
});

describe('[map]', () => {
    describe('sync', () => {
        test('pyRange(4)', () => {
            expect(
                pyRange(4).map((v, i) => {
                    return String(v);
                }),
            ).toEqual(['0', '1', '2', '3']);
        });

        test('pyRange(0, -3)', () => {
            expect(
                pyRange(0, -3).map((v, i) => {
                    return { v, i };
                }),
            ).toEqual([
                { v: 0, i: 0 },
                { v: -1, i: 1 },
                { v: -2, i: 2 },
            ]);
        });

        test('pyRange(4, 12, 4)', () => {
            expect(
                pyRange(4, 12, 4).map((v, i) => {
                    return { v, i };
                }),
            ).toEqual([
                { v: 4, i: 0 },
                { v: 8, i: 1 },
            ]);
        });
    });

    describe('[async]', () => {
        test('pyRange(4)', async () => {
            expect(
                await pyRange(4).mapAsync(async (v, i) => {
                    return String(v);
                }),
            ).toEqual(['0', '1', '2', '3']);
        });
    });
});

describe('[forEach]', () => {
    describe('sync', () => {
        test('pyRange(4)', () => {
            const results: string[] = [];
            pyRange(4).forEach((v, i) => {
                results.push(String(v));
            });
            expect(results).toEqual(['0', '1', '2', '3']);
        });

        test('pyRange(0, -3)', () => {
            const results: any[] = [];

            pyRange(0, -3).forEach((v, i) => {
                return results.push({ v, i });
            });

            expect(results).toEqual([
                { v: 0, i: 0 },
                { v: -1, i: 1 },
                { v: -2, i: 2 },
            ]);
        });

        test('pyRange(4, 12, 4)', () => {
            const results: any[] = [];

            pyRange(4, 12, 4).forEach((v, i) => {
                results.push({ v, i });
            });

            expect(results).toEqual([
                { v: 4, i: 0 },
                { v: 8, i: 1 },
            ]);
        });
    });

    describe('[async]', () => {
        test('pyRange(4, 12, 4)', async () => {
            const results: any[] = [];

            await pyRange(4, 12, 4).forEach((v, i) => {
                results.push({ v, i });
            });

            expect(results).toEqual([
                { v: 4, i: 0 },
                { v: 8, i: 1 },
            ]);
        });
    });
});

describe('[fill]', () => {
    test('pyRange(2)', () => {
        expect(pyRange(2).fill(10)).toEqual([10, 10]);
    });

    test('pyRange(0, -3)', () => {
        expect(pyRange(0, -3).fill(0)).toEqual([0, 0, 0]);
    });

    test('pyRange(4, 12, 4)', () => {
        expect(pyRange(4, 12, 4).fill('v')).toEqual(['v', 'v']);
    });
});

describe('[for-of toIterator]', () => {
    test('pyRange(2)', () => {
        const results: any[] = [];
        for (const value of pyRange(2).toIterator()) {
            results.push(value);
        }
        expect(results).toEqual([0, 1]);
    });

    test('pyRange(0, -3)', () => {
        const results: any[] = [];
        for (const value of pyRange(0, -3).toIterator()) {
            results.push(value);
        }
        expect(results).toEqual([0, -1, -2]);
    });

    test('pyRange(4, 12, 4)', () => {
        const results: any[] = [];
        for (const value of pyRange(4, 12, 4).toIterator()) {
            results.push(value);
        }
        expect(results).toEqual([4, 8]);
    });
});

describe('[toArray]', () => {
    test('pyRange(2)', () => {
        expect(pyRange(2).toArray()).toEqual([0, 1]);
    });

    test('pyRange(0, -3)', () => {
        expect(pyRange(0, -3).toArray()).toEqual([0, -1, -2]);
    });

    test('pyRange(4, 12, 4)', () => {
        expect(pyRange(4, 12, 4).toArray()).toEqual([4, 8]);
    });
});
