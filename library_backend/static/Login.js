const email     = document.getElementById('email');
const password  = document.getElementById('password');
const message   = document.getElementById('message');
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const res = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: email.value,    // Django uses username, we send the email as username
                password: password.value
            })
        });

        const data = await res.json();

        if (res.ok) {
            // save the token so other pages can use it for protected requests
            localStorage.setItem('access_token', data.access);

            // Django tells us if the user is admin — no JS secret needed
           if (data.is_admin) {
                 window.location.href = 'AdminMain.html';
            } else {
                window.location.href = 'main.html'; 
                }

        } else {
            message.textContent = 'Wrong email or password!';
            message.style.color = 'red';
            email.style.borderColor    = 'red';
            password.style.borderColor = 'red';
            email.value    = '';
            password.value = '';

            setTimeout(() => {
                email.style.borderColor    = '';
                password.style.borderColor = '';
                message.textContent        = '';
            }, 2000);
        }

    } catch (err) {
        message.textContent = 'Cannot connect to server. Is Django running?';
        message.style.color = 'red';
    }
});