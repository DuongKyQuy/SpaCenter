document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var fullname = document.getElementById('fullname').value.trim();
    var password = document.getElementById('password').value.trim();

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

})