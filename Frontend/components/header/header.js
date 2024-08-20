// SHOW AND HIDE USE WHEN LOGIN
const link_login = document.querySelector(".link-login");
const avt_User = document.querySelector(".link-user");

const currentUser = localStorage.getItem("authToken");

if (currentUser && link_login && avt_User) {
  link_login.classList.add("none");
  avt_User.classList.remove("none");
}
