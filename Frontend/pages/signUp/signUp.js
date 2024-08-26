// Get the password input field, toggler button, and registration form by their IDs
const passwordInput = document.getElementById("password");
const toggler = document.getElementById("toggler");
const form = document.getElementById("registerForm");

// Add an event listener to the toggler button for toggling password visibility
toggler.addEventListener("click", function () {
  // If the password is currently hidden, show it
  if (passwordInput.type === "password") {
    passwordInput.type = "text"; 
    toggler.classList.remove("fa-eye-slash"); 
    toggler.classList.add("fa-eye"); 
  } else {
    // If the password is currently shown, hide it
    passwordInput.type = "password"; 
    toggler.classList.remove("fa-eye"); 
    toggler.classList.add("fa-eye-slash"); 
  }
});

// Add an event listener to the form for handling form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); 

  // Function to validate the form input fields
  function validateForm() {
    let isValid = true; 

    // Validate the fullname field
    if (form.fullname.value.trim() === "") {
      alert("Fullname is required."); 
      isValid = false;
    }

    // Validate the email field
    if (form.email.value.trim() === "") {
      alert("Email is required."); 
      isValid = false; 
    } else if (!validateEmail(form.email.value.trim())) {
      alert("Please enter a valid email address."); 
      isValid = false; 
    }

    const password = form.password.value.trim(); // Get and trim the password input

    // Validate the password field
    if (password === "") {
      alert("Password is required."); 
      isValid = false; 
    } else {

      if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        isValid = false; 
      }
      
      if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one uppercase letter.");
        isValid = false; 
      }
      
      if (!/[a-z]/.test(password)) {
        alert("Password must contain at least one lowercase letter.");
        isValid = false; 
      }
      
      if (!/[0-9]/.test(password)) {
        alert("Password must contain at least one number.");
        isValid = false; 
      }
      
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        alert("Password must contain at least one special character.");
        isValid = false; 
      }
    }

    return isValid; 
  }

  // If form validation fails, stop the form submission
  if (!validateForm()) {
    return; 
  }

  // Create an object to hold the form data
  const formData = {
    fullname: form.fullname.value, 
    email: form.email.value, 
    password: form.password.value, 
    phone: form.phone.value, 
  };

  // Send the form data to the API for registration
  fetch(API_sign_up, {
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
        alert("Registration successful! Redirecting to sign in page.");
        window.location.href = "/Frontend/pages/signIn/signIn.html"; 
      } else {
        alert(data.message || "Registration failed."); 
      }
    })
    .catch((error) => {
      console.error("Error:", error); 
      alert(`An error occurred: ${error.message}`); 
    });
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}