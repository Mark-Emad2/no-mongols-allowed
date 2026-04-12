document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    const data = localStorage.getItem('books');
    const shelf = data ? JSON.parse(data) : [];

    const kitab = shelf.find(b => b.id == bookId);

    if (kitab) {
        // Populate book details
        document.getElementById('bookTitle').innerText = kitab.name;
        document.getElementById('authorName').innerText = kitab.author;
        document.getElementById('authorName').href = kitab.aboutAuthor;
        document.getElementById('bookCover').src = kitab.cover;
        document.getElementById('bookDesc').innerText = kitab.desc;
        document.getElementById('amazonLink').href = kitab.amazonLink;
        document.getElementById('releaseDate').innerText = kitab.date;
        document.getElementById('bookLang').innerText = kitab.language;

        const borrowBtn = document.querySelector('.btn-borrow');
        borrowBtn.onclick = function(e) {
            e.preventDefault();
            borrowBook(kitab.name, kitab.author, kitab.cover);
        };

        const catContainer = document.getElementById('categoryList');
        if (kitab.category) {
            catContainer.innerHTML = kitab.category.split(', ')
                .map(cat => `<span>${cat}</span>`).join('');
        }
    } else {
        document.getElementById('bookTitle').innerText = "Book Not Found";
    }
});

function borrowBook(bookTitle, bookAuthor, bookCover) {
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    
    const alreadyBorrowed = borrowed_books.some(book => book.title === bookTitle);
    
    if (alreadyBorrowed) {
        alert('You have already borrowed this book!');
        return;
    }
    
    const today = new Date();
    const newBook = {
        id: Date.now(), 
        title: bookTitle,
        author: bookAuthor,
        cover: bookCover,
        borrowedDate: today.toISOString().split('T')[0],
    };
    
    // Add to borrowed books
    borrowed_books.push(newBook);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed_books));
    
    // Show success message and redirect
    alert(`"${bookTitle}" has been borrowed successfully!`);
    window.location.href = 'borrowed books.html';
}