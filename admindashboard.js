document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('adminTableBody');
    const searchInput = document.getElementById('search_box');
    const searchForm = document.getElementById('searchForm');

    // dIFULT BOOKS DATA



    //  GITING DATA FROM LOCAL STORAGE OR INITIALIZING IT

    let books = JSON.parse(localStorage.getItem('books'));

    // if (!books || books.length === 0) {
    //     books = initialBooks;
    //     localStorage.setItem('books', JSON.stringify(books));
    // }

    //  dISPLAY FUNCTION

function displayAdminBooks(booksArray) {
    const tableBody = document.getElementById('adminTableBody');
    tableBody.innerHTML = ""; 

    booksArray.forEach(book => {
        const tr = document.createElement('tr');
        
        

        const detailsPage = book.bookDetailsPage || `book_details.html?id=${book.id}`;
        const authorLink = book.aboutAuthor || "#";

        tr.innerHTML = `
            <td>${book.id}</td>
            <td>
                <a href="${detailsPage}">
                    <img src="${book.cover}" alt="cover" width="60" height="85" style="border-radius:4px;">
                </a>
            </td>
            <td>
                <a href="${detailsPage}" style="text-decoration: none; color: #2c3e50; font-weight: bold;">
                    ${book.name}
                </a>
            </td>
            <td>
                <a href="${authorLink}" target="_blank" style="color: #3498db; text-decoration: underline;">
                    ${book.author}
                </a>
            </td>
            <td>${book.category}</td>
            <td>${book.date || 'N/A'}</td>
            <td>${book.language || 'N/A'}</td>
            <td>
               <button onclick="deleteBook('${book.id}')" class="btn-delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

    // DELETE FUNCTION 
    
    window.deleteBook = function(id) {
        if(confirm("Are you sure you want to delete this book?")) {
            // Remove from books array
            books = books.filter(book => String(book.id) !== String(id));
            localStorage.setItem('books', JSON.stringify(books));
            displayAdminBooks(books);
        }
    };

    // SEARCH FUNCTION
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            let keyword = e.target.value.toLowerCase();
            let filtered = books.filter(book => 
                book.name.toLowerCase().includes(keyword) || 
                book.author.toLowerCase().includes(keyword) ||
                book.category.toLowerCase().includes(keyword)
            );
            displayAdminBooks(filtered);
        });
    }

    //  PREVENT FORM SUBMISSION

    if(searchForm) {
        searchForm.onsubmit = (e) => e.preventDefault();
    }

    // INITIAL DISPLAY

    displayAdminBooks(books);
});
