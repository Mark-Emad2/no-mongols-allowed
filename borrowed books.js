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
        <div class="book_card" data-book-title="${book.title}" data-book-author="${book.author}" data-book-cover="${book.cover}">
            <div class="card_content">
                <div class="cover">
                    <img src="${book.cover || 'Picture/default-cover.jpg'}" 
                        alt="${book.title}"
                        onerror="this.src='Picture/default-cover.jpg'">
                </div>
                <div class="info">
                    <h3>${book.title}</h3>
                    <div class="author">by ${book.author}</div>
                    <div class="date_info">
                        <p><strong>Borrowed:</strong> ${formatDate(book.borrowedDate)}</p>
                    </div>
                    <div class="return">
                        <button class='return_button' onclick="event.stopPropagation(); returnBook(${book.id})">Return Book</button>
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
            const title = this.dataset.bookTitle;
            const author = this.dataset.bookAuthor;
            const cover = this.dataset.bookCover;
            redirectToBookDetails(title, author, cover);
        });
    });
    
    updateCount(borrowed_books.length);
}
function redirectToBookDetails(title, author, cover) {
    const bookDetailPages = {
        'The Midnight Library': 'Midnight_Detail_user.html',
        'Clean Code': 'CleanCode_details.html',
        'في ممر الفئران': 'mouse_details.html',
        'The Beginning after the End': 'theBeginngin_details.html',
        'Before the Coffee Gets Cold': 'coffee_detils.html',
        'The Beginning after the End(Divergence)': 'theBeginngin_details.html'
    };
    let detailPage = bookDetailPages[title];
    
    if (detailPage) {
        window.location.href = detailPage;
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
function returnBook(book_id){
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    let book_return = borrowed_books.find(book => book.id === book_id);
    if(book_return && confirm(`Return "${book_return.title}"?`)){
        borrowed_books = borrowed_books.filter(book => book.id !== book_id);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowed_books));
        loadBooks();
    }       
}
function returnAllBooks(){
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    if(borrowed_books.length > 0 && confirm(`Return all ${borrowed_books.length} borrowed books?`)){
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
function isAvailable(bookTitle){
    let borrowed_books = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    return !borrowed_books.some(book => book.title === bookTitle);
}
function getBorrowedBooks(){
    return JSON.parse(localStorage.getItem('borrowedBooks')) || [];
}
loadBooks();