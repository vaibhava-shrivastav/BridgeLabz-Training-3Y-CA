"use strict";

class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  applyDiscount(percent) {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw new RangeError("Discount must be a percentage from 0 to 100.");
    }
    this.price *= 1 - percent / 100;
    return this.price;
  }

  getDetails() {
    return `#${this.id} ${this.name} | ${this.category} | $${this.price.toFixed(2)}`;
  }
}

const products = [
  new Product(101, "Wireless Headphones", 2499, "Electronics"),
  new Product(102, "Notebook", 150, "Stationery"),
  new Product(103, "Desk Lamp", 1250, "Home"),
  new Product(104, "Water Bottle", 799, "Lifestyle")
];

products[0].applyDiscount(10);

console.log("=== E-commerce products ===");
for (const product of products) {
  console.log(product.getDetails());
}

console.log("\nProducts priced above $1,000:");
products
  .filter((product) => product.price > 1000)
  .forEach((product) => console.log(product.getDetails()));
