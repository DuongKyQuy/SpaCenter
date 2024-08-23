const staffBooking = document.getElementById("staff-booking");
const allTimeButtons = document.querySelectorAll("#time-booking button");
const form_booking = document.getElementById("form-bookingnow")
const buttonNotDisable = document.querySelectorAll("#time-booking button:not([disabled])");

staffBooking.addEventListener("change", function () {
  const selectedStaff = this.value;
  const selectedDate = document.getElementById("date-booking").value;
  const apiUrl = API_GET_APPOINTMENT_TIME_BY_TECHNICIAN + `technician-id=${selectedStaff}&date=${selectedDate}`;

  if (selectedStaff && selectedDate) {
    buttonNotDisable.forEach(btn => btn.classList.remove("selected"));
    allTimeButtons.forEach(button => {
      button.disabled = false
    })
    async function getTimeDisableByTechnician() {
      await fetch(apiUrl, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
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
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    getTimeDisableByTechnician();
  }
});

buttonNotDisable.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    buttonNotDisable.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

async function postBooking(formDataBooking) {
  await fetch(API_POST_APPOINTMENT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formDataBooking)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.success) {
        alert("Successfull")
        window.location.href = "/Frontend/index.html"
      } else {

      }
    })
    .catch(error => {
      alert(`An error occured: ${error.message}`);
    });
}

form_booking.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name-booking").value;
  const telephone = document.getElementById("telephone-booking").value;
  const selectedDate = document.getElementById("date-booking").value;
  const selectedService = document.getElementById("service-booking").value;
  const selectedStaff = document.getElementById("staff-booking").value;
  const selectedTimeButton = document.querySelector("#time-booking button.selected");

  if (!selectedTimeButton) {
    alert("Please select an available time slot.");
    return;
  }

  const startTime = selectedTimeButton.textContent.trim();
  const startDateTime = `${selectedDate} ${startTime}:00`;

  const startDateTimeObj = new Date(`${selectedDate}T${startTime}:00`);
  console.log(startDateTimeObj);


  startDateTimeObj.setMinutes(startDateTimeObj.getMinutes() + 59);

  const endHours = startDateTimeObj.getHours().toString().padStart(2, '0');
  const endMinutes = startDateTimeObj.getMinutes().toString().padStart(2, '0');
  const endDateTime = `${selectedDate} ${endHours}:${endMinutes}:00`;

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
})

document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date-booking");
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
})
