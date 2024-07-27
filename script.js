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
    };
    this.changeReadStatus = function() {
        if (this.read) {
            this.read = false;
        } else {
            this.read = true;
        }
    };
}

function addBookToLibrary(book) {
  if (book instanceof Book) {
    myLibrary.push(book);
  }
}

function loadBooks() {
    let books = document.querySelector(".books");
    books.textContent = "";
    myLibrary.forEach((element, index) => {
        let book = document.createElement("div");
        let buttons = document.createElement("div");
        let content = document.createElement("div");
        content.classList.add("content");
        buttons.classList.add("buttons");
        book.classList.add("book");
        let title = document.createElement("p");
        title.innerHTML = `<strong>Title:</strong> ${element.title}`;
        let author = document.createElement("p");
        author.innerHTML = `<strong>Author:</strong> ${element.author}`;
        let pages = document.createElement("p");
        pages.innerHTML = `<strong>Pages:</strong> ${element.pages}`;
        let readStatus = document.createElement("p");
        readStatus.innerHTML = `<strong>Read:</strong> ${element.read ? "Yes" : "No"}`;
        let remove= document.createElement("button");
        remove.setAttribute('data-id', index);
        remove.classList.add("remove");
        remove.textContent = "Remove"
        let changeRead= document.createElement("button");
        changeRead.setAttribute('data-id', index);
        changeRead.classList.add("changeRead");
        changeRead.textContent=`${element.read ? "Not read" : "Read"}`;
        buttons.appendChild(changeRead);
        buttons.appendChild(remove);
        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(pages);
        content.appendChild(readStatus);
        book.appendChild(content);
        book.appendChild(buttons);
        books.appendChild(book);
    });
    addListenerRemove();
    addListenerChange();
}

function addListenerRemove() {
    const removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            let index = button.dataset.id;
            myLibrary.splice(index,1);
            loadBooks();
        })
    })
}

function addListenerChange() {
    const changeButtons = document.querySelectorAll(".changeRead");
    changeButtons.forEach(button => {
        button.addEventListener("click", () => {
            let index = button.dataset.id;
            object = myLibrary[index];
            object.changeReadStatus();
            loadBooks();
        })
    })
}

let bible = new Book("The Bible", "God", 687, false);
let harry = new Book("Harry Potter", "J.K. Rowling", 598, true);

addBookToLibrary(bible);
addBookToLibrary(harry);

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector(".dialog-button");
    const closeButton = document.querySelector(".close");
    const submitButton = document.querySelector(".submit");

    // "Show the dialog" button opens the dialog modally
    showButton.addEventListener("click", () => {
    dialog.showModal();
    });

    // "Close" button closes the dialog
    closeButton.addEventListener("click", () => {
    dialog.close();
    });

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        let title = document.querySelector('input[name="title"]').value;
        let author = document.querySelector('input[name="author"]').value;
        let pages = document.querySelector('input[name="pages"]').value;
        let read = document.querySelector('input[name="read"]:checked').value;
        // Convert the read value to boolean
        read = (read === "true");
        let newBook = new Book(title, author, pages, read);
        addBookToLibrary(newBook);
        dialog.close();
        loadBooks();
        addListenerRemove();
        addListenerChange();
    })
})