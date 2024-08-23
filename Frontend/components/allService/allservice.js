const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const headerAllService = $(".header-allservice");
const contentAllService = $(".content-allservice");
const line = $(".header-allservice .line");

// Hàm tạo các tab tiêu đề và thiết lập tab đầu tiên là active
function createTabs(categories) {
  categories.forEach((category, index) => {
    const tab = document.createElement("div");
    tab.className = "header-allservice-title";
    if (index === 0) tab.classList.add("active");
    tab.textContent = category.name;
    headerAllService.insertBefore(tab, line);

    tab.onclick = function () {
      // Đổi tab đang active
      $(".header-allservice-title.active").classList.remove("active");
      this.classList.add("active");

      // Di chuyển đường gạch chân (underline)
      line.style.left = this.offsetLeft + "px";
      line.style.width = this.offsetWidth + "px";

      // Hiển thị nội dung tương ứng với tab
      displayContent(category);
    };
  });

  // Khởi tạo vị trí và độ rộng của đường gạch chân dưới tab đầu tiên
  const tabActive = $(".header-allservice-title.active");
  line.style.width = tabActive.offsetWidth + "px";
  line.style.left = tabActive.offsetLeft + "px";
}

// Hàm hiển thị nội dung theo tab được chọn
function displayContent(category) {
  contentAllService.innerHTML = `
    <img src="./assets/s${category.id}.jpg" alt="${category.name}" />
    <div class="wrapper-content-allservice">
      <p>${category.description || "No description available."}</p>
      <ul>
        ${category.services
      .map(
        (service) => `
          <p>
            <span>${service.name}:</span> ${service.duration} minutes - $${service.price}
          </p>
        `
      )
      .join("")}
      </ul>
      <div class="container-btn">
        <button class="btn btn-banner">Book<br />now</button>
        <svg class="row" xmlns="http://www.w3.org/2000/svg" width="72" height="16" viewBox="0 0 72 16" fill="none">
          <path d="M70.7357 8.70711C71.1262 8.31658 71.1262 7.68342 70.7357 7.29289L64.3717 0.928932C63.9812 0.538408 63.348 0.538408 62.9575 0.928932C62.567 1.31946 62.567 1.95262 62.9575 2.34315L68.6143 8L62.9575 13.6569C62.567 14.0474 62.567 14.6805 62.9575 15.0711C63.348 15.4616 63.9812 15.4616 64.3717 15.0711L70.7357 8.70711ZM0 9L70.0286 9V7L0 7L0 9Z" fill="black" />
        </svg>
      </div>
    </div>
  `;
}

// Fetch dữ liệu từ API và khởi tạo tabs
async function getCategory() {
  await fetch(API_GET_CATEGORY, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Đọc phản hồi dưới dạng JSON
    })
    .then((data) => {
      if (data.status === "success" && data.data && Array.isArray(data.data)) {
        createTabs(data.data); // Tạo tabs dựa trên dữ liệu từ API
        displayContent(data.data[0]); // Hiển thị nội dung của tab đầu tiên
      } else {
        console.error("Invalid data format:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
getCategory();
