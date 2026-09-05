/* =========================================================
   JANJUA - ALL IN ONE MARKETING
   Provider & Company Management
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v3";

/* =========================
   DEFAULT DATA
========================= */

const defaultData = {
    categories: [
        { id: "cat_1", name: "Banks & Finance", visible: true },
        { id: "cat_2", name: "Motorcycles", visible: true },
        { id: "cat_3", name: "Cars & Vehicles", visible: true },
        { id: "cat_4", name: "Spare Parts", visible: true },
        { id: "cat_5", name: "Food & Restaurants", visible: true },
        { id: "cat_6", name: "Hotels", visible: true },
        { id: "cat_7", name: "Factories", visible: true },
        { id: "cat_8", name: "Weddings", visible: true },
        { id: "cat_9", name: "Travel & Tourism", visible: true },
        { id: "cat_10", name: "Property", visible: true },
        { id: "cat_11", name: "Loans & Financing", visible: true },
        { id: "cat_12", name: "Education", visible: true },
        { id: "cat_13", name: "Healthcare", visible: true },
        { id: "cat_14", name: "Freelance & Services", visible: true }
    ],

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
        brand: "JANJUA",
        subtitle: "Janjua Digital Marketing Platform Online",
        status: "AVAILABLE 24 HOURS"
    }
};


/* =========================
   LOAD DATA
========================= */

let data = loadData();

function loadData() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return JSON.parse(JSON.stringify(defaultData));
        }

        const parsed = JSON.parse(saved);

        return {
            ...defaultData,
            ...parsed,
            categories: parsed.categories || [],
            providers: parsed.providers || [],
            programs: parsed.programs || [],
            promoters: parsed.promoters || [],
            assignments: parsed.assignments || [],
            trackingLinks: parsed.trackingLinks || [],
            clicks: parsed.clicks || [],
            orders: parsed.orders || [],
            commissions: parsed.commissions || [],
            payments: parsed.payments || []
        };

    } catch (error) {

        console.error("Data loading error:", error);

        return JSON.parse(JSON.stringify(defaultData));
    }
}


function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =========================
   ID GENERATOR
========================= */

function makeId(prefix = "id") {

    return (
        prefix +
        "_" +
        Date.now().toString(36) +
        "_" +
        Math.random().toString(36).substring(2, 8)
    );
}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================
   PAGE INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    addAnimatedBranding();

    renderCategories();

    attachDashboardEvents();

});


/* =========================
   ANIMATED BRANDING
========================= */

function addAnimatedBranding() {

    const header = document.querySelector("header");

    if (!header) {
        return;
    }

    /*
       We do not replace your existing header.
       We simply add an animated layer.
    */

    if (document.getElementById("janjuaAnimatedBrand")) {
        return;
    }

    const brandBox = document.createElement("div");

    brandBox.id = "janjuaAnimatedBrand";

    brandBox.innerHTML = `
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

    header.prepend(brandBox);

    addBrandAnimationCSS();
}


/* =========================
   ANIMATION CSS
========================= */

function addBrandAnimationCSS() {

    if (document.getElementById("janjuaAnimationCSS")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "janjuaAnimationCSS";

    style.textContent = `

        #janjuaAnimatedBrand {
            width:100%;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:18px 10px 12px;
            overflow:hidden;
        }

        .janjua-brand-animation {
            position:relative;
            min-height:145px;
            width:min(900px,96%);
            display:flex;
            justify-content:center;
            align-items:center;
            overflow:hidden;
            border-radius:22px;
            background:
                radial-gradient(circle at center,
                rgba(0,200,255,.16),
                transparent 45%),
                rgba(0,0,0,.12);
            box-shadow:
                0 0 30px rgba(0,200,255,.10),
                inset 0 0 25px rgba(255,255,255,.04);
        }

        .brand-main {
            position:relative;
            z-index:5;
            text-align:center;
            animation:brandFloat 4s ease-in-out infinite;
        }

        .brand-title {
            font-size:clamp(38px,8vw,72px);
            font-weight:900;
            letter-spacing:8px;
            line-height:1;
            background:linear-gradient(
                90deg,
                #ffffff,
                #00d9ff,
                #ffffff,
                #00d9ff,
                #ffffff
            );
            background-size:300% 100%;
            -webkit-background-clip:text;
            background-clip:text;
            color:transparent;
            animation:
                brandShine 4s linear infinite,
                brandPulse 2.5s ease-in-out infinite;
            text-shadow:
                0 0 18px rgba(0,220,255,.35);
        }

        .brand-subtitle {
            margin-top:10px;
            font-size:clamp(14px,2.5vw,22px);
            font-weight:700;
            letter-spacing:2px;
            opacity:.95;
            animation:subtitleFade 3s ease-in-out infinite;
        }

        .brand-status {
            margin-top:10px;
            display:inline-flex;
            align-items:center;
            gap:8px;
            font-size:12px;
            font-weight:800;
            letter-spacing:2px;
            padding:6px 12px;
            border-radius:50px;
            background:rgba(0,255,140,.08);
            border:1px solid rgba(0,255,140,.25);
            animation:statusGlow 2s ease-in-out infinite;
        }

        .status-dot {
            width:9px;
            height:9px;
            border-radius:50%;
            background:#00ff88;
            box-shadow:
                0 0 7px #00ff88,
                0 0 15px #00ff88;
            animation:dotBlink 1.2s infinite;
        }

        .brand-orbit {
            position:absolute;
            border:1px solid rgba(0,220,255,.22);
            border-radius:50%;
            pointer-events:none;
        }

        .orbit-one {
            width:230px;
            height:230px;
            animation:orbitRotate 9s linear infinite;
        }

        .orbit-two {
            width:420px;
            height:150px;
            transform:rotate(25deg);
            animation:orbitRotateReverse 12s linear infinite;
        }

        .orbit-three {
            width:650px;
            height:210px;
            transform:rotate(-18deg);
            animation:orbitRotate 16s linear infinite;
        }

        @keyframes brandShine {
            0% {
                background-position:0% 50%;
            }

            100% {
                background-position:300% 50%;
            }
        }

        @keyframes brandPulse {

            0%,100% {
                transform:scale(1);
            }

            50% {
                transform:scale(1.04);
            }
        }

        @keyframes brandFloat {

            0%,100% {
                transform:translateY(0);
            }

            50% {
                transform:translateY(-5px);
            }
        }

        @keyframes subtitleFade {

            0%,100% {
                opacity:.65;
            }

            50% {
                opacity:1;
            }
        }

        @keyframes statusGlow {

            0%,100% {
                box-shadow:0 0 0 rgba(0,255,140,0);
            }

            50% {
                box-shadow:0 0 20px rgba(0,255,140,.16);
            }
        }

        @keyframes dotBlink {

            0%,100% {
                opacity:1;
                transform:scale(1);
            }

            50% {
                opacity:.35;
                transform:scale(.75);
            }
        }

        @keyframes orbitRotate {

            from {
                transform:rotate(0deg);
            }

            to {
                transform:rotate(360deg);
            }
        }

        @keyframes orbitRotateReverse {

            from {
                transform:rotate(360deg);
            }

            to {
                transform:rotate(0deg);
            }
        }

        @media(max-width:600px) {

            .janjua-brand-animation {
                min-height:125px;
            }

            .brand-title {
                letter-spacing:5px;
            }

            .brand-subtitle {
                letter-spacing:1px;
            }

            .orbit-three {
                width:420px;
            }
        }

    `;

    document.head.appendChild(style);
}


/* =========================
   DASHBOARD EVENTS
========================= */

function attachDashboardEvents() {

    document.addEventListener("click", function(event) {

        const card = event.target.closest(
            "[data-module]"
        );

        if (!card) {
            return;
        }

        const module = card.dataset.module;

        if (module) {
            openModule(module);
        }

    });

}


/* =========================
   CATEGORY RENDER
========================= */

function renderCategories() {

    const container =
        document.getElementById("categoryList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    data.categories.forEach(category => {

        const div = document.createElement("div");

        div.className =
            "category-card" +
            (category.visible ? "" : " hidden-category");

        div.innerHTML = `

            <div class="category-title">
                ${escapeHTML(category.name)}
            </div>

            <div class="category-actions">

                <button
                    onclick="editCategory('${category.id}')">
                    Edit
                </button>

                <button
                    onclick="toggleCategory('${category.id}')">
                    ${category.visible ? "Hide" : "Show"}
                </button>

                <button
                    onclick="deleteCategory('${category.id}')">
                    Delete
                </button>

            </div>

        `;

        container.appendChild(div);

    });

}


/* =========================
   MODULE OPEN
========================= */

function openModule(module) {

    const old = document.getElementById("modulePanel");

    if (old) {
        old.remove();
    }

    const panel = document.createElement("div");

    panel.id = "modulePanel";

    panel.innerHTML = `

        <div class="module-overlay">

            <div class="module-window">

                <div class="module-header">

                    <h2>
                        ${escapeHTML(module)}
                    </h2>

                    <button
                        class="module-close"
                        onclick="closeModule()">
                        ×
                    </button>

                </div>

                <div
                    id="moduleContent"
                    class="module-content">
                </div>

            </div>

        </div>
    `;

    document.body.appendChild(panel);

    addModuleCSS();

    const content =
        document.getElementById("moduleContent");

    if (module === "Categories") {
        renderCategoryModule(content);
    }

    else if (
        module === "Providers & Companies"
    ) {
        renderProviderModule(content);
    }

    else if (
        module === "Programs & Offers"
    ) {
        renderProgramModule(content);
    }

    else if (
        module === "Promoters / Workers"
    ) {
        renderPromoterModule(content);
    }

    else if (
        module === "Tracking Links"
    ) {
        renderTrackingModule(content);
    }

    else if (
        module === "Orders & Clicks"
    ) {
        renderOrdersModule(content);
    }

    else if (
        module === "Commission & Payments"
    ) {
        renderCommissionModule(content);
    }

    else if (
        module === "Reports & Analytics"
    ) {
        renderReportsModule(content);
    }

    else {

        content.innerHTML = `
            <div class="empty-module">
                <h3>${escapeHTML(module)}</h3>
                <p>Module is ready for the next integration.</p>
            </div>
        `;
    }

}


function closeModule() {

    const panel =
        document.getElementById("modulePanel");

    if (panel) {
        panel.remove();
    }
}


/* =========================
   PROVIDER MODULE
========================= */

function renderProviderModule(container) {

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="showProviderForm()">
                + Add Provider / Company
            </button>

        </div>

        <div
            id="providerFormArea">
        </div>

        <div
            id="providerList"
            class="data-list">
        </div>
    `;

    renderProviders();
}


function renderProviders() {

    const list =
        document.getElementById("providerList");

    if (!list) {
        return;
    }

    if (data.providers.length === 0) {

        list.innerHTML = `
            <div class="empty-module">
                <h3>No Providers Added</h3>
                <p>
                    Click "Add Provider / Company"
                    to create your first provider.
                </p>
            </div>
        `;

        return;
    }

    list.innerHTML = data.providers.map(provider => {

        return `

            <div class="data-card">

                <div class="data-card-main">

                    <h3>
                        ${escapeHTML(provider.name)}
                    </h3>

                    <p>
                        Website:
                        ${escapeHTML(provider.website || "-")}
                    </p>

                    <p>
                        Affiliate ID:
                        ${escapeHTML(provider.affiliateId || "-")}
                    </p>

                    <p>
                        SubID:
                        ${escapeHTML(provider.subId || "-")}
                    </p>

                    <p>
                        ClickID:
                        ${escapeHTML(provider.clickId || "-")}
                    </p>

                    <p>
                        API:
                        ${provider.api ? "YES" : "NO"}
                        &nbsp;&nbsp;
                        Webhook:
                        ${provider.webhook ? "YES" : "NO"}
                    </p>

                    <p>
                        Status:
                        <strong>
                            ${provider.visible ? "ACTIVE" : "HIDDEN"}
                        </strong>
                    </p>

                </div>

                <div class="data-card-actions">

                    <button
                        onclick="editProvider('${provider.id}')">
                        Edit
                    </button>

                    <button
                        onclick="toggleProvider('${provider.id}')">
                        ${provider.visible ? "Hide" : "Show"}
                    </button>

                    <button
                        class="danger-btn"
                        onclick="deleteProvider('${provider.id}')">
                        Delete
                    </button>

                </div>

            </div>
        `;

    }).join("");
}


/* =========================
   PROVIDER FORM
========================= */

function showProviderForm(providerId = null) {

    const area =
        document.getElementById("providerFormArea");

    if (!area) {
        return;
    }

    const provider =
        providerId
            ? data.providers.find(
                p => p.id === providerId
              )
            : null;

    area.innerHTML = `

        <div class="form-card">

            <h3>
                ${provider
                    ? "Edit Provider / Company"
                    : "Add Provider / Company"}
            </h3>

            <div class="form-grid">

                <label>
                    Company / Provider Name

                    <input
                        id="providerName"
                        value="${escapeHTML(provider?.name || "")}"
                        placeholder="e.g. Foodpanda">
                </label>

                <label>
                    Website

                    <input
                        id="providerWebsite"
                        value="${escapeHTML(provider?.website || "")}"
                        placeholder="https://example.com">
                </label>

                <label>
                    Original Affiliate Link

                    <input
                        id="providerAffiliateLink"
                        value="${escapeHTML(provider?.affiliateLink || "")}"
                        placeholder="Original affiliate URL">
                </label>

                <label>
                    Affiliate / Account ID

                    <input
                        id="providerAffiliateId"
                        value="${escapeHTML(provider?.affiliateId || "")}"
                        placeholder="Affiliate ID">
                </label>

                <label>
                    SubID Support

                    <select id="providerSubId">

                        <option value="No"
                            ${provider?.subId === "No" ? "selected" : ""}>
                            No
                        </option>

                        <option value="Yes"
                            ${provider?.subId === "Yes" ? "selected" : ""}>
                            Yes
                        </option>

                    </select>
                </label>

                <label>
                    ClickID Support

                    <select id="providerClickId">

                        <option value="No"
                            ${provider?.clickId === "No" ? "selected" : ""}>
                            No
                        </option>

                        <option value="Yes"
                            ${provider?.clickId === "Yes" ? "selected" : ""}>
                            Yes
                        </option>

                    </select>
                </label>

                <label>
                    API Available

                    <select id="providerApi">

                        <option value="No"
                            ${provider?.api === false ? "selected" : ""}>
                            No
                        </option>

                        <option value="Yes"
                            ${provider?.api === true ? "selected" : ""}>
                            Yes
                        </option>

                    </select>
                </label>

                <label>
                    Webhook Available

                    <select id="providerWebhook">

                        <option value="No"
                            ${provider?.webhook === false ? "selected" : ""}>
                            No
                        </option>

                        <option value="Yes"
                            ${provider?.webhook === true ? "selected" : ""}>
                            Yes
                        </option>

                    </select>
                </label>

            </div>

            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="saveProvider('${providerId || ""}')">
                    Save Provider
                </button>

                <button
                    onclick="cancelProviderForm()">
                    Cancel
                </button>

            </div>

        </div>
    `;
}


/* =========================
   SAVE PROVIDER
========================= */

function saveProvider(providerId) {

    const name =
        document.getElementById("providerName").value.trim();

    const website =
        document.getElementById("providerWebsite").value.trim();

    const affiliateLink =
        document
            .getElementById("providerAffiliateLink")
            .value
            .trim();

    const affiliateId =
        document
            .getElementById("providerAffiliateId")
            .value
            .trim();

    const subId =
        document
            .getElementById("providerSubId")
            .value;

    const clickId =
        document
            .getElementById("providerClickId")
            .value;

    const api =
        document
            .getElementById("providerApi")
            .value === "Yes";

    const webhook =
        document
            .getElementById("providerWebhook")
            .value === "Yes";


    if (!name) {

        alert("Please enter Company / Provider Name.");

        return;
    }


    if (providerId) {

        const provider =
            data.providers.find(
                p => p.id === providerId
            );

        if (provider) {

            provider.name = name;
            provider.website = website;
            provider.affiliateLink = affiliateLink;
            provider.affiliateId = affiliateId;
            provider.subId = subId;
            provider.clickId = clickId;
            provider.api = api;
            provider.webhook = webhook;
        }

    } else {

        data.providers.push({

            id: makeId("provider"),

            name,

            website,

            affiliateLink,

            affiliateId,

            subId,

            clickId,

            api,

            webhook,

            visible: true,

            createdAt: new Date().toISOString()
        });

    }


    saveData();

    document.getElementById(
        "providerFormArea"
    ).innerHTML = "";

    renderProviders();

    alert("Provider saved successfully.");
}


/* =========================
   EDIT PROVIDER
========================= */

function editProvider(id) {

    showProviderForm(id);
}


/* =========================
   DELETE PROVIDER
========================= */

function deleteProvider(id) {

    const provider =
        data.providers.find(
            p => p.id === id
        );

    if (!provider) {
        return;
    }

    if (
        !confirm(
            `Delete "${provider.name}"?`
        )
    ) {
        return;
    }

    data.providers =
        data.providers.filter(
            p => p.id !== id
        );

    saveData();

    renderProviders();
}


/* =========================
   TOGGLE PROVIDER
========================= */

function toggleProvider(id) {

    const provider =
        data.providers.find(
            p => p.id === id
        );

    if (!provider) {
        return;
    }

    provider.visible =
        !provider.visible;

    saveData();

    renderProviders();
}


/* =========================
   CANCEL PROVIDER
========================= */

function cancelProviderForm() {

    const area =
        document.getElementById(
            "providerFormArea"
        );

    if (area) {
        area.innerHTML = "";
    }
}


/* =========================
   CATEGORY MODULE
========================= */

function renderCategoryModule(container) {

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="addCategory()">
                + Add Category
            </button>

        </div>

        <div
            id="moduleCategoryList"
            class="data-list">
        </div>
    `;

    renderModuleCategories();
}


function renderModuleCategories() {

    const list =
        document.getElementById(
            "moduleCategoryList"
        );

    if (!list) {
        return;
    }

    list.innerHTML =
        data.categories.map(category => `

            <div class="data-card">

                <div>

                    <h3>
                        ${escapeHTML(category.name)}
                    </h3>

                    <p>
                        Status:
                        ${category.visible
                            ? "ACTIVE"
                            : "HIDDEN"}
                    </p>

                </div>

                <div class="data-card-actions">

                    <button
                        onclick="editCategory('${category.id}')">
                        Edit
                    </button>

                    <button
                        onclick="toggleCategory('${category.id}')">
                        ${category.visible
                            ? "Hide"
                            : "Show"}
                    </button>

                    <button
                        class="danger-btn"
                        onclick="deleteCategory('${category.id}')">
                        Delete
                    </button>

                </div>

            </div>

        `).join("");
}


/* =========================
   CATEGORY ACTIONS
========================= */

function addCategory() {

    const name =
        prompt("Enter category name:");

    if (!name) {
        return;
    }

    data.categories.push({

        id: makeId("cat"),

        name: name.trim(),

        visible: true
    });

    saveData();

    renderCategories();

    renderModuleCategories();
}


function editCategory(id) {

    const category =
        data.categories.find(
            c => c.id === id
        );

    if (!category) {
        return;
    }

    const name =
        prompt(
            "Edit category name:",
            category.name
        );

    if (!name) {
        return;
    }

    category.name =
        name.trim();

    saveData();

    renderCategories();

    renderModuleCategories();
}


function toggleCategory(id) {

    const category =
        data.categories.find(
            c => c.id === id
        );

    if (!category) {
        return;
    }

    category.visible =
        !category.visible;

    saveData();

    renderCategories();

    renderModuleCategories();
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
            c => c.id !== id
        );

    saveData();

    renderCategories();

    renderModuleCategories();
}


/* =========================
   PROGRAM MODULE
========================= */

function renderProgramModule(container) {

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="showProgramForm()">
                + Add Program / Offer
            </button>

        </div>

        <div id="programFormArea"></div>

        <div
            id="programList"
            class="data-list">
        </div>
    `;

    renderPrograms();
}


function renderPrograms() {

    const list =
        document.getElementById(
            "programList"
        );

    if (!list) {
        return;
    }

    if (data.programs.length === 0) {

        list.innerHTML = `
            <div class="empty-module">
                <h3>No Programs Yet</h3>
                <p>
                    Add your first Program / Offer.
                </p>
            </div>
        `;

        return;
    }

    list.innerHTML =
        data.programs.map(program => {

            const provider =
                data.providers.find(
                    p => p.id === program.providerId
                );

            return `

                <div class="data-card">

                    <div>

                        <h3>
                            ${escapeHTML(program.name)}
                        </h3>

                        <p>
                            Provider:
                            ${escapeHTML(
                                provider?.name || "-"
                            )}
                        </p>

                        <p>
                            Category:
                            ${escapeHTML(
                                program.category || "-"
                            )}
                        </p>

                        <p>
                            Commission:
                            ${escapeHTML(
                                program.commission || "0"
                            )}%
                        </p>

                    </div>

                    <div class="data-card-actions">

                        <button
                            onclick="editProgram('${program.id}')">
                            Edit
                        </button>

                        <button
                            class="danger-btn"
                            onclick="deleteProgram('${program.id}')">
                            Delete
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


function showProgramForm(programId = null) {

    const area =
        document.getElementById(
            "programFormArea"
        );

    if (!area) {
        return;
    }

    const program =
        programId
            ? data.programs.find(
                p => p.id === programId
              )
            : null;

    area.innerHTML = `

        <div class="form-card">

            <h3>
                ${program
                    ? "Edit Program / Offer"
                    : "Add Program / Offer"}
            </h3>

            <div class="form-grid">

                <label>
                    Program Name

                    <input
                        id="programName"
                        value="${escapeHTML(program?.name || "")}"
                        placeholder="Program name">
                </label>

                <label>
                    Provider / Company

                    <select id="programProvider">

                        <option value="">
                            Select Provider
                        </option>

                        ${data.providers
                            .filter(p => p.visible)
                            .map(p => `
                                <option
                                    value="${p.id}"
                                    ${program?.providerId === p.id
                                        ? "selected"
                                        : ""}>
                                    ${escapeHTML(p.name)}
                                </option>
                            `)
                            .join("")}

                    </select>

                </label>

                <label>
                    Category

                    <select id="programCategory">

                        <option value="">
                            Select Category
                        </option>

                        ${data.categories
                            .filter(c => c.visible)
                            .map(c => `
                                <option
                                    value="${escapeHTML(c.name)}"
                                    ${program?.category === c.name
                                        ? "selected"
                                        : ""}>
                                    ${escapeHTML(c.name)}
                                </option>
                            `)
                            .join("")}

                    </select>

                </label>

                <label>
                    Affiliate Link

                    <input
                        id="programAffiliateLink"
                        value="${escapeHTML(program?.affiliateLink || "")}"
                        placeholder="Original affiliate link">
                </label>

                <label>
                    Commission %

                    <input
                        id="programCommission"
                        type="number"
                        min="0"
                        step="0.01"
                        value="${escapeHTML(program?.commission || "")}"
                        placeholder="e.g. 5">
                </label>

                <label>
                    Cookie Days

                    <input
                        id="programCookie"
                        type="number"
                        min="0"
                        value="${escapeHTML(program?.cookieDays || "")}"
                        placeholder="e.g. 7">
                </label>

            </div>

            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="saveProgram('${programId || ""}')">
                    Save Program
                </button>

                <button
                    onclick="cancelProgramForm()">
                    Cancel
                </button>

            </div>

        </div>
    `;
}


function saveProgram(programId) {

    const name =
        document.getElementById(
            "programName"
        ).value.trim();

    const providerId =
        document.getElementById(
            "programProvider"
        ).value;

    const category =
        document.getElementById(
            "programCategory"
        ).value;

    const affiliateLink =
        document.getElementById(
            "programAffiliateLink"
        ).value.trim();

    const commission =
        document.getElementById(
            "programCommission"
        ).value;

    const cookieDays =
        document.getElementById(
            "programCookie"
        ).value;


    if (!name) {

        alert("Enter Program Name.");

        return;
    }


    if (!providerId) {

        alert("Select Provider.");

        return;
    }


    if (programId) {

        const program =
            data.programs.find(
                p => p.id === programId
            );

        if (program) {

            program.name = name;
            program.providerId = providerId;
            program.category = category;
            program.affiliateLink = affiliateLink;
            program.commission = commission;
            program.cookieDays = cookieDays;
        }

    } else {

        data.programs.push({

            id: makeId("program"),

            name,

            providerId,

            category,

            affiliateLink,

            commission,

            cookieDays,

            createdAt:
                new Date().toISOString()
        });
    }


    saveData();

    document.getElementById(
        "programFormArea"
    ).innerHTML = "";

    renderPrograms();

    alert("Program saved successfully.");
}


function editProgram(id) {

    showProgramForm(id);
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
            p => p.id !== id
        );

    saveData();

    renderPrograms();
}


function cancelProgramForm() {

    const area =
        document.getElementById(
            "programFormArea"
        );

    if (area) {
        area.innerHTML = "";
    }
}


/* =========================
   PROMOTER MODULE
========================= */

function renderPromoterModule(container) {

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="addPromoter()">
                + Add Promoter / Worker
            </button>

        </div>

        <div class="data-list">

            ${
                data.promoters.length
                ? data.promoters.map(p => `

                    <div class="data-card">

                        <div>

                            <h3>
                                ${escapeHTML(p.name)}
                            </h3>

                            <p>
                                Phone:
                                ${escapeHTML(p.phone || "-")}
                            </p>

                            <p>
                                Email:
                                ${escapeHTML(p.email || "-")}
                            </p>

                            <p>
                                Payment:
                                ${escapeHTML(
                                    p.paymentMethod || "-"
                                )}
                            </p>

                        </div>

                    </div>

                `).join("")
                :
                `
                    <div class="empty-module">
                        No promoters added yet.
                    </div>
                `
            }

        </div>
    `;
}


function addPromoter() {

    const name =
        prompt("Promoter / Worker Name:");

    if (!name) {
        return;
    }

    const phone =
        prompt("Phone:");

    const email =
        prompt("Email:");

    const paymentMethod =
        prompt(
            "Payment Method (Bank/JazzCash/Easypaisa):"
        );

    data.promoters.push({

        id: makeId("promoter"),

        name: name.trim(),

        phone: phone || "",

        email: email || "",

        paymentMethod:
            paymentMethod || "",

        paymentAccount: "",

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


/* =========================
   TRACKING MODULE
========================= */

function renderTrackingModule(container) {

    container.innerHTML = `

        <div class="empty-module">

            <h3>
                Tracking System
            </h3>

            <p>
                The next integration will connect
                Promoters → Programs → Unique Tracking Links.
            </p>

        </div>
    `;
}


/* =========================
   ORDERS
========================= */

function renderOrdersModule(container) {

    container.innerHTML = `

        <div class="empty-module">

            <h3>
                Orders & Clicks
            </h3>

            <p>
                Orders:
                <strong>
                    ${data.orders.length}
                </strong>
            </p>

            <p>
                Clicks:
                <strong>
                    ${data.clicks.length}
                </strong>
            </p>

        </div>
    `;
}


/* =========================
   COMMISSION
========================= */

function renderCommissionModule(container) {

    container.innerHTML = `

        <div class="empty-module">

            <h3>
                Commission & Payments
            </h3>

            <p>
                Commissions:
                <strong>
                    ${data.commissions.length}
                </strong>
            </p>

            <p>
                Payments:
                <strong>
                    ${data.payments.length}
                </strong>
            </p>

        </div>
    `;
}


/* =========================
   REPORTS
========================= */

function renderReportsModule(container) {

    container.innerHTML = `

        <div class="report-grid">

            <div class="report-card">

                <h3>
                    Providers
                </h3>

                <strong>
                    ${data.providers.length}
                </strong>

            </div>

            <div class="report-card">

                <h3>
                    Programs
                </h3>

                <strong>
                    ${data.programs.length}
                </strong>

            </div>

            <div class="report-card">

                <h3>
                    Promoters
                </h3>

                <strong>
                    ${data.promoters.length}
                </strong>

            </div>

            <div class="report-card">

                <h3>
                    Orders
                </h3>

                <strong>
                    ${data.orders.length}
                </strong>

            </div>

        </div>
    `;
}


/* =========================
   MODULE CSS
========================= */

function addModuleCSS() {

    if (
        document.getElementById(
            "moduleCSS"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id = "moduleCSS";

    style.textContent = `

        .module-overlay {
            position:fixed;
            inset:0;
            z-index:99999;
            background:rgba(0,0,0,.72);
            display:flex;
            justify-content:center;
            align-items:center;
            padding:15px;
        }

        .module-window {
            width:min(1050px,100%);
            max-height:92vh;
            overflow:auto;
            background:#ffffff;
            color:#17202a;
            border-radius:18px;
            box-shadow:0 20px 70px rgba(0,0,0,.4);
        }

        .module-header {
            position:sticky;
            top:0;
            z-index:2;
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:16px 20px;
            background:#17202a;
            color:#ffffff;
        }

        .module-header h2 {
            margin:0;
            font-size:20px;
        }

        .module-close {
            border:0;
            background:transparent;
            color:#ffffff;
            font-size:32px;
            cursor:pointer;
            line-height:1;
        }

        .module-content {
            padding:20px;
        }

        .module-toolbar {
            display:flex;
            justify-content:flex-end;
            margin-bottom:18px;
        }

        .primary-btn {
            border:0;
            border-radius:10px;
            padding:11px 16px;
            background:#17202a;
            color:white;
            cursor:pointer;
            font-weight:700;
        }

        .danger-btn {
            background:#b42318 !important;
            color:white !important;
        }

        .form-card {
            padding:18px;
            margin-bottom:20px;
            border:1px solid #e1e5e8;
            border-radius:15px;
            background:#f8fafb;
        }

        .form-card h3 {
            margin-top:0;
        }

        .form-grid {
            display:grid;
            grid-template-columns:
                repeat(2,minmax(0,1fr));
            gap:14px;
        }

        .form-grid label {
            display:flex;
            flex-direction:column;
            gap:6px;
            font-weight:700;
            font-size:13px;
        }

        .form-grid input,
        .form-grid select {
            width:100%;
            padding:11px;
            border:1px solid #ccd3d8;
            border-radius:9px;
            background:white;
            color:#17202a;
        }

        .form-actions {
            display:flex;
            gap:10px;
            margin-top:18px;
        }

        .form-actions button {
            padding:10px 15px;
            border:0;
            border-radius:9px;
            cursor:pointer;
            font-weight:700;
        }

        .data-list {
            display:flex;
            flex-direction:column;
            gap:12px;
        }

        .data-card {
            display:flex;
            justify-content:space-between;
            gap:15px;
            padding:16px;
            border:1px solid #e1e5e8;
            border-radius:14px;
            background:#ffffff;
        }

        .data-card h3 {
            margin:0 0 8px;
        }

        .data-card p {
            margin:5px 0;
            font-size:13px;
        }

        .data-card-actions {
            display:flex;
            align-items:center;
            gap:7px;
            flex-wrap:wrap;
        }

        .data-card-actions button {
            padding:8px 11px;
            border:0;
            border-radius:8px;
            cursor:pointer;
            background:#eef2f5;
            font-weight:700;
        }

        .empty-module {
            padding:45px 20px;
            text-align:center;
        }

        .report-grid {
            display:grid;
            grid-template-columns:
                repeat(4,minmax(0,1fr));
            gap:15px;
        }

        .report-card {
            padding:22px;
            text-align:center;
            border:1px solid #e1e5e8;
            border-radius:14px;
        }

        .report-card strong {
            display:block;
            font-size:30px;
            margin-top:10px;
        }

        @media(max-width:700px) {

            .form-grid {
                grid-template-columns:1fr;
            }

            .data-card {
                flex-direction:column;
            }

            .report-grid {
                grid-template-columns:
                    repeat(2,minmax(0,1fr));
            }

        }

    `;

    document.head.appendChild(style);
}


/* =========================================================
   END
========================================================= */
