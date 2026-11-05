"use strict";

console.log("Start");

setTimeout(() => {
  console.log("Macrotask: setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask: Promise.then callback");
});

console.log("Synchronous log");
console.log("End");

// Synchronous code runs first. Once the call stack is empty, JavaScript drains
// the microtask queue (Promises) before starting the next macrotask (setTimeout).
