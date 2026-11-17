"use strict";

function initializeCharacterCounter() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Live Character Counter</h1>
    <label for="message">Message (maximum 100 characters)</label>
    <textarea id="message" maxlength="100" rows="6"></textarea>
    <p id="character-count" aria-live="polite"></p>
    <button id="reset-message" type="button">Reset</button>
  `;
  document.body.append(host);

  const textarea = host.querySelector("#message");
  const counter = host.querySelector("#character-count");

  function updateCounter() {
    const remaining = 100 - textarea.value.length;
    counter.textContent = `${remaining} characters remaining`;
    counter.style.color = remaining === 0 ? "red" : remaining <= 20 ? "yellow" : "";
  }

  textarea.addEventListener("beforeinput", (event) => {
    if (event.inputType.startsWith("insert") && textarea.value.length >= 100) {
      event.preventDefault();
    }
  });
  textarea.addEventListener("input", updateCounter);
  host.querySelector("#reset-message").addEventListener("click", () => {
    textarea.value = "";
    updateCounter();
    textarea.focus();
  });

  updateCounter();
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the character counter.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCharacterCounter, { once: true });
} else {
  initializeCharacterCounter();
}
