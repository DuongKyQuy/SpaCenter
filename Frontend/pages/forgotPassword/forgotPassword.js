const form = document.getElementById("forgotForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn form submit mặc định

  const email = form.email.value.trim();
fetch(`https://precious-buzzard-brave.ngrok-free.app/api/auth/forget-password?email=${encodeURIComponent(email)}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Parsed response data:", data); // Debug parsed data
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
})