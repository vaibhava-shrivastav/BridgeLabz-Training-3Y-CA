"use strict";

function runCoffeeStep(stepName) {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error(`${stepName} failed.`));
        return;
      }

      console.log(`${stepName} complete.`);
      resolve();
    }, delay);
  });
}

function boilWater() {
  return runCoffeeStep("Boiling water");
}

function brewCoffee() {
  return runCoffeeStep("Brewing coffee");
}

function pourIntoCup() {
  return runCoffeeStep("Pouring coffee into a cup");
}

boilWater()
  .then(() => brewCoffee())
  .then(() => pourIntoCup())
  .then(() => console.log("Coffee ready for the team!"))
  .catch((error) => console.error("Coffee process failed:", error.message));
