// The global bonus is available inside functions unless a local name shadows it.
const bonus = 5000;

function calculateSalary(permanentStatus) {
  const salary = 40000;
  const isPermanent = permanentStatus;
  let totalSalary = salary;

  // Add the global bonus only when this function's local isPermanent is true.
  if (isPermanent) {
    totalSalary += bonus;
  }

  console.log(`Permanent employee: ${isPermanent}`);
  console.log(`Total salary: ${totalSalary}`);
}

calculateSalary(true);
calculateSalary(false);

// The local isPermanent values do not change the global bonus.
console.log(`Global bonus remains: ${bonus}`);
