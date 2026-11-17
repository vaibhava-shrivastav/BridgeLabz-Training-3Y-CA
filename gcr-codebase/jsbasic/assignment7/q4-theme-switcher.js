"use strict";

function initializeThemeSwitcher() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Theme Switcher</h1>
    <p>Choose a theme for this page.</p>
    <button type="button" data-theme-choice="light">Light</button>
    <button type="button" data-theme-choice="dark">Dark</button>
    <button type="button" data-theme-choice="blue">Blue</button>
  `;
  document.body.append(host);

  const themeClasses = ["theme-light", "theme-dark", "theme-blue"];
  const themeStyles = document.createElement("style");
  themeStyles.textContent = `
    body.theme-light { background: #fff; color: #222; }
    body.theme-dark { background: #222; color: #fff; }
    body.theme-blue { background: #e8f3ff; color: #123b68; }
    body > main { padding: 1rem; }
  `;
  document.head.append(themeStyles);

  host.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-theme-choice]");
    if (!button) return;

    const theme = button.dataset.themeChoice;
    document.body.classList.remove(...themeClasses);
    document.body.setAttribute("class", `theme-${theme}`);
    document.body.setAttribute("data-theme", theme);
  });

  const savedTheme = document.body.getAttribute("data-theme");
  if (["light", "dark", "blue"].includes(savedTheme)) {
    document.body.setAttribute("class", `theme-${savedTheme}`);
  } else {
    document.body.setAttribute("class", "theme-light");
    document.body.setAttribute("data-theme", "light");
  }
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the theme switcher.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeThemeSwitcher, { once: true });
} else {
  initializeThemeSwitcher();
}
