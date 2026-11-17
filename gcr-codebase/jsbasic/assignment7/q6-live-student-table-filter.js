"use strict";

function initializeStudentTableFilter() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Student Directory</h1>
    <label for="student-search">Search students</label>
    <input id="student-search" type="search">
    <p id="filter-status" aria-live="polite"></p>
    <table>
      <thead><tr><th>Name</th><th>Branch</th><th>CGPA</th></tr></thead>
      <tbody id="student-rows"></tbody>
    </table>
  `;
  document.body.append(host);

  const students = [
    { name: "Aarav Sharma", branch: "Computer Science", cgpa: "8.7" },
    { name: "Diya Patel", branch: "Information Technology", cgpa: "9.1" },
    { name: "Kabir Singh", branch: "Electronics", cgpa: "8.2" },
    { name: "Meera Iyer", branch: "Computer Science", cgpa: "9.4" },
    { name: "Rohan Gupta", branch: "Mechanical", cgpa: "7.9" },
    { name: "Sara Khan", branch: "Information Technology", cgpa: "8.8" }
  ];
  const tableBody = host.querySelector("#student-rows");
  const searchInput = host.querySelector("#student-search");
  const status = host.querySelector("#filter-status");

  for (const student of students) {
    const row = document.createElement("tr");
    for (const value of Object.values(student)) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    tableBody.append(row);
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleRows = 0;
    for (const row of tableBody.rows) {
      const matches = row.textContent.toLocaleLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) visibleRows += 1;
    }
    status.textContent = visibleRows === 0 ? "No results found" : "";
  });
}

if (typeof document === "undefined") {
  console.log("Open this file in a browser to try the student table filter.");
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeStudentTableFilter, { once: true });
} else {
  initializeStudentTableFilter();
}
