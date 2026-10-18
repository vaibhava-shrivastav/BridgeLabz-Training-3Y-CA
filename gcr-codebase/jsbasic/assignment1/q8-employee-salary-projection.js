let currentSalary = 50000;
const annualIncrementRate = 5;
const salaryProjection = [];

for (let year = 1; year <= 5; year += 1) {
  currentSalary += currentSalary * (annualIncrementRate / 100);
  currentSalary = Math.round(currentSalary);
  salaryProjection.push({
    Year: year,
    Salary: currentSalary,
  });
}

console.table(salaryProjection);
