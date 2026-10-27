"use strict";

function outer() {
  console.log("Outer count before initialization:", count);
  var count = 5;

  function inner() {
    console.log("Inner count before initialization:", count);
    var count = 10;
    console.log("Inner count after initialization:", count);
  }

  inner();
  console.log("Outer count after inner returns:", count);
}

outer();

// `outer` and `inner` have separate function execution contexts. Each `var
// count` is hoisted and initialized to undefined in its own function, so the
// inner declaration shadows rather than reads the outer count.
function outerWithArrow() {
  console.log("\nArrow example, outer count before initialization:", count);
  var count = 5;

  const inner = () => {
    console.log("Arrow-local count before initialization:", count);
    var count = 10;
    console.log("Arrow-local count after initialization:", count);
  };

  inner();
  console.log("Arrow example, outer count after inner returns:", count);
}

outerWithArrow();

// Converting the nested function to an arrow does not change this local var
// hoisting or shadowing. The arrow instead differs in how it inherits `this`
// and `arguments` from its surrounding scope.
// Debugger exercise: pause at the first log in outer and inner. The call stack
// is outer -> inner; inspect each frame's separate `count` binding. The arrow
// frame similarly has its own local count binding.
