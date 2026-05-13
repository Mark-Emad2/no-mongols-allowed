document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('booksContainer');
    const searchInput = document.querySelector('.search-input');
    
    let allBooks = []; 

    async function fetchBooks() {
        try {
            // التعديل هنا: غيرنا المسار ليكون مطابق للي في الـ urls.py
            const response = await fetch('/api/books/'); 
            allBooks = await response.json();
            displayBooks(allBooks); 
        } catch (error) {
            console.error("Error loading books:", error);
            container.innerHTML = "<h3>There is no Available Books at the moment.</h3>";
        }
    }

    function displayBooks(booksArray) {
        container.innerHTML = "";

        if (booksArray.length === 0) {
            container.innerHTML = "<h3>No books found.</h3>";
            return;
        }

        booksArray.forEach(book => {
            let statusText = book.available ? "Available" : "Borrowed";
            let statusClass = book.available ? "available" : "borrowed";
            
            const card = `
                <div class="book-card">
                    <span class="book-badge ${statusClass}">${statusText}</span>
                    <a href="/book_details/?id=${book.id}"> 
                        <img src="${book.cover}" alt="${book.name}" class="card-img">
                    </a>
                    <div class="card-info">
                        <h3 class="book-name">
                            <a href="/book_details/?id=${book.id}">${book.name}</a>
                        </h3>
                        <p class="author-name">by <a href="${book.aboutAuthor}" target="_blank">${book.author}</a></p>
                        <a href="/book_details/?id=${book.id}" class="btn-details">View Details</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            let keyword = e.target.value.toLowerCase();

            let filtered = allBooks.filter(book => {
                let matchName = book.name.toLowerCase().includes(keyword);
                let matchAuthor = book.author.toLowerCase().includes(keyword);
                return matchName || matchAuthor;
            });

            displayBooks(filtered);
        });
    }

    fetchBooks();
});