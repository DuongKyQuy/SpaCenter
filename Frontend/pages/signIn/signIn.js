document.getElementById('loginForm').addEventListener('submit',function(event){
    var fullname = document.getElementById('fullname').value.trim();
    var password = document.getElementById('password').value.trim();

    var valid = true;

    if(fullname === ""){
        document.getElementById('nameError').style.display = 'inline';
        valid=false;
    }else{
        document.getElementById('nameError').style.display = 'none';
    }

    if(password === ""){
        document.getElementById('passwordError').style.display = 'inline';
        valid = false;
    }else{
        document.getElementById('passwordError').style.display = 'none';
    }

    if(!valid){
        event.preventDefault();
    }
})