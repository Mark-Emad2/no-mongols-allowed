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
            "</div>";
        return;
    }
    //to clear books when returning
    storage.innerHTML = '';
    borrowed_books.forEach(book => {
        let book_card = `
        <div class="book_card" id="book_${book.id}">
            <div class="card_content">
                <div class="cover"><img src="${book.cover || 'Picture/default-cover.jpg'}"
                alt="${book.title}"
                onerror="this.src='Picture/default-cover.jpg'"></div>
                <div class="info"><h3>${book.title}</h3>
                    <div class="author">by ${book.author}</div>
                    <div class="date_info"><p><strong>Borrowed:</strong> ${formatDate(book.borrowedDate)}</p></div>
                    <div class="return">
                        <button class='return_button' onclick="returnBook(${book.id})">return book</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        storage.innerHTML += book_card;
    });
    updateCount(borrowed_books.length);
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