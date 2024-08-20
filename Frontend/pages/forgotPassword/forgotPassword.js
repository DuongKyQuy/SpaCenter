const form = document.getElementById("forgotForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    email: form.email.value.trim(),
  };

  fetch("https://d161-42-117-148-54.ngrok-free.app/api/auth/forget-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Reset instructions senta to your email!");
      } else {
        alert(data.message || "Failed to send reset instructions.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
});
