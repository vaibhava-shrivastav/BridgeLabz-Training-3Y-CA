"use strict";

function runDeliveryStep(stepName, successMessage) {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error(`${stepName} failed.`));
        return;
      }

      resolve(successMessage);
    }, delay);
  });
}

function takeOrder() {
  return runDeliveryStep("takeOrder", "Step 1: Order taken");
}

function prepare() {
  return runDeliveryStep("prepare", "Step 2: Food prepared");
}

function pack() {
  return runDeliveryStep("pack", "Step 3: Package ready");
}

function dispatch() {
  return runDeliveryStep("dispatch", "Step 4: Out for delivery");
}

function deliver() {
  return runDeliveryStep("deliver", "Delivery completed!");
}

async function runPipeline() {
  console.log("Start Pipeline");

  try {
    // Each await suspends this async function until its step settles. The
    // event loop remains free to process timers and other queued work meanwhile.
    // Sequential awaits ensure each delivery step starts only after the prior
    // step succeeds; a rejection skips remaining steps and enters catch.
    console.log(await takeOrder());
    console.log(await prepare());
    console.log(await pack());
    console.log(await dispatch());
    console.log(await deliver());
  } catch (error) {
    console.error("Pipeline failed!", error.message);
  }
}

runPipeline();
