const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = email.value;
    const passInput = password.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExist = users.find (u => u.userEmail === emailInput && u.userPassword === passInput);

    if (userExist)
    {
        if(userExist.role === 'admin')
        {
            window.location.href = "AdminMain.html";


        }
        else
        {
            window.location.href = "main.html";
        }
    }

    else
    {
        e.preventDefault();
        message.textContent = 'Not a Registered User!';
        message.style.color = 'red';
        password.style.borderColor = 'red';
        email.style.borderColor = 'red';
        email.value ='';
        password.value = '';

        setTimeout(() => {
            email.style.borderColor = "";
            password.style.borderColor = "";
            message.textContent = "";
        }, 2000);
    }



});