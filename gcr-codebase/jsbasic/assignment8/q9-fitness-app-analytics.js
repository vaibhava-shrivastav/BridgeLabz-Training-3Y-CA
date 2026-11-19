class FitnessAnalytics {
    constructor(workouts) {
        if (!Array.isArray(workouts) || workouts.length === 0) {
            throw new Error("Workout data must be a non-empty array.");
        }
        this.workouts = workouts;
    }

    getActiveUsers() {
        return this.workouts.filter((workout) => workout.steps > 7000);
    }

    getAverageCalories() {
        const totalCalories = this.workouts.reduce(
            (total, workout) => total + workout.calories,
            0
        );
        return totalCalories / this.workouts.length;
    }

    getUserSummary() {
        return this.workouts.map(
            (workout) => `${workout.user} walked ${workout.steps} steps and burned ${workout.calories} calories.`
        );
    }
}

const workoutData = [
    { user: "A", steps: 8000, calories: 300 },
    { user: "B", steps: 12000, calories: 500 },
    { user: "C", steps: 4000, calories: 200 }
];
const fitnessAnalytics = new FitnessAnalytics(workoutData);

console.log("Active users:", fitnessAnalytics.getActiveUsers());
console.log(`Average calories: ${fitnessAnalytics.getAverageCalories().toFixed(2)}`);
console.log("User summaries:", fitnessAnalytics.getUserSummary());

try {
    new FitnessAnalytics([]).getAverageCalories();
} catch (error) {
    console.error(`Unable to analyze workouts: ${error.message}`);
}
