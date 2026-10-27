"use strict";

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  "{invalid}",
  '{"user":"Mina","age":"22"}'
];
const cleanEntries = [];
const under18Users = [];
const auditErrors = [];

for (let index = 0; index < rawData.length; index += 1) {
  const lineNumber = index + 1;

  try {
    const parsed = JSON.parse(rawData[index]);
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      !Object.hasOwn(parsed, "user") ||
      !Object.hasOwn(parsed, "age")
    ) {
      throw new TypeError("Missing required user or age key.");
    }

    const age = Number(parsed.age);
    if (!Number.isFinite(age)) {
      throw new TypeError("Age must convert to a finite number.");
    }

    const cleanEntry = { ...parsed, age };
    cleanEntries.push(cleanEntry);
    if (age < 18) {
      under18Users.push(cleanEntry);
    }
    console.log(`Line ${lineNumber}: valid JSON record for ${cleanEntry.user}, age ${age}.`);
  } catch (error) {
    const category = error instanceof SyntaxError ? "invalid JSON" : "invalid record";
    auditErrors.push({ lineNumber, category, message: error.message });
    console.log(`Line ${lineNumber}: ${category} - ${error.message}`);
    // On an error, execution jumps to catch, logs the line, then continues
    // with the next loop iteration rather than stopping the audit.
  }
}

console.log("\nClean entries:", cleanEntries);
console.log("Users under 18:", under18Users);
console.log("Audit errors:", auditErrors);

// Debugger exercise: set a breakpoint at JSON.parse, then step over it.
// For line 3, step into the catch block and watch lineNumber, error, and
// auditErrors to follow the recovery path.
