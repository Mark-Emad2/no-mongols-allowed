const loginForm = document.querySelector('form[action="main.html"]');

loginForm.addEventListener('submit', (e) => {
    const email = loginForm.email.value;
    const pass = loginForm.password.value;

    // const storedName = localStorage.getItem('firstname')
    const storedName = localStorage.getItem('firstname') || "Guest";

    const storedEmail = localStorage.getItem('userEmail');

    const storedPass = localStorage.getItem('userPassword');

    if (email === storedEmail && pass === storedPass) {
        alert(`Welcome back, ${storedName}!`);
    } else {
        e.preventDefault();
        alert("Invalid Email or Password");
    }
});