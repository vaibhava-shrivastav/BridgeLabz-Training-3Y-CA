"use strict";

// Function constructors let this file compare sloppy and strict code while
// keeping this outer assignment file in strict mode.
const sloppyDemo = Function(
  "function demo(a, a) { total = 10; var deleteResult = delete total; " +
    "return { secondArgument: a, deleteResult, globalTotal: globalThis.total, " +
    "globalPropertyExists: Object.hasOwn(globalThis, 'total') }; } return demo(5, 10);"
);
const sloppyResult = sloppyDemo();
console.log("Without strict mode:");
console.log(`Duplicate parameter keeps the last value: ${sloppyResult.secondArgument}`);
console.log(`Implicit global deletion result=${sloppyResult.deleteResult}`);
console.log(`Global total after delete: ${String(sloppyResult.globalTotal)}`);
console.log(`Global total property still exists: ${sloppyResult.globalPropertyExists}`);
delete globalThis.total;

console.log("\nWith strict mode:");
try {
  Function('"use strict"; function demo(a, a) {} return demo(5, 10);');
} catch (error) {
  console.log(`Duplicate parameters: ${error.name} - ${error.message}`);
}

try {
  Function('"use strict"; total = 10;')();
} catch (error) {
  console.log(`Undeclared assignment: ${error.name} - ${error.message}`);
}

try {
  Function('"use strict"; let total = 10; delete total;')();
} catch (error) {
  console.log(`Deleting an identifier: ${error.name} - ${error.message}`);
}

function correctDemo(first, second) {
  let total = 10;
  console.log(`\nCorrect ES6 version: first=${first}, second=${second}, total=${total}`);
  total = 0;
  console.log(`After an explicit update: total=${total}`);
}

correctDemo(5, 10);

// In a strict script, duplicate parameter names and deleting an unqualified
// identifier are syntax errors; assigning to an undeclared name is a
// ReferenceError. The sloppy example permits duplicate parameters and creates
// a global property; the result of deleting that implicit global is reported
// because behavior can differ across execution environments.
