const signupForm      = document.getElementById('signupForm');
const firstname       = document.getElementById('firstname');
const email           = document.getElementById('email');
const password        = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const message         = document.getElementById('message');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // quick frontend check — no need to bother the server if passwords don't match
    if (password.value !== confirmPassword.value) {
        message.textContent = 'Passwords do not match!';
        message.style.color = 'red';
        setTimeout(() => message.textContent = '', 2000);
        return;
    }

    try {
        const res = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstname.value,
                email:     email.value,
                password:  password.value
            })
        });

        const data = await res.json();

        if (!res.ok) {
            message.textContent = data.error;
            message.style.color = 'red';
            setTimeout(() => message.textContent = '', 2000);
            return;
        }

        // success
        const submitBtn = signupForm.querySelector('button');
        submitBtn.disabled  = true;
        submitBtn.innerText = 'Please wait...';
        confirmPassword.style.borderColor = 'green';
        message.textContent = 'Account Created! Redirecting...';
        message.style.color = 'green';

       window.location.href = '/login/';

    } catch (err) {
        message.textContent = 'Cannot connect to server. Is Django running?';
        message.style.color = 'red';
    }
});

// localStorage.clear();