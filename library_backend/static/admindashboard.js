document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search_box');

    // وظيفة البحث (تفلتر الصفوف الموجودة فعلياً في الجدول)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#adminTableBody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(keyword) ? '' : 'none';
            });
        });
    }

    // وظيفة الحذف (تكلم السيرفر وتمسح الكتاب)
    window.deleteBook = function(id) {
        if (confirm("Are you sure you want to delete this book?")) {
            // بنستخدم fetch عشان نكلم Django (AJAX)
            fetch(`delete/${id}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'), // حماية Django
                }
            })
            .then(response => {
                if (response.ok) {
                    // امسح السطر من الجدول قدام المستخدم
                    document.getElementById(`book-row-${id}`).remove();
                } else {
                    alert("Error deleting book.");
                }
            });
        }
    };

    // دالة مساعدة للحصول على الـ CSRF Token (مهمة جداً لـ Django)
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
});



// document.addEventListener('DOMContentLoaded', () => {
//     const tableBody = document.getElementById('adminTableBody');
//     const searchInput = document.getElementById('search_box');
//     const searchForm = document.getElementById('searchForm');

//     // dIFULT BOOKS DATA



//     //  GITING DATA FROM LOCAL STORAGE OR INITIALIZING IT

//     let books = JSON.parse(localStorage.getItem('books'));

//     // if (!books || books.length === 0) {
//     //     books = initialBooks;
//     //     localStorage.setItem('books', JSON.stringify(books));
//     // }

//     //  dISPLAY FUNCTION

// function displayAdminBooks(booksArray) {
//     const tableBody = document.getElementById('adminTableBody');
//     tableBody.innerHTML = ""; 

//     booksArray.forEach(book => {
//         const tr = document.createElement('tr');
        
        

//         const detailsPage = book.bookDetailsPage || `book_details_Admin.html?id=${book.id}`;
//         const authorLink = book.aboutAuthor || "#";

//         tr.innerHTML = `
//             <td>${book.id}</td>
//             <td>
//                 <a href="${detailsPage}">
//                     <img src="${book.cover}" alt="cover" width="60" height="85" style="border-radius:4px;">
//                 </a>
//             </td>
//             <td>
//                 <a href="${detailsPage}" style="text-decoration: none; color: #2c3e50; font-weight: bold;">
//                     ${book.name}
//                 </a>
//             </td>
//             <td>
//                 <a href="${authorLink}" target="_blank" style="color: #3498db; text-decoration: underline;">
//                     ${book.author}
//                 </a>
//             </td>
//             <td>${book.category}</td>
//             <td>${book.date || 'N/A'}</td>
//             <td>${book.language || 'N/A'}</td>
//             <td>
//                <button onclick="deleteBook('${book.id}')" class="btn-delete">Delete</button>
//             </td>
//         `;
//         tableBody.appendChild(tr);
//     });
// }

//     // DELETE FUNCTION 
    
//     window.deleteBook = function(id) {
//         if(confirm("Are you sure you want to delete this book?")) {
//             // Remove from books array
//             books = books.filter(book => String(book.id) !== String(id));
//             localStorage.setItem('books', JSON.stringify(books));
//             displayAdminBooks(books);
//         }
//     };

//     // SEARCH FUNCTION
//     if (searchInput) {
//         searchInput.addEventListener('input', (e) => {
//             let keyword = e.target.value.toLowerCase();
//             let filtered = books.filter(book => 
//                 book.name.toLowerCase().includes(keyword) || 
//                 book.author.toLowerCase().includes(keyword) ||
//                 book.category.toLowerCase().includes(keyword)
//             );
//             displayAdminBooks(filtered);
//         });
//     }

//     //  PREVENT FORM SUBMISSION

//     if(searchForm) {
//         searchForm.onsubmit = (e) => e.preventDefault();
//     }

//     // INITIAL DISPLAY

//     displayAdminBooks(books);
// });
