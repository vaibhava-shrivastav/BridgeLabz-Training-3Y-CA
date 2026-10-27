"use strict";

function getRowLimit() {
  const input = process.argv[2];
  if (input === undefined) {
    return 5;
  }

  const rowLimit = Number(input);
  if (!Number.isInteger(rowLimit) || rowLimit < 1) {
    throw new TypeError("Provide a positive whole-number row limit.");
  }
  return rowLimit;
}

function printPyramid(rowLimit) {
  for (let row = 1; row <= rowLimit; row += 1) {
    let pattern = "";
    for (let column = 1; column <= row; column += 1) {
      pattern += column === 1 ? "*" : " *";
    }
    console.log(pattern);
  }
}

function printPyramidWithVar(rowLimit) {
  // `var` is function-scoped, so both loop counters are function-scoped and
  // the inner loop reuses its `column` binding on every outer-loop iteration.
  for (var row = 1; row <= rowLimit; row += 1) {
    var pattern = "";
    for (var column = 1; column <= row; column += 1) {
      pattern += column === 1 ? "*" : " *";
    }
    console.log(pattern);
  }
  console.log(`After the loops, var counters are reused: row=${row}, column=${column}`);
}

try {
  const rowLimit = getRowLimit();
  console.log(`=== Pyramid (${rowLimit} rows, let) ===`);
  printPyramid(rowLimit);
  console.log("\n=== Same pattern with var ===");
  printPyramidWithVar(rowLimit);
} catch (error) {
  console.log(`Input error: ${error.message}`);
}

// Run with `node q6-pyramid-pattern-generator.js 4` to choose a limit;
// omitting the argument uses the default of 5. Set breakpoints on both loop
// headers and watch row, column, and pattern to observe counter reuse.
// In the strict-mode file, an undeclared loop variable (for example `i = 0`)
// would throw ReferenceError instead of silently creating a global.
