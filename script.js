/* =========================================
   COVERNEO JAVASCRIPT
========================================= */


/* =========================================
   BASIC ELEMENTS
========================================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");


/* =========================================
   MOBILE MENU
========================================= */

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}


if (mobileMenu) {

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });

}


/* =========================================
   SEARCH
========================================= */

if (
    searchBtn &&
    searchOverlay &&
    searchInput &&
    closeSearch
) {

    searchBtn.addEventListener("click", () => {

        searchOverlay.classList.add("active");

        setTimeout(() => {

            searchInput.focus();

        }, 200);

    });


    closeSearch.addEventListener("click", () => {

        searchOverlay.classList.remove("active");

    });


    searchOverlay.addEventListener("click", event => {

        if (event.target === searchOverlay) {

            searchOverlay.classList.remove("active");

        }

    });

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    if (searchOverlay) {
        searchOverlay.classList.remove("active");
    }

    closeCartDrawer();

});
