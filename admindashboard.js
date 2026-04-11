document.addEventListener("DOMContentLoaded", function () {


// =========================
// 📦 DATA
// =========================
let storedBooks = localStorage.getItem("books");

let books;

if (storedBooks) {
    books = JSON.parse(storedBooks);
} else {
    books = [
        {
            id: 1,
            name: "The Beginning after the End",
            author: "TurtleMe",
            category: "Fantasy",
            date: "2020",
            language: "English"
        },
        {
            id: 2,
            name: "في ممر الفئران",
            author: "Ahmed Khaled Tawfik",
            category: "Dystopia",
            date: "2016",
            language: "Arabic"
        },
        {
            id: 3,
            name: "Before the Coffee Gets Cold",
            author: "Toshikazu Kawaguchi",
            category: "Fiction",
            date: "2015",
            language: "English"
        },
        {
            id: 4,
            name: "The Midnight Library",
            author: "Matt Haig",
            category: "Fantasy",
            date: "2020",
            language: "English"
        },
        {
            id: 5,
            name: "Clean Code",
            author: "Robert C. Martin",
            category: "Programming",
            date: "2008",
            language: "English"
        }
    ];

 
    localStorage.setItem("books", JSON.stringify(books));
}


// =========================
// 🎯 DISPLAY FUNCTION
// =========================
function displayBooks(list = books) {

    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    list.forEach(book => {
        tableBody.innerHTML += `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.date}</td>
            <td>${book.language}</td>
            <td>
                <button class="edit" data-id="${book.id}">Edit</button>
                <button class="delete" data-id="${book.id}">Delete</button>
            </td>
        </tr>
        `;
    });

    localStorage.setItem("books", JSON.stringify(books));
}


// =========================
// ➕ ADD BOOK
// =========================
document.getElementById("addBook").addEventListener("click", function () {

    let name = prompt("Book name:");
    let author = prompt("Author:");
    let category = prompt("Category:");
    let date = prompt("Date:");
    let language = prompt("Language:");

    if (!name || !author) return;

    let newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        name,
        author,
        category,
        date,
        language
    };

    books.push(newBook);
    displayBooks();
});


// =========================
// 🗑️ + ✏️ EVENT DELEGATION
// =========================
document.addEventListener("click", function (e) {

    let id = Number(e.target.dataset.id);
    let index = books.findIndex(b => b.id === id);

    if (index === -1) return;

    // DELETE
    if (e.target.classList.contains("delete")) {

        if (confirm("Delete this book?")) {
            books.splice(index, 1);
            displayBooks();
        }
    }

    // EDIT
    if (e.target.classList.contains("edit")) {

        let book = books[index];

        let choice = prompt(`
1- Name
2- Author
3- Category
4- Date
5- Language
        `);

        if (choice == "1") {
            let val = prompt("New Name:", book.name);
            if (val) book.name = val;
        }

        else if (choice == "2") {
            let val = prompt("New Author:", book.author);
            if (val) book.author = val;
        }

        else if (choice == "3") {
            let val = prompt("New Category:", book.category);
            if (val) book.category = val;
        }

        else if (choice == "4") {
            let val = prompt("New Date:", book.date);
            if (val) book.date = val;
        }

        else if (choice == "5") {
            let val = prompt("New Language:", book.language);
            if (val) book.language = val;
        }

        displayBooks();
    }
});


// =========================
// 🔍 SEARCH
// =========================
document.getElementById("search_box").addEventListener("input", function () {

    let value = this.value.toLowerCase();

    if (value === "") {
        displayBooks();
        return;
    }

    let filtered = books.filter(book =>
        book.name.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value) ||
        book.category.toLowerCase().includes(value)
    );

    displayBooks(filtered);
});


// =========================
// 🚀 INIT
// =========================

    
displayBooks();

});