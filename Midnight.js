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
    
    borrowed_books.push(newBook);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed_books));
    
    alert('Book borrowed successfully!');
    window.location.href = 'borrowed books.html';
}