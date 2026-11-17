"use strict";

function initializeSubmitBlocker() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Account Form</h1>
    <form id="account-form" novalidate>
      <label for="account-name">Name</label>
      <input id="account-name" name="name" required autocomplete="name">
      <small data-error-for="name" role="alert"></small>
      <label for="account-email">Email</label>
      <input id="account-email" name="email" type="email" required autocomplete="email">
      <small data-error-for="email" role="alert"></small>
      <label for="account-password">Password</label>
      <input id="account-password" name="password" type="password" required autocomplete="new-password">
      <small data-error-for="password" role="alert"></small>
      <button type="submit">Submit</button>
    </form>
    <p id="submission-status" aria-live="polite"></p>
  `;
  document.body.append(host);

  const form = host.querySelector("#account-form");
  const fields = {
    name: form.elements.namedItem("name"),
    email: form.elements.namedItem("email"),
    password: form.elements.namedItem("password")
  };
  const errors = {
    name: "Name is required.",
    email: "Enter an email address containing @.",
    password: "Password must contain at least 6 characters."
  };
  let submitted = false;

  function getError(fieldName) {
    const value = fields[fieldName].value.trim();
    if (fieldName === "name" && !value) return errors.name;
    if (fieldName === "email" && (!value || !value.includes("@"))) return errors.email;
    if (fieldName === "password" && fields.password.value.length < 6) return errors.password;
    return "";
  }

  function validateField(fieldName) {
    const errorElement = host.querySelector(`[data-error-for="${fieldName}"]`);
    const message = getError(fieldName);
    errorElement.textContent = message;
    fields[fieldName].setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitted = true;
    const isValid = Object.keys(fields).map(validateField).every(Boolean);
    host.querySelector("#submission-status").textContent = isValid
      ? "Form Submitted Successfully"
      : "";
  });

  form.addEventListener("input", (event) => {
    const fieldName = event.target.name;
    if (!Object.prototype.hasOwnProperty.call(fields, fieldName)) return;
    if (submitted) validateField(fieldName);
    host.querySelector("#submission-status").textContent = "";
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the form submit blocker.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSubmitBlocker, { once: true });
} else {
  initializeSubmitBlocker();
}
