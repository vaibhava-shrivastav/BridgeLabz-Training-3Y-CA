"use strict";

class Book {
  constructor(title, author, isbn, isIssued = false) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = isIssued;
  }

  issueBook() {
    if (this.isIssued) {
      return false;
    }
    this.isIssued = true;
    return true;
  }

  returnBook() {
    if (!this.isIssued) {
      return false;
    }
    this.isIssued = false;
    return true;
  }
}

const books = [
  new Book("The Hobbit", "J. R. R. Tolkien", "978-0547928227"),
  new Book("Pride and Prejudice", "Jane Austen", "978-0141439518"),
  new Book("Dune", "Frank Herbert", "978-0441172719", true)
];

function displayAvailableBooks() {
  const availableBooks = books.filter((book) => !book.isIssued);
  console.log("\nAvailable books:");
  if (availableBooks.length === 0) {
    console.log("No books are currently available.");
    return;
  }

  for (const book of availableBooks) {
    console.log(`${book.title} by ${book.author} (ISBN: ${book.isbn})`);
  }
}

function issueBookByIsbn(isbn) {
  const book = books.find((candidate) => candidate.isbn === isbn);
  if (!book) {
    console.log(`No book found for ISBN ${isbn}.`);
    return false;
  }
  if (!book.issueBook()) {
    console.log(`"${book.title}" is already issued.`);
    return false;
  }
  console.log(`Issued "${book.title}".`);
  return true;
}

displayAvailableBooks();
issueBookByIsbn("978-0547928227");
displayAvailableBooks();

function initializeLibraryInterface() {
  const host = document.createElement("main");
  host.innerHTML = `
    <h1>Library Management</h1>
    <form id="issue-book-form">
      <label>Issue by ISBN <input name="isbn" required></label>
      <button type="submit">Issue book</button>
    </form>
    <p id="library-status" role="status" aria-live="polite"></p>
    <h2>Available books</h2>
    <ul id="available-books"></ul>
  `;
  document.body.append(host);

  const list = host.querySelector("#available-books");
  const status = host.querySelector("#library-status");
  const renderAvailableBooks = () => {
    list.replaceChildren();
    for (const book of books.filter((candidate) => !candidate.isIssued)) {
      const item = document.createElement("li");
      item.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn})`;
      list.append(item);
    }
  };

  host.querySelector("#issue-book-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const isbn = new FormData(event.currentTarget).get("isbn").trim();
    const book = books.find((candidate) => candidate.isbn === isbn);
    if (!book) {
      status.textContent = "No book found with that ISBN.";
    } else if (!book.issueBook()) {
      status.textContent = `"${book.title}" is already issued.`;
    } else {
      status.textContent = `"${book.title}" was issued successfully.`;
    }
    renderAvailableBooks();
  });

  renderAvailableBooks();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLibraryInterface, { once: true });
  } else {
    initializeLibraryInterface();
  }
}
