function loadBooks(){
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    displayBooks(borrowed_books);
}

function displayBooks(borrowed_books){
    let storage = document.getElementById('Container');
    if(borrowed_books.length === 0){
        storage.innerHTML = 
            "<div class='empty-state'>"+
                "<h3>No Borrowed Books</h3>"+
                "<p>You haven't borrowed any books yet. Go browse some!</p>"+
            "</div>";
        return;
    }
    storage.innerHTML = '';
    borrowed_books.forEach(book => {
        let book_card = `
        <div class="book_card" data-book-id="${book.id}" data-book-title="${book.title}" data-book-author="${book.author}" data-book-cover="${book.cover}" data-original-id="${book.originalBookId}">
            <div class="card_content">
                <div class="cover">
                    <img src="${book.cover || 'Picture/default-cover.jpg'}" 
                        onerror="this.src='Picture/default-cover.jpg'">
                </div>
                <div class="info">
                    <h3>${book.title}</h3>
                    <div class="author">by ${book.author}</div>
                    <div class="date_info">
                        <p><strong>Borrowed:</strong> ${formatDate(book.borrowedDate)}</p>
                    </div>
                    <div class="return">
                        <button class='return_button' onclick="event.stopPropagation(); returnBook(${book.id}, '${book.title.replace(/'/g, "\\'")}')">Return Book</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        storage.innerHTML += book_card;
    });
    
    document.querySelectorAll('.book_card').forEach(card => {
        card.addEventListener('click', function(e) {
            if(e.target.classList.contains('return_button')) {
                return;
            }
            
            const bookTitle = this.dataset.bookTitle;
            const bookAuthor = this.dataset.bookAuthor;
            const bookCover = this.dataset.bookCover;
            redirectToBookDetails(bookTitle, bookAuthor, bookCover);
        });
    });
    
    updateCount(borrowed_books.length);
}

function redirectToBookDetails(title, author, cover) {
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    
    const foundBook = allBooks.find(book => 
        book.name === title && book.author === author
    );
    
    if (foundBook) {
        window.location.href = `book_details.html?id=${foundBook.id}`;
    } else {
        localStorage.setItem('selectedBook', JSON.stringify({
            title: title,
            author: author,
            cover: cover,
            fromBorrowed: true
        }));
        window.location.href = 'available_books_user.html';
    }
}

function returnBook(book_id, bookTitle) {
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    let book_return = borrowed_books.find(book => book.id === book_id);
    
    if(book_return && confirm(`Return "${bookTitle}"?`)){
        borrowed_books = borrowed_books.filter(book => book.id !== book_id);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowed_books));
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books = books.map(book => {
            if (book.name === bookTitle) {
                return { ...book, available: true };
            }
            return book;
        });
        localStorage.setItem('books', JSON.stringify(books));
        
        loadBooks();
    }       
}

function returnAllBooks(){
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    if(borrowed_books.length > 0 && confirm(`Return all ${borrowed_books.length} borrowed books?`)){
        let books = JSON.parse(localStorage.getItem('books')) || [];
        borrowed_books.forEach(borrowedBook => {
            books = books.map(book => {
                if (book.name === borrowedBook.title) {
                    return { ...book, available: true };
                }
                return book;
            });
        });
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.removeItem('borrowedBooks');
        loadBooks();
    }
}

function formatDate(dateString){
    const options = {year:'numeric', month:'long', day:'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function updateCount(count){
    let countElement = document.getElementById('totalCount');
    if(!countElement){
        const header = document.querySelector('.borrowed-header');
        if(header){
            countElement = document.createElement('div');
            countElement.id = 'totalCount';
            countElement.className = 'total';
            header.appendChild(countElement);
        }
    }
    if(countElement){
        countElement.textContent = count + ' book' + (count !== 1 ? 's' : '');
    }
}

function getBorrowedBooks(){
    return JSON.parse(localStorage.getItem('borrowedBooks')) || [];
}

loadBooks();