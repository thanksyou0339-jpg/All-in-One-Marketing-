/* =========================================================
   ALL IN ONE MARKETING
   JANJUA DIGITAL MARKETING PLATFORM
   FUNCTIONAL APP.JS
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v2";


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_CATEGORIES = [
    {
        id: "banks-finance",
        name: "Banks & Finance",
        icon: "🏦",
        description: "Banking, cards, accounts and financial offers.",
        status: "active"
    },
    {
        id: "motorcycles",
        name: "Motorcycles",
        icon: "🏍️",
        description: "Motorcycles, financing and related offers.",
        status: "active"
    },
    {
        id: "cars-vehicles",
        name: "Cars & Vehicles",
        icon: "🚗",
        description: "Cars, vehicles, leasing and financing.",
        status: "active"
    },
    {
        id: "spare-parts",
        name: "Spare Parts",
        icon: "⚙️",
        description: "Automotive spare parts and accessories.",
        status: "active"
    },
    {
        id: "food-restaurants",
        name: "Food & Restaurants",
        icon: "🍔",
        description: "Food delivery, restaurants and food offers.",
        status: "active"
    },
    {
        id: "hotels",
        name: "Hotels",
        icon: "🏨",
        description: "Hotels, accommodation and travel stays.",
        status: "active"
    },
    {
        id: "factories",
        name: "Factories",
        icon: "🏭",
        description: "Factory jobs, services and opportunities.",
        status: "active"
    },
    {
        id: "weddings",
        name: "Weddings",
        icon: "💍",
        description: "Wedding services, venues and vendors.",
        status: "coming-soon"
    },
    {
        id: "travel",
        name: "Travel",
        icon: "✈️",
        description: "Travel, flights, tours and packages.",
        status: "coming-soon"
    },
    {
        id: "property",
        name: "Property",
        icon: "🏠",
        description: "Property and real estate offers.",
        status: "coming-soon"
    },
    {
        id: "loans-financing",
        name: "Loans & Financing",
        icon: "💳",
        description: "Loans, financing and installment programs.",
        status: "active"
    },
    {
        id: "education",
        name: "Education",
        icon: "🎓",
        description: "Courses, institutes and education programs.",
        status: "coming-soon"
    },
    {
        id: "healthcare",
        name: "Healthcare",
        icon: "🏥",
        description: "Healthcare services and offers.",
        status: "coming-soon"
    },
    {
        id: "freelance-services",
        name: "Freelance & Services",
        icon: "💻",
        description: "Freelancing and professional services.",
        status: "coming-soon"
    }
];


const DEFAULT_DATA = {
    categories: DEFAULT_CATEGORIES,

    providers: [],

    programs: [],

    promoters: [],

    assignments: [],

    trackingLinks: [],

    clicks: [],

    orders: [],

    commissions: [],

    payments: [],

    settings: {
        platformName: "All in One Marketing",
        brandName: "JANJUA",
        availability: "AVAILABLE 24 HOURS",
        currency: "PKR"
    }
};


/* =========================================================
   LOAD DATA
   ========================================================= */

function loadData() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(DEFAULT_DATA)
        );

        return clone(DEFAULT_DATA);
    }

    try {

        const data = JSON.parse(saved);

        return {
            ...clone(DEFAULT_DATA),
            ...data
        };

    } catch (error) {

        console.error(error);

        return clone(DEFAULT_DATA);
    }
}


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let appData = loadData();


/* =========================================================
   SAVE DATA
   ========================================================= */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appData)
    );
}


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCategories();

        updateDashboardStats();

        handleTrackingLink();

    }
);


/* =========================================================
   CATEGORY RENDER
   ========================================================= */

function renderCategories() {

    const container =
        document.getElementById(
            "categoryList"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    appData.categories.forEach(
        function (category) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "category-card";

            const status =
                category.status ===
                "coming-soon";


            card.innerHTML = `

                <div class="category-icon">
                    ${category.icon}
                </div>

                <h3>
                    ${escapeHTML(category.name)}
                </h3>

                <p>
                    ${escapeHTML(category.description)}
                </p>

                ${
                    status

                    ?

                    `
                    <span class="coming-soon">
                        COMING SOON
                    </span>
                    `

                    :

                    `
                    <button
                        onclick="openCategory('${category.id}')"
                        style="
                            margin-top:12px;
                            border:none;
                            padding:8px 13px;
                            border-radius:8px;
                            background:#102a43;
                            color:white;
                            cursor:pointer;
                        "
                    >
                        Open
                    </button>
                    `
                }

            `;


            container.appendChild(card);

        }
    );
}


/* =========================================================
   OPEN CATEGORY
   ========================================================= */

function openCategory(id) {

    const category =
        appData.categories.find(
            item =>
                item.id === id
        );

    if (!category) {
        return;
    }


    if (
        category.status ===
        "coming-soon"
    ) {

        alert(
            category.name +
            " ابھی Coming Soon ہے۔"
        );

        return;
    }


    openModulePanel(
        "category",
        category
    );
}


/* =========================================================
   OPEN MODULE
   ========================================================= */

function openModule(module) {

    const titles = {

        dashboard:
            "Dashboard",

        categories:
            "Categories",

        providers:
            "Providers & Companies",

        programs:
            "Programs & Offers",

        promoters:
            "Promoters / Workers",

        tracking:
            "Tracking Links",

        orders:
            "Orders & Clicks",

        payments:
            "Commission & Payments",

        reports:
            "Reports & Analytics"
    };


    openModulePanel(
        module,
        {
            title:
                titles[module] ||
                "Module"
        }
    );
}


/* =========================================================
   MODULE PANEL
   ========================================================= */

function openModulePanel(
    type,
    data
) {

    closeModulePanel();


    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        "moduleOverlay";


    overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.65);
        z-index:9999;
        padding:20px;
        overflow:auto;
    `;


    const panel =
        document.createElement(
            "div"
        );


    panel.style.cssText = `
        max-width:1100px;
        margin:20px auto;
        background:white;
        border-radius:20px;
        padding:25px;
        min-height:500px;
        box-shadow:0 20px 60px rgba(0,0,0,0.25);
    `;


    panel.innerHTML =
        getModuleHTML(
            type,
            data
        );


    overlay.appendChild(panel);

    document.body.appendChild(
        overlay
    );
}


/* =========================================================
   MODULE HTML
   ========================================================= */

function getModuleHTML(
    type,
    data
) {

    if (type === "dashboard") {

        return dashboardHTML();

    }


    if (type === "categories") {

        return categoriesHTML();

    }


    if (type === "providers") {

        return providersHTML();

    }


    if (type === "programs") {

        return programsHTML();

    }


    if (type === "promoters") {

        return promotersHTML();

    }


    if (type === "tracking") {

        return trackingHTML();

    }


    if (type === "orders") {

        return ordersHTML();

    }


    if (type === "payments") {

        return paymentsHTML();

    }


    if (type === "reports") {

        return reportsHTML();

    }


    if (type === "category") {

        return categoryHTML(
            data
        );

    }


    return `
        <h2>Module</h2>
        <p>Module loading...</p>
    `;
}


/* =========================================================
   CLOSE MODULE
   ========================================================= */

function closeModulePanel() {

    const old =
        document.getElementById(
            "moduleOverlay"
        );

    if (old) {
        old.remove();
    }
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function dashboardHTML() {

    const categories =
        appData.categories.length;

    const providers =
        appData.providers.length;

    const programs =
        appData.programs.length;

    const promoters =
        appData.promoters.length;

    const clicks =
        appData.clicks.length;

    const orders =
        appData.orders.length;


    return `

        ${moduleHeader(
            "📊 Dashboard"
        )}

        <div class="aim-stats">

            ${statBox(
                "📂",
                "Categories",
                categories
            )}

            ${statBox(
                "🏢",
                "Providers",
                providers
            )}

            ${statBox(
                "🎯",
                "Programs",
                programs
            )}

            ${statBox(
                "👥",
                "Promoters",
                promoters
            )}

            ${statBox(
                "👆",
                "Clicks",
                clicks
            )}

            ${statBox(
                "🛒",
                "Orders",
                orders
            )}

        </div>

        <div class="aim-section">

            <h3>Platform Status</h3>

            <p>
                JANJUA Digital Marketing Platform
                is ready for configuration.
            </p>

            <p>
                اگلے مراحل میں Providers،
                Programs، Promoters اور Tracking
                آپس میں connect کیے جائیں گے۔
            </p>

        </div>

    `;
}


/* =========================================================
   CATEGORIES
   ========================================================= */

function categoriesHTML() {

    let rows = "";

    appData.categories.forEach(
        function (category) {

            rows += `

                <tr>

                    <td>
                        ${category.icon}
                    </td>

                    <td>
                        ${escapeHTML(
                            category.name
                        )}
                    </td>

                    <td>
                        ${
                            category.status ===
                            "active"
                            ? "ACTIVE"
                            : "COMING SOON"
                        }
                    </td>

                    <td>

                        <button
                            onclick="editCategory('${category.id}')"
                        >
                            Edit
                        </button>

                        <button
                            onclick="toggleCategory('${category.id}')"
                        >
                            ${
                                category.status ===
                                "active"
                                ? "Hide"
                                : "Show"
                            }
                        </button>

                        <button
                            onclick="deleteCategory('${category.id}')"
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        }
    );


    return `

        ${moduleHeader(
            "📂 Categories"
        )}

        <div class="aim-toolbar">

            <button
                class="aim-primary"
                onclick="addCategory()"
            >
                + Add Category
            </button>

        </div>


        <div class="aim-table-wrap">

            <table class="aim-table">

                <thead>

                    <tr>
                        <th>Icon</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    ${rows}
                </tbody>

            </table>

        </div>

    `;
}


/* =========================================================
   ADD CATEGORY
   ========================================================= */

function addCategory() {

    const name =
        prompt(
            "Category کا نام:"
        );

    if (!name) {
        return;
    }


    const description =
        prompt(
            "Category کی description:"
        ) ||
        "";


    const icon =
        prompt(
            "Category کا icon/emoji:",
            "📁"
        ) ||
        "📁";


    appData.categories.push({

        id:
            "cat-" +
            Date.now(),

        name:
            name.trim(),

        description:
            description.trim(),

        icon:
            icon.trim(),

        status:
            "active"
    });


    saveData();

    renderCategories();

    refreshModule(
        "categories"
    );
}


/* =========================================================
   EDIT CATEGORY
   ========================================================= */

function editCategory(id) {

    const category =
        appData.categories.find(
            item =>
                item.id === id
        );

    if (!category) {
        return;
    }


    const name =
        prompt(
            "Category کا نیا نام:",
            category.name
        );


    if (!name) {
        return;
    }


    const description =
        prompt(
            "Description:",
            category.description
        );


    category.name =
        name.trim();

    category.description =
        description ||
        category.description;


    saveData();

    renderCategories();

    refreshModule(
        "categories"
    );
}


/* =========================================================
   HIDE / SHOW CATEGORY
   ========================================================= */

function toggleCategory(id) {

    const category =
        appData.categories.find(
            item =>
                item.id === id
        );

    if (!category) {
        return;
    }


    category.status =
        category.status ===
        "active"

        ? "coming-soon"

        : "active";


    saveData();

    renderCategories();

    refreshModule(
        "categories"
    );
}


/* =========================================================
   DELETE CATEGORY
   ========================================================= */

function deleteCategory(id) {

    const category =
        appData.categories.find(
            item =>
                item.id === id
        );


    if (!category) {
        return;
    }


    const ok =
        confirm(
            "کیا آپ " +
            category.name +
            " کو Delete کرنا چاہتے ہیں؟"
        );


    if (!ok) {
        return;
    }


    appData.categories =
        appData.categories.filter(
            item =>
                item.id !== id
        );


    saveData();

    renderCategories();

    refreshModule(
        "categories"
    );
}


/* =========================================================
   PROVIDERS
   ========================================================= */

function providersHTML() {

    return `

        ${moduleHeader(
            "🏢 Providers & Companies"
        )}

        <div class="aim-form">

            <input
                id="providerName"
                placeholder="Company / Provider Name"
            >

            <input
                id="providerWebsite"
                placeholder="Website"
            >

            <input
                id="providerAffiliate"
                placeholder="Original Affiliate Link"
            >

            <input
                id="providerAffiliateId"
                placeholder="Affiliate / Account ID"
            >

            <label>
                <input
                    type="checkbox"
                    id="providerSubId"
                >
                SubID Support
            </label>

            <label>
                <input
                    type="checkbox"
                    id="providerClickId"
                >
                ClickID Support
            </label>

            <label>
                <input
                    type="checkbox"
                    id="providerApi"
                >
                API Support
            </label>

            <label>
                <input
                    type="checkbox"
                    id="providerWebhook"
                >
                Webhook Support
            </label>

            <button
                class="aim-primary"
                onclick="saveProviderFromForm()"
            >
                Save Provider
            </button>

        </div>


        <div class="aim-section">

            <h3>
                Saved Providers:
                ${appData.providers.length}
            </h3>

            ${providerListHTML()}

        </div>

    `;
}


/* =========================================================
   SAVE PROVIDER
   ========================================================= */

function saveProviderFromForm() {

    const name =
        document.getElementById(
            "providerName"
        ).value.trim();


    if (!name) {

        alert(
            "Provider کا نام ضروری ہے۔"
        );

        return;
    }


    appData.providers.push({

        id:
            "provider-" +
            Date.now(),

        name:
            name,

        website:
            document.getElementById(
                "providerWebsite"
            ).value.trim(),

        affiliateLink:
            document.getElementById(
                "providerAffiliate"
            ).value.trim(),

        affiliateId:
            document.getElementById(
                "providerAffiliateId"
            ).value.trim(),

        subIdSupport:
            document.getElementById(
                "providerSubId"
            ).checked,

        clickIdSupport:
            document.getElementById(
                "providerClickId"
            ).checked,

        apiSupport:
            document.getElementById(
                "providerApi"
            ).checked,

        webhookSupport:
            document.getElementById(
                "providerWebhook"
            ).checked,

        createdAt:
            new Date().toISOString()

    });


    saveData();

    refreshModule(
        "providers"
    );
}


/* =========================================================
   PROVIDER LIST
   ========================================================= */

function providerListHTML() {

    if (
        appData.providers.length ===
        0
    ) {

        return `
            <p>
                ابھی کوئی Provider شامل نہیں۔
            </p>
        `;
    }


    return `
        <ul>
            ${
                appData.providers.map(
                    p =>
                        `<li>
                            <strong>
                                ${escapeHTML(p.name)}
                            </strong>
                        </li>`
                ).join("")
            }
        </ul>
    `;
}


/* =========================================================
   PROGRAMS
   ========================================================= */

function programsHTML() {

    const providerOptions =
        appData.providers.map(
            p =>
                `
                <option value="${p.id}">
                    ${escapeHTML(p.name)}
                </option>
                `
        ).join("");


    const categoryOptions =
        appData.categories.map(
            c =>
                `
                <option value="${c.id}">
                    ${escapeHTML(c.name)}
                </option>
                `
        ).join("");


    return `

        ${moduleHeader(
            "🎯 Programs & Offers"
        )}

        <div class="aim-form">

            <input
                id="programName"
                placeholder="Program / Offer Name"
            >

            <select id="programProvider">
                <option value="">
                    Select Provider
                </option>
                ${providerOptions}
            </select>

            <select id="programCategory">
                <option value="">
                    Select Category
                </option>
                ${categoryOptions}
            </select>

            <input
                id="programAffiliate"
                placeholder="Original Affiliate Link"
            >

            <input
                id="programCommission"
                type="number"
                placeholder="Commission %"
            >

            <input
                id="programCookie"
                type="number"
                placeholder="Cookie Days"
            >

            <button
                class="aim-primary"
                onclick="saveProgramFromForm()"
            >
                Save Program
            </button>

        </div>


        <div class="aim-section">

            <h3>
                Programs:
                ${appData.programs.length}
            </h3>

            ${programListHTML()}

        </div>

    `;
}


/* =========================================================
   SAVE PROGRAM
   ========================================================= */

function saveProgramFromForm() {

    const name =
        document.getElementById(
            "programName"
        ).value.trim();


    if (!name) {

        alert(
            "Program کا نام ضروری ہے۔"
        );

        return;
    }


    appData.programs.push({

        id:
            "program-" +
            Date.now(),

        name:
            name,

        providerId:
            document.getElementById(
                "programProvider"
            ).value,

        categoryId:
            document.getElementById(
                "programCategory"
            ).value,

        originalAffiliateLink:
            document.getElementById(
                "programAffiliate"
            ).value.trim(),

        commission:
            Number(
                document.getElementById(
                    "programCommission"
                ).value || 0
            ),

        cookieDays:
            Number(
                document.getElementById(
                    "programCookie"
                ).value || 0
            ),

        createdAt:
            new Date().toISOString()

    });


    saveData();

    refreshModule(
        "programs"
    );
}


/* =========================================================
   PROGRAM LIST
   ========================================================= */

function programListHTML() {

    if (
        appData.programs.length ===
        0
    ) {

        return `
            <p>
                ابھی کوئی Program شامل نہیں۔
            </p>
        `;
    }


    return `
        <div class="aim-list">

            ${
                appData.programs.map(
                    p =>
                        `
                        <div class="aim-list-item">

                            <strong>
                                ${escapeHTML(p.name)}
                            </strong>

                            <span>
                                Commission:
                                ${p.commission}%
                            </span>

                        </div>
                        `
                ).join("")
            }

        </div>
    `;
}


/* =========================================================
   PROMOTERS
   ========================================================= */

function promotersHTML() {

    return `

        ${moduleHeader(
            "👥 Promoters / Workers"
        )}

        <div class="aim-form">

            <input
                id="promoterName"
                placeholder="Promoter Name"
            >

            <input
                id="promoterPhone"
                placeholder="Phone"
            >

            <input
                id="promoterEmail"
                placeholder="Email"
            >

            <select id="promoterPayment">

                <option value="">
                    Payment Method
                </option>

                <option>
                    Bank
                </option>

                <option>
                    JazzCash
                </option>

                <option>
                    Easypaisa
                </option>

            </select>

            <input
                id="promoterAccount"
                placeholder="Payment Account"
            >

            <button
                class="aim-primary"
                onclick="savePromoterFromForm()"
            >
                Save Promoter
            </button>

        </div>


        <div class="aim-section">

            <h3>
                Promoters:
                ${appData.promoters.length}
            </h3>

            ${promoterListHTML()}

        </div>

    `;
}


/* =========================================================
   SAVE PROMOTER
   ========================================================= */

function savePromoterFromForm() {

    const name =
        document.getElementById(
            "promoterName"
        ).value.trim();


    if (!name) {

        alert(
            "Promoter کا نام ضروری ہے۔"
        );

        return;
    }


    appData.promoters.push({

        id:
            "promoter-" +
            Date.now(),

        name:
            name,

        phone:
            document.getElementById(
                "promoterPhone"
            ).value.trim(),

        email:
            document.getElementById(
                "promoterEmail"
            ).value.trim(),

        paymentMethod:
            document.getElementById(
                "promoterPayment"
            ).value,

        paymentAccount:
            document.getElementById(
                "promoterAccount"
            ).value.trim(),

        createdAt:
            new Date().toISOString()

    });


    saveData();

    refreshModule(
        "promoters"
    );
}


/* =========================================================
   PROMOTER LIST
   ========================================================= */

function promoterListHTML() {

    if (
        appData.promoters.length ===
        0
    ) {

        return `
            <p>
                ابھی کوئی Promoter شامل نہیں۔
            </p>
        `;
    }


    return `
        <div class="aim-list">

            ${
                appData.promoters.map(
                    p =>
                        `
                        <div class="aim-list-item">

                            <strong>
                                ${escapeHTML(p.name)}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    p.phone || ""
                                )}
                            </span>

                        </div>
                        `
                ).join("")
            }

        </div>
    `;
}


/* =========================================================
   TRACKING
   ========================================================= */

function trackingHTML() {

    return `

        ${moduleHeader(
            "🔗 Tracking Links"
        )}

        <div class="aim-form">

            <select id="trackingPromoter">

                <option value="">
                    Select Promoter
                </option>

                ${
                    appData.promoters.map(
                        p =>
                            `
                            <option value="${p.id}">
                                ${escapeHTML(p.name)}
                            </option>
                            `
                    ).join("")
                }

            </select>


            <select id="trackingProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    appData.programs.map(
                        p =>
                            `
                            <option value="${p.id}">
                                ${escapeHTML(p.name)}
                            </option>
                            `
                    ).join("")
                }

            </select>


            <button
                class="aim-primary"
                onclick="generateTrackingLink()"
            >
                Generate Tracking Link
            </button>

        </div>


        <div class="aim-section">

            <h3>
                Tracking Links:
                ${appData.trackingLinks.length}
            </h3>

            ${trackingListHTML()}

        </div>

    `;
}


/* =========================================================
   GENERATE TRACKING LINK
   ========================================================= */

function generateTrackingLink() {

    const promoterId =
        document.getElementById(
            "trackingPromoter"
        ).value;


    const programId =
        document.getElementById(
            "trackingProgram"
        ).value;


    if (
        !promoterId ||
        !programId
    ) {

        alert(
            "Promoter اور Program دونوں select کریں۔"
        );

        return;
    }


    const program =
        appData.programs.find(
            p =>
                p.id === programId
        );


    if (!program) {
        return;
    }


    const code =
        "AIM-" +
        Date.now()
            .toString(36)
            .toUpperCase();


    const publicLink =
        window.location.origin +
        window.location.pathname +
        "?ref=" +
        code;


    appData.trackingLinks.push({

        id:
            "link-" +
            Date.now(),

        trackingCode:
            code,

        promoterId:
            promoterId,

        programId:
            programId,

        originalAffiliateLink:
            program.originalAffiliateLink,

        publicLink:
            publicLink,

        clicks:
            0,

        orders:
            0,

        sales:
            0,

        commission:
            0,

        createdAt:
            new Date().toISOString()

    });


    saveData();

    refreshModule(
        "tracking"
    );
}


/* =========================================================
   TRACKING LIST
   ========================================================= */

function trackingListHTML() {

    if (
        appData.trackingLinks.length ===
        0
    ) {

        return `
            <p>
                ابھی کوئی Tracking Link نہیں۔
            </p>
        `;
    }


    return `
        <div class="aim-list">

            ${
                appData.trackingLinks.map(
                    link =>
                        `
                        <div class="aim-list-item">

                            <strong>
                                ${escapeHTML(
                                    link.trackingCode
                                )}
                            </strong>

                            <span>
                                Clicks:
                                ${link.clicks}
                            </span>

                            <button
                                onclick="copyTrackingLink('${link.publicLink}')"
                            >
                                Copy Link
                            </button>

                        </div>
                        `
                ).join("")
            }

        </div>
    `;
}


/* =========================================================
   COPY TRACKING LINK
   ========================================================= */

function copyTrackingLink(link) {

    navigator.clipboard
        .writeText(link)
        .then(
            function () {

                alert(
                    "Tracking Link Copy ہو گیا۔"
                );

            }
        )
        .catch(
            function () {

                prompt(
                    "Link Copy کریں:",
                    link
                );

            }
        );
}


/* =========================================================
   ORDERS
   ========================================================= */

function ordersHTML() {

    return `

        ${moduleHeader(
            "🛒 Orders & Clicks"
        )}

        <div class="aim-stats">

            ${statBox(
                "👆",
                "Total Clicks",
                appData.clicks.length
            )}

            ${statBox(
                "🛒",
                "Total Orders",
                appData.orders.length
            )}

            ${statBox(
                "💰",
                "Total Sales",
                totalSales()
            )}

        </div>


        <div class="aim-section">

            <h3>
                Orders
            </h3>

            ${
                appData.orders.length === 0

                ?

                `<p>
                    ابھی کوئی Order موجود نہیں۔
                </p>`

                :

                `
                <div class="aim-list">

                    ${
                        appData.orders.map(
                            order =>
                                `
                                <div class="aim-list-item">

                                    <strong>
                                        ${escapeHTML(
                                            order.orderReference
                                        )}
                                    </strong>

                                    <span>
                                        Sale:
                                        PKR ${order.saleAmount}
                                    </span>

                                </div>
                                `
                        ).join("")
                    }

                </div>
                `
            }

        </div>

    `;
}


/* =========================================================
   PAYMENTS
   ========================================================= */

function paymentsHTML() {

    return `

        ${moduleHeader(
            "💰 Commission & Payments"
        )}

        <div class="aim-stats">

            ${statBox(
                "💵",
                "Commission",
                totalCommission()
            )}

            ${statBox(
                "✅",
                "Paid",
                totalPaid()
            )}

        </div>


        <div class="aim-section">

            <h3>
                Payment Records
            </h3>

            ${
                appData.payments.length === 0

                ?

                `<p>
                    ابھی کوئی Payment record نہیں۔
                </p>`

                :

                `
                <div class="aim-list">

                    ${
                        appData.payments.map(
                            payment =>
                                `
                                <div class="aim-list-item">

                                    <strong>
                                        PKR ${payment.amount}
                                    </strong>

                                    <span>
                                        ${escapeHTML(
                                            payment.method
                                        )}
                                    </span>

                                </div>
                                `
                        ).join("")
                    }

                </div>
                `
            }

        </div>

    `;
}


/* =========================================================
   REPORTS
   ========================================================= */

function reportsHTML() {

    const clicks =
        appData.clicks.length;


    const orders =
        appData.orders.length;


    const sales =
        totalSales();


    const commission =
        totalCommission();


    const conversion =
        clicks > 0
        ? ((orders / clicks) * 100).toFixed(2)
        : "0.00";


    return `

        ${moduleHeader(
            "📈 Reports & Analytics"
        )}

        <div class="aim-stats">

            ${statBox(
                "👆",
                "Clicks",
                clicks
            )}

            ${statBox(
                "🛒",
                "Orders",
                orders
            )}

            ${statBox(
                "💵",
                "Sales",
                "PKR " + sales
            )}

            ${statBox(
                "💰",
                "Commission",
                "PKR " + commission
            )}

            ${statBox(
                "📊",
                "Conversion",
                conversion + "%"
            )}

        </div>


        <div class="aim-section">

            <h3>
                Performance Summary
            </h3>

            <p>
                Conversion Rate:
                <strong>
                    ${conversion}%
                </strong>
            </p>

        </div>

    `;
}


/* =========================================================
   CATEGORY DETAIL
   ========================================================= */

function categoryHTML(
    category
) {

    const programs =
        appData.programs.filter(
            p =>
                p.categoryId ===
                category.id
        );


    return `

        ${moduleHeader(
            category.icon +
            " " +
            category.name
        )}

        <div class="aim-section">

            <h3>
                Category Overview
            </h3>

            <p>
                ${escapeHTML(
                    category.description
                )}
            </p>

        </div>


        <div class="aim-section">

            <h3>
                Programs in this Category
            </h3>

            ${
                programs.length === 0

                ?

                `
                <p>
                    ابھی اس category میں
                    کوئی Program شامل نہیں۔
                </p>
                `

                :

                `
                <div class="aim-list">

                    ${
                        programs.map(
                            p =>
                                `
                                <div class="aim-list-item">

                                    <strong>
                                        ${escapeHTML(
                                            p.name
                                        )}
                                    </strong>

                                    <span>
                                        Commission:
                                        ${p.commission}%
                                    </span>

                                </div>
                                `
                        ).join("")
                    }

                </div>
                `
            }

        </div>

    `;
}


/* =========================================================
   MODULE HEADER
   ========================================================= */

function moduleHeader(
    title
) {

    return `

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            margin-bottom:25px;
            border-bottom:1px solid #e5e7eb;
            padding-bottom:15px;
        ">

            <h2>
                ${title}
            </h2>

            <button
                onclick="closeModulePanel()"
                style="
                    border:none;
                    background:#dc2626;
                    color:white;
                    padding:9px 15px;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                Close
            </button>

        </div>

    `;
}


/* =========================================================
   STAT BOX
   ========================================================= */

function statBox(
    icon,
    label,
    value
) {

    return `

        <div style="
            background:#f7f9fc;
            border:1px solid #e5e7eb;
            border-radius:14px;
            padding:18px;
        ">

            <div style="
                font-size:28px;
                margin-bottom:5px;
            ">
                ${icon}
            </div>

            <strong>
                ${label}
            </strong>

            <div style="
                font-size:24px;
                font-weight:bold;
                margin-top:5px;
            ">
                ${value}
            </div>

        </div>

    `;
}


/* =========================================================
   REFRESH MODULE
   ========================================================= */

function refreshModule(
    type
) {

    const overlay =
        document.getElementById(
            "moduleOverlay"
        );


    if (!overlay) {
        return;
    }


    const panel =
        overlay.querySelector(
            "div"
        );


    if (!panel) {
        return;
    }


    panel.innerHTML =
        getModuleHTML(
            type,
            {}
        );
}


/* =========================================================
   TOTAL SALES
   ========================================================= */

function totalSales() {

    return appData.orders.reduce(
        function (
            total,
            order
        ) {

            return (
                total +
                Number(
                    order.saleAmount || 0
                )
            );

        },
        0
    );
}


/* =========================================================
   TOTAL COMMISSION
   ========================================================= */

function totalCommission() {

    return appData.orders.reduce(
        function (
            total,
            order
        ) {

            return (
                total +
                Number(
                    order.commission || 0
                )
            );

        },
        0
    );
}


/* =========================================================
   TOTAL PAID
   ========================================================= */

function totalPaid() {

    return appData.payments.reduce(
        function (
            total,
            payment
        ) {

            return (
                total +
                Number(
                    payment.amount || 0
                )
            );

        },
        0
    );
}


/* =========================================================
   TRACKING URL HANDLER
   ========================================================= */

function handleTrackingLink() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const ref =
        params.get("ref");


    if (!ref) {
        return;
    }


    const link =
        appData.trackingLinks.find(
            item =>
                item.trackingCode ===
                ref
        );


    if (!link) {
        return;
    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    appData.clicks.push({

        id:
            "click-" +
            Date.now(),

        trackingCode:
            ref,

        date:
            new Date().toISOString()

    });


    saveData();


    /*
       Production version میں یہاں
       secure backend redirect استعمال ہوگا۔
    */

    if (
        link.originalAffiliateLink
    ) {

        setTimeout(
            function () {

                window.location.href =
                    link.originalAffiliateLink;

            },
            500
        );

    }
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(
    value
) {

    return String(value || "")
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
   CLONE
   ========================================================= */

function clone(
    object
) {

    return JSON.parse(
        JSON.stringify(object)
    );
}


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.openModule =
    openModule;

window.openCategory =
    openCategory;

window.addCategory =
    addCategory;

window.editCategory =
    editCategory;

window.toggleCategory =
    toggleCategory;

window.deleteCategory =
    deleteCategory;

window.closeModulePanel =
    closeModulePanel;

window.saveProviderFromForm =
    saveProviderFromForm;

window.saveProgramFromForm =
    saveProgramFromForm;

window.savePromoterFromForm =
    savePromoterFromForm;

window.generateTrackingLink =
    generateTrackingLink;

window.copyTrackingLink =
    copyTrackingLink;

window.refreshModule =
    refreshModule;
