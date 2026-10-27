"use strict";

class FormBuilder {
  constructor(fields, mountElement) {
    this.fields = fields;
    this.mountElement = mountElement;
  }

  build() {
    const fieldsMarkup = this.fields
      .map(
        (field) => `
          <label>
            ${field.label}
            <input type="${field.type}" name="${field.name}" ${field.required ? "required" : ""}>
          </label>`
      )
      .join("");

    this.mountElement.innerHTML = `
      <h1>Custom Form Builder</h1>
      <form id="generated-form">${fieldsMarkup}<button type="submit">Submit</button></form>
      <pre id="form-data" aria-live="polite"></pre>
    `;

    this.mountElement.querySelector("#generated-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this.getFormData();
      this.mountElement.querySelector("#form-data").textContent = JSON.stringify(formData, null, 2);
      console.log("Submitted form data:", formData);
    });
  }

  getFormData() {
    const form = this.mountElement.querySelector("#generated-form");
    return Object.fromEntries(new FormData(form).entries());
  }
}

function initializeCustomForm() {
  const mountElement = document.createElement("main");
  document.body.append(mountElement);

  const formBuilder = new FormBuilder(
    [
      { type: "text", name: "username", label: "Username", required: true },
      { type: "email", name: "email", label: "Email", required: true },
      { type: "password", name: "password", label: "Password", required: true }
    ],
    mountElement
  );
  formBuilder.build();
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to build and submit the dynamic form.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCustomForm, { once: true });
} else {
  initializeCustomForm();
}
