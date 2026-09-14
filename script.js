/* =========================================
   COVERNEO — MAIN JAVASCRIPT
   ========================================= */

"use strict";

/* =========================================
   DOM ELEMENTS
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

const newsletterForm =
    document.getElementById("newsletterForm");

const emailInput =
    document.getElementById("emailInput");

const newsletterMessage =
    document.getElementById("newsletterMessage");

const navbar =
    document.getElementById("navbar");

const yearElement =
    document.getElementById("year");


/* =========================================
   SITE SETTINGS
   ========================================= */

if (typeof COVERNEO !== "undefined") {

    const siteLogo =
        document.getElementById("siteLogo");

    const siteTagline =
        document.getElementById("siteTagline");

    const siteWhatsApp =
        document.getElementById("siteWhatsApp");

    const siteAddress =
        document.getElementById("siteAddress");

    const sitePhone =
        document.getElementById("sitePhone");

    const siteEmail =
        document.getElementById("siteEmail");


    if (siteLogo && COVERNEO.logo) {
        siteLogo.src = COVERNEO.logo;
        siteLogo.alt =
            `${COVERNEO.name || "CoverNeo"} Logo`;
    }


    if (siteTagline && COVERNEO.tagline) {
        siteTagline.textContent =
            COVERNEO.tagline;
    }


    if (siteWhatsApp && COVERNEO.whatsapp) {
        siteWhatsApp.href =
            `https://wa.me/${COVERNEO.whatsapp}`;
    }


    if (siteAddress && COVERNEO.address) {
        siteAddress.innerHTML =
            COVERNEO.address.replace(", ", ",<br>");
    }


    if (sitePhone && COVERNEO.phone) {

        const cleanPhone =
            COVERNEO.phone.replace(/\s+/g, "");

        sitePhone.href =
            `tel:${cleanPhone}`;

        sitePhone.textContent =
            COVERNEO.phone;
    }


    if (siteEmail && COVERNEO.email) {

        siteEmail.href =
            `mailto:${COVERNEO.email}`;

        siteEmail.textContent =
            COVERNEO.email;
    }
}


/* =========================================
   TOAST
   ========================================= */

let toastTimer = null;

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


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
            isActive
                ? "Close menu"
                : "Open menu"
        );
    });


    mobileMenu
        .querySelectorAll("a")
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

function openSearchOverlay() {

    if (!searchOverlay) return;

    searchOverlay.classList.add("active");

    setTimeout(() => {

        if (searchInput) {
            searchInput.focus();
        }

    }, 200);
}


function closeSearchOverlay() {

    if (!searchOverlay) return;

    searchOverlay.classList.remove("active");
}


if (searchBtn) {
    searchBtn.addEventListener(
        "click",
        openSearchOverlay
    );
}


if (closeSearch) {
    closeSearch.addEventListener(
        "click",
        closeSearchOverlay
    );
}


if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target === searchOverlay
            ) {
                closeSearchOverlay();
            }
        }
    );
}


/* =========================================
   PRODUCT DATA CHECK
   ========================================= */

const productData =
    Array.isArray(
        typeof products !== "undefined"
            ? products
            : null
    )
        ? products
        : [];


/* =========================================
   RENDER PRODUCTS
   ========================================= */

function renderProductCards() {

    const productGrid =
        document.getElementById("productGrid");

    if (!productGrid) return;

    if (productData.length === 0) {

        productGrid.innerHTML = `
            <p class="empty-products">
                Products are currently unavailable.
            </p>
        `;

        return;
    }


    productGrid.innerHTML =
        productData.map(product => {

            const name =
                product.name || "Product";

            const category =
                product.category || "";

            const filterCategory =
                product.filterCategory || "";

            const description =
                product.description || "";

            const badge =
                product.badge || "";

            const imageClass =
                product.imageClass || "";

            const mockClass =
                product.mockClass || "";

            const price =
                Number(product.price) || 0;

            const searchName =
                product.searchName || name;


            return `
                <article
                    class="product-card"
                    data-category="${filterCategory}"
                    data-name="${searchName}"
                >

                    <div class="product-image ${imageClass}">

                        ${
                            badge
                                ? `
                                    <span class="badge">
                                        ${badge}
                                    </span>
                                `
                                : ""
                        }

                        <div class="${mockClass}"></div>

                    </div>


                    <div class="product-info">

                        <div>

                            <h3>
                                ${name}
                            </h3>

                            <p>
                                ${description}
                            </p>

                        </div>

                        <strong>
                            ₹${price.toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <button
                        class="add-cart"
                        type="button"
                        data-product="${name}"
                        data-price="${price}"
                    >
                        Add to Bag
                    </button>

                </article>
            `;

        }).join("");
}


renderProductCards();


/* =========================================
   SEARCH RESULTS
   ========================================= */

function renderSearchResults(query) {

    if (!searchResults) return;

    const cleanQuery =
        String(query || "")
            .trim()
            .toLowerCase();


    if (!cleanQuery) {

        searchResults.innerHTML = "";

        return;
    }


    const matches =
        productData.filter(product => {

            const name =
                String(product.name || "")
                    .toLowerCase();

            const category =
                String(product.category || "")
                    .toLowerCase();

            const description =
                String(product.description || "")
                    .toLowerCase();

            const searchName =
                String(product.searchName || "")
                    .toLowerCase();


            return (
                name.includes(cleanQuery) ||
                category.includes(cleanQuery) ||
                description.includes(cleanQuery) ||
                searchName.includes(cleanQuery)
            );
        });


    if (matches.length === 0) {

        searchResults.innerHTML = `
            <div class="search-result">
                <strong>
                    No products found.
                </strong>

                <span>
                    Try another search.
                </span>
            </div>
        `;

        return;
    }


    searchResults.innerHTML =
        matches.map(product => {

            const price =
                Number(product.price) || 0;

            return `
                <button
                    type="button"
                    class="search-result"
                    data-search-product="${product.name}"
                >

                    <strong>
                        ${product.name}
                    </strong>

                    <span>
                        ${product.category || ""}
                        ·
                        ₹${price.toLocaleString("en-IN")}
                    </span>

                </button>
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
   SEARCH RESULT CLICK
   ========================================= */

if (searchResults) {

    searchResults.addEventListener(
        "click",
        event => {

            const result =
                event.target.closest(
                    "[data-search-product]"
                );

            if (!result) return;

            const productName =
                result.dataset.searchProduct;

            closeSearchOverlay();

            if (searchInput) {
                searchInput.value = "";
            }

            const productCard =
                Array.from(
                    document.querySelectorAll(
                        ".product-card"
                    )
                ).find(card =>
                    card.dataset.name === productName
                );


            if (productCard) {

                productCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                productCard.animate(
                    [
                        {
                            transform: "scale(1)"
                        },
                        {
                            transform: "scale(1.03)"
                        },
                        {
                            transform: "scale(1)"
                        }
                    ],
                    {
                        duration: 500
                    }
                );
            }
        }
    );
}


/* =========================================
   PRODUCT FILTER
   ========================================= */

function applyProductFilter(category) {

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    productCards.forEach(card => {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";
        }
    });
}


const filters =
    document.querySelectorAll(".filter");


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            filter.classList.add("active");


            const category =
                filter.dataset.filter || "all";


            applyProductFilter(category);
        }
    );
});


/* =========================================
   CATEGORY CARD CLICK
   ========================================= */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        const category =
            card.dataset.categoryLink;

        if (!category) return;


        function openCategory() {

            const filterButton =
                document.querySelector(
                    `.filter[data-filter="${category}"]`
                );


            if (filterButton) {
                filterButton.click();
            }


            const shopSection =
                document.getElementById("shop");


            if (shopSection) {

                shopSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }


        card.addEventListener(
            "click",
            event => {

                /*
                 * Do not interfere with
                 * actual links/buttons.
                 */

                if (
                    event.target.closest("a") ||
                    event.target.closest("button")
                ) {
                    return;
                }

                openCategory();
            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openCategory();
                }
            }
        );
    });


/* =========================================
   DEVICE SECTION
   ========================================= */

/*
 * Your current products.js does not contain
 * device compatibility data.
 *
 * Therefore we do NOT pretend that Apple,
 * Samsung or Pixel products are being filtered.
 *
 * Clicking a device currently takes the user
 * to the shop and shows a helpful message.
 */

document
    .querySelectorAll(".device-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const device =
                    card.dataset.device ||
                    "selected device";


                const shopSection =
                    document.getElementById("shop");


                if (shopSection) {

                    shopSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }


                setTimeout(() => {

                    showToast(
                        `Accessories for ${device} are coming soon.`
                    );

                }, 500);
            }
        );
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


    if (!cartItems || !cartTotal) {
        return;
    }


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

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>

                    </div>


                    <button
                        type="button"
                        class="remove-item"
                        data-remove-index="${index}"
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

    const numericPrice =
        Number(price);


    if (!name || !Number.isFinite(numericPrice)) {

        showToast(
            "Product information unavailable."
        );

        return;
    }


    cart.push({
        name: name,
        price: numericPrice
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

    const numericIndex =
        Number(index);


    if (
        !Number.isInteger(numericIndex) ||
        numericIndex < 0 ||
        numericIndex >= cart.length
    ) {
        return;
    }


    const removedItem =
        cart[numericIndex];


    cart.splice(
        numericIndex,
        1
    );


    updateCart();


    if (removedItem) {

        showToast(
            `${removedItem.name} removed from your bag.`
        );
    }
}


/*
 * Keep global function compatibility
 * in case any existing HTML uses it.
 */

window.removeFromCart =
    removeFromCart;


/* =========================================
   ADD TO BAG
   ========================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".add-cart"
            );

        if (!button) return;


        const name =
            button.dataset.product;

        const price =
            button.dataset.price;


        addToCart(
            name,
            price
        );
    }
);


/* =========================================
   REMOVE FROM BAG
   ========================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-remove-index]"
            );

        if (!button) return;


        removeFromCart(
            button.dataset.removeIndex
        );
    }
);


/* =========================================
   OPEN CART
   ========================================= */

function openCartDrawer() {

    if (!cartDrawer || !cartOverlay) {
        return;
    }


    cartDrawer.classList.add(
        "active"
    );

    cartOverlay.classList.add(
        "active"
    );
}


/* =========================================
   CLOSE CART
   ========================================= */

function closeCartDrawer() {

    if (!cartDrawer || !cartOverlay) {
        return;
    }


    cartDrawer.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );
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
   WHATSAPP CHECKOUT
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


            if (
                typeof COVERNEO === "undefined" ||
                !COVERNEO.whatsapp
            ) {

                showToast(
                    "WhatsApp checkout is unavailable."
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


            const whatsappURL =
                `https://wa.me/${COVERNEO.whatsapp}?text=${whatsappMessage}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );
}


/* =========================================
   NEWSLETTER
   ========================================= */

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


            if (!emailInput.checkValidity()) {

                newsletterMessage.textContent =
                    "Please enter a valid email.";

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

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();
}


/* =========================================
   NAVBAR SCROLL EFFECT
   ========================================= */

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
        },
        {
            passive: true
        }
    );
}


/* =========================================
   KEYBOARD CONTROLS
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        closeSearchOverlay();

        closeCartDrawer();


        if (mobileMenu) {

            mobileMenu.classList.remove(
                "active"
            );
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
);


/* =========================================
   INITIALIZE
   ========================================= */

updateCart();

console.log(
    "CoverNeo website loaded successfully."
);
