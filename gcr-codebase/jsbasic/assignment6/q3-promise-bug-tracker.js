"use strict";

function getBugs() {
  const shouldFail = Math.random() < 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Bug tracker API request failed."));
        return;
      }

      resolve(["UI glitch", "API timeout", "Login failure"]);
    }, 1000);
  });
}

getBugs()
  .then((bugs) => {
    console.log("Reported bugs:");
    console.table(bugs.map((description, index) => ({ number: index + 1, description })));
  })
  .catch((error) => console.error("Unable to fetch bugs:", error.message));
