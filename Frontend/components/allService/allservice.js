const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".header-allservice-title");
const tabActive = $(".header-allservice-title.active");
const line = $(".header-allservice .line");

requestIdleCallback(function () {
  if (tabActive) {
    line.style.width = tabActive.offsetWidth + "px";
  }
});

tabs.forEach((tab, index) => {
  tab.onclick = function () {
    $(".header-allservice-title.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
  };
});
