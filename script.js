```javascript
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

const checkoutBtn = document.getElementById("checkoutBtn");

const toast = document.getElementById("toast");


/* =========================================
   MOBILE MENU
========================================= */

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        const isActive =
            mobileMenu.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            isActive ? "true" : "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            isActive ? "Close menu" : "Open menu"
        );

    });


    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

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

}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (searchOverlay) {

            searchOverlay.classList.remove("active");

        }

        closeCartDrawer();

        if (mobileMenu) {

            mobileMenu.classList.remove("active");

        }

        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    }

});


/* =========================================
   PRODUCT DATABASE
========================================= */

const products = [

    {
        name: "NeoShield Clear Case",
        category: "Cases",
        price: 699
    },

    {
        name: "NeoCharge 25W",
        category: "Power",
        price: 999
    },

    {
        name: "NeoGlass Privacy",
        category: "Protection",
        price: 399
    },

    {
        name: "NeoFlex Cable",
        category: "Cables",
        price: 499
    },

    {
        name: "NeoPower 10K",
        category: "Power Bank",
        price: 1499
    },

    {
        name: "NeoArmor MagSafe",
        category: "Cases",
        price: 899
    }

];


/* =========================================
   PRODUCT SEARCH
========================================= */

function renderSearchResults(query) {

    if (!searchResults) return;


    const cleanQuery =
        query.trim().toLowerCase();


    if (!cleanQuery) {

        searchResults.innerHTML = "";

        return;

    }


    const matches = products.filter(product => {

        return (
            product.name
                .toLowerCase()
                .includes(cleanQuery) ||

            product.category
                .toLowerCase()
                .includes(cleanQuery)
        );

    });


    if (matches.length === 0) {

        searchResults.innerHTML = `
            <div class="search-result">
                <strong>No products found.</strong>
                <span>Try another search.</span>
            </div>
        `;

        return;

    }


    searchResults.innerHTML =
        matches.map(product => {

            return `
                <div class="search-result">
                    <strong>${product.name}</strong>
                    <span>
                        ${product.category} · ₹${product.price.toLocaleString("en-IN")}
                    </span>
                </div>
            `;

        }).join("");

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            renderSearchResults(
                event.target.value
            );

        }
    );

}


/* =========================================
   PRODUCT FILTER
========================================= */

const filters =
    document.querySelectorAll(".filter");

const productCards =
    document.querySelectorAll(".product-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });


        filter.classList.add("active");


        const category =
            filter.dataset.filter;


        productCards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================================
   DEVICE FILTER
========================================= */

document
    .querySelectorAll(".device-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const device =
                card.dataset.device;


            const shopSection =
                document.getElementById("shop");


            if (shopSection) {

                shopSection.scrollIntoView({
                    behavior: "smooth"
                });

            }


            setTimeout(() => {

                showToast(
                    `Showing accessories for ${device}`
                );

            }, 500);

        });

    });


/* =========================================
   CART SYSTEM
========================================= */

let cart = [];


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    if (cartCount) {

        cartCount.textContent =
            cart.length;

    }


    if (!cartItems || !cartTotal) return;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;

    }


    cartItems.innerHTML =
        cart.map((item, index) => {

            return `
                <div class="cart-item">

                    <div>

                        <h4>${item.name}</h4>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>

                    </div>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>
            `;

        }).join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price,
            0
        );


    cartTotal.textContent =
        "₹" +
        total.toLocaleString("en-IN");

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(name, price) {

    cart.push({

        name: name,

        price: Number(price)

    });


    updateCart();

    showToast(
        `${name} added to your bag.`
    );

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {

        return;

    }


    const removedItem =
        cart[index];


    cart.splice(index, 1);


    updateCart();


    showToast(
        `${removedItem.name} removed from your bag.`
    );

}


window.removeFromCart =
    removeFromCart;


/* =========================================
   ADD TO BAG BUTTONS
========================================= */

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const name =
                    button.dataset.product;

                const price =
                    button.dataset.price;


                if (!name || !price) {

                    showToast(
                        "Product information unavailable."
                    );

                    return;

                }


                addToCart(name, price);

            }
        );

    });


/* =========================================
   OPEN CART
========================================= */

function openCartDrawer() {

    if (!cartDrawer || !cartOverlay) {
        return;
    }


    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

}


/* =========================================
   CLOSE CART
========================================= */

function closeCartDrawer() {

    if (!cartDrawer || !cartOverlay) {
        return;
    }


    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

}


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCartDrawer
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartDrawer
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartDrawer
    );

}


/* =========================================
   CHECKOUT — WHATSAPP
========================================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Your bag is empty."
                );

                return;

            }


            const message =
                cart.map(item => {

                    return (
                        `${item.name} - ₹` +
                        item.price.toLocaleString("en-IN")
                    );

                }).join("\n");


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum + item.price,
                    0
                );


            const whatsappMessage =
                encodeURIComponent(

                    `Hello CoverNeo,

I want to order:

${message}

Total: ₹${total.toLocaleString("en-IN")}

Please share the next steps.`

                );


            /*
               CoverNeo WhatsApp Number
               +91 9319990227
            */

            window.open(
                `https://wa.me/919319990227?text=${whatsappMessage}`,
                "_blank"
            );

        }
    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    if (!toast) return;


    toast.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );

const emailInput =
    document.getElementById(
        "emailInput"
    );

const newsletterMessage =
    document.getElementById(
        "newsletterMessage"
    );


if (
    newsletterForm &&
    emailInput &&
    newsletterMessage
) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            if (!email) {

                newsletterMessage.textContent =
                    "Please enter your email.";

                return;

            }


            newsletterMessage.textContent =
                "Thank you! You're on the list.";


            emailInput.value = "";

        }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.getElementById("navbar");


if (navbar) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 5px 30px rgba(0,0,0,0.06)";

            } else {

                navbar.style.boxShadow =
                    "none";

            }

        }
    );

}


/* =========================================
   CLOSE SEARCH WITH BACKDROP
========================================= */

if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchOverlay
            ) {

                searchOverlay.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

updateCart();


console.log(
    "CoverNeo website loaded successfully."
);
```
