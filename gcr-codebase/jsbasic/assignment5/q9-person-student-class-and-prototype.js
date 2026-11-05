"use strict";

// Prototype/constructor-function version.
function PrototypePerson(name) {
  this.name = name;
}

PrototypePerson.prototype.printName = function printName() {
  console.log(`Name: ${this.name}`);
};

function PrototypeStudent(name, branch) {
  PrototypePerson.call(this, name);
  this.branch = branch;
}

PrototypeStudent.prototype = Object.create(PrototypePerson.prototype);
PrototypeStudent.prototype.constructor = PrototypeStudent;

PrototypeStudent.prototype.printBranch = function printBranch() {
  console.log(`Branch: ${this.branch}`);
};

// ES6 class version. `extends` links the prototypes, and `super` initializes
// the inherited name property.
class Person {
  constructor(name) {
    this.name = name;
  }

  printName() {
    console.log(`Name: ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, branch) {
    super(name);
    this.branch = branch;
  }

  printBranch() {
    console.log(`Branch: ${this.branch}`);
  }
}

const prototypeStudent = new PrototypeStudent("Aarav", "Computer Science");
const classStudent = new Student("Aarav", "Computer Science");

console.log("Prototype version:");
prototypeStudent.printName();
prototypeStudent.printBranch();

console.log("Class version:");
classStudent.printName();
classStudent.printBranch();
console.log("Class student inherits from Person:", classStudent instanceof Person);
