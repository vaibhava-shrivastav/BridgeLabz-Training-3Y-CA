"use strict";

console.log("=== Original sequence ===");
console.log(score);
announce();
var score = 50;
function announce() {
  console.log("Game started");
}
let status = "ready";
startGame();
function startGame() {
  console.log(status);
}

// Hoisting notes: `var score` is created and initialized to undefined at the
// start of this script, while its assignment to 50 stays at its source line.
// The function declaration is available before its source line. `status` is
// in the temporal dead zone until initialized; startGame runs only after that.
console.log(`Score after assignment: ${score}`);

console.log("\n=== Arrow-function comparison ===");
const arrowScore = 50;
const announceWithArrow = () => console.log("Game started (arrow)");
const startGameWithArrow = () => console.log(arrowStatus);
const arrowStatus = "ready";

console.log(`Arrow version score: ${arrowScore}`);
announceWithArrow();
startGameWithArrow();

// Unlike function declarations, arrow functions assigned to const are not
// callable before their initialization (the const binding is in its TDZ).
