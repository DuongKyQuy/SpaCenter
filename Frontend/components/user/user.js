const ctnBookingDetails = document.querySelector(".container-booking-details");

function displayContent(appointment, index) {
  ctnBookingDetails.innerHTML = `
    <div class="booking-card highlighted">
    <div class="header">
        <div class="icon"><img src="../../assets/waiting.png" alt=""></div>
        <div class="title">${appointment.services[0].name}</div>
        <div class="actions">
            <button class="edit"><img src="../../assets/edit.png" alt=""></button>
            <button class="delete"><img src="../../assets/delete.png" alt=""></button>
        </div>
    </div>
    <hr>
    <div class="details">
        <p><span><img src="../../assets/calendar.png" alt=""></span> ${appointment.startDate}</p>
        <p><span><img src="../../assets/time-left.png" alt=""></span> ${appointment.endDate}</p>
        <p><span><img src="../../assets/user.png" alt=""></span>${appointment.technician.name}</p>
    </div>
    </div>
  `;
}

async function getAppointmentByToken() {
  await fetch(API_GET_APOINTMENT_BY_TOKEN, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data, index) => {
      console.log(data,index);
      if (data.status === "success" && data.data && Array.isArray(data.data)) {
        displayContent(data.data[0],index);
      } else {
        console.error("Invalid data format:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
getAppointmentByToken();
