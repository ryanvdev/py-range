# Table of contents

- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [API](#api)
  - [`PyRange`](#pyrange)
  - [`pyRange()`](#pyrange-1)
  - [`map()`](#map)
  - [`mapAsync()`](#mapasync)
  - [`forEach()`](#foreach)
  - [`forEachAsync()`](#foreachasync)
  - [`toIterator()`](#toiterator)
  - [`toArray()`](#toarray)
  - [`fill()`](#fill)
  - [`toObject()`](#toobject)

# Introduction

- PyRange creates an object that stores only 3 values (start, stop, step) and corresponding methods (map, forEach, fill, toArray, toIterator, ...).
- Inspired by [`range`](https://www.w3schools.com/python/ref_func_range.asp) function for [Python](https://www.python.org/).

# API

## `PyRange`

```ts
const r = new PyRange(5, 10, 2);

console.log(r);
// PyRange { _start: 5, _stop: 10, _step: 2 }

console.log(r.toArray());
// [ 5, 7, 9 ]
```

## `pyRange()`

- ### `pyRange(stop:number)`
```ts
console.log(pyRange(10));
// PyRange { _start: 0, _stop: 10, _step: 1 }

console.log(pyRange(-50));
// PyRange { _start: 0, _stop: -50, _step: -1 }
```


- ### `pyRange(start:number, stop:number)`
```ts
console.log(pyRange(0, 20));
// PyRange { _start: 0, _stop: 20, _step: 1 }

console.log(pyRange(3, -5));
// PyRange { _start: 3, _stop: -5, _step: -1 }
```

- ### `pyRange(start:number, stop:number, step:number)`
```ts
console.log(pyRange(0, 12, 3));
// PyRange { _start: 0, _stop: 12, _step: 3 }

console.log(pyRange(0, -12, -3));
//PyRange { _start: 0, _stop: -12, _step: -3 }
```


## `map()`

It works similar to [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map);

```ts
const elements: string[] = pyRange(0, -12, -3).map((value, index) => {
    return `index= ${index}, value= ${value}`;
});

console.log('[map]', elements);
// [map] [
//     'index= 0, value= 0',
//     'index= 1, value= -3',
//     'index= 2, value= -6',
//     'index= 3, value= -9'
// ]
```


## `mapAsync()`

```ts
const elements = await pyRange(0, 12, 4).mapAsync(async (value, index) => {
    return { index, value };
});

console.log('[elements]', elements);
// [elements] [
//     { index: 0, value: 0 },
//     { index: 1, value: 4 },
//     { index: 2, value: 8 }
// ]
```

## `forEach()`
It works similar to [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

```ts
pyRange(3).forEach((value, index) => {
    console.log('[forEach]', `value= ${value} ; index= ${index}`);
});
// [forEach] value= 0 ; index= 0
// [forEach] value= 1 ; index= 1
// [forEach] value= 2 ; index= 2
```

## `forEachAsync()`
```ts
await pyRange(3, 6).forEachAsync(async (value, index) => {
    console.log('[forEachAsync]', `value= ${value} ; index= ${index}`);
});
// [forEachAsync] value= 3 ; index= 0
// [forEachAsync] value= 4 ; index= 1
// [forEachAsync] value= 5 ; index= 2
```



## `toIterator()`

```ts
for (const value of pyRange(5, 8).toIterator()) {
    console.log('[for-of]', `value= ${value}`);
}
// [for-of] value= 5
// [for-of] value= 6
// [for-of] value= 7

console.log('[toArray]', pyRange(0, 12, 3).toArray());
// [toArray] [ 0, 3, 6, 9 ]

console.log('[fill]', pyRange(5).fill(0));
// [fill] [ 0, 0, 0, 0, 0 ]
```


## `toArray()`

```ts
console.log('[toArray]', pyRange(0, 12, 3).toArray());
// [toArray] [ 0, 3, 6, 9 ]
```


## `fill()`
```ts
console.log('[fill]', pyRange(5).fill(0));
// [fill] [ 0, 0, 0, 0, 0 ]


console.log(
    '[fill]',
    pyRange(5).fill({
        type: 'Object',
        value: 'Some values',
    }),
);
// [fill] [
//     { type: 'Object', value: 'Some values' },
//     { type: 'Object', value: 'Some values' },
//     { type: 'Object', value: 'Some values' },
//     { type: 'Object', value: 'Some values' },
//     { type: 'Object', value: 'Some values' }
// ]
```


## `toObject()`

```ts
console.log(pyRange(5, 10).toObject());
// { start: 5, stop: 10, step: 1 }
```