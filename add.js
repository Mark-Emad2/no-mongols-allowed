document.addEventListener('DOMContentLoaded', () => {
    let book_form = document.querySelector('form');
    let preview_img = document.getElementById('view');
    let img = ""; 

    document.getElementById('file').onchange = function() {
        let reader = new FileReader();

        reader.onload = function() {
            preview_img.src = reader.result;
            preview_img.style.display = 'block';
            img = reader.result; 
        }
        reader.readAsDataURL(this.files[0]);
    };

    book_form.onreset = () => {
        preview_img.style.display = 'none';
        preview_img.src = "";               
        img = "";                          
    };

    book_form.onsubmit = (e) => {
        e.preventDefault();

        let data = localStorage.getItem('books');

        let shelf = [];
        if (data !== null) {
            shelf = JSON.parse(data);
        }

        let selected_cats = [];
        document.querySelectorAll('input[name="category"]:checked').forEach(box => {
            selected_cats.push(box.value);
        });

        let final_category = selected_cats.length > 0 ? selected_cats.join(", ") : "General";

        let kitab = {
            id: document.getElementById('id_b').value,
            name: document.getElementById('name_b').value,
            author: document.getElementById('author').value,
            aboutAuthor: document.getElementById('aboutAuthor').value,
            amazonLink: document.getElementById('amazonLink').value,
            date: document.getElementById('release_date').value,
            language: document.getElementById('written_lan').value,
            category: final_category, 
            desc: document.querySelector('textarea').value,
            cover: img
        };

        shelf.push(kitab);
        localStorage.setItem('books', JSON.stringify(shelf));

        alert('The Book is Added');
        book_form.reset();
        preview_img.style.display = 'none';
        img = "";
    };
});