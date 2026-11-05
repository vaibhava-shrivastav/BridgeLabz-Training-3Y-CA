"use strict";

const user = {
  name: "Aarav",
  showName: () => console.log("Arrow function this.name:", this.name)
};

// An arrow function captures `this` from its surrounding scope. In a Node.js
// CommonJS file that is the module scope, not the `user` object.
user.showName();

user.showName = function showName() {
  console.log("Normal function this.name:", this.name);
};

// A normal method call binds `this` to the object before the dot.
user.showName();
