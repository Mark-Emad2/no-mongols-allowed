const signupForm = document.getElementById('signupForm');
const firstname = document.getElementById("firstname");
const email = document.getElementById("email");
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const message = document.getElementById('message');
const submitBtn = signupForm.querySelector('button');

const adminCheckbox = document.getElementById('admin');
const orgPassContainer = document.getElementById('orgPassContainer');
const orgPasswordInput = document.getElementById('orgPassword');

const Organ_Pass = "loginasadmin";

adminCheckbox.addEventListener('change', () => {
    if (adminCheckbox.checked) {
        orgPassContainer.style.display = 'block';
        orgPasswordInput.required = true;
    } else {
        orgPassContainer.style.display = 'none';
        orgPasswordInput.required = false;
        orgPasswordInput.value = '';
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isAdmin = adminCheckbox.checked;


    if (password.value !== confirmPassword.value) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    if (isAdmin && orgPasswordInput.value !== Organ_Pass) {
        message.textContent = "Invalid Organization Password!";
        message.style.color = "red";
        orgPasswordInput.style.borderColor = "red";
        return;
    }

    const newUser = {
        userName: firstname.value,
        userEmail: email.value,
        userPassword: password.value,
        role: isAdmin ? 'admin' : 'user'
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const exist = users.find(u => u.userEmail === newUser.userEmail);

    if (exist) {
        message.textContent = 'User Already Exists!';
        message.style.color = "red";
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    confirmPassword.style.borderColor = "green";
    submitBtn.disabled = true;
    submitBtn.innerText = "Please wait...";
    message.textContent = "Account Created! Redirecting...";
    message.style.color = "green";

    setTimeout(() => {
        window.location.href = "Login.html";
    }, 2000);
});

// localStorage.clear();