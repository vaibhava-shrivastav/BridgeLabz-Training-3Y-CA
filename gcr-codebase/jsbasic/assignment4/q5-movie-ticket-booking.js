"use strict";

function initializeBookingForm() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Movie Ticket Booking</h1>
    <form id="booking-form" novalidate>
      <label>Name <input name="name" required></label>
      <small data-error-for="name"></small>
      <label>Email <input name="email" type="email" required></label>
      <small data-error-for="email"></small>
      <label>Seats (1-10) <input name="seats" type="number" min="1" max="10" required></label>
      <small data-error-for="seats"></small>
      <button type="submit">Book tickets</button>
    </form>
    <section id="ticket-details" aria-live="polite"></section>
  `;
  document.body.append(host);

  const form = host.querySelector("#booking-form");
  const namePattern = /^[A-Za-z]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {
    name: "Use alphabets only.",
    email: "Enter a valid email address.",
    seats: "Choose a whole number from 1 to 10."
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const booking = Object.fromEntries(new FormData(form).entries());
    const seats = Number(booking.seats);
    const validity = {
      name: namePattern.test(booking.name),
      email: emailPattern.test(booking.email),
      seats: Number.isInteger(seats) && seats >= 1 && seats <= 10
    };

    for (const [fieldName, isValid] of Object.entries(validity)) {
      const field = form.elements.namedItem(fieldName);
      const error = host.querySelector(`[data-error-for="${fieldName}"]`);
      field.style.border = `2px solid ${isValid ? "green" : "red"}`;
      error.textContent = isValid ? "" : errors[fieldName];
      error.style.color = "red";
    }

    const ticketDetails = host.querySelector("#ticket-details");
    if (Object.values(validity).every(Boolean)) {
      const confirmedBooking = { name: booking.name, email: booking.email, seats };
      ticketDetails.textContent =
        `Booking confirmed for ${confirmedBooking.name} — ${confirmedBooking.seats} seat(s), ` +
        `${confirmedBooking.email}.`;
      console.log("Booking confirmed:", confirmedBooking);
    } else {
      ticketDetails.textContent = "Please correct the highlighted fields.";
    }
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the movie booking form.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeBookingForm, { once: true });
} else {
  initializeBookingForm();
}
