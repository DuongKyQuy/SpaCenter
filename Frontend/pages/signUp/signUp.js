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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  function validateForm() {
    let isValid = true;

    if (form.fullname.value.trim() === "") {
      alert("Fullname is required.");
      isValid = false;
    }

    if (form.email.value.trim() === "") {
      alert("Email is required.");
      isValid = false;
    } else if (!validateEmail(form.email.value.trim())) {
      alert("Please enter a valid email address.");
      isValid = false;
    }

    const password = form.password.value.trim();

    if (password === "") {
      alert("Password is required.");
      isValid = false;
    } else {
      // Kiểm tra độ dài mật khẩu
      if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        isValid = false;
      }
      
      // Kiểm tra chứa ít nhất một chữ cái in hoa
      if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one uppercase letter.");
        isValid = false;
      }
      
      // Kiểm tra chứa ít nhất một chữ cái thường
      if (!/[a-z]/.test(password)) {
        alert("Password must contain at least one lowercase letter.");
        isValid = false;
      }
      
      // Kiểm tra chứa ít nhất một chữ số
      if (!/[0-9]/.test(password)) {
        alert("Password must contain at least one number.");
        isValid = false;
      }
      
      // Kiểm tra chứa ít nhất một ký tự đặc biệt
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        alert("Password must contain at least one special character.");
        isValid = false;
      }
    }

    return isValid;
  }

  if (!validateForm()) {
    return; 
  }

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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
  
      if (data.success) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Registration failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(`An error occurred: ${error.message}`);
    });
  
  form.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
