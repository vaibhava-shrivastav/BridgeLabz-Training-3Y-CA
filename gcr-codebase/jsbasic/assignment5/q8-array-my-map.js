"use strict";

Object.defineProperty(Array.prototype, "myMap", {
  configurable: true,
  writable: true,
  value: function myMap(callback, thisArg) {
    if (this === null || this === undefined) {
      throw new TypeError("myMap must be called on an array.");
    }
    if (typeof callback !== "function") {
      throw new TypeError("myMap callback must be a function.");
    }

    const source = Object(this);
    const result = new Array(source.length);

    for (let index = 0; index < source.length; index += 1) {
      // Skipping missing indexes preserves sparse-array behavior like map().
      if (index in source) {
        result[index] = callback.call(thisArg, source[index], index, source);
      }
    }

    return result;
  }
});

console.log([1, 2, 3].myMap((number) => number * 2));
console.log(["a", "b"].myMap((value, index) => `${index}: ${value}`));
