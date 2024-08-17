var passwordInput = document.getElementById('password');
var toggler = document.getElementById('toggler');

toggler.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggler.classList.remove('fa-eye-slash');
        toggler.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        toggler.classList.remove('fa-eye');
        toggler.classList.add('fa-eye-slash');
    }
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var fullname = document.getElementById('fullname').value.trim();
    var password = document.getElementById('password').value.trim();
    var email = document.getElementById('email').value.trim();

    var valid = true;

    if (fullname === "") {
        document.getElementById('nameError').style.display = 'inline';
        document.getElementById('nameError').style.fontSize = '12px';
        valid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    if (password === "") {
        document.getElementById('passwordError').style.display = 'inline';
        document.getElementById('passwordError').style.fontSize = '12px';
        valid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }

    if (email === "") {
        document.getElementById('emailError').style.display = 'inline';
        document.getElementById('emailError').style.fontSize = '12px';
        valid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    if (valid) {
        console.log("Form submitted successfully!");
    }

})