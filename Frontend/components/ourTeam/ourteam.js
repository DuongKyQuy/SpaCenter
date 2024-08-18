
console.log('run ourteam');
const toggles = document.getElementsByClassName("content-ourteam-toggle");
console.log('toggles:',toggles);
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", function () {
      const description = this.parentElement.nextElementSibling;
      if (description.style.display === "none" || !description.style.display) {
        description.style.display = "block";
      } else {
        description.style.display = "none";
      }
    });
  }
});
