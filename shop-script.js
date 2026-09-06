/* =========================================
   A ALL-IN-ONE MARKETING
   PUBLIC SHOP SCRIPT
   FIREBASE VERSION
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


/* =========================================
   FIREBASE
========================================= */

const firebaseConfig = {
    apiKey: "AIzaSyA8_4ArKXAdfKWZ5mi5DaT9qiayL3h_Yzw",
    authDomain: "janjua-traders.firebaseapp.com",
    projectId: "janjua-traders",
    storageBucket: "janjua-traders.firebasestorage.app",
    messagingSenderId: "154904774188",
    appId: "1:154904774188:web:1830f9d533e77dae6a7389"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* =========================================
   DOM
========================================= */

const productGrid =
    document.getElementById("productGrid");

const searchBox =
    document.getElementById("searchBox");

const loadingMessage =
    document.getElementById("loadingMessage");

const categoryBar =
    document.getElementById("categoryBar");


let products = [];

const NEW_ITEM_DAYS = 7;


/* =========================================
   RUPEES
========================================= */

function rupees(value){

    return "Rs. " +
        Number(value || 0)
        .toLocaleString("en-PK");

}


/* =========================================
   NEW PRODUCT
========================================= */

function isNewProduct(product){

    if(!product.createdAt){

        return false;

    }

    let created;

    if(
        product.createdAt &&
        typeof product.createdAt.toDate === "function"
    ){

        created =
            product.createdAt.toDate().getTime();

    }else{

        created =
            new Date(product.createdAt).getTime();

    }

    if(Number.isNaN(created)){

        return false;

    }

    const age =
        Date.now() - created;

    return(
        age >= 0 &&
        age <=
        NEW_ITEM_DAYS *
        24 *
        60 *
        60 *
        1000
    );

}


/* =========================================
   FIREBASE PRODUCT CONVERTER
========================================= */

function convertProduct(doc){

    const data = doc.data();

    return {

        id:
            data.Product_ID ||
            data.productId ||
            doc.id,

        name:
            data.Product_Name ||
            data.Product ||
            data.name ||
            "Product",

        description:
            data.Product_Description ||
            data.description ||
            "",

        price:
            Number(
                data.Product_Price ||
                data.price ||
                0
            ),

        oldPrice:
            Number(
                data.Old_Price ||
                data.oldPrice ||
                0
            ),

        category:
            data.Category ||
            data.category ||
            "Other",

        image:
            data.Product_Image ||
            data.image ||
            "",

        deliveryType:
            data.Delivery_Type ||
            data.deliveryType ||
            "Free Delivery",

        deliveryCharges:
            Number(
                data.Delivery_Charges ||
                data.deliveryCharges ||
                0
            ),

        supplierLink:
            data.supplierLink ||
            data.Supplier_Link ||
            "",

        createdAt:
            data.createdAt ||
            null,

        updatedAt:
            data.updatedAt ||
            null

    };

}


/* =========================================
   LOAD PRODUCTS FROM FIREBASE
========================================= */

async function loadProducts(){

    try{

        if(loadingMessage){

            loadingMessage.style.display =
                "flex";

            loadingMessage.innerHTML = `
                <span>
                    Products loading...
                </span>
            `;

        }


        const productsRef =
            collection(db, "products");


        let snapshot;


        try{

            const productsQuery =
                query(
                    productsRef,
                    orderBy("Product_ID")
                );

            snapshot =
                await getDocs(productsQuery);

        }catch(error){

            console.warn(
                "Ordered products failed. Loading normally.",
                error
            );

            snapshot =
                await getDocs(productsRef);

        }


        products =
            snapshot.docs
            .map(convertProduct);


        products.sort(
            function(a,b){

                const dateA =
                    getDateValue(a.createdAt);

                const dateB =
                    getDateValue(b.createdAt);

                return dateB - dateA;

            }
        );


        buildCategories();


        if(loadingMessage){

            loadingMessage.style.display =
                "none";

        }


        showProducts(products);


    }catch(error){

        console.error(
            "PRODUCT LOAD ERROR:",
            error
        );


        if(loadingMessage){

            loadingMessage.innerHTML = `
                <span>
                    Products load نہیں ہو سکے۔
                    براہِ کرم دوبارہ کوشش کریں۔
                </span>
            `;

        }

    }

}


/* =========================================
   DATE
========================================= */

function getDateValue(value){

    if(!value){

        return 0;

    }

    try{

        if(
            value &&
            typeof value.toDate === "function"
        ){

            return value.toDate().getTime();

        }

        const date =
            new Date(value).getTime();

        return Number.isNaN(date)
            ? 0
            : date;

    }catch(error){

        return 0;

    }

}


/* =========================================
   CATEGORIES
========================================= */

function buildCategories(){

    if(!categoryBar){

        return;

    }


    const categories = [

        {
            name:"All",
            icon:"✨"
        },

        {
            name:"Food",
            icon:"🍔"
        },

        {
            name:"Motorcycle",
            icon:"🏍️"
        },

        {
            name:"Cars & Spare Parts",
            icon:"🚗"
        },

        {
            name:"General Products",
            icon:"🛍️"
        },

        {
            name:"Shoes",
            icon:"👟"
        },

        {
            name:"Clothes",
            icon:"👕"
        },

        {
            name:"Beauty",
            icon:"💄"
        },

        {
            name:"Electronics",
            icon:"📱"
        },

        {
            name:"Other",
            icon:"🏷️"
        }

    ];


    const existingCategories =
        new Set(

            products

            .map(
                function(product){

                    return String(
                        product.category || ""
                    ).trim();

                }
            )

            .filter(Boolean)

        );


    existingCategories.forEach(
        function(category){

            const exists =
                categories.some(
                    function(item){

                        return(
                            item.name.toLowerCase() ===
                            category.toLowerCase()
                        );

                    }
                );


            if(!exists){

                categories.push({

                    name: category,

                    icon: "🏷️"

                });

            }

        }
    );


    categoryBar.innerHTML =
        categories

        .map(
            function(item){

                return `

                    <button
                        type="button"
                        class="category-btn ${
                            item.name === "All"
                            ? "active"
                            : ""
                        }"
                        data-category="${escapeAttribute(item.name)}"
                    >

                        ${item.icon}
                        ${escapeHtml(item.name)}

                    </button>

                `;

            }
        )

        .join("");


    categoryBar
        .querySelectorAll(
            ".category-btn"
        )

        .forEach(
            function(button){

                button.addEventListener(
                    "click",
                    function(){

                        categoryBar
                            .querySelectorAll(
                                ".category-btn"
                            )
                            .forEach(
                                function(btn){

                                    btn.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        this.classList.add(
                            "active"
                        );


                        showCategory(
                            this.dataset.category
                        );

                    }
                );

            }
        );

}


/* =========================================
   SHOW PRODUCTS
========================================= */

function showProducts(productList){

    if(!productGrid){

        return;

    }


    if(!productList.length){

        productGrid.innerHTML = `

            <div
                style="
                grid-column:1/-1;
                text-align:center;
                padding:50px 20px;
                background:white;
                border-radius:18px;
                "
            >

                <h3>
                    Product نہیں ملا
                </h3>

                <p style="color:#6b7280;">
                    دوسری category یا search استعمال کریں۔
                </p>

            </div>

        `;

        return;

    }


    productGrid.innerHTML =

        productList

        .map(
            function(product){

                const image =
                    product.image ||
                    "https://via.placeholder.com/500x500?text=Product";


                const newBadge =
                    isNewProduct(product)

                    ?

                    `
                        <div class="new-badge">
                            ✨ NEW ITEM
                        </div>
                    `

                    :

                    "";


                return `

                    <article class="product-card">

                        <div class="product-image-wrap">

                            ${newBadge}

                            <img
                                src="${escapeAttribute(image)}"
                                alt="${escapeAttribute(product.name)}"
                                loading="lazy"
                                onerror="
                                    this.src='https://via.placeholder.com/500x500?text=Product'
                                "
                            >

                        </div>


                        <div class="product-info">

                            <h3 dir="auto">
                                ${escapeHtml(product.name)}
                            </h3>


                            <p dir="auto">
                                ${escapeHtml(
                                    product.description
                                )}
                            </p>


                            <div class="price-row">

                                <strong>
                                    ${rupees(product.price)}
                                </strong>


                                ${
                                    Number(product.oldPrice || 0) > 0

                                    ?

                                    `
                                        <del>
                                            ${rupees(product.oldPrice)}
                                        </del>
                                    `

                                    :

                                    ""
                                }

                            </div>


                            <button
                                class="order-btn"
                                type="button"
                                data-product-id="${escapeAttribute(product.id)}"
                            >
                                ORDER NOW
                            </button>

                        </div>

                    </article>

                `;

            }
        )

        .join("");


    productGrid
        .querySelectorAll(".order-btn")

        .forEach(
            function(button){

                button.addEventListener(
                    "click",
                    function(){

                        orderProduct(
                            this.getAttribute(
                                "data-product-id"
                            )
                        );

                    }
                );

            }
        );

}


/* =========================================
   ORDER PRODUCT
========================================= */

function orderProduct(productId){

    const product =
        products.find(
            function(item){

                return(
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if(!product){

        alert(
            "Product نہیں ملا"
        );

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
        product.price || 0
    );


    params.set(
        "Old_Price",
        product.oldPrice || ""
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
        product.deliveryType ||
        "Free Delivery"
    );


    params.set(
        "Delivery_Charges",
        product.deliveryCharges || 0
    );


    window.location.href =
        "order-form.html?" +
        params.toString();

}


/* =========================================
   CATEGORY
========================================= */

function showCategory(category){

    if(
        !category ||
        category === "All"
    ){

        showProducts(products);

        return;

    }


    const filtered =
        products.filter(
            function(product){

                return(
                    String(
                        product.category || ""
                    )
                    .toLowerCase()

                    ===

                    String(category)
                    .toLowerCase()
                );

            }
        );


    showProducts(filtered);

}


window.showCategory =
    showCategory;


/* =========================================
   SEARCH
========================================= */

if(searchBox){

    searchBox.addEventListener(
        "input",
        function(){

            const text =
                this.value
                .trim()
                .toLowerCase();


            if(!text){

                showProducts(products);

                return;

            }


            const filtered =
                products.filter(
                    function(product){

                        const name =
                            String(
                                product.name || ""
                            )
                            .toLowerCase();


                        const description =
                            String(
                                product.description || ""
                            )
                            .toLowerCase();


                        const category =
                            String(
                                product.category || ""
                            )
                            .toLowerCase();


                        return(
                            name.includes(text) ||
                            description.includes(text) ||
                            category.includes(text)
                        );

                    }
                );


            showProducts(filtered);

        }
    );

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHtml(value){

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


function escapeAttribute(value){

    return escapeHtml(value);

}


/* =========================================
   START
========================================= */

loadProducts();
