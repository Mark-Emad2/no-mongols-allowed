document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('booksContainer');
    
    let data = localStorage.getItem('books');
    let books = data ? JSON.parse(data) : [];

    function displayBooks() {
        container.innerHTML = ""; 
        
        if (books.length === 0) {
            container.innerHTML = "<h3>No books available yet.</h3>";
            return;
        }

        books.forEach(book => {
            const card = `
                <div class="book-card">
                    <span class="book-badge available">Available</span>
                    <a href="book_details.html?id=${book.id}">
                        <img src="${book.cover}" alt="${book.name}" class="card-img">
                    </a>
                    <div class="card-info">
                        <h3 class="book-name">
                            <a href="book_details.html?id=${book.id}">${book.name}</a>
                        </h3>
                        <p class="author-name">by <a href="${book.aboutAuthor}" target="_blank">${book.author}</a></p>
                        <a href="book_details.html?id=${book.id}" class="btn-details">View Details</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }

    displayBooks();
});

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    let data = localStorage.getItem('books');
    let books = data ? JSON.parse(data) : [];

    const book = books.find(b => b.id == bookId);

    if (book) {
        document.querySelector('.book-title').innerText = book.name;
        document.querySelector('.author-link').innerText = book.author;
        document.querySelector('.author-link').href = book.aboutAuthor;
        document.querySelector('.book-cover').src = book.cover;
        document.querySelector('.Description p').innerText = book.desc;
        document.querySelector('.value[release]').innerText = book.date; // تأكد من إضافة class أو id مناسب في HTML
        document.querySelector('.btn-buy').href = book.amazonLink;
        
        const catContainer = document.querySelector('.category-list');
        catContainer.innerHTML = book.category.split(', ').map(cat => `<span>${cat}</span>`).join('');
    }
});

