/* =========================================================
   JANJUA
   ALL IN ONE MARKETING PLATFORM
   COMPLETE MANAGEMENT SYSTEM
   VERSION 6
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v6";


/* =========================================================
   DEFAULT DATABASE
   ========================================================= */

const defaultData = {

    categories: [
        { id:"cat1", name:"Automotive", description:"Cars and vehicles" },
        { id:"cat2", name:"Motorcycles", description:"Motorcycles and bikes" },
        { id:"cat3", name:"Mobile & Electronics", description:"Mobiles and electronics" },
        { id:"cat4", name:"Fashion", description:"Clothing and fashion" },
        { id:"cat5", name:"Beauty", description:"Beauty products" },
        { id:"cat6", name:"Health", description:"Health products" },
        { id:"cat7", name:"Home & Living", description:"Home products" },
        { id:"cat8", name:"Food", description:"Food and restaurants" },
        { id:"cat9", name:"Travel", description:"Travel services" },
        { id:"cat10", name:"Jobs & Services", description:"Jobs and services" },
        { id:"cat11", name:"Banking & Finance", description:"Banks and finance" },
        { id:"cat12", name:"Insurance", description:"Insurance services" },
        { id:"cat13", name:"Education", description:"Education services" },
        { id:"cat14", name:"Other", description:"Other marketing categories" }
    ],

    providers: [],

    programs: [],

    promoters: [],

    assignments: [],

    trackingLinks: [],

    socialLinks: [],

    clicks: [],

    orders: [],

    commissions: [],

    payments: [],

    settings: {

        currency: "PKR",

        defaultCommissionRate: 5,

        platformName: "All in One Marketing",

        brandName: "JANJUA"

    }

};


/* =========================================================
   DATABASE LOAD
   ========================================================= */

function loadData() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            return JSON.parse(
                JSON.stringify(defaultData)
            );
        }

        const parsed =
            JSON.parse(saved);

        return {

            ...defaultData,

            ...parsed,

            categories:
                parsed.categories || [],

            providers:
                parsed.providers || [],

            programs:
                parsed.programs || [],

            promoters:
                parsed.promoters || [],

            assignments:
                parsed.assignments || [],

            trackingLinks:
                parsed.trackingLinks || [],

            socialLinks:
                parsed.socialLinks || [],

            clicks:
                parsed.clicks || [],

            orders:
                parsed.orders || [],

            commissions:
                parsed.commissions || [],

            payments:
                parsed.payments || [],

            settings: {

                ...defaultData.settings,

                ...(parsed.settings || {})

            }

        };

    } catch (error) {

        console.error(
            "Database load error:",
            error
        );

        return JSON.parse(
            JSON.stringify(defaultData)
        );
    }
}


let data = loadData();


/* =========================================================
   SAVE DATABASE
   ========================================================= */

function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

    } catch (error) {

        console.error(
            "Database save error:",
            error
        );

        alert(
            "Data save failed. Browser storage may be full."
        );
    }
}


/* =========================================================
   GENERAL HELPERS
   ========================================================= */

function createId(prefix) {

    return (
        prefix +
        "_" +
        Date.now().toString(36) +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );
}


function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function formatMoney(value) {

    const amount =
        Number(value) || 0;

    return (
        data.settings.currency +
        " " +
        amount.toLocaleString()
    );
}


function formatDate(value) {

    if (!value) {
        return "-";
    }

    try {

        return new Date(value)
            .toLocaleString();

    } catch {

        return value;
    }
}


function getCategory(id) {

    return data.categories.find(
        item => item.id === id
    );
}


function getProvider(id) {

    return data.providers.find(
        item => item.id === id
    );
}


function getProgram(id) {

    return data.programs.find(
        item => item.id === id
    );
}


function getPromoter(id) {

    return data.promoters.find(
        item => item.id === id
    );
}


function getTrackingLink(id) {

    return data.trackingLinks.find(
        item => item.id === id
    );
}


function getSocialLink(id) {

    return data.socialLinks.find(
        item => item.id === id
    );
}


function calculateCommission(
    amount,
    rate
) {

    return (
        Number(amount || 0) *
        Number(rate || 0) /
        100
    );
}


function getProgramRate(programId) {

    const program =
        getProgram(programId);

    if (!program) {

        return Number(
            data.settings.defaultCommissionRate
        ) || 0;
    }

    return (
        Number(
            program.commissionRate
        ) ||
        Number(
            data.settings.defaultCommissionRate
        ) ||
        0
    );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        addAnimatedBranding();

        addBrandAnimationCSS();

        addModuleCSS();

        createModuleArea();

        renderCategories();

        handlePublicTracking();

        handlePublicSocialLink();

    }
);


/* =========================================================
   MODULE AREA
   ========================================================= */

function createModuleArea() {

    if (
        document.getElementById(
            "moduleArea"
        )
    ) {
        return;
    }

    const grid =
        document.querySelector(
            ".dashboard-grid"
        );

    if (!grid) {
        return;
    }

    const area =
        document.createElement(
            "section"
        );

    area.id =
        "moduleArea";

    area.className =
        "janjua-module-area";

    area.style.display =
        "none";

    area.innerHTML = `

        <div id="moduleContent">

            <div class="module-placeholder">

                <h2>
                    JANJUA Marketing Modules
                </h2>

                <p>
                    Select a dashboard card.
                </p>

            </div>

        </div>

    `;

    grid.insertAdjacentElement(
        "afterend",
        area
    );
}


/* =========================================================
   OPEN MODULE
   ========================================================= */

function openModule(module) {

    createModuleArea();

    const area =
        document.getElementById(
            "moduleArea"
        );

    const content =
        document.getElementById(
            "moduleContent"
        );

    if (!area || !content) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".dashboard-card"
        );


    let selectedCard = null;


    cards.forEach(card => {

        const button =
            card.querySelector(
                `button[onclick="openModule('${module}')"]`
            );

        if (button) {

            selectedCard =
                card;

        }

    });


    if (selectedCard) {

        selectedCard.insertAdjacentElement(
            "afterend",
            area
        );
    }


    area.style.display =
        "block";


    switch (module) {

        case "dashboard":

            renderDashboardModule(
                content
            );

            break;


        case "categories":

            renderCategoryModule(
                content
            );

            break;


        case "providers":

            renderProviderModule(
                content
            );

            break;


        case "programs":

            renderProgramModule(
                content
            );

            break;


        case "promoters":

            renderPromoterModule(
                content
            );

            break;


        case "tracking":

            renderTrackingModule(
                content
            );

            break;


        case "orders":

            renderOrdersModule(
                content
            );

            break;


        case "payments":

            renderCommissionModule(
                content
            );

            break;


        case "reports":

            renderReportsModule(
                content
            );

            break;

    }


    setTimeout(() => {

        area.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }, 100);
}


/* =========================================================
   CLOSE MODULE
   ========================================================= */

function closeModule() {

    const area =
        document.getElementById(
            "moduleArea"
        );

    if (area) {

        area.style.display =
            "none";
    }
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboardModule(
    content
) {

    const sales =
        data.orders.reduce(
            (sum, item) =>
                sum +
                Number(item.amount || 0),
            0
        );


    const commission =
        data.commissions.reduce(
            (sum, item) =>
                sum +
                Number(item.amount || 0),
            0
        );


    const paid =
        data.payments.reduce(
            (sum, item) =>
                sum +
                Number(item.amount || 0),
            0
        );


    const confirmed =
        data.orders.filter(
            item =>
                item.status === "Confirmed" ||
                item.status === "Completed"
        ).length;


    const conversion =
        data.clicks.length
        ?
        (
            data.orders.length /
            data.clicks.length *
            100
        ).toFixed(2)
        :
        "0.00";


    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    📊 Marketing Dashboard
                </h2>

                <p>
                    Complete platform overview
                </p>

            </div>

            <button
                onclick="closeModule()">

                ✕ Close

            </button>

        </div>


        <div class="stats-grid">

            ${dashboardStat(
                "Categories",
                data.categories.length
            )}

            ${dashboardStat(
                "Providers",
                data.providers.length
            )}

            ${dashboardStat(
                "Programs",
                data.programs.length
            )}

            ${dashboardStat(
                "Promoters",
                data.promoters.length
            )}

            ${dashboardStat(
                "Clicks",
                data.clicks.length
            )}

            ${dashboardStat(
                "Orders",
                data.orders.length
            )}

            ${dashboardStat(
                "Confirmed",
                confirmed
            )}

            ${dashboardStat(
                "Sales",
                formatMoney(sales)
            )}

            ${dashboardStat(
                "Commission",
                formatMoney(commission)
            )}

            ${dashboardStat(
                "Paid",
                formatMoney(paid)
            )}

            ${dashboardStat(
                "Pending",
                formatMoney(
                    Math.max(
                        commission - paid,
                        0
                    )
                )
            )}

            ${dashboardStat(
                "Conversion",
                conversion + "%"
            )}

        </div>


        <div class="module-panel">

            <h3>
                🔄 Complete Marketing Flow
            </h3>

            <div class="flow-box">

                Provider

                →

                Program

                →

                Promoter

                →

                Tracking Link

                →

                Click

                →

                Order

                →

                Commission

                →

                Payment

                →

                Report

            </div>

        </div>


        <div class="module-panel">

            <h3>
                ⚡ Quick Actions
            </h3>

            <div class="quick-actions">

                <button
                    class="primary-action"
                    onclick="openModule('providers')">

                    + Provider

                </button>

                <button
                    class="primary-action"
                    onclick="openModule('programs')">

                    + Program

                </button>

                <button
                    class="primary-action"
                    onclick="openModule('promoters')">

                    + Promoter

                </button>

                <button
                    class="primary-action"
                    onclick="openModule('orders')">

                    + Order

                </button>

                <button
                    class="secondary-action"
                    onclick="openModule('reports')">

                    View Reports

                </button>

            </div>

        </div>

    `;
}


function dashboardStat(
    title,
    value
) {

    return `

        <div class="stat-card">

            <span>
                ${escapeHTML(title)}
            </span>

            <strong>
                ${escapeHTML(value)}
            </strong>

        </div>

    `;
}


/* =========================================================
   CATEGORIES
   ========================================================= */

function renderCategoryModule(
    content
) {

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    📂 Marketing Categories
                </h2>

                <p>
                    Add, edit, search and manage categories.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="module-panel">

            <div class="toolbar">

                <button
                    class="primary-action"
                    onclick="showCategoryForm()">

                    + Add Category

                </button>


                <input
                    id="categorySearch"
                    class="module-search"
                    placeholder="Search category..."
                    oninput="filterCategories()">

            </div>


            <div id="categoryFormArea"></div>


            <div
                id="categoryModuleList"
                class="module-list">

                ${renderCategoryRows()}

            </div>

        </div>

    `;
}


function renderCategoryRows(
    search = ""
) {

    const query =
        search.toLowerCase();


    const items =
        data.categories.filter(
            item =>
                item.name
                    .toLowerCase()
                    .includes(query)
        );


    if (!items.length) {

        return `

            <div class="empty-module">
                No categories found.
            </div>

        `;
    }


    return items.map(
        category => `

        <div class="list-item">

            <div>

                <strong>
                    ${escapeHTML(
                        category.name
                    )}
                </strong>

                <small>
                    ${escapeHTML(
                        category.description || ""
                    )}
                </small>

            </div>


            <div class="button-group">

                <button
                    onclick="editCategory('${category.id}')">

                    Edit

                </button>

                <button
                    onclick="deleteCategory('${category.id}')">

                    Delete

                </button>

            </div>

        </div>

    `).join("");
}


function filterCategories() {

    const search =
        document.getElementById(
            "categorySearch"
        )?.value || "";


    const list =
        document.getElementById(
            "categoryModuleList"
        );


    if (list) {

        list.innerHTML =
            renderCategoryRows(
                search
            );
    }
}


function showCategoryForm(
    id = ""
) {

    const area =
        document.getElementById(
            "categoryFormArea"
        );

    if (!area) {
        return;
    }


    const existing =
        id
        ?
        getCategory(id)
        :
        null;


    area.innerHTML = `

        <div class="form-panel">

            <input
                id="categoryName"
                value="${escapeHTML(
                    existing?.name || ""
                )}"
                placeholder="Category name">


            <input
                id="categoryDescription"
                value="${escapeHTML(
                    existing?.description || ""
                )}"
                placeholder="Description">


            <div class="button-group">

                <button
                    class="primary-action"
                    onclick="${
                        id
                        ?
                        `updateCategory('${id}')`
                        :
                        "createCategory()"
                    }">

                    ${id ? "Update" : "Save"}

                </button>


                <button
                    onclick="cancelForm('categoryFormArea')">

                    Cancel

                </button>

            </div>

        </div>

    `;
}


function createCategory() {

    const name =
        document.getElementById(
            "categoryName"
        )?.value.trim();


    const description =
        document.getElementById(
            "categoryDescription"
        )?.value.trim();


    if (!name) {

        alert(
            "Enter category name."
        );

        return;
    }


    data.categories.push({

        id:createId("cat"),

        name,

        description

    });


    saveData();

    renderCategories();


    renderCategoryModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function editCategory(id) {

    showCategoryForm(id);
}


function updateCategory(id) {

    const item =
        getCategory(id);

    if (!item) {
        return;
    }


    const name =
        document.getElementById(
            "categoryName"
        )?.value.trim();


    const description =
        document.getElementById(
            "categoryDescription"
        )?.value.trim();


    if (!name) {
        return;
    }


    item.name =
        name;

    item.description =
        description;


    saveData();

    renderCategories();

    renderCategoryModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function deleteCategory(id) {

    if (
        !confirm(
            "Delete this category?"
        )
    ) {
        return;
    }


    data.categories =
        data.categories.filter(
            item =>
                item.id !== id
        );


    saveData();

    renderCategories();

    renderCategoryModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function renderCategories() {

    const list =
        document.getElementById(
            "categoryList"
        );

    if (!list) {
        return;
    }


    list.innerHTML =
        data.categories.map(
            category => `

            <div class="category-card">

                <strong>
                    ${escapeHTML(
                        category.name
                    )}
                </strong>

                <span>
                    ${escapeHTML(
                        category.description || ""
                    )}
                </span>

            </div>

        `
        ).join("");
}


/* =========================================================
   PROVIDERS
   ========================================================= */

function renderProviderModule(
    content
) {

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    🏢 Providers & Companies
                </h2>

                <p>
                    Manage banks, brands and companies.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="module-panel">

            <div class="toolbar">

                <button
                    class="primary-action"
                    onclick="showProviderForm()">

                    + Add Provider

                </button>


                <input
                    id="providerSearch"
                    class="module-search"
                    placeholder="Search provider..."
                    oninput="filterProviders()">

            </div>


            <div id="providerFormArea"></div>


            <div
                id="providerList"
                class="module-list">

                ${renderProviderRows()}

            </div>

        </div>

    `;
}


function renderProviderRows(
    search = ""
) {

    const query =
        search.toLowerCase();


    const items =
        data.providers.filter(
            item =>
                (
                    item.name +
                    " " +
                    item.type +
                    " " +
                    item.website
                )
                .toLowerCase()
                .includes(query)
        );


    if (!items.length) {

        return `

            <div class="empty-module">
                No providers found.
            </div>

        `;
    }


    return items.map(
        provider => `

        <div class="list-item">

            <div>

                <strong>
                    ${escapeHTML(
                        provider.name
                    )}
                </strong>

                <small>
                    Type:
                    ${escapeHTML(
                        provider.type || ""
                    )}
                </small>

                <small>
                    ${escapeHTML(
                        provider.website || ""
                    )}
                </small>

            </div>


            <div class="button-group">

                <button
                    onclick="editProvider('${provider.id}')">

                    Edit

                </button>


                <button
                    onclick="deleteProvider('${provider.id}')">

                    Delete

                </button>

            </div>

        </div>

    `).join("");
}


function filterProviders() {

    const value =
        document.getElementById(
            "providerSearch"
        )?.value || "";


    document.getElementById(
        "providerList"
    ).innerHTML =
        renderProviderRows(value);
}


function showProviderForm(
    id = ""
) {

    const area =
        document.getElementById(
            "providerFormArea"
        );

    if (!area) {
        return;
    }


    const existing =
        id
        ?
        getProvider(id)
        :
        null;


    area.innerHTML = `

        <div class="form-panel">

            <input
                id="providerName"
                value="${escapeHTML(
                    existing?.name || ""
                )}"
                placeholder="Provider / Company Name">


            <input
                id="providerType"
                value="${escapeHTML(
                    existing?.type || ""
                )}"
                placeholder="Bank / Brand / Company">


            <input
                id="providerWebsite"
                value="${escapeHTML(
                    existing?.website || ""
                )}"
                placeholder="Website">


            <div class="button-group">

                <button
                    class="primary-action"
                    onclick="${
                        id
                        ?
                        `updateProvider('${id}')`
                        :
                        "createProvider()"
                    }">

                    ${id ? "Update Provider" : "Save Provider"}

                </button>


                <button
                    onclick="cancelForm('providerFormArea')">

                    Cancel

                </button>

            </div>

        </div>

    `;
}


function createProvider() {

    const name =
        document.getElementById(
            "providerName"
        )?.value.trim();


    const type =
        document.getElementById(
            "providerType"
        )?.value.trim();


    const website =
        document.getElementById(
            "providerWebsite"
        )?.value.trim();


    if (!name) {

        alert(
            "Enter provider name."
        );

        return;
    }


    data.providers.push({

        id:createId("provider"),

        name,

        type,

        website,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    renderProviderModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function editProvider(id) {

    showProviderForm(id);
}


function updateProvider(id) {

    const provider =
        getProvider(id);

    if (!provider) {
        return;
    }


    provider.name =
        document.getElementById(
            "providerName"
        )?.value.trim();


    provider.type =
        document.getElementById(
            "providerType"
        )?.value.trim();


    provider.website =
        document.getElementById(
            "providerWebsite"
        )?.value.trim();


    saveData();


    renderProviderModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function deleteProvider(id) {

    if (
        !confirm(
            "Delete this provider?"
        )
    ) {
        return;
    }


    data.providers =
        data.providers.filter(
            item =>
                item.id !== id
        );


    saveData();


    renderProviderModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


/* =========================================================
   PROGRAMS
   ========================================================= */

function renderProgramModule(
    content
) {

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    🎯 Programs & Offers
                </h2>

                <p>
                    Manage affiliate programs and offers.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="module-panel">

            <div class="toolbar">

                <button
                    class="primary-action"
                    onclick="showProgramForm()">

                    + Add Program

                </button>


                <input
                    id="programSearch"
                    class="module-search"
                    placeholder="Search program..."
                    oninput="filterPrograms()">

            </div>


            <div id="programFormArea"></div>


            <div
                id="programList"
                class="module-list">

                ${renderProgramRows()}

            </div>

        </div>

    `;
}


function renderProgramRows(
    search = ""
) {

    const query =
        search.toLowerCase();


    const items =
        data.programs.filter(
            item =>
                item.name
                    .toLowerCase()
                    .includes(query)
        );


    if (!items.length) {

        return `

            <div class="empty-module">
                No programs found.
            </div>

        `;
    }


    return items.map(
        program => {

            const provider =
                getProvider(
                    program.providerId
                );


            const category =
                getCategory(
                    program.categoryId
                );


            return `

                <div class="list-item">

                    <div>

                        <strong>
                            ${escapeHTML(
                                program.name
                            )}
                        </strong>

                        <small>
                            Provider:
                            ${escapeHTML(
                                provider?.name ||
                                "Not selected"
                            )}
                        </small>

                        <small>
                            Category:
                            ${escapeHTML(
                                category?.name ||
                                "Not selected"
                            )}
                        </small>

                        <small>
                            Commission:
                            ${Number(
                                program.commissionRate || 0
                            )}%
                        </small>

                        <small>
                            ${escapeHTML(
                                program.affiliateUrl ||
                                ""
                            )}
                        </small>

                    </div>


                    <div class="button-group">

                        <button
                            onclick="editProgram('${program.id}')">

                            Edit

                        </button>


                        <button
                            onclick="deleteProgram('${program.id}')">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }
    ).join("");
}


function filterPrograms() {

    const value =
        document.getElementById(
            "programSearch"
        )?.value || "";


    document.getElementById(
        "programList"
    ).innerHTML =
        renderProgramRows(value);
}


function showProgramForm(
    id = ""
) {

    const area =
        document.getElementById(
            "programFormArea"
        );

    if (!area) {
        return;
    }


    const existing =
        id
        ?
        getProgram(id)
        :
        null;


    area.innerHTML = `

        <div class="form-panel">

            <input
                id="programName"
                value="${escapeHTML(
                    existing?.name || ""
                )}"
                placeholder="Program / Offer Name">


            <select id="programProvider">

                <option value="">
                    Select Provider
                </option>

                ${
                    data.providers.map(
                        provider => `

                        <option
                            value="${provider.id}"
                            ${
                                existing?.providerId ===
                                provider.id
                                ?
                                "selected"
                                :
                                ""
                            }>

                            ${escapeHTML(
                                provider.name
                            )}

                        </option>

                    `
                    ).join("")
                }

            </select>


            <select id="programCategory">

                <option value="">
                    Select Category
                </option>

                ${
                    data.categories.map(
                        category => `

                        <option
                            value="${category.id}"
                            ${
                                existing?.categoryId ===
                                category.id
                                ?
                                "selected"
                                :
                                ""
                            }>

                            ${escapeHTML(
                                category.name
                            )}

                        </option>

                    `
                    ).join("")
                }

            </select>


            <input
                id="programAffiliateUrl"
                value="${escapeHTML(
                    existing?.affiliateUrl || ""
                )}"
                placeholder="Affiliate / Offer URL">


            <input
                id="programCommission"
                type="number"
                min="0"
                step="0.01"
                value="${
                    existing?.commissionRate ??
                    data.settings.defaultCommissionRate
                }"
                placeholder="Commission %">


            <select id="programStatus">

                <option
                    value="Active"
                    ${
                        existing?.status !== "Inactive"
                        ?
                        "selected"
                        :
                        ""
                    }>

                    Active

                </option>


                <option
                    value="Inactive"
                    ${
                        existing?.status === "Inactive"
                        ?
                        "selected"
                        :
                        ""
                    }>

                    Inactive

                </option>

            </select>


            <div class="button-group">

                <button
                    class="primary-action"
                    onclick="${
                        id
                        ?
                        `updateProgram('${id}')`
                        :
                        "createProgram()"
                    }">

                    ${id ? "Update Program" : "Save Program"}

                </button>


                <button
                    onclick="cancelForm('programFormArea')">

                    Cancel

                </button>

            </div>

        </div>

    `;
}


function createProgram() {

    const program =
        readProgramForm();


    if (!program.name) {

        alert(
            "Enter program name."
        );

        return;
    }


    data.programs.push({

        id:createId("program"),

        ...program,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    renderProgramModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function readProgramForm() {

    return {

        name:
            document.getElementById(
                "programName"
            )?.value.trim() || "",

        providerId:
            document.getElementById(
                "programProvider"
            )?.value || "",

        categoryId:
            document.getElementById(
                "programCategory"
            )?.value || "",

        affiliateUrl:
            document.getElementById(
                "programAffiliateUrl"
            )?.value.trim() || "",

        commissionRate:
            Number(
                document.getElementById(
                    "programCommission"
                )?.value
            ) || 0,

        status:
            document.getElementById(
                "programStatus"
            )?.value || "Active"

    };
}


function editProgram(id) {

    showProgramForm(id);
}


function updateProgram(id) {

    const program =
        getProgram(id);

    if (!program) {
        return;
    }


    const values =
        readProgramForm();


    if (!values.name) {
        return;
    }


    Object.assign(
        program,
        values
    );


    saveData();


    renderProgramModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function deleteProgram(id) {

    if (
        !confirm(
            "Delete this program?"
        )
    ) {
        return;
    }


    data.programs =
        data.programs.filter(
            item =>
                item.id !== id
        );


    data.assignments =
        data.assignments.filter(
            item =>
                item.programId !== id
        );


    data.trackingLinks =
        data.trackingLinks.filter(
            item =>
                item.programId !== id
        );


    saveData();


    renderProgramModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


/* =========================================================
   PROMOTERS
   ========================================================= */

function renderPromoterModule(
    content
) {

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    👥 Promoters / Workers
                </h2>

                <p>
                    Manage marketing workers and performance.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="module-panel">

            <div class="toolbar">

                <button
                    class="primary-action"
                    onclick="showPromoterForm()">

                    + Add Promoter

                </button>


                <input
                    id="promoterSearch"
                    class="module-search"
                    placeholder="Search promoter..."
                    oninput="filterPromoters()">

            </div>


            <div id="promoterFormArea"></div>


            <div
                id="promoterList"
                class="module-list">

                ${renderPromoterRows()}

            </div>

        </div>

    `;
}


function renderPromoterRows(
    search = ""
) {

    const query =
        search.toLowerCase();


    const items =
        data.promoters.filter(
            item =>
                (
                    item.name +
                    " " +
                    item.phone +
                    " " +
                    item.email
                )
                .toLowerCase()
                .includes(query)
        );


    if (!items.length) {

        return `

            <div class="empty-module">
                No promoters found.
            </div>

        `;
    }


    return items.map(
        promoter => {

            const commission =
                data.commissions
                    .filter(
                        item =>
                            item.promoterId ===
                            promoter.id
                    )
                    .reduce(
                        (sum,item) =>
                            sum +
                            Number(
                                item.amount || 0
                            ),
                        0
                    );


            return `

                <div class="list-item">

                    <div>

                        <strong>
                            ${escapeHTML(
                                promoter.name
                            )}
                        </strong>

                        <small>
                            Phone:
                            ${escapeHTML(
                                promoter.phone || ""
                            )}
                        </small>

                        <small>
                            Email:
                            ${escapeHTML(
                                promoter.email || ""
                            )}
                        </small>

                        <small>
                            Commission:
                            ${formatMoney(
                                commission
                            )}
                        </small>

                    </div>


                    <div class="button-group">

                        <button
                            onclick="editPromoter('${promoter.id}')">

                            Edit

                        </button>


                        <button
                            onclick="deletePromoter('${promoter.id}')">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }
    ).join("");
}


function filterPromoters() {

    const value =
        document.getElementById(
            "promoterSearch"
        )?.value || "";


    document.getElementById(
        "promoterList"
    ).innerHTML =
        renderPromoterRows(value);
}


function showPromoterForm(
    id = ""
) {

    const area =
        document.getElementById(
            "promoterFormArea"
        );

    if (!area) {
        return;
    }


    const existing =
        id
        ?
        getPromoter(id)
        :
        null;


    area.innerHTML = `

        <div class="form-panel">

            <input
                id="promoterName"
                value="${escapeHTML(
                    existing?.name || ""
                )}"
                placeholder="Promoter Name">


            <input
                id="promoterPhone"
                value="${escapeHTML(
                    existing?.phone || ""
                )}"
                placeholder="Phone Number">


            <input
                id="promoterEmail"
                value="${escapeHTML(
                    existing?.email || ""
                )}"
                placeholder="Email">


            <select id="promoterStatus">

                <option
                    value="Active"
                    ${
                        existing?.status !== "Inactive"
                        ?
                        "selected"
                        :
                        ""
                    }>

                    Active

                </option>


                <option
                    value="Inactive"
                    ${
                        existing?.status === "Inactive"
                        ?
                        "selected"
                        :
                        ""
                    }>

                    Inactive

                </option>

            </select>


            <div class="button-group">

                <button
                    class="primary-action"
                    onclick="${
                        id
                        ?
                        `updatePromoter('${id}')`
                        :
                        "createPromoter()"
                    }">

                    ${id ? "Update Promoter" : "Save Promoter"}

                </button>


                <button
                    onclick="cancelForm('promoterFormArea')">

                    Cancel

                </button>

            </div>

        </div>

    `;
}


function createPromoter() {

    const promoter =
        readPromoterForm();


    if (!promoter.name) {

        alert(
            "Enter promoter name."
        );

        return;
    }


    data.promoters.push({

        id:createId("promoter"),

        ...promoter,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    renderPromoterModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function readPromoterForm() {

    return {

        name:
            document.getElementById(
                "promoterName"
            )?.value.trim() || "",

        phone:
            document.getElementById(
                "promoterPhone"
            )?.value.trim() || "",

        email:
            document.getElementById(
                "promoterEmail"
            )?.value.trim() || "",

        status:
            document.getElementById(
                "promoterStatus"
            )?.value || "Active"

    };
}


function editPromoter(id) {

    showPromoterForm(id);
}


function updatePromoter(id) {

    const promoter =
        getPromoter(id);

    if (!promoter) {
        return;
    }


    const values =
        readPromoterForm();


    Object.assign(
        promoter,
        values
    );


    saveData();


    renderPromoterModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function deletePromoter(id) {

    if (
        !confirm(
            "Delete this promoter?"
        )
    ) {
        return;
    }


    data.promoters =
        data.promoters.filter(
            item =>
                item.id !== id
        );


    data.assignments =
        data.assignments.filter(
            item =>
                item.promoterId !== id
        );


    data.trackingLinks =
        data.trackingLinks.filter(
            item =>
                item.promoterId !== id
        );


    saveData();


    renderPromoterModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


/* =========================================================
   TRACKING LINKS
   ========================================================= */

function renderTrackingModule(
    content
) {

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    🔗 Tracking Links
                </h2>

                <p>
                    Promoter links and social links.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="module-panel">

            <div class="toolbar">

                <button
                    class="primary-action"
                    onclick="showAssignmentForm()">

                    + Create Tracking Link

                </button>


                <button
                    class="secondary-action"
                    onclick="showSocialLinkForm()">

                    + Social Link

                </button>

            </div>


            <div id="assignmentFormArea"></div>


            <h3>
                🔗 Promoter Tracking Links
            </h3>


            <div class="module-list">

                ${
                    data.trackingLinks.length
                    ?
                    data.trackingLinks.map(
                        link => {

                            const promoter =
                                getPromoter(
                                    link.promoterId
                                );


                            const program =
                                getProgram(
                                    link.programId
                                );


                            return `

                                <div class="list-item">

                                    <div>

                                        <strong>
                                            ${escapeHTML(
                                                program?.name ||
                                                "Program"
                                            )}
                                        </strong>

                                        <small>
                                            Promoter:
                                            ${escapeHTML(
                                                promoter?.name ||
                                                "Unknown"
                                            )}
                                        </small>

                                        <small>
                                            Clicks:
                                            ${
                                                Number(
                                                    link.clicks || 0
                                                )
                                            }
                                        </small>

                                        <small class="link-text">
                                            ${escapeHTML(
                                                link.url
                                            )}
                                        </small>

                                    </div>


                                    <div class="button-group">

                                        <button
                                            onclick="copyTrackingLink('${link.id}')">

                                            Copy

                                        </button>


                                        <button
                                            onclick="testTrackingLink('${link.id}')">

                                            Test

                                        </button>


                                        <button
                                            onclick="deleteTrackingLink('${link.id}')">

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")
                    :
                    `
                    <div class="empty-module">
                        No tracking links.
                    </div>
                    `
                }

            </div>


            <h3>
                📱 Social Media Links
            </h3>


            <div id="socialLinkFormArea"></div>


            <div class="module-list">

                ${
                    data.socialLinks.length
                    ?
                    data.socialLinks.map(
                        link => `

                        <div class="list-item">

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        link.platform
                                    )}
                                </strong>

                                <small>
                                    Program:
                                    ${escapeHTML(
                                        getProgram(
                                            link.programId
                                        )?.name ||
                                        "Unknown"
                                    )}
                                </small>

                                <small>
                                    Clicks:
                                    ${Number(
                                        link.clicks || 0
                                    )}
                                </small>

                                <small class="link-text">
                                    ${escapeHTML(
                                        link.url
                                    )}
                                </small>

                            </div>


                            <div class="button-group">

                                <button
                                    onclick="copySocialLink('${link.id}')">

                                    Copy

                                </button>


                                <button
                                    onclick="testSocialLink('${link.id}')">

                                    Test

                                </button>


                                <button
                                    onclick="deleteSocialLink('${link.id}')">

                                    Delete

                                </button>

                            </div>

                        </div>

                    `
                    ).join("")
                    :
                    `
                    <div class="empty-module">
                        No social links.
                    </div>
                    `
                }

            </div>

        </div>

    `;
}


/* =========================================================
   TRACKING ASSIGNMENT
   ========================================================= */

function showAssignmentForm() {

    const area =
        document.getElementById(
            "assignmentFormArea"
        );

    if (!area) {
        return;
    }


    if (!data.promoters.length) {

        alert(
            "Add a promoter first."
        );

        return;
    }


    if (!data.programs.length) {

        alert(
            "Add a program first."
        );

        return;
    }


    area.innerHTML = `

        <div class="form-panel">

            <select id="assignmentPromoter">

                <option value="">
                    Select Promoter
                </option>

                ${
                    data.promoters.map(
                        promoter => `

                        <option value="${promoter.id}">
                            ${escapeHTML(
                                promoter.name
                            )}
                        </option>

                    `
                    ).join("")
                }

            </select>


            <select id="assignmentProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(
                        program => `

                        <option value="${program.id}">
                            ${escapeHTML(
                                program.name
                            )}
                        </option>

                    `
                    ).join("")
                }

            </select>


            <button
                class="primary-action"
                onclick="createAssignment()">

                Create Tracking Link

            </button>

        </div>

    `;
}


function createAssignment() {

    const promoterId =
        document.getElementById(
            "assignmentPromoter"
        )?.value;


    const programId =
        document.getElementById(
            "assignmentProgram"
        )?.value;


    if (
        !promoterId ||
        !programId
    ) {

        alert(
            "Select promoter and program."
        );

        return;
    }


    const code =
        "TRK_" +
        Math.random()
            .toString(36)
            .substring(2,10)
            .toUpperCase();


    const url =
        window.location.origin +
        window.location.pathname +
        "?track=" +
        encodeURIComponent(code);


    const assignment = {

        id:
            createId("assignment"),

        promoterId,

        programId,

        code,

        createdAt:
            new Date().toISOString()

    };


    const link = {

        id:
            createId("tracking"),

        assignmentId:
            assignment.id,

        promoterId,

        programId,

        code,

        url,

        clicks:0,

        createdAt:
            new Date().toISOString()

    };


    data.assignments.push(
        assignment
    );


    data.trackingLinks.push(
        link
    );


    saveData();


    renderTrackingModule(
        document.getElementById(
            "moduleContent"
        )
    );


    alert(
        "Tracking link created."
    );
}


function copyTrackingLink(id) {

    const link =
        getTrackingLink(id);

    if (!link) {
        return;
    }


    copyText(
        link.url,
        "Tracking link copied."
    );
}


function testTrackingLink(id) {

    const link =
        getTrackingLink(id);

    if (!link) {
        return;
    }


    window.open(
        link.url,
        "_blank"
    );
}


function deleteTrackingLink(id) {

    if (
        !confirm(
            "Delete tracking link?"
        )
    ) {
        return;
    }


    data.trackingLinks =
        data.trackingLinks.filter(
            item =>
                item.id !== id
        );


    saveData();


    renderTrackingModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


/* =========================================================
   PUBLIC TRACKING
   ========================================================= */

function handlePublicTracking() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const code =
        params.get("track");


    if (!code) {
        return;
    }


    const link =
        data.trackingLinks.find(
            item =>
                item.code === code
        );


    if (!link) {
        return;
    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    data.clicks.push({

        id:
            createId("click"),

        type:
            "tracking",

        trackingCode:
            code,

        trackingLinkId:
            link.id,

        promoterId:
            link.promoterId,

        programId:
            link.programId,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    showPublicLandingMessage(
        "tracking",
        link
    );
}


/* =========================================================
   SOCIAL LINKS
   ========================================================= */

function showSocialLinkForm() {

    const area =
        document.getElementById(
            "socialLinkFormArea"
        );

    if (!area) {
        return;
    }


    if (!data.programs.length) {

        alert(
            "Add a program first."
        );

        return;
    }


    area.innerHTML = `

        <div class="form-panel">

            <select id="socialPlatform">

                <option value="">
                    Select Platform
                </option>

                <option value="Facebook">
                    Facebook
                </option>

                <option value="Instagram">
                    Instagram
                </option>

                <option value="TikTok">
                    TikTok
                </option>

                <option value="WhatsApp">
                    WhatsApp
                </option>

                <option value="YouTube">
                    YouTube
                </option>

            </select>


            <select id="socialProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(
                        program => `

                        <option value="${program.id}">
                            ${escapeHTML(
                                program.name
                            )}
                        </option>

                    `
                    ).join("")
                }

            </select>


            <button
                class="primary-action"
                onclick="createSocialMediaLink()">

                Create Social Link

            </button>

        </div>

    `;
}


function createSocialMediaLink() {

    const platform =
        document.getElementById(
            "socialPlatform"
        )?.value;


    const programId =
        document.getElementById(
            "socialProgram"
        )?.value;


    if (
        !platform ||
        !programId
    ) {

        alert(
            "Select platform and program."
        );

        return;
    }


    const code =
        "SOC_" +
        Math.random()
            .toString(36)
            .substring(2,10)
            .toUpperCase();


    const url =
        window.location.origin +
        window.location.pathname +
        "?social=" +
        encodeURIComponent(code);


    data.socialLinks.push({

        id:
            createId("social"),

        code,

        platform,

        programId,

        url,

        clicks:0,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    renderTrackingModule(
        document.getElementById(
            "moduleContent"
        )
    );


    alert(
        "Social link created."
    );
}


function copySocialLink(id) {

    const link =
        getSocialLink(id);

    if (!link) {
        return;
    }


    copyText(
        link.url,
        "Social link copied."
    );
}


function testSocialLink(id) {

    const link =
        getSocialLink(id);

    if (!link) {
        return;
    }


    window.open(
        link.url,
        "_blank"
    );
}


function deleteSocialLink(id) {

    if (
        !confirm(
            "Delete social link?"
        )
    ) {
        return;
    }


    data.socialLinks =
        data.socialLinks.filter(
            item =>
                item.id !== id
        );


    saveData();


    renderTrackingModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function handlePublicSocialLink() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const code =
        params.get("social");


    if (!code) {
        return;
    }


    const link =
        data.socialLinks.find(
            item =>
                item.code === code
        );


    if (!link) {
        return;
    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    data.clicks.push({

        id:
            createId("socialclick"),

        type:
            "social",

        socialCode:
            code,

        socialLinkId:
            link.id,

        programId:
            link.programId,

        platform:
            link.platform,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    showPublicLandingMessage(
        "social",
        link
    );
}


/* =========================================================
   PUBLIC LANDING
   ========================================================= */

function showPublicLandingMessage(
    type,
    link
) {

    const program =
        getProgram(
            link.programId
        );


    const box =
        document.createElement(
            "div"
        );


    box.className =
        "public-link-message";


    box.innerHTML = `

        <div class="public-link-card">

            <div class="public-logo">
                JANJUA
            </div>


            <h2>
                Welcome to JANJUA
            </h2>


            <p>
                ${escapeHTML(
                    program?.name ||
                    "Marketing Offer"
                )}
            </p>


            <p>
                Your ${
                    type === "social"
                    ?
                    "social media"
                    :
                    "tracking"
                } visit has been recorded.
            </p>


            ${
                program?.affiliateUrl

                ?

                `
                <a
                    class="primary-action public-link-button"
                    href="${escapeHTML(
                        program.affiliateUrl
                    )}"
                    target="_blank"
                    rel="noopener noreferrer">

                    Continue to Offer

                </a>
                `

                :

                `
                <p>
                    Offer URL not configured.
                </p>
                `
            }

        </div>

    `;


    document.body.appendChild(
        box
    );
}


/* =========================================================
   ORDERS & CLICKS
   ========================================================= */

function renderOrdersModule(
    content
) {

    const sales =
        data.orders.reduce(
            (sum,item) =>
                sum +
                Number(
                    item.amount || 0
                ),
            0
        );


    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    🛒 Orders & Clicks
                </h2>

                <p>
                    Manage orders, clicks and sales.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="stats-grid">

            ${dashboardStat(
                "Total Clicks",
                data.clicks.length
            )}

            ${dashboardStat(
                "Orders",
                data.orders.length
            )}

            ${dashboardStat(
                "Sales",
                formatMoney(sales)
            )}

        </div>


        <div class="module-panel">

            <div class="toolbar">

                <button
                    class="primary-action"
                    onclick="showOrderForm()">

                    + Add Order

                </button>


                <input
                    id="orderSearch"
                    class="module-search"
                    placeholder="Search order..."
                    oninput="filterOrders()">

            </div>


            <div id="orderFormArea"></div>


            <div
                id="orderList"
                class="module-list">

                ${renderOrderRows()}

            </div>

        </div>

    `;
}


function renderOrderRows(
    search = ""
) {

    const query =
        search.toLowerCase();


    const orders =
        data.orders.filter(
            order => {

                const program =
                    getProgram(
                        order.programId
                    );


                const promoter =
                    getPromoter(
                        order.promoterId
                    );


                return (

                    (
                        order.customerName +
                        " " +
                        program?.name +
                        " " +
                        promoter?.name +
                        " " +
                        order.status
                    )
                    .toLowerCase()
                    .includes(query)

                );

            }
        );


    if (!orders.length) {

        return `

            <div class="empty-module">
                No orders found.
            </div>

        `;
    }


    return orders.map(
        order => {

            const program =
                getProgram(
                    order.programId
                );


            const promoter =
                getPromoter(
                    order.promoterId
                );


            return `

                <div class="list-item">

                    <div>

                        <strong>
                            ${escapeHTML(
                                order.customerName
                            )}
                        </strong>

                        <small>
                            Program:
                            ${escapeHTML(
                                program?.name ||
                                "Unknown"
                            )}
                        </small>

                        <small>
                            Promoter:
                            ${escapeHTML(
                                promoter?.name ||
                                "Direct"
                            )}
                        </small>

                        <small>
                            Amount:
                            ${formatMoney(
                                order.amount
                            )}
                        </small>

                        <small>
                            Commission:
                            ${formatMoney(
                                order.commissionAmount
                            )}
                        </small>

                        <small>
                            Status:
                            ${escapeHTML(
                                order.status
                            )}
                        </small>

                        <small>
                            ${formatDate(
                                order.createdAt
                            )}
                        </small>

                    </div>


                    <div class="button-group">

                        <button
                            onclick="updateOrderStatus('${order.id}')">

                            Status

                        </button>


                        <button
                            onclick="deleteOrder('${order.id}')">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }
    ).join("");
}


function filterOrders() {

    const value =
        document.getElementById(
            "orderSearch"
        )?.value || "";


    document.getElementById(
        "orderList"
    ).innerHTML =
        renderOrderRows(value);
}


/* =========================================================
   ORDER FORM
   ========================================================= */

function showOrderForm() {

    const area =
        document.getElementById(
            "orderFormArea"
        );

    if (!area) {
        return;
    }


    if (!data.programs.length) {

        alert(
            "Add a program first."
        );

        return;
    }


    area.innerHTML = `

        <div class="form-panel">

            <input
                id="orderCustomer"
                placeholder="Customer Name">


            <input
                id="orderPhone"
                placeholder="Customer Phone">


            <select id="orderProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(
                        program => `

                        <option value="${program.id}">
                            ${escapeHTML(
                                program.name
                            )}
                        </option>

                    `
                    ).join("")
                }

            </select>


            <select id="orderPromoter">

                <option value="">
                    Direct / No Promoter
                </option>

                ${
                    data.promoters.map(
                        promoter => `

                        <option value="${promoter.id}">
                            ${escapeHTML(
                                promoter.name
                            )}
                        </option>

                    `
                    ).join("")
                }

            </select>


            <input
                id="orderAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="Order Amount">


            <select id="orderStatus">

                <option value="Pending">
                    Pending
                </option>

                <option value="Confirmed">
                    Confirmed
                </option>

                <option value="Completed">
                    Completed
                </option>

                <option value="Cancelled">
                    Cancelled
                </option>

            </select>


            <input
                id="orderTrackingCode"
                placeholder="Tracking Code (optional)">


            <button
                class="primary-action"
                onclick="createOrder()">

                Save Order

            </button>

        </div>

    `;
}


function createOrder() {

    const customerName =
        document.getElementById(
            "orderCustomer"
        )?.value.trim();


    const customerPhone =
        document.getElementById(
            "orderPhone"
        )?.value.trim();


    const programId =
        document.getElementById(
            "orderProgram"
        )?.value;


    const promoterId =
        document.getElementById(
            "orderPromoter"
        )?.value || "";


    const amount =
        Number(
            document.getElementById(
                "orderAmount"
            )?.value
        ) || 0;


    const status =
        document.getElementById(
            "orderStatus"
        )?.value ||
        "Pending";


    const trackingCode =
        document.getElementById(
            "orderTrackingCode"
        )?.value.trim() ||
        "";


    if (!customerName) {

        alert(
            "Enter customer name."
        );

        return;
    }


    if (!programId) {

        alert(
            "Select program."
        );

        return;
    }


    if (amount <= 0) {

        alert(
            "Enter valid amount."
        );

        return;
    }


    const rate =
        getProgramRate(
            programId
        );


    const commissionAmount =
        calculateCommission(
            amount,
            rate
        );


    const order = {

        id:
            createId("order"),

        customerName,

        customerPhone,

        programId,

        promoterId,

        amount,

        status,

        trackingCode,

        commissionRate:
            rate,

        commissionAmount,

        createdAt:
            new Date().toISOString()

    };


    data.orders.push(
        order
    );


    if (
        status === "Confirmed" ||
        status === "Completed"
    ) {

        createCommissionForOrder(
            order
        );
    }


    saveData();


    renderOrdersModule(
        document.getElementById(
            "moduleContent"
        )
    );


    alert(
        "Order saved successfully."
    );
}


/* =========================================================
   COMMISSION
   ========================================================= */

function createCommissionForOrder(
    order
) {

    const exists =
        data.commissions.some(
            item =>
                item.orderId ===
                order.id
        );


    if (exists) {
        return;
    }


    data.commissions.push({

        id:
            createId("commission"),

        orderId:
            order.id,

        programId:
            order.programId,

        promoterId:
            order.promoterId || "",

        amount:
            order.commissionAmount,

        status:
            "Pending",

        createdAt:
            new Date().toISOString()

    });
}


function updateOrderStatus(id) {

    const order =
        data.orders.find(
            item =>
                item.id === id
        );


    if (!order) {
        return;
    }


    const statuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
    ];


    const current =
        statuses.indexOf(
            order.status
        );


    const next =
        prompt(
            "Enter status:\nPending\nConfirmed\nCompleted\nCancelled",
            order.status
        );


    if (
        !next ||
        !statuses.includes(next)
    ) {

        return;
    }


    order.status =
        next;


    if (
        next === "Confirmed" ||
        next === "Completed"
    ) {

        createCommissionForOrder(
            order
        );

    } else {

        data.commissions =
            data.commissions.filter(
                item =>
                    item.orderId !==
                    order.id
            );
    }


    saveData();


    renderOrdersModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


function deleteOrder(id) {

    if (
        !confirm(
            "Delete this order?"
        )
    ) {
        return;
    }


    data.orders =
        data.orders.filter(
            item =>
                item.id !== id
        );


    data.commissions =
        data.commissions.filter(
            item =>
                item.orderId !== id
        );


    saveData();


    renderOrdersModule(
        document.getElementById(
            "moduleContent"
        )
    );
}


/* =========================================================
   COMMISSION & PAYMENTS
   ========================================================= */

function renderCommissionModule(
    content
) {

    const total =
        data.commissions.reduce(
            (sum,item) =>
                sum +
                Number(
                    item.amount || 0
                ),
            0
        );


    const paid =
        data.payments.reduce(
            (sum,item) =>
                sum +
                Number(
                    item.amount || 0
                ),
            0
        );


    const pending =
        Math.max(
            total - paid,
            0
        );


    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    💰 Commission & Payments
                </h2>

                <p>
                    Manage promoter earnings and payments.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="stats-grid">

            ${dashboardStat(
                "Commission",
                formatMoney(total)
            )}

            ${dashboardStat(
                "Paid",
                formatMoney(paid)
            )}

            ${dashboardStat(
                "Pending",
                formatMoney(pending)
            )}

        </div>


        <div class="module-panel">

            <h3>
                💵 Commission Records
            </h3>


            <div class="module-list">

                ${
                    data.commissions.length

                    ?

                    data.commissions.map(
                        item => {

                            const promoter =
                                getPromoter(
                                    item.promoterId
                                );


                            const program =
                                getProgram(
                                    item.programId
                                );


                            return `

                                <div class="list-item">

                                    <div>

                                        <strong>
                                            ${formatMoney(
                                                item.amount
                                            )}
                                        </strong>

                                        <small>
                                            Promoter:
                                            ${escapeHTML(
                                                promoter?.name ||
                                                "Direct"
                                            )}
                                        </small>

                                        <small>
                                            Program:
                                            ${escapeHTML(
                                                program?.name ||
                                                "Unknown"
                                            )}
                                        </small>

                                        <small>
                                            Status:
                                            ${escapeHTML(
                                                item.status
                                            )}
                                        </small>

                                    </div>


                                    ${
                                        item.status ===
                                        "Pending"

                                        ?

                                        `
                                        <button
                                            onclick="markCommissionPaid('${item.id}')">

                                            Mark Paid

                                        </button>
                                        `

                                        :

                                        `
                                        <strong>
                                            PAID
                                        </strong>
                                        `
                                    }

                                </div>

                            `;

                        }
                    ).join("")

                    :

                    `
                    <div class="empty-module">
                        No commissions.
                    </div>
                    `
                }

            </div>

        </div>


        <div class="module-panel">

            <h3>
                💳 Payment Records
            </h3>


            <div class="module-list">

                ${
                    data.payments.length

                    ?

                    data.payments.map(
                        payment => {

                            const promoter =
                                getPromoter(
                                    payment.promoterId
                                );


                            return `

                                <div class="list-item">

                                    <div>

                                        <strong>
                                            ${formatMoney(
                                                payment.amount
                                            )}
                                        </strong>

                                        <small>
                                            Promoter:
                                            ${escapeHTML(
                                                promoter?.name ||
                                                "Not assigned"
                                            )}
                                        </small>

                                        <small>
                                            Method:
                                            ${escapeHTML(
                                                payment.method ||
                                                "Manual"
                                            )}
                                        </small>

                                        <small>
                                            ${formatDate(
                                                payment.createdAt
                                            )}
                                        </small>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")

                    :

                    `
                    <div class="empty-module">
                        No payment records.
                    </div>
                    `
                }

            </div>

        </div>

    `;
}


function markCommissionPaid(id) {

    const commission =
        data.commissions.find(
            item =>
                item.id === id
        );


    if (!commission) {
        return;
    }


    if (
        commission.status === "Paid"
    ) {
        return;
    }


    const method =
        prompt(
            "Payment method:",
            "Manual"
        ) ||
        "Manual";


    commission.status =
        "Paid";


    data.payments.push({

        id:
            createId("payment"),

        commissionId:
            commission.id,

        promoterId:
            commission.promoterId,

        amount:
            commission.amount,

        method,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    renderCommissionModule(
        document.getElementById(
            "moduleContent"
        )
    );


    alert(
        "Payment recorded."
    );
}


/* =========================================================
   REPORTS & ANALYTICS
   ========================================================= */

function renderReportsModule(
    content
) {

    const clicks =
        data.clicks.length;


    const orders =
        data.orders.length;


    const confirmed =
        data.orders.filter(
            item =>
                item.status === "Confirmed" ||
                item.status === "Completed"
        ).length;


    const sales =
        data.orders.reduce(
            (sum,item) =>
                sum +
                Number(
                    item.amount || 0
                ),
            0
        );


    const commission =
        data.commissions.reduce(
            (sum,item) =>
                sum +
                Number(
                    item.amount || 0
                ),
            0
        );


    const paid =
        data.payments.reduce(
            (sum,item) =>
                sum +
                Number(
                    item.amount || 0
                ),
            0
        );


    const conversion =
        clicks
        ?
        (
            orders /
            clicks *
            100
        ).toFixed(2)
        :
        "0.00";


    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    📈 Reports & Analytics
                </h2>

                <p>
                    Complete business performance.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="toolbar">

            <button
                class="primary-action"
                onclick="exportAllDataCSV()">

                📤 Export Data

            </button>


            <button
                class="secondary-action"
                onclick="openModule('promoters')">

                Promoter Performance

            </button>

        </div>


        <div class="stats-grid">

            ${dashboardStat(
                "Clicks",
                clicks
            )}

            ${dashboardStat(
                "Orders",
                orders
            )}

            ${dashboardStat(
                "Confirmed",
                confirmed
            )}

            ${dashboardStat(
                "Conversion",
                conversion + "%"
            )}

            ${dashboardStat(
                "Sales",
                formatMoney(sales)
            )}

            ${dashboardStat(
                "Commission",
                formatMoney(commission)
            )}

            ${dashboardStat(
                "Paid",
                formatMoney(paid)
            )}

            ${dashboardStat(
                "Pending",
                formatMoney(
                    Math.max(
                        commission - paid,
                        0
                    )
                )
            )}

        </div>


        <div class="module-panel">

            <h3>
                👥 Promoter Performance
            </h3>

            <div class="module-list">

                ${
                    data.promoters.length

                    ?

                    data.promoters.map(
                        promoter => {

                            const promoterOrders =
                                data.orders.filter(
                                    order =>
                                        order.promoterId ===
                                        promoter.id
                                );


                            const promoterSales =
                                promoterOrders.reduce(
                                    (sum,order) =>
                                        sum +
                                        Number(
                                            order.amount || 0
                                        ),
                                    0
                                );


                            const promoterCommission =
                                data.commissions
                                    .filter(
                                        item =>
                                            item.promoterId ===
                                            promoter.id
                                    )
                                    .reduce(
                                        (sum,item) =>
                                            sum +
                                            Number(
                                                item.amount || 0
                                            ),
                                        0
                                    );


                            return `

                                <div class="list-item">

                                    <div>

                                        <strong>
                                            ${escapeHTML(
                                                promoter.name
                                            )}
                                        </strong>

                                        <small>
                                            Orders:
                                            ${promoterOrders.length}
                                        </small>

                                        <small>
                                            Sales:
                                            ${formatMoney(
                                                promoterSales
                                            )}
                                        </small>

                                        <small>
                                            Commission:
                                            ${formatMoney(
                                                promoterCommission
                                            )}
                                        </small>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")

                    :

                    `
                    <div class="empty-module">
                        No promoter data.
                    </div>
                    `
                }

            </div>

        </div>


        <div class="module-panel">

            <h3>
                🎯 Program Performance
            </h3>

            <div class="module-list">

                ${
                    data.programs.length

                    ?

                    data.programs.map(
                        program => {

                            const programOrders =
                                data.orders.filter(
                                    order =>
                                        order.programId ===
                                        program.id
                                );


                            const programSales =
                                programOrders.reduce(
                                    (sum,order) =>
                                        sum +
                                        Number(
                                            order.amount || 0
                                        ),
                                    0
                                );


                            return `

                                <div class="list-item">

                                    <div>

                                        <strong>
                                            ${escapeHTML(
                                                program.name
                                            )}
                                        </strong>

                                        <small>
                                            Orders:
                                            ${programOrders.length}
                                        </small>

                                        <small>
                                            Sales:
                                            ${formatMoney(
                                                programSales
                                            )}
                                        </small>

                                        <small>
                                            Commission Rate:
                                            ${Number(
                                                program.commissionRate || 0
                                            )}%
                                        </small>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")

                    :

                    `
                    <div class="empty-module">
                        No program data.
                    </div>
                    `
                }

            </div>

        </div>

    `;
}


/* =========================================================
   SETTINGS
   ========================================================= */

function renderSettingsModule(
    content
) {

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    ⚙️ Platform Settings
                </h2>

                <p>
                    Basic platform configuration.
                </p>

            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="module-panel">

            <div class="form-panel">

                <input
                    id="settingsPlatformName"
                    value="${escapeHTML(
                        data.settings.platformName
                    )}"
                    placeholder="Platform Name">


                <input
                    id="settingsBrandName"
                    value="${escapeHTML(
                        data.settings.brandName
                    )}"
                    placeholder="Brand Name">


                <input
                    id="settingsCurrency"
                    value="${escapeHTML(
                        data.settings.currency
                    )}"
                    placeholder="Currency">


                <input
                    id="settingsCommission"
                    type="number"
                    min="0"
                    step="0.01"
                    value="${
                        data.settings.defaultCommissionRate
                    }"
                    placeholder="Default Commission %">


                <button
                    class="primary-action"
                    onclick="saveSettings()">

                    Save Settings

                </button>

            </div>

        </div>


        <div class="module-panel">

            <h3>
                💾 Data Management
            </h3>


            <div class="button-group">

                <button
                    onclick="exportAllDataJSON()">

                    Export Backup

                </button>


                <button
                    onclick="resetPlatformData()">

                    Reset Data

                </button>

            </div>

        </div>

    `;
}


function saveSettings() {

    data.settings.platformName =
        document.getElementById(
            "settingsPlatformName"
        )?.value.trim() ||
        "All in One Marketing";


    data.settings.brandName =
        document.getElementById(
            "settingsBrandName"
        )?.value.trim() ||
        "JANJUA";


    data.settings.currency =
        document.getElementById(
            "settingsCurrency"
        )?.value.trim() ||
        "PKR";


    data.settings.defaultCommissionRate =
        Number(
            document.getElementById(
                "settingsCommission"
            )?.value
        ) || 0;


    saveData();


    alert(
        "Settings saved."
    );
}


/* =========================================================
   DATA EXPORT
   ========================================================= */

function exportAllDataJSON() {

    const json =
        JSON.stringify(
            data,
            null,
            2
        );


    downloadFile(
        "janjua-marketing-backup.json",
        json,
        "application/json"
    );
}


function exportAllDataCSV() {

    const rows = [];


    rows.push([
        "Type",
        "ID",
        "Customer/Name",
        "Program",
        "Promoter",
        "Amount",
        "Commission",
        "Status",
        "Date"
    ]);


    data.orders.forEach(
        order => {

            rows.push([

                "Order",

                order.id,

                order.customerName,

                getProgram(
                    order.programId
                )?.name || "",

                getPromoter(
                    order.promoterId
                )?.name || "",

                order.amount,

                order.commissionAmount,

                order.status,

                order.createdAt

            ]);

        }
    );


    data.commissions.forEach(
        item => {

            rows.push([

                "Commission",

                item.id,

                "",

                getProgram(
                    item.programId
                )?.name || "",

                getPromoter(
                    item.promoterId
                )?.name || "",

                "",

                item.amount,

                item.status,

                item.createdAt

            ]);

        }
    );


    const csv =
        rows
            .map(
                row =>
                    row.map(
                        value =>
                            `"${String(
                                value ?? ""
                            ).replace(
                                /"/g,
                                '""'
                            )}"`
                    ).join(",")
            )
            .join("\n");


    downloadFile(
        "janjua-marketing-report.csv",
        csv,
        "text/csv"
    );
}


/* =========================================================
   DATA RESET
   ========================================================= */

function resetPlatformData() {

    const first =
        confirm(
            "WARNING: This will remove all current platform data. Continue?"
        );


    if (!first) {
        return;
    }


    const second =
        confirm(
            "Are you absolutely sure?"
        );


    if (!second) {
        return;
    }


    data =
        JSON.parse(
            JSON.stringify(
                defaultData
            )
        );


    saveData();


    renderCategories();


    alert(
        "Platform data has been reset."
    );


    location.reload();
}


/* =========================================================
   GENERIC FORM CANCEL
   ========================================================= */

function cancelForm(
    id
) {

    const area =
        document.getElementById(
            id
        );

    if (area) {
        area.innerHTML = "";
    }
}


/* =========================================================
   COPY HELPER
   ========================================================= */

function copyText(
    text,
    successMessage
) {

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(text)
            .then(() => {

                alert(
                    successMessage
                );

            })
            .catch(() => {

                prompt(
                    "Copy:",
                    text
                );

            });

    } else {

        prompt(
            "Copy:",
            text
        );
    }
}


/* =========================================================
   DOWNLOAD HELPER
   ========================================================= */

function downloadFile(
    filename,
    content,
    type
) {

    const blob =
        new Blob(
            [content],
            { type }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        filename;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );
}


/* =========================================================
   JANJUA ANIMATED BRANDING
   ========================================================= */

function addAnimatedBranding() {

    const header =
        document.querySelector(
            "header"
        );

    if (!header) {
        return;
    }


    const oldBrand =
        header.querySelector(
            ".brand-area"
        );


    if (oldBrand) {

        oldBrand.style.display =
            "none";
    }


    const oldStatus =
        header.querySelector(
            ".header-status"
        );


    if (oldStatus) {

        oldStatus.style.display =
            "none";
    }


    if (
        document.getElementById(
            "janjuaAnimatedBrand"
        )
    ) {
        return;
    }


    const box =
        document.createElement(
            "div"
        );


    box.id =
        "janjuaAnimatedBrand";


    box.innerHTML = `

        <div class="janjua-brand-animation">

            <div class="brand-orbit orbit-one"></div>

            <div class="brand-orbit orbit-two"></div>

            <div class="brand-orbit orbit-three"></div>


            <div class="brand-main">

                <div class="brand-title">
                    JANJUA
                </div>

                <div class="brand-subtitle">
                    Janjua Digital Marketing Platform Online
                </div>

                <div class="brand-status">

                    <span class="status-dot"></span>

                    AVAILABLE 24 HOURS

                </div>

            </div>

        </div>

    `;


    header.prepend(
        box
    );
}


/* =========================================================
   BRAND CSS
   ========================================================= */

function addBrandAnimationCSS() {

    if (
        document.getElementById(
            "janjuaBrandAnimationCSS"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "janjuaBrandAnimationCSS";


    style.textContent = `

        #janjuaAnimatedBrand {
            width:100%;
            display:flex;
            justify-content:center;
            align-items:center;
        }

        .janjua-brand-animation {
            position:relative;
            width:100%;
            min-height:170px;
            display:flex;
            justify-content:center;
            align-items:center;
            overflow:hidden;
        }

        .brand-main {
            position:relative;
            z-index:5;
            text-align:center;
        }

        .brand-title {
            font-size:48px;
            font-weight:900;
            letter-spacing:8px;
            animation:janjuaPulse 2.5s infinite;
        }

        .brand-subtitle {
            font-size:15px;
            margin-top:5px;
        }

        .brand-status {
            margin-top:10px;
            font-size:13px;
            font-weight:bold;
            letter-spacing:2px;
        }

        .brand-orbit {
            position:absolute;
            left:50%;
            top:50%;
            border:1px solid rgba(255,255,255,.35);
            border-radius:50%;
            transform:translate(-50%,-50%);
        }

        .orbit-one {
            width:250px;
            height:80px;
            animation:orbitSpin 6s linear infinite;
        }

        .orbit-two {
            width:330px;
            height:105px;
            animation:orbitReverse 9s linear infinite;
        }

        .orbit-three {
            width:420px;
            height:135px;
            animation:orbitSpin 13s linear infinite;
        }

        @keyframes orbitSpin {

            from {
                transform:
                translate(-50%,-50%)
                rotate(0deg);
            }

            to {
                transform:
                translate(-50%,-50%)
                rotate(360deg);
            }

        }

        @keyframes orbitReverse {

            from {
                transform:
                translate(-50%,-50%)
                rotate(360deg);
            }

            to {
                transform:
                translate(-50%,-50%)
                rotate(0deg);
            }

        }

        @keyframes janjuaPulse {

            0%,100% {
                transform:scale(1);
            }

            50% {
                transform:scale(1.04);
            }

        }

        @media(max-width:600px){

            .brand-title {
                font-size:35px;
                letter-spacing:5px;
            }

            .brand-subtitle {
                font-size:12px;
            }

            .orbit-one {
                width:200px;
            }

            .orbit-two {
                width:270px;
            }

            .orbit-three {
                width:340px;
            }

        }

    `;


    document.head.appendChild(
        style
    );
}


/* =========================================================
   MODULE CSS
   ========================================================= */

function addModuleCSS() {

    if (
        document.getElementById(
            "janjuaModuleCSS"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "janjuaModuleCSS";


    style.textContent = `

        .janjua-module-area {
            width:100%;
            margin:25px 0 35px;
            display:block;
        }

        #moduleContent {
            width:100%;
        }

        .module-header {
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            padding:20px;
            margin-bottom:20px;
            border-radius:15px;
            background:rgba(255,255,255,.08);
            border:1px solid rgba(255,255,255,.15);
        }

        .module-header h2 {
            margin:0 0 5px;
        }

        .module-header p {
            margin:0;
            opacity:.75;
        }

        .module-header button,
        .list-item button,
        .button-group button {
            border:none;
            border-radius:8px;
            padding:9px 13px;
            cursor:pointer;
        }

        .module-panel {
            padding:20px;
            margin-bottom:20px;
            border-radius:15px;
            background:rgba(255,255,255,.07);
            border:1px solid rgba(255,255,255,.12);
        }

        .stats-grid {
            display:grid;
            grid-template-columns:
            repeat(auto-fit,minmax(150px,1fr));
            gap:15px;
            margin-bottom:20px;
        }

        .stat-card {
            padding:20px;
            border-radius:14px;
            background:rgba(255,255,255,.08);
            border:1px solid rgba(255,255,255,.12);
        }

        .stat-card span {
            display:block;
            opacity:.7;
            margin-bottom:8px;
        }

        .stat-card strong {
            display:block;
            font-size:22px;
        }

        .toolbar {
            display:flex;
            flex-wrap:wrap;
            gap:10px;
            align-items:center;
            margin-bottom:15px;
        }

        .module-search {
            min-width:220px;
            padding:11px;
            border-radius:8px;
            border:1px solid rgba(255,255,255,.2);
            background:rgba(255,255,255,.08);
            color:inherit;
        }

        .module-list {
            display:flex;
            flex-direction:column;
            gap:10px;
            margin-top:15px;
        }

        .list-item {
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            padding:15px;
            border-radius:12px;
            background:rgba(255,255,255,.06);
            border:1px solid rgba(255,255,255,.1);
        }

        .list-item > div:first-child {
            display:flex;
            flex-direction:column;
            gap:5px;
        }

        .list-item small {
            opacity:.72;
        }

        .form-panel {
            display:grid;
            gap:12px;
            padding:15px;
            margin:15px 0;
            border-radius:12px;
            background:rgba(0,0,0,.12);
        }

        .form-panel input,
        .form-panel select {
            width:100%;
            padding:12px;
            border-radius:8px;
            border:1px solid rgba(255,255,255,.2);
            background:rgba(255,255,255,.1);
            color:inherit;
            box-sizing:border-box;
        }

        .form-panel option {
            color:#111;
        }

        .primary-action,
        .secondary-action {
            display:inline-block;
            padding:11px 16px;
            border:none;
            border-radius:9px;
            cursor:pointer;
            font-weight:bold;
        }

        .secondary-action {
            opacity:.85;
        }

        .button-group {
            display:flex;
            flex-wrap:wrap;
            gap:6px;
        }

        .empty-module,
        .module-placeholder {
            padding:30px;
            text-align:center;
            border-radius:14px;
            background:rgba(255,255,255,.06);
        }

        .link-text {
            word-break:break-all;
        }

        .flow-box {
            padding:20px;
            line-height:2.2;
            text-align:center;
            border-radius:12px;
            background:rgba(255,255,255,.06);
            font-weight:bold;
        }

        .quick-actions {
            display:flex;
            flex-wrap:wrap;
            gap:8px;
        }

        .public-link-message {
            position:fixed;
            inset:0;
            z-index:99999;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:20px;
            background:rgba(0,0,0,.82);
        }

        .public-link-card {
            width:min(500px,100%);
            padding:35px;
            text-align:center;
            border-radius:20px;
            background:#17202a;
            box-shadow:0 20px 60px rgba(0,0,0,.5);
        }

        .public-logo {
            font-size:32px;
            font-weight:900;
            letter-spacing:5px;
            margin-bottom:15px;
        }

        .public-link-button {
            text-decoration:none;
            margin-top:15px;
        }

        @media(max-width:650px){

            .module-header {
                flex-direction:column;
                align-items:flex-start;
            }

            .list-item {
                flex-direction:column;
                align-items:flex-start;
            }

            .button-group {
                width:100%;
            }

            .module-search {
                width:100%;
                min-width:0;
            }

        }

    `;


    document.head.appendChild(
        style
    );
}


/* =========================================================
   OPTIONAL SETTINGS ACCESS
   ========================================================= */

window.openSettings =
    function () {

        createModuleArea();

        const area =
            document.getElementById(
                "moduleArea"
            );

        const content =
            document.getElementById(
                "moduleContent"
            );

        if (!area || !content) {
            return;
        }

        area.style.display =
            "block";

        renderSettingsModule(
            content
        );

        area.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    };


/* =========================================================
   END
   ========================================================= */
