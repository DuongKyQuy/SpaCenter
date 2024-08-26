// Select the required DOM elements
const staffBooking = document.getElementById("staff-booking");
const allTimeButtons = document.querySelectorAll("#time-booking button");
const form_booking = document.getElementById("form-bookingnow");
const buttonNotDisable = document.querySelectorAll("#time-booking button:not([disabled])");

// Event listener for changes in staff selection
staffBooking.addEventListener("change", function () {
  const selectedStaff = this.value;
  const selectedDate = document.getElementById("date-booking").value;
  const apiUrl = `${API_GET_APPOINTMENT_TIME_BY_TECHNICIAN}technician-id=${selectedStaff}&date=${selectedDate}`;

  // If both staff and date are selected
  if (selectedStaff && selectedDate) {
    buttonNotDisable.forEach(btn => btn.classList.remove("selected"));
    allTimeButtons.forEach(button => {
      button.disabled = false;
    });

    // Async function to fetch and disable time slots based on technician's schedule
    async function getTimeDisableByTechnician() {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Disable time buttons that fall within booked appointments
        allTimeButtons.forEach((button) => {
          const buttonTime = button.textContent.trim();
          const formattedButtonTime = `${selectedDate} ${buttonTime}`;

          data.data.forEach((appointment) => {
            const buttonDate = new Date(formattedButtonTime);
            const appointmentStartDate = new Date(appointment.startDate);
            const appointmentEndDate = new Date(appointment.endDate);

            if (buttonDate >= appointmentStartDate && buttonDate <= appointmentEndDate) {
              button.disabled = true;
            }
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getTimeDisableByTechnician();
  }
});

// Add event listeners to available time buttons to handle selection
buttonNotDisable.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    // Remove 'selected' class from all buttons and add it to the clicked button
    buttonNotDisable.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

// Function to post booking data to the server
async function postBooking(formDataBooking) {
  try {
    const response = await fetch(API_POST_APPOINTMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formDataBooking)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    if (data.status === 'success') {
      alert("Successfully booked");
      window.location.href = "/Frontend/index.html";
    } else {
      // Handle unsuccessful booking (optional)
    }
  } catch (error) {
    alert(`An error occurred: ${error.message}`);
  }
}

// Event listener for form submission
form_booking.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name-booking").value;
  const telephone = document.getElementById("telephone-booking").value;
  const selectedDate = document.getElementById("date-booking").value;
  const selectedService = document.getElementById("service-booking").value;
  const selectedStaff = document.getElementById("staff-booking").value;
  const selectedTimeButton = document.querySelector("#time-booking button.selected");

  // Check if a time slot is selected
  if (!selectedTimeButton) {
    alert("Please select an available time slot.");
    return;
  }

  // Calculate the end time of the appointment
  const startTime = selectedTimeButton.textContent.trim();
  const startDateTime = `${selectedDate} ${startTime}:00`;
  const startDateTimeObj = new Date(`${selectedDate}T${startTime}:00`);
  startDateTimeObj.setMinutes(startDateTimeObj.getMinutes() + 59);

  const endHours = startDateTimeObj.getHours().toString().padStart(2, '0');
  const endMinutes = startDateTimeObj.getMinutes().toString().padStart(2, '0');
  const endDateTime = `${selectedDate} ${endHours}:${endMinutes}:00`;

  // Create the form data object
  const formDataBooking = {
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    description: `${name} - ${telephone}`,
    technician: {
      id: selectedStaff,
    },
    services: [
      {
        id: selectedService,
      }
    ]
  };

  console.log("Posting the following data:", formDataBooking);

  postBooking(formDataBooking);
});

// Set the default date input to today’s date
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date-booking");
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
});
