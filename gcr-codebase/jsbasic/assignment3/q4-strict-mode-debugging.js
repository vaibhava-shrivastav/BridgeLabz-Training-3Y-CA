"use strict";

function showMessage() {
  // Declaring the variable locally avoids strict mode's ReferenceError for an
  // assignment to an undeclared identifier.
  const greeting = "Welcome";
  console.log(greeting);
}

showMessage();

// Debugger exercise: watch greeting at the console.log breakpoint. The call stack
// should show showMessage above the global/script context; greeting is local to it.
console.log("Strict mode requires greeting to be declared in an accessible scope.");
