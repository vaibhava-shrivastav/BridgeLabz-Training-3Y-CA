"use strict";

class TransactionValidationError extends Error {
  constructor(category, message) {
    super(message);
    this.name = "TransactionValidationError";
    this.category = category;
  }
}

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];
const validTransactions = [];
const invalidTransactions = [];

for (let index = 0; index < transactions.length; index += 1) {
  const transaction = transactions[index];

  try {
    if (transaction === null || typeof transaction !== "object") {
      throw new TransactionValidationError("null", "Transaction entry is null or not an object.");
    }
    if (!Object.hasOwn(transaction, "id") || !Object.hasOwn(transaction, "amount")) {
      throw new TransactionValidationError("missing_fields", "Transaction is missing id or amount.");
    }
    if (transaction.amount < 0) {
      throw new TransactionValidationError("negative_amount", "Transaction amount cannot be negative.");
    }

    validTransactions.push(transaction);
    console.log(`Transaction ${transaction.id}: valid`);
  } catch (error) {
    const category =
      error instanceof TransactionValidationError ? error.category : "unexpected_error";
    invalidTransactions.push({ index, transaction, category, message: error.message });
    console.log(`Entry ${index}: ${category} - ${error.message}`);
  }
}

console.log("\n=== Transaction summary ===");
console.log(`Successful: ${validTransactions.length}`);
console.log(`Failed: ${invalidTransactions.length}`);
console.log("Valid transactions:", validTransactions);
console.log("Invalid transactions:", invalidTransactions);

// Debugger exercise: set a breakpoint inside the loop and watch index, transaction,
// validTransactions.length, and invalidTransactions.length. Step into the catch block
// for each bad record to see how its category is assigned.
