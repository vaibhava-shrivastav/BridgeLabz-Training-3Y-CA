"use strict";

function initializeMultiStepForm() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Three-Step Registration</h1>
    <form id="steps-form" novalidate>
      <section data-step="0">
        <label>Name <input name="name" autocomplete="name" required></label>
      </section>
      <section data-step="1" hidden>
        <label>Email <input name="email" type="email" autocomplete="email" required></label>
      </section>
      <section data-step="2" hidden>
        <label>Password <input name="password" type="password" minlength="6" autocomplete="new-password" required></label>
      </section>
      <p id="step-error" role="alert"></p>
      <button id="back-step" type="button" hidden>Back</button>
      <button id="next-step" type="button">Next</button>
      <button id="finish-steps" type="submit" hidden>Finish</button>
    </form>
    <section id="step-summary" aria-live="polite"></section>
  `;
  document.body.append(host);

  const form = host.querySelector("#steps-form");
  const sections = Array.from(form.querySelectorAll("[data-step]"));
  const error = host.querySelector("#step-error");
  const backButton = host.querySelector("#back-step");
  const nextButton = host.querySelector("#next-step");
  const finishButton = host.querySelector("#finish-steps");
  const summary = host.querySelector("#step-summary");
  let currentStep = 0;

  function showStep(step) {
    currentStep = step;
    sections.forEach((section, index) => {
      section.hidden = index !== step;
    });
    backButton.hidden = step === 0;
    nextButton.hidden = step === sections.length - 1;
    finishButton.hidden = step !== sections.length - 1;
    error.textContent = "";
    sections[step].querySelector("input").focus();
  }

  function validateCurrentStep() {
    const input = sections[currentStep].querySelector("input");
    input.setCustomValidity("");
    if (input.name === "password" && input.value.length < 6) {
      input.setCustomValidity("Password must contain at least 6 characters.");
    }
    if (!input.checkValidity()) {
      error.textContent = input.validationMessage;
      input.focus();
      return false;
    }
    error.textContent = "";
    return true;
  }

  nextButton.addEventListener("click", () => {
    if (validateCurrentStep()) showStep(currentStep + 1);
  });
  backButton.addEventListener("click", () => showStep(currentStep - 1));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateCurrentStep()) return;

    summary.replaceChildren();
    const heading = document.createElement("h2");
    heading.textContent = "Registration Summary";
    const details = document.createElement("p");
    details.textContent = `Name: ${form.elements.name.value} | Email: ${form.elements.email.value}`;
    summary.append(heading, details);
    form.hidden = true;
  });
  form.addEventListener("input", () => {
    if (error.textContent) validateCurrentStep();
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the multi-step form.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMultiStepForm, { once: true });
} else {
  initializeMultiStepForm();
}
