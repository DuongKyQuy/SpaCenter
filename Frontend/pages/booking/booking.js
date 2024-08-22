document
  .getElementById("staff-booking")
  .addEventListener("change", function () {
    const selectedStaff = this.value;
    const selectedDate = document.getElementById("date-booking").value;

    if (selectedStaff && selectedDate) {
      const apiUrl =
        API_GET_APPOINTMENT_TIME_BY_TECHNICIAN +
        `technician-id=${selectedStaff}&date=${selectedDate}`;
      console.log(apiUrl);

      fetch(apiUrl, {
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
          console.log(data);

          const allTimeButtons = document.querySelectorAll(
            "#time-booking button"
          );

          allTimeButtons.forEach((button) => {
            const buttonTime = button.textContent.trim();
            const formattedButtonTime = `${selectedDate} ${buttonTime}`;

            data.data.forEach((appointment) => {
              const appointmentDate = new Date(appointment.startDate);
              const buttonDate = new Date(formattedButtonTime);

              if (appointmentDate.getTime() === buttonDate.getTime()) {
                button.disabled = true;
              }
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  });

// document
//   .getElementById("staff-booking")
//   .addEventListener("change", function () {
//     const selectedStaff = this.value;
//     const selectedDate = document.getElementById("date-booking").value;

//     async function getTime() {
//       if (selectedStaff && selectedDate) {
//         const apiUrl =
//           API_GET_APPOINTMENT_TIME_BY_TECHNICIAN +
//           `technician-id=${selectedStaff}&date=${selectedDate}`;

//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "ngrok-skip-browser-warning": "69420",
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);

//         const allTimeButtons = document.querySelectorAll(
//           "#time-booking button"
//         );

//         allTimeButtons.forEach((button) => {
//           const buttonTime = button.textContent.trim();
//           const formattedButtonTime = `${selectedDate} ${buttonTime}`;

//           data.data.forEach((appointment) => {
//             const appointmentDate = new Date(appointment.startDate);
//             const buttonDate = new Date(formattedButtonTime);

//             if (appointmentDate.getTime() === buttonDate.getTime()) {
//               button.disabled = true;
//             }
//           });
//         });
//       }
//     }
//     getTime();
//   });
