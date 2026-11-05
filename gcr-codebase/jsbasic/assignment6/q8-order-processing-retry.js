"use strict";

function submitOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        reject(new Error("Order submission failed."));
        return;
      }

      resolve("Order submitted");
    }, 500);
  });
}

async function processOrder() {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await submitOrder();
      console.log(`Attempt ${attempt}: Success`);
      return;
    } catch (error) {
      console.log(`Attempt ${attempt}: Failed`);
    }
  }

  throw new Error("Order could not be processed");
}

processOrder().catch((error) => {
  console.error("Order processing stopped:", error.message);
});
