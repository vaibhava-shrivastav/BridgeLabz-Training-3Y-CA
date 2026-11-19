class Employee {
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }

    work() {
        return `${this.name} is working in ${this.department}.`;
    }
}

class Manager extends Employee {
    work() {
        return `${this.name} is managing the ${this.department} team.`;
    }
}

const team = [
    new Employee("Maya", "Engineering"),
    new Manager("Rohan", "Sales")
];

team.forEach((employee) => console.log(employee.work()));
