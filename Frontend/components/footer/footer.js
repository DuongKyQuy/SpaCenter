function applyToggle() {
    if (window.innerWidth <= 1024) { 
        var headers = document.querySelectorAll('.infor h4, .customer-service h4, .connect h4');

        headers.forEach(function(header) {
            header.addEventListener('click', function () {
                var links = this.nextElementSibling;
                var icon = this.querySelector('.toggle-icon');

                if (links.style.display === "none" || links.style.display === "") {
                    links.style.display = "block";
                    icon.textContent = "-";
                } else {
                    links.style.display = "none";
                    icon.textContent = "+";
                }
            });
        });
    }
}

