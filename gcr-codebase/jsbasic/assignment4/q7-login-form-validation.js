"use strict";

function initializeLoginForm() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Login</h1>
    <form id="login-form" novalidate>
      <label>Username <input name="username" autocomplete="username" required></label>
      <small data-error-for="username"></small>
      <label>Password <input name="password" type="password" autocomplete="current-password" required></label>
      <small data-error-for="password"></small>
      <button type="submit">Sign in</button>
    </form>
    <p id="login-status" role="status" aria-live="polite"></p>
  `;
  document.body.append(host);

  const form = host.querySelector("#login-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = form.elements.namedItem("username");
    const password = form.elements.namedItem("password");
    const errors = {
      username: username.value.length < 5 ? "Username must contain at least 5 characters." : "",
      password: ""
    };

    if (password.value.length < 8) {
      errors.password = "Password must contain at least 8 characters.";
    } else if (!/[0-9]/.test(password.value)) {
      errors.password = "Password must include a number.";
    } else if (!/[A-Z]/.test(password.value)) {
      errors.password = "Password must include an uppercase letter.";
    } else if (!/[a-z]/.test(password.value)) {
      errors.password = "Password must include a lowercase letter.";
    } else if (!/[^A-Za-z0-9]/.test(password.value)) {
      errors.password = "Password must include a special character.";
    }

    const fields = { username, password };
    for (const [fieldName, field] of Object.entries(fields)) {
      const errorElement = host.querySelector(`[data-error-for="${fieldName}"]`);
      const isValid = errors[fieldName] === "";
      field.style.border = `2px solid ${isValid ? "green" : "red"}`;
      errorElement.textContent = errors[fieldName];
      errorElement.style.color = "red";
    }

    const status = host.querySelector("#login-status");
    const isFormValid = Object.values(errors).every((message) => message === "");
    status.textContent = isFormValid ? "Login details are valid." : "Please fix the errors above.";
    status.style.color = isFormValid ? "green" : "red";
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the login form.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeLoginForm, { once: true });
} else {
  initializeLoginForm();
}
