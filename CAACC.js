const signupForm = document.getElementById('signupForm');
const firstname = document.getElementById("firstname")
const email = document.getElementById("email")
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const message = document.getElementById('message');
const submitBtn = signupForm.querySelector('button');


signupForm.addEventListener('submit', (e) => {

    e.preventDefault();

    if (password.value !== confirmPassword.value) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        confirmPassword.style.borderColor = "red";
        password.value = "";
        confirmPassword.value ='';

        setTimeout(() => {
            confirmPassword.style.borderColor = "";
            message.textContent = "";
        }, 2000);
    } else {

        const newUser =
            {
                userName : firstname.value,
                userEmail : email.value,
                userPassword : password.value
            };

        let users =  JSON.parse(localStorage.getItem('users'))||[];

        const exist = users.find(u => u.userEmail === newUser.userEmail);
        if(exist)
        {
            message.textContent = 'User Already Exists! ';
            message.style.color = "#111";
            return;
        }
        else
        {
            users.push(newUser);

            localStorage.setItem('users',JSON.stringify(users));

            confirmPassword.style.borderColor = "green";
            submitBtn.innerText = "Please wait...";
            message.textContent = "Account Created! Redirecting to Login...";
            message.style.color = "#111";

            setTimeout(() => {
                window.location.href = "Login.html";
            }, 2000);

        }

    }
});

// localStorage.clear();
