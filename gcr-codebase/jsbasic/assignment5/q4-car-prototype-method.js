"use strict";

function Car(brand, model) {
  this.brand = brand;
  this.model = model;
}

Car.prototype.getDetails = function getDetails() {
  console.log(`${this.brand} ${this.model}`);
};

const firstCar = new Car("Toyota", "Corolla");
const secondCar = new Car("Honda", "Civic");

firstCar.getDetails();
secondCar.getDetails();
console.log(
  "Both cars share getDetails:",
  firstCar.getDetails === secondCar.getDetails
);
