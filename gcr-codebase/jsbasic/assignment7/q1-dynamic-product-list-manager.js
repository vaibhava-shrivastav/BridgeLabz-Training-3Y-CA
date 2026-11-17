"use strict";

function initializeProductListManager() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Product List Manager</h1>
    <form id="product-form">
      <label for="product-name">Product name</label>
      <input id="product-name" required>
      <button type="submit">Add product</button>
    </form>
    <ul id="product-list" aria-label="Products"></ul>
  `;
  document.body.append(host);

  const form = host.querySelector("#product-form");
  const nameInput = host.querySelector("#product-name");
  const productList = host.querySelector("#product-list");
  let editingItem = null;

  function saveEdit(item) {
    const editInput = item.querySelector(".edit-input");
    if (!editInput) return;

    const productName = editInput.value.trim();
    if (productName) {
      item.querySelector(".product-name").textContent = productName;
    }
    editInput.remove();
    item.querySelector(".product-name").hidden = false;
    item.querySelector('[data-action="edit"]').textContent = "Edit";
    if (editingItem === item) editingItem = null;
  }

  function addProduct(productName) {
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.className = "product-name";
    name.textContent = productName;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.dataset.action = "edit";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";

    item.append(name, " ", editButton, " ", deleteButton);
    productList.append(item);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const productName = nameInput.value.trim();
    if (!productName) return;
    addProduct(productName);
    form.reset();
    nameInput.focus();
  });

  // One delegated handler manages buttons for every current and future product.
  productList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !productList.contains(button)) return;

    const item = button.closest("li");
    if (button.dataset.action === "delete") {
      if (editingItem === item) editingItem = null;
      item.remove();
    } else {
      if (editingItem && editingItem !== item) saveEdit(editingItem);
      if (item.querySelector(".edit-input")) {
        saveEdit(item);
        return;
      }

      const name = item.querySelector(".product-name");
      const editInput = document.createElement("input");
      editInput.className = "edit-input";
      editInput.value = name.textContent;
      name.hidden = true;
      name.after(editInput);
      button.textContent = "Save";
      editingItem = item;
      editInput.focus();
      editInput.select();
    }
  });

  document.addEventListener("click", (event) => {
    if (editingItem && !editingItem.contains(event.target)) {
      saveEdit(editingItem);
    }
  });

  productList.addEventListener("keydown", (event) => {
    if (!event.target.matches(".edit-input")) return;
    if (event.key === "Enter") {
      event.preventDefault();
      saveEdit(event.target.closest("li"));
    } else if (event.key === "Escape") {
      const item = event.target.closest("li");
      const originalName = item.querySelector(".product-name");
      event.target.value = originalName.textContent;
      saveEdit(item);
    }
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the product list manager.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeProductListManager, { once: true });
} else {
  initializeProductListManager();
}
