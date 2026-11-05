"use strict";

function runStageWithCallback(stageName, callback) {
  setTimeout(() => {
    console.log(stageName);
    callback();
  }, 1000);
}

function runStageAsync(stageName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(stageName);
      resolve();
    }, 1000);
  });
}

console.log("Callback pipeline:");
runStageWithCallback("design", () => {
  runStageWithCallback("build", () => {
    runStageWithCallback("test", () => {
      runStageWithCallback("deploy", () => {
        runStageWithCallback("celebrate", () => {
          console.log("Callback pipeline complete.\n");
          runAsyncPipeline();
        });
      });
    });
  });
});

async function runAsyncPipeline() {
  console.log("Async/await pipeline:");
  await runStageAsync("design");
  await runStageAsync("build");
  await runStageAsync("test");
  await runStageAsync("deploy");
  await runStageAsync("celebrate");
  console.log("Async/await pipeline complete.");
}

// async/await keeps sequential asynchronous steps in a flat, readable flow.
// Each await pauses this function, not JavaScript's event loop.
