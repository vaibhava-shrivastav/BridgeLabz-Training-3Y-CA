"use strict";

// Predicted output:
// Script start
// Script end
// Promise callback
// Timeout callback
console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);
Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

// Synchronous statements finish before queued callbacks run. Promise.then()
// schedules a microtask, which runs before setTimeout's macrotask after the
// current call stack is empty.
