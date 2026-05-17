document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    if (!bookId) {
        console.error("No Book ID found in the URL!");
        return;
    }

    try {
        const response = await fetch(`/api/book/${bookId}/`);
        
        if (!response.ok) {
            throw new Error(`Server status: ${response.status}`);
        }

        const kitab = await response.json();

        if (kitab && !kitab.error) {
            document.getElementById('bookTitle').innerText = kitab.name || "N/A";
            document.getElementById('authorName').innerText = kitab.author || "Unknown";
            document.getElementById('authorName').href = kitab.aboutAuthor || "#";
            document.getElementById('bookCover').src = kitab.cover || "";
            document.getElementById('bookDesc').innerText = kitab.desc || "No description available.";
            document.getElementById('amazonLink').href = kitab.amazonLink || "#";
            document.getElementById('releaseDate').innerText = kitab.date || "N/A";
            document.getElementById('bookLang').innerText = kitab.language || "N/A";

            const borrowBtn = document.getElementById('borrowBtn');
            
            if (borrowBtn) {
                borrowBtn.dataset.bookId = bookId;
                
                if (!kitab.available) {
                    borrowBtn.textContent = 'Not Available (Borrowed)';
                    borrowBtn.style.backgroundColor = '#888';
                    borrowBtn.style.cursor = 'not-allowed';
                    borrowBtn.disabled = true;
                } else {
                    borrowBtn.textContent = 'Borrow the book';
                    borrowBtn.style.backgroundColor = '#B85C38';
                    borrowBtn.disabled = false;
                }
            }

            const catContainer = document.getElementById('categoryList');
            if (catContainer && kitab.category) {
                catContainer.innerHTML = kitab.category.split(', ')
                    .map(cat => `<span>${cat}</span>`).join('');
            }
        }
    } catch (error) {
        console.error("The details page is failing to fetch:", error);
    }
});

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

document.getElementById('borrowBtn')?.addEventListener('click', async function() {
    const bookId = this.dataset.bookId;
    const token = localStorage.getItem('access_token'); // جلب التوكن من التخزين المحلي
    
    if (!bookId) {
        alert('Invalid book ID');
        return;
    }
    
    try {
        const url = `/api/borrow-book/${bookId}/`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
        });
        const data = await response.json();
        
        if (response.ok && data.success) {
            alert(data.message);
            window.location.href = '/borrowed_books/';
        } else {
            const errorMsg = data.message || data.detail || "Error: Please check if you are logged in correctly.";
            alert(errorMsg);
        }
    } catch (error) {
        console.error('Error details:', error);
        alert("Server error. Please make sure the backend is running and you are logged in.");
    }
});