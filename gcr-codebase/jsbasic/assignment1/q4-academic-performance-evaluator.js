// Enter marks out of 100 for the five subjects.
const subjectMarks = [88, 79, 91, 84, 86];
const passingMark = 35;

const totalMarks = subjectMarks.reduce((total, mark) => total + mark, 0);
const average = totalMarks / subjectMarks.length;
const percentage = (totalMarks / (subjectMarks.length * 100)) * 100;
const hasFailedSubject = subjectMarks.some((mark) => mark < passingMark);

let result;

if (hasFailedSubject) {
  result = "Detained";
} else if (percentage >= 85 && average >= 85) {
  result = "Promoted with Distinction";
} else if (percentage >= 50 && percentage < 85) {
  result = "Promoted";
} else {
  result = "Detained";
}

console.log(`Average marks: ${average.toFixed(2)}`);
console.log(`Overall percentage: ${percentage.toFixed(2)}%`);
console.log(result);
