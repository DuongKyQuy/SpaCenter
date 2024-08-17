document.getElementById('forgotForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim();

    var valid = true;

    if (email === "") {
        document.getElementById('emailError').style.display = 'inline';
        document.getElementById('emailError').style.fontSize = '12px';
        valid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
})