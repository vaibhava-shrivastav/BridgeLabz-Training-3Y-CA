const expenses = [
  { category: "Food", amount: 420 },
  { category: "Travel", amount: 180 },
  { category: "Rent", amount: 1200 },
  { category: "Bills", amount: 160 },
  { category: "Leisure", amount: 240 },
];

let totalExpenses = 0;

for (const expense of expenses) {
  totalExpenses += expense.amount;
}

const averageExpense = totalExpenses / expenses.length;
let finalAmount = totalExpenses;
finalAmount += totalExpenses * 0.10;

console.log(`Total expenses: $${totalExpenses.toFixed(2)}`);
console.log(`Average expense: $${averageExpense.toFixed(2)}`);
console.log(`Final amount after 10% tax: $${finalAmount.toFixed(2)}`);
