const passwordInput = document.getElementById("password");
const toggler = document.getElementById("toggler");
const form = document.getElementById("registerForm");

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

// function validateInput() {
//   var fullname = document.getElementById("fullname").value.trim();
//   var password = document.getElementById("password").value.trim();
//   var email = document.getElementById("email").value.trim();

//   var valid = true;

//   if (fullname === "") {
//     document.getElementById("nameError").style.display = "inline";
//     document.getElementById("nameError").style.fontSize = "12px";
//     valid = false;
//   } else {
//     document.getElementById("nameError").style.display = "none";
//   }

//   if (password === "") {
//     document.getElementById("passwordError").style.display = "inline";
//     document.getElementById("passwordError").style.fontSize = "12px";
//     valid = false;
//   } else {
//     document.getElementById("passwordError").style.display = "none";
//   }

//   if (email === "") {
//     document.getElementById("emailError").style.display = "inline";
//     document.getElementById("emailError").style.fontSize = "12px";
//     valid = false;
//   } else {
//     document.getElementById("emailError").style.display = "none";
//   }

//   if (valid) {
//     console.log("Form submitted successfully!");
//   }
// }

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    fullname: form.fullname.value,
    email: form.email.value,
    password: form.password.value,
    phone: form.phone.value,
  };

  fetch("https://d161-42-117-148-54.ngrok-free.app/api/auth/regis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
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

  form.reset();
});


function validateForm() {
  let isValid = true;

  // Kiểm tra trường fullname
  if (form.fullname.value.trim() === "") {
    alert("Fullname is required.");
    isValid = false;
  }

  // Kiểm tra trường email
  if (form.email.value.trim() === "") {
    alert("Email is required.");
    isValid = false;
  } else if (!validateEmail(form.email.value.trim())) {
    alert("Please enter a valid email address.");
    isValid = false;
  }

  // Kiểm tra trường password
  if (form.password.value.trim() === "") {
    alert("Password is required.");
    isValid = false;
  }

  return isValid;
}

// Hàm kiểm tra định dạng email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}