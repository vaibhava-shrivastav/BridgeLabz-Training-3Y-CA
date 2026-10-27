"use strict";

const user = { name: "John", email: "john@mail.com", age: 21 };

function initializeUserEditor() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Edit User</h1>
    <form id="user-form">
      <label>Name <input name="name" required></label>
      <label>Email <input name="email" type="email" required></label>
      <label>Age <input name="age" type="number" min="0" step="1" required></label>
      <button type="submit">Save changes</button>
    </form>
    <h2>Updated user</h2>
    <pre id="user-details" aria-live="polite"></pre>
  `;
  document.body.append(host);

  const form = host.querySelector("#user-form");
  for (const fieldName of Object.keys(user)) {
    form.elements.namedItem(fieldName).value = user[fieldName];
  }
  form.elements.namedItem("age").addEventListener("input", (event) => {
    event.currentTarget.setCustomValidity("");
  });

  const renderUser = () => {
    host.querySelector("#user-details").textContent = JSON.stringify(user, null, 2);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formValues = new FormData(form);
    const age = Number(formValues.get("age"));
    if (!Number.isInteger(age) || age < 0) {
      form.elements.namedItem("age").setCustomValidity("Enter a non-negative whole-number age.");
      form.elements.namedItem("age").reportValidity();
      return;
    }

    form.elements.namedItem("age").setCustomValidity("");
    user.name = formValues.get("name").trim();
    user.email = formValues.get("email").trim();
    user.age = age;
    renderUser();
    console.log("Updated user:", user);
  });

  renderUser();
}

if (typeof document === "undefined") {
  console.log("Initial user object:", user);
  console.log("Open this file in a browser to edit the user through the form.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeUserEditor, { once: true });
} else {
  initializeUserEditor();
}
