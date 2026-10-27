"use strict";

class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  getAnnualSalary() {
    return this.salary * 12;
  }

  applyBonus(percent) {
    if (!Number.isFinite(percent) || percent < 0) {
      throw new RangeError("Bonus must be a non-negative percentage.");
    }
    this.salary *= 1 + percent / 100;
    return this.getAnnualSalary();
  }
}

const employees = [
  new Employee(1, "Ava", "Engineering", 80000),
  new Employee(2, "Noah", "Design", 65000),
  new Employee(3, "Mia", "Finance", 72000),
  new Employee(4, "Liam", "Marketing", 60000),
  new Employee(5, "Zoe", "Operations", 55000)
];

console.log("=== Employee annual salaries ===");
for (const employee of employees) {
  const baseAnnualSalary = employee.getAnnualSalary();
  const annualPayout = employee.applyBonus(5);
  console.log(
    `${employee.name} (${employee.department}): base annual salary=$${baseAnnualSalary.toFixed(2)}, ` +
      `annual payout after 5% bonus=$${annualPayout.toFixed(2)}`
  );
}

const totalAnnualPayout = employees.reduce(
  (companyTotal, employee) => companyTotal + employee.getAnnualSalary(),
  0
);
console.log(`Total annual company payout, including bonuses: $${totalAnnualPayout.toFixed(2)}`);
