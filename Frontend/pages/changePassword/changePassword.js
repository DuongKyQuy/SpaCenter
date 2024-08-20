var togglers = document.querySelectorAll('#toggler');
var passwordInputs = document.querySelectorAll('.password-field input');

togglers.forEach(function (toggler, index) {
    toggler.addEventListener('click', function () {
        var passwordInput = passwordInputs[index];
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
});


document.getElementById('changepassForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var newPassword = document.getElementById('new-password').value.trim();
    var reNewPassword = document.getElementById('re-new-password').value.trim();

    var valid = true;

    if (newPassword === "") {
        document.getElementById('changeError').style.display = 'inline';
        document.getElementById('changeError').style.fontSize = '12px';
        valid = false;
    } else {
        document.getElementById('changeError').style.display = 'none';
    }

    if (reNewPassword === "") {
        document.getElementById('renewError').style.display = 'inline';
        document.getElementById('renewError').style.fontSize = '12px';
        valid = false;
    } else {
        document.getElementById('renewError').style.display = 'none';
    }

    if (newPassword !== reNewPassword) {
        alert('Passwords do not match');
        valid = false;
    }

    if (valid) {
        console.log("Form submitted successfully!");
    }
});
