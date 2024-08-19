const passwordInput = document.getElementById("password");
const toggler = document.getElementById("toggler");
const form = document.getElementById("loginForm");

toggler.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggler.classList.remove("fa-eye-slash");
    toggler.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    toggler.classList.remove("fa-eye");
    toggler.classList.add("fa-eye-slash");
  }
});

function validateSignIn() {
  const email = document.getElementById("email").value.trim();
  var passwordValue = passwordInput.value.trim();

  var valid = true;

  if (email === "") {
    document.getElementById("emailError").style.display = "inline";
    document.getElementById("emailError").style.fontSize = "12px";
    valid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  if (passwordValue === "") {
    document.getElementById("passwordError").style.display = "inline";
    document.getElementById("passwordError").style.fontSize = "12px";
    valid = false;
  } else {
    document.getElementById("passwordError").style.display = "none";
  }

  if (valid) {
    console.log("Form submitted successfully!");
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formDataSignIn = {
    username: form.email.value.trim(),
    password: form.password.value.trim(),
  };
  fetch("https://d161-42-117-148-54.ngrok-free.app/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataSignIn),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data.token);
      if (data.status === "success") {
        alert("Login successful!");
        window.location.href = "/Frontend/index.html";
      } else {
        alert(data.message || "Login failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
});
