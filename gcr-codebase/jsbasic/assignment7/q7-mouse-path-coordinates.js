"use strict";

function initializeMouseTracker() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Mouse Path &amp; Coordinates</h1>
    <p id="mouse-coordinates" aria-live="polite">Move the pointer inside the box.</p>
    <div id="tracking-box" aria-label="Mouse tracking area"></div>
  `;
  document.body.append(host);

  const box = host.querySelector("#tracking-box");
  const coordinates = host.querySelector("#mouse-coordinates");
  const style = document.createElement("style");
  style.textContent = `
    #tracking-box { position: relative; width: 400px; height: 400px; max-width: 100%; background: #edf2f7; border: 2px solid #334155; overflow: hidden; }
    .click-dot { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: red; transform: translate(-50%, -50%); pointer-events: none; }
  `;
  document.head.append(style);

  box.addEventListener("mousemove", (event) => {
    coordinates.textContent = `clientX: ${event.clientX}, clientY: ${event.clientY}`;
  });
  box.addEventListener("dblclick", (event) => {
    const bounds = box.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "click-dot";
    dot.style.left = `${event.clientX - bounds.left}px`;
    dot.style.top = `${event.clientY - bounds.top}px`;
    dot.setAttribute("aria-label", "Double-click marker");
    box.append(dot);
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the mouse tracker.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMouseTracker, { once: true });
} else {
  initializeMouseTracker();
}
