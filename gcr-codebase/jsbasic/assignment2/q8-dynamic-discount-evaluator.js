const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 },
];

// Use the original cart total to determine eligibility for the extra discount.
const originalTotal = cart.reduce((total, product) => total + product.price, 0);
let discountedTotal = 0;

for (const product of cart) {
  let discountRate = 0;

  if (product.category === "electronics") {
    discountRate = 0.10;
  } else if (product.category === "fashion") {
    discountRate = 0.05;
  }

  discountedTotal += product.price * (1 - discountRate);
}

const extraDiscount = originalTotal > 50000 ? 0.05 : 0;
const finalTotal = discountedTotal * (1 - extraDiscount);

console.log(`Original cart total: ${originalTotal.toFixed(2)}`);
console.log(`Extra cart discount: ${extraDiscount * 100}%`);
console.log(`Final total: ${finalTotal.toFixed(2)}`);
