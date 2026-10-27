"use strict";

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(name, price, quantity = 1) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new TypeError("Item name is required.");
    }
    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(quantity) || quantity < 1) {
      throw new RangeError("Price must be non-negative and quantity must be a positive whole number.");
    }
    this.items.push({ name: name.trim(), price, quantity });
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  applyCoupon(couponCode) {
    const match = /^(?:SAVE|DISC)(\d{1,2})$/.exec(couponCode);
    if (!match) {
      throw new TypeError("Coupon must match SAVE20 or DISC10 format.");
    }

    const discountPercent = Number(match[1]);
    if (discountPercent < 1 || discountPercent > 99) {
      throw new RangeError("Coupon discount must be between 1% and 99%.");
    }

    const subtotal = this.getTotal();
    const discount = subtotal * (discountPercent / 100);
    return {
      code: couponCode,
      discountPercent,
      subtotal,
      discount,
      finalTotal: subtotal - discount
    };
  }
}

const cart = new Cart();
cart.addItem("Keyboard", 2500, 1);
cart.addItem("USB cable", 300, 2);

const subtotal = cart.getTotal();
console.log("=== Shopping cart ===");
for (const item of cart.items) {
  console.log(`${item.name}: $${item.price.toFixed(2)} x ${item.quantity}`);
}
console.log(`Subtotal: $${subtotal.toFixed(2)}`);

const couponInput = typeof process !== "undefined" ? process.argv[2] || "SAVE20" : "SAVE20";
try {
  const summary = cart.applyCoupon(couponInput);
  console.log(
    `Coupon ${summary.code} (${summary.discountPercent}%): ` +
      `discount=$${summary.discount.toFixed(2)}, final total=$${summary.finalTotal.toFixed(2)}`
  );
} catch (error) {
  console.log(`Coupon error: ${error.message}`);
}
