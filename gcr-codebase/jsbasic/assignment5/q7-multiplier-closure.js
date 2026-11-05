"use strict";

function makeMultiplier(multiplier) {
  // The returned function retains access to `multiplier` after this call ends.
  return function multiply(number) {
    return number * multiplier;
  };
}

const triple = makeMultiplier(3);
console.log(triple(5)); // 15

// `triple` closes over the multiplier value (3) from makeMultiplier's scope,
// so each later call can use it without receiving it as an argument again.
