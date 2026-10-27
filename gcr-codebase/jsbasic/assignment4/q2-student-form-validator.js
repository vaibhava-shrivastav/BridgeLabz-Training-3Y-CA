"use strict";

function initializeStudentForm() {
  const formHost = document.createElement("main");
  formHost.innerHTML = `
    <h1>Student Registration</h1>
    <form id="student-registration" novalidate>
      <label>Name <input name="name" autocomplete="name" required></label>
      <small data-error-for="name"></small>
      <label>Email <input name="email" type="email" autocomplete="email" required></label>
      <small data-error-for="email"></small>
      <label>Phone <input name="phone" inputmode="numeric" autocomplete="tel" required></label>
      <small data-error-for="phone"></small>
      <label>Password <input name="password" type="password" autocomplete="new-password" required></label>
      <small data-error-for="password"></small>
      <button type="submit">Register</button>
      <p id="registration-status" role="status" aria-live="polite"></p>
    </form>
  `;
  document.body.append(formHost);

  const form = formHost.querySelector("#student-registration");
  const rules = {
    name: { pattern: /^[A-Za-z]+$/, message: "Use alphabets only." },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address."
    },
    phone: { pattern: /^\d{10}$/, message: "Enter exactly 10 digits." },
    password: {
      pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
      message: "Include an uppercase letter, a number, and a special character."
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isFormValid = true;

    for (const [fieldName, rule] of Object.entries(rules)) {
      const field = form.elements.namedItem(fieldName);
      const errorElement = formHost.querySelector(`[data-error-for="${fieldName}"]`);
      const isFieldValid = rule.pattern.test(field.value);
      field.style.border = `2px solid ${isFieldValid ? "green" : "red"}`;
      errorElement.textContent = isFieldValid ? "" : rule.message;
      errorElement.style.color = "red";
      isFormValid = isFieldValid && isFormValid;
    }

    const status = formHost.querySelector("#registration-status");
    status.textContent = isFormValid ? "Registration details are valid." : "Please correct the highlighted fields.";
    status.style.color = isFormValid ? "green" : "red";
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the student registration form.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeStudentForm, { once: true });
} else {
  initializeStudentForm();
}
