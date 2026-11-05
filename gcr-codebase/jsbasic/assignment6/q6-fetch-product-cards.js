"use strict";

async function displayProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`Product API returned HTTP ${response.status}.`);
    }

    const products = await response.json();
    for (const product of products) {
      console.log(`Product: ${product.title}`);
      console.log(`Price: $${product.price}`);
      console.log(`Image: ${product.image}\n`);
    }
  } catch (error) {
    console.error("Failed to load products. Please try again.", error.message);
  }
}

displayProducts();
