const signupForm = document.getElementById('signupForm');
const firstname = document.getElementById("firstname")
const email = document.getElementById("email")
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const message = document.getElementById('message');
const submitBtn = signupForm.querySelector('button');

signupForm.addEventListener('submit', (e) => {

    if (password.value !== confirmPassword.value) {
        e.preventDefault();
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        confirmPassword.style.borderColor = "red";
    } else {
        e.preventDefault();
        localStorage.setItem('firstname',firstname.value)
        localStorage.setItem('userEmail', email.value);
        localStorage.setItem('userPassword', password.value);
        confirmPassword.style.borderColor = "green";

        submitBtn.innerText = "Please wait...";
        message.textContent = "Account Created! Redirecting to Login...";
        message.style.color = "green";

        setTimeout(() => {
            window.location.href = "Login.html";
        }, 2000);
    }
});

// confirmPassword.addEventListener('input', () => {
//     if (confirmPassword.value === password.value) {
//         message.textContent = "Passwords match";
//         message.style.color = "green";
//     } else {
//         confirmPassword.style.borderColor = "red";
//         message.textContent = "Passwords must match";
//         message.style.color = "red";
//     }
// });