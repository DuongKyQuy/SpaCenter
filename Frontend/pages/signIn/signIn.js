var passwordInput = document.getElementById("password");
var toggler = document.getElementById("toggler");

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

document
.getElementById("loginForm")
.addEventListener("submit", function (event) {
  event.preventDefault();
  var email = document.getElementById("email").value.trim();
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
});

document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    password: form.password.value.trim(),
    email: form.email.value.trim(),
  };

  console.log(formData);

  fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data:", data);
      if (data.success) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Registration failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
});
});
