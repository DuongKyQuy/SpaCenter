const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $(".header-allservice");
const line = $(".header-allservice .line");
const contentArea = $(".content-allservice");

// Function to create tab titles and set the first one as active
function createTabs(categories) {
  categories.forEach((category, index) => {
    const tab = document.createElement("div");
    tab.className = "header-allservice-title";
    if (index === 0) tab.classList.add("active");
    tab.textContent = category.name;
    tabs.insertBefore(tab, line);

    tab.onclick = function () {
      // Change active tab
      $(".header-allservice-title.active").classList.remove("active");
      this.classList.add("active");

      // Move the underline line
      line.style.left = this.offsetLeft + "px";
      line.style.width = this.offsetWidth + "px";

      // Display content related to the tab
      displayContent(category);
    };
  });

  // Initialize the line under the first active tab
  const tabActive = $(".header-allservice-title.active");
  line.style.width = tabActive.offsetWidth + "px";
  line.style.left = tabActive.offsetLeft + "px";
}

// Function to display content
function displayContent(category) {
  contentArea.innerHTML = `
        <img src="./assets/s1.jpg" alt="${category.name}" />
        <div class="wrapper-content-allservice">
            <p>${category.description}</p>
            <div class="container-btn">
                <button class="btn btn-banner">Book<br />now</button>
                <svg class="row" xmlns="http://www.w3.org/2000/svg" width="72" height="16" viewBox="0 0 72 16" fill="none">
                    <path d="M70.7357 8.70711C71.1262 8.31658 71.1262 7.68342 70.7357 7.29289L64.3717 0.928932C63.9812 0.538408 63.348 0.538408 62.9575 0.928932C62.567 1.31946 62.567 1.95262 62.9575 2.34315L68.6143 8L62.9575 13.6569C62.567 14.0474 62.567 14.6805 62.9575 15.0711C63.348 15.4616 63.9812 15.4616 64.3717 15.0711L70.7357 8.70711ZM0 9L70.0286 9V7L0 7L0 9Z" fill="black" />
                </svg>
            </div>
        </div>
    `;
}

// Fetch data from API
// fetch("https://d161-42-117-148-54.ngrok-free.app/api/categories")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });
  