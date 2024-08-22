// SHOW AND HIDE USE WHEN LOGIN
const link_login = document.querySelector(".link-login");
const avt_User = document.querySelector(".link-user");

const link_log_out = document.querySelector(".link-log-out");
const auhtToken = localStorage.getItem("authToken");


if (auhtToken && link_login && avt_User) {
  link_login.classList.add("none");
  avt_User.classList.remove("none");
}

async function logoutUser(token) {
  try {
    const response = await fetch(API_log_out, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to log out");
    }
    const data = await response.json();
    if (data) {
      console.log(data);
      localStorage.removeItem("authToken");
      location.reload();
    }
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
}

link_log_out.addEventListener("click", () => {
  logoutUser(auhtToken);
});
