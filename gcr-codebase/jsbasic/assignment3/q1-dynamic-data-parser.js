"use strict";

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
const validNumbers = [];
const invalidNumbers = [];
const reports = [];

for (let index = 0; index < apiData.length; index += 1) {
  const value = apiData[index];
  const numberValue = Number(value);
  const booleanValue = Boolean(value);
  const stringValue = String(value);
  // Number(" ") is 0, but a blank string is not meaningful numeric input.
  const isBlankString = typeof value === "string" && value.trim() === "";
  const isValidNumber = Number.isFinite(numberValue) && !isBlankString;
  const report = {
    index,
    original: value,
    number: numberValue,
    boolean: booleanValue,
    string: stringValue,
    isValidNumber
  };

  reports.push(report);
  if (isValidNumber) {
    validNumbers.push(numberValue);
  } else {
    invalidNumbers.push({ index, original: value, converted: numberValue });
  }
}

console.log("=== Dynamic data conversion report ===");
for (const report of reports) {
  const status = report.isValidNumber ? "VALID NUMBER" : "INVALID NUMBER";
  console.log(
    `[${status}] index=${report.index} original=${String(report.original)} | ` +
      `Number=${String(report.number)} | Boolean=${report.boolean} | String="${report.string}"`
  );
}

console.log("\nValid numeric data:", validNumbers);
console.log("Invalid numeric data (including undefined, which also converts to NaN):");
for (const entry of invalidNumbers) {
  console.log(`index=${entry.index}, original=${String(entry.original)}, Number=${String(entry.converted)}`);
}
