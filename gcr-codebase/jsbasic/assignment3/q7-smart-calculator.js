"use strict";

class InvalidOperationError extends Error {
  constructor(operation) {
    super(`Unknown operation: ${operation}`);
    this.name = "InvalidOperationError";
  }
}

class CalculationError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalculationError";
  }
}

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25;
const num2 = 0;
const results = [];

function calculate(operation, first, second) {
  switch (operation) {
    case "add":
      return first + second;
    case "divide":
      if (second === 0) {
        throw new CalculationError("Cannot divide by zero.");
      }
      return first / second;
    case "power":
      return first ** second;
    case "root":
      if (first < 0) {
        throw new CalculationError("Cannot calculate a real square root of a negative number.");
      }
      return Math.sqrt(first);
    case "subtract":
      return first - second;
    default:
      throw new InvalidOperationError(operation);
  }
}

for (const operation of operations) {
  try {
    const result = calculate(operation, num1, num2);
    results.push({ operation, result, status: "success" });
  } catch (error) {
    results.push({ operation, error: error.message, status: "failed" });
  }
}

console.log(`=== Calculator summary (num1=${num1}, num2=${num2}) ===`);
for (const result of results) {
  if (result.status === "success") {
    console.log(`${result.operation.padEnd(8)} -> ${result.result}`);
  } else {
    console.log(`${result.operation.padEnd(8)} -> ERROR: ${result.error}`);
  }
}

try {
  calculate("modulo", num1, num2);
} catch (error) {
  console.log(`Unknown-operation check -> ${error.name}: ${error.message}`);
}

try {
  calculate("root", -num1, num2);
} catch (error) {
  console.log(`Negative-root check -> ${error.name}: ${error.message}`);
}
