function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function loadBooks() {
    try {
        const response = await fetch('/api/borrowed-books/');
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
        displayBooks([]);
    }
}

function displayBooks(borrowed_books) {
    let storage = document.getElementById('Container');
    if (borrowed_books.length === 0) {
        storage.innerHTML =
            "<div class='empty-state'>" +
                "<h3>No Borrowed Books</h3>" +
                "<p>You haven't borrowed any books yet. Go browse some!</p>" +
            "</div>";
        updateCount(0);
        document.getElementById('returnall').disabled = true;
        return;
    }

    storage.innerHTML = '';
    borrowed_books.forEach(book => {
        let book_card = `
        <div class="book_card" 
             data-book-id="${book.book_id}" 
             data-book-title="${escapeHtml(book.title)}" 
             data-book-author="${escapeHtml(book.author)}" 
             data-book-cover="${book.cover}" 
             data-original-id="${book.book_id}">
            <div class="card_content">
                <div class="cover">
                    <img src="${book.cover || ''}" onerror="this.src=''">
                </div>
                <div class="info">
                    <h3>${escapeHtml(book.title)}</h3>
                    <div class="author">by ${escapeHtml(book.author)}</div>
                    <div class="date_info">
                        <p><strong>Borrowed:</strong> ${formatDate(book.borrowedDate)}</p>
                        <p><strong>Due:</strong> ${formatDate(book.dueDate)}</p>
                    </div>
                    <div class="return">
                        <button class='return_button' data-borrow-id="${book.id}" data-book-title="${escapeHtml(book.title)}">Return Book</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        storage.innerHTML += book_card;
    });

    document.querySelectorAll('.book_card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('return_button')) return;
            const bookId = this.dataset.bookId;
            if (bookId) {
                window.location.href = `/book_details/?id=${bookId}`;
            }
        });
    });

    document.querySelectorAll('.return_button').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const borrowId = btn.dataset.borrowId;
            const bookTitle = btn.dataset.bookTitle;
            
            if (confirm(`Return "${bookTitle}"?`)) {
                const response = await fetch(`/api/return-book/${borrowId}/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                alert(data.message);
                if (data.success) loadBooks();
            }
        });
    });
    
    updateCount(borrowed_books.length); 
    document.getElementById('returnall').disabled = false;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function returnAllBooks() {
    const response = await fetch('/api/borrowed-books/');
    const books = await response.json();
    
    if (books.length === 0) {
        alert('No books to return');
        return;
    }
    
    if (confirm(`Return all ${books.length} books?`)) {
        const result = await fetch('/api/return-all-books/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json();
        alert(data.message);
        if (data.success) loadBooks();
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function updateCount(count) {
    let countElement = document.getElementById('totalCount');
    if (!countElement) {
        const header = document.querySelector('.borrowed-header');
        if (header) {
            countElement = document.createElement('div');
            countElement.id = 'totalCount';
            countElement.className = 'total';
            header.appendChild(countElement);
        }
    }
    if (countElement) {
        countElement.textContent = count + ' book' + (count !== 1 ? 's' : '');
    }
}

document.getElementById('returnall')?.addEventListener('click', returnAllBooks);
loadBooks();