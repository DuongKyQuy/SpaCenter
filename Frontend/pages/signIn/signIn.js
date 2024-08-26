// Get references to the password input field, the toggler icon, and the login form
const passwordInput = document.getElementById("password");
const toggler = document.getElementById("toggler");
const form = document.getElementById("loginForm");

// Add an event listener to the toggler for toggling the visibility of the password
toggler.addEventListener("click", function () {
  // Check if the password is currently hidden
  if (passwordInput.type === "password") {
    passwordInput.type = "text"; 
    toggler.classList.remove("fa-eye-slash"); 
    toggler.classList.add("fa-eye");
  } else {
    // If the password is currently visible (input type is "text")
    passwordInput.type = "password"; 
    toggler.classList.remove("fa-eye"); 
    toggler.classList.add("fa-eye-slash");
  }
});

// Function to validate the login form fields
function validateForm() {
  let isValid = true; 

  // Check if the email field is empty
  if (form.email.value.trim() === "") {
    alert("Email is required.");
    isValid = false; 
  }

  // Check if the password field is empty
  const password = form.password.value.trim();
  if (password === "") {
    alert("Password is required.");
    isValid = false;
  }

  return isValid; 
}

// Add an event listener to the form for handling form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  // If the form is not valid, stop the submission process
  if (!validateForm()) {
    return;
  }

  // Create an object to hold the form data to be sent to the server
  const formDataSignIn = {
    username: form.email.value.trim(),
    password: form.password.value.trim(), 
  };

  // Send the form data to the login API
  fetch(API_log_in, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataSignIn),
  })
    .then((response) => response.json())  
    .then((data) => {
      console.log(data);

      // If login is successful, store the token and redirect to the home page
      if (data.status === "success") {
        const token = data.data.token; 
        localStorage.setItem("authToken", token); 
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
