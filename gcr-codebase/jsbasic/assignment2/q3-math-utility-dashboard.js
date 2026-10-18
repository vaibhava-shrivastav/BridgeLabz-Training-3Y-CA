const x = 16.75;
const roundedValue = Math.round(x);
const squareRoot = Math.sqrt(x);
const cubedValue = Math.pow(x, 3);
const randomNumber = Math.floor(Math.random() * 41) + 10;

// Display the calculated values together in a readable summary.
console.log(`Math Utility Dashboard
Input: ${x}
Rounded value: ${roundedValue}
Square root: ${squareRoot}
${x} cubed: ${cubedValue}
Random number (10-50): ${randomNumber}`);
