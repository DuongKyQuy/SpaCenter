const form = document.getElementById("forgotForm");

// Add an event listener to handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  // Get the email value from the form, trimming any extra whitespace
  const email = form.email.value.trim();

  fetch(`https://precious-buzzard-brave.ngrok-free.app/api/auth/forget-password?email=${encodeURIComponent(email)}`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    },
  })
    .then((response) => response.json())  
    .then((data) => {
      console.log("Parsed response data:", data); 

      if (data.success) {
        alert("Reset instructions sent to your email!"); 
      } else {
        alert(data.message || "Failed to send reset instructions.");
      }
    })
    .catch((error) => {
      console.error("Error:", error); 
      alert("An error occurred. Please try again."); 
    });
});
