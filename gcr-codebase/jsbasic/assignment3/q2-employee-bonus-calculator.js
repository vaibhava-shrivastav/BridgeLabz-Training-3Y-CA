"use strict";

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

console.log("=== Employee bonus report ===");
for (const employee of employees) {
  try {
    if (
      employee === null ||
      typeof employee !== "object" ||
      !Object.hasOwn(employee, "name") ||
      !Object.hasOwn(employee, "salary") ||
      !Object.hasOwn(employee, "years")
    ) {
      throw new TypeError("Employee must include name, salary, and years.");
    }

    const salary = Number(employee.salary);
    const years = Number(employee.years);
    if (!Number.isFinite(salary) || !Number.isFinite(years)) {
      throw new TypeError("Salary and years must convert to finite numbers.");
    }

    const bonusRate = years > 3 ? 0.1 : 0.05;
    const bonus = salary * bonusRate;
    const totalCompensation = salary + bonus;

    console.log(
      `${employee.name}: salary=$${salary.toFixed(2)}, years=${years}, ` +
        `bonus=${(bonusRate * 100).toFixed(0)}% ($${bonus.toFixed(2)}), ` +
        `total=$${totalCompensation.toFixed(2)}`
    );
  } catch (error) {
    console.log(`Employee record error: ${error.message}`);
  }
}
