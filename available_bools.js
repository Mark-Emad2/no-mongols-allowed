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



