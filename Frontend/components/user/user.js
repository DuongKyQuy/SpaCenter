const ctnBookingDetails = document.querySelector(".container-booking-details");

function displayAppointment(appointment, index) {
  ctnBookingDetails.innerHTML += `
    <div class="booking-card highlighted">
      <div class="header">
        <div class="icon">
          ${
            appointment.isCompleted === false
              ? `<img src="/Frontend/assets/waiting.png" alt="Waiting Icon">`
              : `<img src="/Frontend/assets/check-mark.png" alt="Check Mark Icon">`
          }
        </div>
        <div class="title">${appointment.services[0].name}</div>
        <div class="actions">
          <button class="edit"><img src="/Frontend/assets/edit.png" alt=""></button>
          <button class="delete"><img src="/Frontend/assets/delete.png" alt=""></button>
        </div>
      </div>
      <hr>
      <div class="details">
        <p><span><img src="/Frontend/assets/calendar.png" alt=""></span> ${
          appointment.startDate
        }</p>
        <p><span><img src="/Frontend/assets/time-left.png" alt=""></span> ${
          appointment.endDate
        }</p>
        <p><span><img src="/Frontend/assets/user.png" alt=""></span>${
          appointment.technician.name
        }</p>
      </div>
    </div>
  `;
}

async function getAppointmentByToken() {
  try {
    const response = await fetch(API_GET_APOINTMENT_BY_TOKEN, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    // Kiểm tra nếu data trả về có dạng hợp lệ
    if (data.status === "success" && data.data && Array.isArray(data.data)) {
      // Lặp qua từng phần tử trong mảng và gọi displayAppointment cho từng phần tử
      data.data.forEach((appointment, index) => {
        displayAppointment(appointment, index);
      });
    } else {
      console.error("Invalid data format:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getAppointmentByToken();
