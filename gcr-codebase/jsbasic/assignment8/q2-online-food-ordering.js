const menuItems = [
    { name: "Burger", price: 8.5 },
    { name: "Pizza", price: 12 },
    { name: "Salad", price: 6.25 }
];

function calculateBill(orderItems) {
    const prices = orderItems.map((itemName) => {
        const menuItem = menuItems.find((item) => item.name === itemName);
        if (!menuItem) {
            throw new Error(`"${itemName}" is not available on the menu.`);
        }
        return menuItem.price;
    });

    return prices.reduce((total, price) => total + price, 0);
}

try {
    console.log(`Food order total: $${calculateBill(["Burger", "Salad"]).toFixed(2)}`);
} catch (error) {
    console.error(`Unable to calculate order: ${error.message}`);
}

try {
    calculateBill(["Pizza", "Sushi"]);
} catch (error) {
    console.error(`Unable to calculate order: ${error.message}`);
}
