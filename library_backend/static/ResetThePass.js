const resetForm = document.getElementById('resetPassForm');
const message   = document.getElementById('message');
const email     = document.getElementById('email');

resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const res = await fetch('http://127.0.0.1:8000/api/forgot-password/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value })
        });

        const data = await res.json();

        if (res.ok) {
            // show the "check your inbox" message just like before
            message.textContent = 'Email found!';
            message.style.color = 'green';

            setTimeout(() => {
                const textContainer = document.getElementById('text');
                textContainer.innerHTML = `
                    <h2>Check your inbox!</h2>
                    <p>A reset link has been sent to <strong>${email.value}</strong></p>
                    <div style="margin-top: 20px;">
                        <a href="/login/" style="color: #2c3e50; font-weight: bold;">Go back to Login</a>
                    </div>
                `;
            }, 2000);

        } else {
            // email not found in Django database
            message.textContent = data.error || 'This email is not registered.';
            message.style.color = 'red';
            email.style.borderColor = 'red';

            setTimeout(() => {
                message.textContent     = '';
                email.style.borderColor = '';
                email.value             = '';
            }, 2000);
        }

    } catch (err) {
        message.textContent = 'Cannot connect to server. Is Django running?';
        message.style.color = 'red';
    }
});