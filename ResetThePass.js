const resetForm = document.getElementById('resetPassForm');
const message = document.getElementById('message');
const email = document.getElementById('email');

resetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputEmail = email.value;
    const storedEmail = localStorage.getItem('userEmail');

    if (inputEmail === storedEmail) {
        message.textContent = "Email found! Sending reset link...";
        message.style.color = "green";
        email.style.borderColor='green';

        setTimeout(() => {
            const textContainer = document.querySelector('.text');
            textContainer.innerHTML = `
                <h2>Check your inbox!</h2>
                <p>A reset link has been sent to <strong>${inputEmail}</strong></p>
                <div style="margin-top: 20px;">
                    <a href="Login.html" style="color: #2c3e50; font-weight: bold;">Go back to Login</a>
                </div>
            `;
        }, 3000);

    } else {
        message.textContent = "This email is not registered.";
        message.style.color = "red";

        email.style.borderColor = "red";
    }
});