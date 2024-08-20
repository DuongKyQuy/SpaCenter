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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  function validateForm() {
    let isValid = true;

    // Kiểm tra email không rỗng
    if (form.email.value.trim() === "") {
      alert("Email is required.");
      isValid = false;
    }

    // Kiểm tra mật khẩu không rỗng
    const password = form.password.value.trim();
    if (password === "") {
      alert("Password is required.");
      isValid = false;
    }

    return isValid;
  }

  if (!validateForm()) {
    return; 
  }


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