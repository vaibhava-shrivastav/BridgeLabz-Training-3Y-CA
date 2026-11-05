"use strict";

function deployToServer(serverName, responseTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error(`${serverName} deployment failed.`));
        return;
      }

      resolve(`${serverName} deployment completed`);
    }, responseTime);
  });
}

const serverResponses = [
  deployToServer("Server A", 2000),
  deployToServer("Server B", 3000)
];

Promise.all(serverResponses)
  .then(() => console.log("Deployment completed for all servers"))
  .catch((error) => console.error("Deployment error:", error.message));

Promise.race(serverResponses)
  .then((response) => console.log("Fastest response:", response))
  .catch((error) => console.error("Fastest response failed:", error.message));
