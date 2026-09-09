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

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =========================================
   SEARCH
========================================= */

searchBtn.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    setTimeout(() => {

        searchInput.focus();

    }, 200);

});


closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("active");

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        searchOverlay.classList.remove("active");

        closeCartDrawer();

    }

});


/* =========================================
   PRODUCT SEARCH
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


function renderSearchResults(query) {

    const cleanQuery = query
        .trim()
        .toLowerCase();


    if (!cleanQuery) {

        searchResults.innerHTML = "";

        return;

    }


    const matches = products.filter(product => {

        return (
            product.name.toLowerCase().includes(cleanQuery) ||
            product.category.toLowerCase().includes(cleanQuery)
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


    searchResults.innerHTML = matches.map(product => {

        return `
            <div class="search-result">
                <strong>${product.name}</strong>
                <span>${product.category} · ₹${product.price}</span>
            </div>
        `;

    }).join("");

}


searchInput.addEventListener("input", event => {

    renderSearchResults(event.target.value);

});


/* =========================================
   PRODUCT FILTER
========================================= */

const filters = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });

        filter.classList.add("active");


        const category = filter.dataset.filter;


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

document.querySelectorAll(".device-card").forEach(card => {

    card.addEventListener("click", () => {

        const device = card.dataset.device;

        document.getElementById("shop").scrollIntoView({
            behavior: "smooth"
        });


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


function updateCart() {

    cartCount.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;

    }


    cartItems.innerHTML = cart.map((item, index) => {

        return `
            <div class="cart-item">

                <div>

                    <h4>${item.name}</h4>

                    <p>₹${item.price}</p>

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


    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );


    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

}


function addToCart(name, price) {

    cart.push({

        name: name,

        price: Number(price)

    });


    updateCart();

    showToast(`${name} added to your bag.`);

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


window.removeFromCart = removeFromCart;


/* =========================================
   ADD TO BAG BUTTONS
========================================= */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.product;

        const price = button.dataset.price;

        addToCart(name, price);

    });

});


/* =========================================
   OPEN CART
========================================= */

function openCartDrawer() {

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

}


function closeCartDrawer() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

}


cartBtn.addEventListener("click", openCartDrawer);

closeCart.addEventListener("click", closeCartDrawer);

cartOverlay.addEventListener("click", closeCartDrawer);


/* =========================================
   CHECKOUT
========================================= */

const checkoutBtn = document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your bag is empty.");

        return;

    }


    const message = cart.map(item => {

        return `${item.name} - ₹${item.price}`;

    }).join("\n");


    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );


    const whatsappMessage = encodeURIComponent(

        `Hello CoverNeo,

I want to order:

${message}

Total: ₹${total}

Please share the next steps.`

    );


    /*
       IMPORTANT:
       Replace 919999999999 with
       your actual WhatsApp number.
    */

    window.open(
        `https://wa.me/919999999999?text=${whatsappMessage}`,
        "_blank"
    );

});


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const emailInput =
    document.getElementById("emailInput");

const newsletterMessage =
    document.getElementById("newsletterMessage");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();


    const email = emailInput.value.trim();


    if (!email) {

        newsletterMessage.textContent =
            "Please enter your email.";

        return;

    }


    newsletterMessage.textContent =
        "Thank you! You're on the list.";

    emailInput.value = "";

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 5px 30px rgba(0,0,0,0.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =========================================
   CLOSE SEARCH WITH BACKDROP
========================================= */

searchOverlay.addEventListener("click", event => {

    if (event.target === searchOverlay) {

        searchOverlay.classList.remove("active");

    }

});


/* =========================================
   INITIALIZE
========================================= */

updateCart();

console.log(
    "CoverNeo website loaded successfully."
);
