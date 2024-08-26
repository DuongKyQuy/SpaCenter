// Select the required DOM elements
const staffBooking = document.getElementById("staff-booking");
const allTimeButtons = document.querySelectorAll("#time-booking button");
const form_booking = document.getElementById("form-bookingnow");
const buttonNotDisable = document.querySelectorAll("#time-booking button:not([disabled])");
const dateInput = document.getElementById("date-booking");

// Set the default date input to tomorrow's date and disable past dates
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  
  // Set min attribute to tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];
  dateInput.setAttribute("min", tomorrowDate);
  
  // Default date to tomorrow
  dateInput.value = tomorrowDate;
});

// Event listener for changes in staff selection
staffBooking.addEventListener("change", function () {
  const selectedStaff = this.value;
  const selectedDate = document.getElementById("date-booking").value;
  const apiUrl = `${API_GET_APPOINTMENT_TIME_BY_TECHNICIAN}technician-id=${selectedStaff}&date=${selectedDate}`;

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

// Event listener for changes in date selection
dateInput.addEventListener("change", function () {
  const selectedDate = new Date(this.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If selected date is before today, reset it to tomorrow
  if (selectedDate < today) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.value = tomorrow.toISOString().split('T')[0];
    alert("Please select a date from tomorrow onwards.");
  }

  // Re-enable all time buttons if the date is valid
  allTimeButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove("selected");
  });

  // Additional logic can go here to disable time slots based on selected date and staff
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

  
  postBooking(formDataBooking);
});
