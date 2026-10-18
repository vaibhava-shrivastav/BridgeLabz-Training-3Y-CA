const secretNumber = Math.floor(Math.random() * 50) + 1;
// Change this test value to try another guess.
const userGuess = 25;

if (userGuess === secretNumber) {
  console.log("Correct guess!");
} else {
  const isVeryClose = Math.abs(userGuess - secretNumber) <= 3;

  if (isVeryClose && userGuess >= 1 && userGuess <= 50) {
    console.log("Very close!");
  } else if (userGuess > secretNumber) {
    console.log("Too high");
  } else {
    console.log("Too low");
  }
}
