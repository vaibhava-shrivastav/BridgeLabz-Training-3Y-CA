const inventory = [
    { id: 1, name: "Notebook", category: "Stationery", price: 3, stock: 3 },
    { id: 2, name: "Pen Set", category: "Stationery", price: 8, stock: 12 },
    { id: 3, name: "Mug", category: "Kitchen", price: 10, stock: 4 },
    { id: 4, name: "Blender", category: "Kitchen", price: 45, stock: 6 },
    { id: 5, name: "Backpack", category: "Accessories", price: 30, stock: 2 }
];

function getLowStockProducts(products) {
    return products.filter((product) => product.stock < 5);
}

function sortProductsByPrice(products) {
    return [...products].sort((first, second) => first.price - second.price);
}

function calculateTotalInventoryValue(products) {
    return products.reduce((total, product) => total + product.price * product.stock, 0);
}

function groupByCategory(products) {
    return products.reduce((groups, product) => {
        if (!groups[product.category]) {
            groups[product.category] = [];
        }
        groups[product.category].push(product);
        return groups;
    }, {});
}

console.log("Low-stock products:", getLowStockProducts(inventory));
console.log("Products sorted by price:", sortProductsByPrice(inventory));
console.log(`Total inventory value: $${calculateTotalInventoryValue(inventory).toFixed(2)}`);
console.log("Products grouped by category:", groupByCategory(inventory));
