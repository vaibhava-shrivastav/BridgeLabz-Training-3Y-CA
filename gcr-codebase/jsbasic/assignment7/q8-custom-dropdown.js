"use strict";

function initializeCustomDropdown() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Custom Dropdown</h1>
    <div id="dropdown">
      <button id="dropdown-toggle" type="button" aria-expanded="false">Choose an option</button>
      <ul id="dropdown-options" hidden>
        <li><button type="button" data-value="Option 1">Option 1</button></li>
        <li><button type="button" data-value="Option 2">Option 2</button></li>
        <li><button type="button" data-value="Option 3">Option 3</button></li>
      </ul>
    </div>
  `;
  document.body.append(host);

  const dropdown = host.querySelector("#dropdown");
  const toggle = host.querySelector("#dropdown-toggle");
  const options = host.querySelector("#dropdown-options");

  function setOpen(isOpen) {
    options.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  // Capture outside clicks before they reach the dropdown's own handlers.
  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) setOpen(false);
  }, true);

  toggle.addEventListener("click", () => setOpen(options.hidden));
  options.addEventListener("click", (event) => {
    const option = event.target.closest("button[data-value]");
    if (!option) return;
    toggle.textContent = option.dataset.value;
    setOpen(false);
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the custom dropdown.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCustomDropdown, { once: true });
} else {
  initializeCustomDropdown();
}
