class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    calculateAverage() {
        if (this.marks.length === 0) {
            throw new Error("Cannot calculate an average without marks.");
        }
        return this.marks.reduce((total, mark) => total + mark, 0) / this.marks.length;
    }

    getGrade() {
        const average = this.calculateAverage();
        if (average >= 80) return "A";
        if (average >= 60) return "B";
        if (average >= 40) return "C";
        return "F";
    }
}

const students = [
    new Student("Aarav", [85, 90, 78]),
    new Student("Diya", [72, 65, 80]),
    new Student("Kabir", [35, 45, 30])
];

students.forEach((student) => {
    console.log(
        `${student.name}: average ${student.calculateAverage().toFixed(2)}, grade ${student.getGrade()}`
    );
});
