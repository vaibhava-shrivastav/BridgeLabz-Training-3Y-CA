// Generate eight whole-number scores in the inclusive range 30-100.
const scores = Array.from(
  { length: 8 },
  () => Math.floor(Math.random() * 71) + 30,
);

const highestScore = Math.max(...scores);
const lowestScore = Math.min(...scores);
const totalScore = scores.reduce((total, score) => total + score, 0);
const averageScore = totalScore / scores.length;
const passingScores = scores.filter((score) => score >= 50);
const scoreReport = scores.map((score, index) => ({
  Student: index + 1,
  Score: score,
}));

console.table(scoreReport);
console.log(`Scores: ${scores.join(", ")}`);
console.log(`Highest score: ${highestScore}`);
console.log(`Lowest score: ${lowestScore}`);
console.log(`Average score: ${averageScore.toFixed(2)}`);
console.log(`Students passed: ${passingScores.length}`);
