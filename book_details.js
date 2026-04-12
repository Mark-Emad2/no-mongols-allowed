document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    const data = localStorage.getItem('books');
    const shelf = data ? JSON.parse(data) : [];

    const kitab = shelf.find(b => b.id == bookId);

    if (kitab) {
        document.getElementById('bookTitle').innerText = kitab.name;
        document.getElementById('authorName').innerText = kitab.author;
        document.getElementById('authorName').href = kitab.aboutAuthor;
        document.getElementById('bookCover').src = kitab.cover;
        document.getElementById('bookDesc').innerText = kitab.desc;
        document.getElementById('amazonLink').href = kitab.amazonLink;
        document.getElementById('releaseDate').innerText = kitab.date;
        document.getElementById('bookLang').innerText = kitab.language;

        const catContainer = document.getElementById('categoryList');
        if (kitab.category) {
            catContainer.innerHTML = kitab.category.split(', ')
                .map(cat => `<span>${cat}</span>`).join('');
        }
    } else {
        document.getElementById('bookTitle').innerText = "Book Not Found";
    }
});