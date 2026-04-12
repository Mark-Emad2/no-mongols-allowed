const resetForm = document.getElementById('resetPassForm');
const message = document.getElementById('message');
const email = document.getElementById('email');

resetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputEmail = email.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExist = users.find (u => u.userEmail === inputEmail);


        if (emailExist)
        {
            message.textContent = 'Welcome!'
            message.style.color='';
            setTimeout(() => {
                const textContainer = document.getElementById('text');
                textContainer.innerHTML = `
                <h2>Check your inbox!</h2>
                <p>A reset link has been sent to <strong>${inputEmail}</strong></p>
                <div style="margin-top: 20px;">
                    <a href="Login.html" style="color: #2c3e50; font-weight: bold;">Go back to Login</a>
                </div>
            `;
            }, 2000);
        }

        else {
        message.textContent = "This email is not registered.";
        message.style.color = 'red';
        email.style.borderColor = "red";
        setTimeout( () =>{
            message.textContent='';
            email.style.borderColor ='';
            email.value = '';
            }
        ,2000)
    }
});