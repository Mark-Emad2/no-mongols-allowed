document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    let data = localStorage.getItem('books');
    let shelf = data ? JSON.parse(data) : [];

    const kitab = shelf.find(b => b.id == bookId);

    if (kitab) {
        document.getElementById('bookTitle').innerText = kitab.name;
        document.getElementById('authorName').innerText = kitab.author;
        document.getElementById('authorName').href = kitab.aboutAuthor;
        document.getElementById('bookCover').src = kitab.cover;
        document.getElementById('bookDesc').innerText = kitab.desc;
        document.getElementById('amazonLink').href = kitab.amazonLink;
        document.getElementById('releaseDate').innerText = kitab.date;
        document.getElementById('bookLang').innerText = kitab.language;

        const borrowBtn = document.querySelector('.btn-borrow');
        if (!kitab.available) {
            borrowBtn.textContent = 'Not Available';
            borrowBtn.style.backgroundColor = '#888';
            borrowBtn.style.cursor = 'not-allowed';
            borrowBtn.onclick = function(e) {
                e.preventDefault();
                alert('This book is currently borrowed by someone else.');
            };
        } else {
            borrowBtn.textContent = 'Borrow the book';
            borrowBtn.style.backgroundColor = '#B85C38';
            borrowBtn.style.cursor = 'pointer';
            borrowBtn.onclick = function(e) {
                e.preventDefault();
                borrowBook(kitab);
            };
        }

        const catContainer = document.getElementById('categoryList');
        if (kitab.category) {
            catContainer.innerHTML = kitab.category.split(', ')
                .map(cat => `<span>${cat}</span>`).join('');
        }
    } else {
        document.getElementById('bookTitle').innerText = "Book Not Found";
    }
});

function borrowBook(book) {
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

    const alreadyBorrowed = borrowed_books.some(b => b.title === book.name);
    if (alreadyBorrowed) {
        alert('You have already borrowed this book!');
        return;
    }

    let books = JSON.parse(localStorage.getItem('books')) || [];
    const currentBook = books.find(b => b.id == book.id);
    if (!currentBook.available) {
        alert('This book is not available for borrowing right now.');
        return;
    }

    const today = new Date();
    const newBook = {
        id: Date.now(),
        title: book.name,
        author: book.author,
        cover: book.cover,
        borrowedDate: today.toISOString().split('T')[0],
        originalBookId: book.id
    };

    borrowed_books.push(newBook);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed_books));

    books = books.map(b => {
        if (b.id == book.id) {
            return { ...b, available: false };
        }
        return b;
    });
    localStorage.setItem('books', JSON.stringify(books));

    alert(`"${book.name}" has been borrowed successfully!`);
    window.location.href = '/borrowed_books/';
}