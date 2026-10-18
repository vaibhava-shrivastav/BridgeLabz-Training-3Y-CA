function createCounter() {
  let count = 0;

  // This nested function can read the count in its enclosing function scope.
  function logCount(action) {
    console.log(`${action}. Current count: ${count}`);
  }

  function increment() {
    count += 1;
    logCount("Incremented");
  }

  function decrement() {
    count -= 1;
    logCount("Decremented");
  }

  return { increment, decrement };
}

const counter = createCounter();

// Simulate clicks by calling the counter functions.
counter.increment();
counter.increment();
counter.decrement();
