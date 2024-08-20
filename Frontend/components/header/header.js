// SHOW AND HIDE USE WHEN LOGIN
const link_login = document.querySelector(".link-login");
const avt_User = document.querySelector(".link-user");

const currentUser = localStorage.getItem("authToken");

if (currentUser && link_login && avt_User) {
  link_login.classList.add("none");
  avt_User.classList.remove("none");
}

const link_log_out = document.querySelector(".link-log-out");
link_log_out.addEventListener("click", () => {
  console.log("run link log out");
});



// const btnLogout = document.querySelector('#logout');
// btnLogout.addEventListener('click', () => {
//   // Retrieve the token from localStorage
//   let token = localStorage.getItem('authToken');
//   // Parse the token to remove extra double quotes and backslashes
//   if (token) {
//     token = token.replace(/\\\"/g, ''); // Remove backslashes
//     token = token.replace(/\"/g, '');   // Remove double quotes
//   }
//   // Create the userLogout object with the parsed token
//   const userLogout = {
//     token: token,
//   };
//   console.log(userLogout);
//   async function logoutUser() {
//     const url = 'https://onlinecourse.up.railway.app/api/auth/logout';
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(userLogout),
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,  // Add Bearer token here
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to log out');
//       }
//       const data = await response.json();
//       if (data) {
//         localStorage.removeItem('user');
//         // location.reload(); // Uncomment to reload the page after logout
//       }
//     } catch (error) {
//       console.error('Logout failed:', error.message);
//     }
//   }
//   logoutUser();
// });b