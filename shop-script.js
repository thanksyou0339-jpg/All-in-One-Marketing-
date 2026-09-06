/* =========================================================
   JANJUA TRADERS
   SHOP SCRIPT
   Firebase Products + Search + Categories + Featured
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyA8_4ArKXAdfKWZ5mi5DaT9qiayL3h_Yzw",

    authDomain:
        "janjua-traders.firebaseapp.com",

    projectId:
        "janjua-traders",

    storageBucket:
        "janjua-traders.firebasestorage.app",

    messagingSenderId:
        "154904774188",

    appId:
        "1:154904774188:web:1830f9d533e77dae6a7389"
};


/* =========================================================
   FIREBASE
========================================================= */

const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


/* =========================================================
   DOM
========================================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );

const pageStatus =
    document.getElementById(
        "pageStatus"
    );

const productCount =
    document.getElementById(
        "productCount"
    );

const sliderLoading =
    document.getElementById(
        "sliderLoading"
    );

const slider =
    document.getElementById(
        "slider"
    );

const sliderTrack =
    document.getElementById(
        "sliderTrack"
    );

const categories =
    document.getElementById(
        "categories"
    );

const productsLoading =
    document.getElementById(
        "productsLoading"
    );

const productsGrid =
    document.getElementById(
        "productsGrid"
    );


/* =========================================================
   DATA
========================================================= */

let products = [];

let selectedCategory = "All";

let searchText = "";


/* =========================================================
   SETTINGS
========================================================= */

const NEW_ITEM_DAYS = 7;


/* =========================================================
   MONEY
========================================================= */

function rupees(value) {

    const number =
        Number(value || 0);

    return (
        "Rs. " +
        number.toLocaleString(
            "en-PK"
        )
    );
}


/* =========================================================
   NEW PRODUCT
========================================================= */

function isNewProduct(product) {

    const dateValue =
        product.createdAt ||
        product.updatedAt;

    if (!dateValue) {
        return false;
    }


    let date;


    if (
        typeof dateValue.toDate ===
        "function"
    ) {

        date =
            dateValue.toDate();

    } else if (
        dateValue instanceof Date
    ) {

        date =
            dateValue;

    } else {

        date =
            new Date(dateValue);
    }


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return false;
    }


    const now =
        Date.now();

    const difference =
        now - date.getTime();

    const days =
        difference /
        (
            1000 *
            60 *
            60 *
            24
        );


    return (
        days >= 0 &&
        days <= NEW_ITEM_DAYS
    );
}


/* =========================================================
   FIREBASE DATE
========================================================= */

function dateValueToNumber(value) {

    if (!value) {
        return 0;
    }


    if (
        typeof value.toMillis ===
        "function"
    ) {

        return value.toMillis();
    }


    if (
        typeof value.toDate ===
        "function"
    ) {

        return value.toDate().getTime();
    }


    if (
        value instanceof Date
    ) {

        return value.getTime();
    }


    const date =
        new Date(value);


    const time =
        date.getTime();


    return Number.isNaN(time)
        ? 0
        : time;
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(value) {

    return escapeHtml(value);
}


/* =========================================================
   LOAD PRODUCTS
========================================================= */

async function loadProducts() {

    try {

        showStatus(
            "Products loading...",
            "info"
        );


        productsLoading.style.display =
            "flex";


        const snapshot =
            await getDocs(
                collection(
                    db,
                    "products"
                )
            );


        products = [];


        snapshot.forEach(
            (docSnap) => {

                const data =
                    docSnap.data();


                const product = {

                    docId:
                        docSnap.id,

                    id:
                        data.Product_ID ||
                        data.productId ||
                        data.id ||
                        docSnap.id,

                    name:
                        data.Product_Name ||
                        data.Product ||
                        data.productName ||
                        "",

                    description:
                        data.Product_Description ||
                        data.description ||
                        "",

                    price:
                        data.Product_Price ??
                        data.price ??
                        0,

                    oldPrice:
                        data.Old_Price ??
                        data.oldPrice ??
                        "",

                    category:
                        data.Category ||
                        data.category ||
                        "Other",

                    image:
                        data.Product_Image ||
                        data.image ||
                        data.imageUrl ||
                        "",

                    deliveryType:
                        data.Delivery_Type ||
                        data.deliveryType ||
                        "FREE",

                    deliveryCharges:
                        data.Delivery_Charges ??
                        data.deliveryCharges ??
                        0,

                    supplierLink:
                        data.supplierLink ||
                        data.Supplier_Link ||
                        "",

                    socialLink:
                        data.socialLink ||
                        data.Social_Link ||
                        "",

                    janjuaLink:
                        data.Janjua_Link ||
                        "",

                    createdAt:
                        data.createdAt ||
                        null,

                    updatedAt:
                        data.updatedAt ||
                        null
                };


                /*
                 * Only display products
                 * that have a name.
                 */

                if (
                    product.name
                        .trim()
                        .length > 0
                ) {

                    products.push(
                        product
                    );
                }

            }
        );


        /*
         * Newest first
         */

        products.sort(
            (a, b) => {

                const dateA =
                    dateValueToNumber(
                        a.createdAt ||
                        a.updatedAt
                    );

                const dateB =
                    dateValueToNumber(
                        b.createdAt ||
                        b.updatedAt
                    );


                return dateB - dateA;
            }
        );


        buildCategories();

        renderFeatured();

        showProducts();


        productsLoading.style.display =
            "none";


        if (products.length) {

            showStatus(
                "Products loaded successfully.",
                "ok"
            );

        } else {

            showStatus(
                "No products available yet.",
                "info"
            );
        }


        setTimeout(
            () => {

                hideStatus();

            },
            2500
        );


    } catch (error) {

        console.error(
            "Products loading error:",
            error
        );


        productsLoading.style.display =
            "none";


        productsGrid.innerHTML = `
            <div class="empty-box">
                Products load نہیں ہو سکے۔
                <br><br>
                Please try again.
            </div>
        `;


        productCount.textContent =
            "Error";


        showStatus(
            getFirebaseErrorMessage(
                error
            ),
            "error"
        );
    }
}


/* =========================================================
   FIREBASE ERROR
========================================================= */

function getFirebaseErrorMessage(
    error
) {

    if (!error) {
        return "Something went wrong.";
    }


    if (
        error.code ===
        "permission-denied"
    ) {

        return (
            "Firebase permission denied. " +
            "Firestore Rules check کریں۔"
        );
    }


    if (
        error.code ===
        "failed-precondition"
    ) {

        return (
            "Firebase query/configuration issue."
        );
    }


    if (
        error.code ===
        "unavailable"
    ) {

        return (
            "Firebase temporarily unavailable."
        );
    }


    return (
        "Products load نہیں ہو سکے۔"
    );
}


/* =========================================================
   CATEGORIES
========================================================= */

function buildCategories() {

    categories.innerHTML = "";


    const categoryMap =
        new Map();


    /*
     * Main four categories
     */

    categoryMap.set(
        "Motorcycle",
        "🏍️ Motorcycle"
    );

    categoryMap.set(
        "Cars & Spare Parts",
        "🚗 Cars & Spare Parts"
    );

    categoryMap.set(
        "General Products",
        "🛍️ General Products"
    );

    categoryMap.set(
        "Food",
        "🍔 Food"
    );


    /*
     * Add categories actually
     * found in products.
     */

    products.forEach(
        (product) => {

            const category =
                String(
                    product.category ||
                    "Other"
                ).trim();


            if (
                category &&
                !categoryMap.has(
                    category
                )
            ) {

                categoryMap.set(
                    category,
                    category
                );
            }

        }
    );


    /*
     * All button
     */

    addCategoryButton(
        "All",
        "✨ All"
    );


    /*
     * Main/custom categories
     */

    categoryMap.forEach(
        (label, value) => {

            addCategoryButton(
                value,
                label
            );

        }
    );


    /*
     * Select All initially
     */

    updateActiveCategory();
}


/* =========================================================
   ADD CATEGORY BUTTON
========================================================= */

function addCategoryButton(
    value,
    label
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "category-btn";


    button.dataset.category =
        value;


    button.textContent =
        label;


    button.addEventListener(
        "click",
        () => {

            selectedCategory =
                value;

            updateActiveCategory();

            showProducts();
        }
    );


    categories.appendChild(
        button
    );
}


/* =========================================================
   ACTIVE CATEGORY
========================================================= */

function updateActiveCategory() {

    const buttons =
        categories.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(
        (button) => {

            button.classList.toggle(
                "active",
                button.dataset.category ===
                selectedCategory
            );

        }
    );
}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    const text =
        searchText
            .trim()
            .toLowerCase();


    return products.filter(
        (product) => {

            const category =
                String(
                    product.category ||
                    "Other"
                ).trim();


            const categoryMatch =
                selectedCategory ===
                "All" ||
                category ===
                selectedCategory;


            if (!categoryMatch) {
                return false;
            }


            if (!text) {
                return true;
            }


            const searchableText = (

                String(
                    product.name ||
                    ""
                ) +

                " " +

                String(
                    product.description ||
                    ""
                ) +

                " " +

                String(
                    product.category ||
                    ""
                ) +

                " " +

                String(
                    product.id ||
                    ""
                )

            ).toLowerCase();


            return searchableText.includes(
                text
            );
        }
    );
}


/* =========================================================
   SHOW PRODUCTS
========================================================= */

function showProducts() {

    const filtered =
        getFilteredProducts();


    productCount.textContent =
        filtered.length +
        (
            filtered.length === 1
                ? " Product"
                : " Products"
        );


    productsGrid.innerHTML = "";


    if (!filtered.length) {

        productsGrid.innerHTML = `

            <div
                class="empty-box"
                style="grid-column:1/-1;"
            >

                کوئی product نہیں ملا۔

                <br><br>

                Search یا category change کریں۔

            </div>

        `;

        return;
    }


    filtered.forEach(
        (product) => {

            productsGrid.appendChild(
                createProductCard(
                    product
                )
            );

        }
    );
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(
    product
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "product-card";


    const image =
        escapeAttribute(
            product.image
        );


    const name =
        escapeHtml(
            product.name
        );


    const description =
        escapeHtml(
            product.description
        );


    const category =
        escapeHtml(
            product.category ||
            "Other"
        );


    const price =
        rupees(
            product.price
        );


    let oldPriceHtml =
        "";


    if (
        product.oldPrice !== "" &&
        product.oldPrice !== null &&
        Number(product.oldPrice) > 0 &&
        Number(product.oldPrice) >
            Number(product.price)
    ) {

        oldPriceHtml = `

            <span class="old-price">

                ${rupees(
                    product.oldPrice
                )}

            </span>

        `;
    }


    let imageHtml;


    if (image) {

        imageHtml = `

            <img
                src="${image}"
                alt="${name}"
                loading="lazy"
                onerror="this.style.display='none';this.parentElement.innerHTML='<span class=&quot;no-image&quot;>Image unavailable</span>';"
            >

        `;

    } else {

        imageHtml = `

            <span class="no-image">
                No Image
            </span>

        `;
    }


    let newBadge = "";


    if (
        isNewProduct(product)
    ) {

        newBadge = `

            <span
                style="
                    position:absolute;
                    top:9px;
                    right:9px;
                    background:#dc2626;
                    color:#fff;
                    padding:5px 8px;
                    border-radius:8px;
                    font-size:11px;
                    font-weight:bold;
                    z-index:2;
                "
            >
                NEW
            </span>

        `;
    }


    let deliveryText =
        "Delivery available";


    if (
        String(
            product.deliveryType
        ).toUpperCase() ===
        "FREE"
    ) {

        deliveryText =
            "🚚 Free Delivery";

    } else {

        const charges =
            Number(
                product.deliveryCharges ||
                0
            );


        deliveryText =
            charges > 0
                ? "🚚 Delivery: " +
                  rupees(charges)
                : "🚚 Delivery charges apply";
    }


    card.innerHTML = `

        <div
            class="product-image-box"
            style="position:relative;"
        >

            ${newBadge}

            ${imageHtml}

        </div>


        <div class="product-body">

            <div class="product-category">
                ${category}
            </div>


            <div class="product-name">
                ${name}
            </div>


            <div class="price-row">

                <span class="current-price">
                    ${price}
                </span>

                ${oldPriceHtml}

            </div>


            <div class="delivery">
                ${escapeHtml(
                    deliveryText
                )}
            </div>


            ${
                description
                    ? `
                        <div class="product-description">
                            ${description}
                        </div>
                    `
                    : ""
            }


            <button
                type="button"
                class="order-btn"
            >
                ORDER NOW
            </button>

        </div>

    `;


    const orderButton =
        card.querySelector(
            ".order-btn"
        );


    orderButton.addEventListener(
        "click",
        () => {

            orderProduct(
                product
            );
        }
    );


    return card;
}


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

function renderFeatured() {

    sliderTrack.innerHTML = "";


    if (!products.length) {

        sliderLoading.style.display =
            "flex";

        slider.classList.add(
            "hidden"
        );

        return;
    }


    const featured =
        products.slice(
            0,
            Math.min(
                products.length,
                10
            )
        );


    featured.forEach(
        (product) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "feature-card";


            const image =
                escapeAttribute(
                    product.image
                );


            const name =
                escapeHtml(
                    product.name
                );


            const price =
                rupees(
                    product.price
                );


            card.innerHTML = `

                <div class="feature-image">

                    ${
                        image
                            ? `
                                <img
                                    src="${image}"
                                    alt="${name}"
                                    loading="lazy"
                                >
                            `
                            : `
                                <span class="no-image">
                                    No Image
                                </span>
                            `
                    }

                </div>


                <div class="feature-name">
                    ${name}
                </div>


                <div class="feature-price">
                    ${price}
                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    orderProduct(
                        product
                    );
                }
            );


            sliderTrack.appendChild(
                card
            );
        }
    );


    sliderLoading.style.display =
        "none";


    slider.classList.remove(
        "hidden"
    );


    startSlider();
}


/* =========================================================
   FEATURE SLIDER
========================================================= */

let sliderTimer =
    null;

let sliderPosition =
    0;


function startSlider() {

    if (sliderTimer) {

        clearInterval(
            sliderTimer
        );
    }


    sliderPosition = 0;

    sliderTrack.style.transform =
        "translateX(0)";


    const cards =
        sliderTrack.querySelectorAll(
            ".feature-card"
        );


    if (cards.length <= 1) {
        return;
    }


    sliderTimer =
        setInterval(
            () => {

                const firstCard =
                    cards[0];


                if (!firstCard) {
                    return;
                }


                const cardWidth =
                    firstCard.offsetWidth;


                const gap =
                    12;


                sliderPosition++;


                if (
                    sliderPosition >=
                    cards.length
                ) {

                    sliderPosition = 0;
                }


                const distance =
                    (
                        cardWidth +
                        gap
                    ) *
                    sliderPosition;


                sliderTrack.style.transform =
                    "translateX(-" +
                    distance +
                    "px)";

            },
            3000
        );
}


/* =========================================================
   ORDER PRODUCT
========================================================= */

function orderProduct(
    product
) {

    if (!product) {
        return;
    }


    const params =
        new URLSearchParams();


    params.set(
        "Product",
        product.name || ""
    );


    params.set(
        "Product_Description",
        product.description || ""
    );


    params.set(
        "Product_Price",
        product.price ?? ""
    );


    params.set(
        "Old_Price",
        product.oldPrice ?? ""
    );


    params.set(
        "Product_ID",
        product.id || ""
    );


    params.set(
        "Product_Image",
        product.image || ""
    );


    params.set(
        "Delivery_Type",
        product.deliveryType || "FREE"
    );


    params.set(
        "Delivery_Charges",
        product.deliveryCharges ?? 0
    );


    /*
     * Keep current project path.
     * This works when shop.html and
     * order-form.html are in same folder.
     */

    window.location.href =
        "./order-form.html?" +
        params.toString();
}


/* =========================================================
   CATEGORY FUNCTION
========================================================= */

function showCategory(
    category
) {

    selectedCategory =
        category || "All";


    updateActiveCategory();

    showProducts();
}


/* =========================================================
   SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            searchText =
                searchInput.value;

            showProducts();
        }
    );
}


/* =========================================================
   STATUS
========================================================= */

function showStatus(
    message,
    type = "info"
) {

    if (!pageStatus) {
        return;
    }


    pageStatus.textContent =
        message;


    pageStatus.className =
        "status show " +
        type;
}


function hideStatus() {

    if (!pageStatus) {
        return;
    }


    pageStatus.className =
        "status";
}


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.showCategory =
    showCategory;

window.orderProduct =
    orderProduct;


/* =========================================================
   START
========================================================= */

loadProducts();
