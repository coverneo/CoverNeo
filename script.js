function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("active");
}


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        document
            .getElementById("navMenu")
            .classList.remove("active");

    });

});