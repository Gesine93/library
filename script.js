const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let status;
        if (this.read) {
            status = "read";
        } else {
            status = "not read";
        }
        return `${this.title} by ${this.author}, ${pages} pages, ${status}`;
    }
}

function addBookToLibrary(book) {
  if (book instanceof Book) {
    myLibrary.push(book);
  }
}

let bible = new Book("The Bible", "God", 687, false);
let harry = new Book("Harry Potter", "J.K. Rowling", 598, true);

addBookToLibrary(bible);
addBookToLibrary(harry);

document.addEventListener('DOMContentLoaded', () => {
    let books = document.querySelector(".books");
    myLibrary.forEach(element => {
        let book = document.createElement("div");
        book.classList.add("book");
        let title = document.createElement("p");
        title.innerHTML = `<strong>Title:</strong> ${element.title}`;
        let author = document.createElement("p");
        author.innerHTML = `<strong>Author:</strong> ${element.author}`;
        let pages = document.createElement("p");
        pages.innerHTML = `<strong>Pages:</strong> ${element.pages}`;
        let readStatus = document.createElement("p");
        readStatus.innerHTML = `<strong>Read:</strong> ${element.read ? "Yes" : "No"}`;
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.append(readStatus);
        books.appendChild(book);
    });
})