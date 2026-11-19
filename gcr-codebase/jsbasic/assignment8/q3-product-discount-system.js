function Product(name, price) {
    this.name = name;
    this.price = price;
}

Product.prototype.applyDiscount = function (percent) {
    return this.price * (1 - percent / 100);
};

const products = [
    new Product("Headphones", 100),
    new Product("Keyboard", 80),
    new Product("Mouse", 40)
];
const discounts = [10, 15, 5];

products.forEach((product, index) => {
    console.log(
        `${product.name}: $${product.applyDiscount(discounts[index]).toFixed(2)} after ${discounts[index]}% off`
    );
});
console.log("Abstraction: applyDiscount() hides the discount calculation behind a simple method call.");
