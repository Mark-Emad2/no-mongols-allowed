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

            const borrowBtn = document.querySelector('.btn-borrow');
            if (borrowBtn) {
                if (!kitab.available) {
                    borrowBtn.textContent = 'Not Available (Borrowed)';
                    borrowBtn.style.backgroundColor = '#888';
                    borrowBtn.style.cursor = 'not-allowed';
                } else {
                    borrowBtn.textContent = 'Borrow the book';
                    borrowBtn.style.backgroundColor = '#B85C38';
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