document.querySelector('.menu-toggle').addEventListener('click', function() {
    var menu = document.querySelector('.menu');
    menu.classList.toggle('active');
});

// SHOW AND HIDE USER BASED ON LOGIN STATUS
const link_login = document.querySelector(".link-login");
const avt_User = document.querySelector(".link-user");
const link_log_out = document.querySelector(".link-log-out");
const auhtToken = localStorage.getItem("authToken");

// Kiểm tra trạng thái đăng nhập khi tải trang
if (auhtToken) {
  link_login.classList.add("none");
  avt_User.classList.remove("none");
} else {
  link_login.classList.remove("none");
  avt_User.classList.add("none");
}

// Xử lý đăng xuất
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
      window.location.href = "/Frontend/index.html";
      location.reload();
    }
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
}

link_log_out.addEventListener("click", () => {
  logoutUser(auhtToken);
});
