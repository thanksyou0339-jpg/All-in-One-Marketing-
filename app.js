/* =========================================================
   JANJUA — ALL IN ONE MARKETING
   Complete Frontend Application
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v4";

/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultData = {
    categories: [
        { id: "cat1", name: "Automotive" },
        { id: "cat2", name: "Motorcycles" },
        { id: "cat3", name: "Mobile & Electronics" },
        { id: "cat4", name: "Fashion" },
        { id: "cat5", name: "Beauty" },
        { id: "cat6", name: "Health" },
        { id: "cat7", name: "Home & Living" },
        { id: "cat8", name: "Food" },
        { id: "cat9", name: "Travel" },
        { id: "cat10", name: "Jobs & Services" },
        { id: "cat11", name: "Banking & Finance" },
        { id: "cat12", name: "Insurance" },
        { id: "cat13", name: "Education" },
        { id: "cat14", name: "Other" }
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
        defaultCommissionRate: 5
    }
};


/* =========================================================
   DATA FUNCTIONS
   ========================================================= */

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
            socialLinks: parsed.socialLinks || [],
            clicks: parsed.clicks || [],
            orders: parsed.orders || [],
            commissions: parsed.commissions || [],
            payments: parsed.payments || [],

            settings: {
                ...defaultData.settings,
                ...(parsed.settings || {})
            }
        };

    } catch (error) {

        console.error("Data loading error:", error);

        return JSON.parse(JSON.stringify(defaultData));
    }
}


let data = loadData();


function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

    } catch (error) {

        console.error("Data saving error:", error);
    }
}


/* =========================================================
   HELPERS
   ========================================================= */

function createId(prefix) {

    return (
        prefix +
        "_" +
        Date.now().toString(36) +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function formatMoney(amount) {

    const number = Number(amount) || 0;

    return (
        data.settings.currency +
        " " +
        number.toLocaleString()
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


function getCategory(id) {

    return data.categories.find(
        item => item.id === id
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
   CREATE MODULE AREA
   IMPORTANT:
   index.html DOES NOT contain moduleArea.
   We create it automatically here.
   ========================================================= */

function createModuleArea() {

    if (document.getElementById("moduleArea")) {
        return;
    }

    const dashboardGrid =
        document.querySelector(".dashboard-grid");

    if (!dashboardGrid) {
        return;
    }

    const moduleArea =
        document.createElement("section");

    moduleArea.id = "moduleArea";
    moduleArea.className = "janjua-module-area";

    moduleArea.innerHTML = `
        <div id="moduleContent">
            <div class="module-placeholder">
                <h2>JANJUA Marketing Modules</h2>
                <p>Select any dashboard card above to open its module.</p>
            </div>
        </div>
    `;

    dashboardGrid.insertAdjacentElement(
        "afterend",
        moduleArea
    );
}


/* =========================================================
   OPEN MODULE
   ========================================================= */

function openModule(module) {

    createModuleArea();

    const content =
        document.getElementById("moduleContent");

    const moduleArea =
        document.getElementById("moduleArea");

    if (!content || !moduleArea) {
        console.error(
            "Module area could not be created."
        );
        return;
    }

    moduleArea.style.display = "block";

    switch (module) {

        case "dashboard":
            renderDashboardModule(content);
            break;

        case "categories":
            renderCategoryModule(content);
            break;

        case "providers":
            renderProviderModule(content);
            break;

        case "programs":
            renderProgramModule(content);
            break;

        case "promoters":
            renderPromoterModule(content);
            break;

        case "tracking":
            renderTrackingModule(content);
            break;

        case "orders":
            renderOrdersModule(content);
            break;

        case "payments":
            renderCommissionModule(content);
            break;

        case "reports":
            renderReportsModule(content);
            break;

        default:

            content.innerHTML = `
                <div class="empty-module">
                    <h2>${escapeHTML(module)}</h2>
                    <p>Module ready for integration.</p>
                </div>
            `;
    }

    setTimeout(function () {

        moduleArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);
}


/* =========================================================
   CLOSE MODULE
   ========================================================= */

function closeModule() {

    const moduleArea =
        document.getElementById("moduleArea");

    if (moduleArea) {
        moduleArea.style.display = "none";
    }
}


/* =========================================================
   DASHBOARD MODULE
   ========================================================= */

function renderDashboardModule(content) {

    const totalClicks =
        data.clicks.length;

    const totalOrders =
        data.orders.length;

    const totalPrograms =
        data.programs.length;

    const totalPromoters =
        data.promoters.length;

    const totalCommission =
        data.commissions.reduce(
            (sum, item) =>
                sum + (Number(item.amount) || 0),
            0
        );

    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>📊 Marketing Dashboard</h2>
                <p>Complete overview of your marketing platform.</p>
            </div>

            <button onclick="closeModule()">
                ✕ Close
            </button>

        </div>


        <div class="stats-grid">

            <div class="stat-card">
                <span>Categories</span>
                <strong>${data.categories.length}</strong>
            </div>

            <div class="stat-card">
                <span>Providers</span>
                <strong>${data.providers.length}</strong>
            </div>

            <div class="stat-card">
                <span>Programs</span>
                <strong>${totalPrograms}</strong>
            </div>

            <div class="stat-card">
                <span>Promoters</span>
                <strong>${totalPromoters}</strong>
            </div>

            <div class="stat-card">
                <span>Clicks</span>
                <strong>${totalClicks}</strong>
            </div>

            <div class="stat-card">
                <span>Orders</span>
                <strong>${totalOrders}</strong>
            </div>

            <div class="stat-card">
                <span>Total Commission</span>
                <strong>${formatMoney(totalCommission)}</strong>
            </div>

        </div>


        <div class="module-panel">

            <h3>🚀 Platform Workflow</h3>

            <p>
                Providers → Programs → Promoters →
                Tracking Links → Clicks → Orders →
                Commission → Payments → Reports
            </p>

        </div>
    `;
}


/* =========================================================
   CATEGORIES
   ========================================================= */

function renderCategoryModule(content) {

    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>📂 Marketing Categories</h2>
                <p>Manage your marketing categories.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>

        <div class="module-panel">

            <button
                class="primary-action"
                onclick="addCategory()">
                + Add Category
            </button>

            <div class="module-list">

                ${
                    data.categories.length
                    ?
                    data.categories.map(category => `

                        <div class="list-item">

                            <div>
                                <strong>
                                    ${escapeHTML(category.name)}
                                </strong>

                                <small>
                                    ID: ${escapeHTML(category.id)}
                                </small>
                            </div>

                            <button
                                onclick="deleteCategory('${category.id}')">
                                Delete
                            </button>

                        </div>

                    `).join("")
                    :
                    `
                    <div class="empty-module">
                        No categories found.
                    </div>
                    `
                }

            </div>

        </div>
    `;
}


function renderCategories() {

    const list =
        document.getElementById("categoryList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    data.categories.forEach(category => {

        const card =
            document.createElement("div");

        card.className = "category-card";

        card.innerHTML = `
            <strong>
                ${escapeHTML(category.name)}
            </strong>

            <span>
                Marketing Category
            </span>
        `;

        list.appendChild(card);
    });
}


function addCategory() {

    const name =
        prompt("Enter new category name:");

    if (!name || !name.trim()) {
        return;
    }

    data.categories.push({
        id: createId("cat"),
        name: name.trim()
    });

    saveData();

    renderCategories();

    const content =
        document.getElementById("moduleContent");

    if (content) {
        renderCategoryModule(content);
    }

    alert("Category added successfully.");
}


function deleteCategory(id) {

    if (
        !confirm(
            "Are you sure you want to delete this category?"
        )
    ) {
        return;
    }

    data.categories =
        data.categories.filter(
            item => item.id !== id
        );

    saveData();

    renderCategories();

    const content =
        document.getElementById("moduleContent");

    if (content) {
        renderCategoryModule(content);
    }
}


/* =========================================================
   PROVIDERS
   ========================================================= */

function renderProviderModule(content) {

    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>🏢 Providers & Companies</h2>
                <p>Manage banks, brands, companies and service providers.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>

        <div class="module-panel">

            <button
                class="primary-action"
                onclick="showProviderForm()">
                + Add Provider
            </button>

            <div id="providerFormArea"></div>

            <div class="module-list">

                ${
                    data.providers.length
                    ?
                    data.providers.map(provider => `

                        <div class="list-item">

                            <div>
                                <strong>
                                    ${escapeHTML(provider.name)}
                                </strong>

                                <small>
                                    ${escapeHTML(provider.type || "Company")}
                                </small>

                                <small>
                                    ${escapeHTML(provider.website || "")}
                                </small>
                            </div>

                            <button
                                onclick="deleteProvider('${provider.id}')">
                                Delete
                            </button>

                        </div>

                    `).join("")
                    :
                    `
                    <div class="empty-module">
                        No providers added yet.
                    </div>
                    `
                }

            </div>

        </div>
    `;
}


function showProviderForm() {

    const area =
        document.getElementById("providerFormArea");

    if (!area) {
        return;
    }

    area.innerHTML = `

        <div class="form-panel">

            <input
                id="providerName"
                placeholder="Provider / Company Name">

            <input
                id="providerType"
                placeholder="Type e.g. Bank, Brand, Company">

            <input
                id="providerWebsite"
                placeholder="Website / URL">

            <button
                class="primary-action"
                onclick="createProvider()">
                Save Provider
            </button>

        </div>
    `;
}


function createProvider() {

    const name =
        document.getElementById("providerName")?.value.trim();

    const type =
        document.getElementById("providerType")?.value.trim();

    const website =
        document.getElementById("providerWebsite")?.value.trim();

    if (!name) {
        alert("Please enter provider name.");
        return;
    }

    data.providers.push({
        id: createId("provider"),
        name,
        type,
        website,
        createdAt: new Date().toISOString()
    });

    saveData();

    const content =
        document.getElementById("moduleContent");

    renderProviderModule(content);
}


function deleteProvider(id) {

    if (!confirm("Delete this provider?")) {
        return;
    }

    data.providers =
        data.providers.filter(
            item => item.id !== id
        );

    saveData();

    const content =
        document.getElementById("moduleContent");

    renderProviderModule(content);
}


/* =========================================================
   PROGRAMS
   ========================================================= */

function renderProgramModule(content) {

    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>🎯 Programs & Offers</h2>
                <p>Manage affiliate programs and marketing offers.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>

        <div class="module-panel">

            <button
                class="primary-action"
                onclick="showProgramForm()">
                + Add Program / Offer
            </button>

            <div id="programFormArea"></div>

            <div class="module-list">

                ${
                    data.programs.length
                    ?
                    data.programs.map(program => {

                        const provider =
                            getProvider(program.providerId);

                        const category =
                            getCategory(program.categoryId);

                        return `

                            <div class="list-item">

                                <div>

                                    <strong>
                                        ${escapeHTML(program.name)}
                                    </strong>

                                    <small>
                                        Provider:
                                        ${escapeHTML(provider?.name || "Not selected")}
                                    </small>

                                    <small>
                                        Category:
                                        ${escapeHTML(category?.name || "Not selected")}
                                    </small>

                                    <small>
                                        Commission:
                                        ${Number(program.commissionRate) || 0}%
                                    </small>

                                </div>

                                <button
                                    onclick="deleteProgram('${program.id}')">
                                    Delete
                                </button>

                            </div>

                        `;

                    }).join("")
                    :
                    `
                    <div class="empty-module">
                        No programs or offers added yet.
                    </div>
                    `
                }

            </div>

        </div>
    `;
}


function showProgramForm() {

    const area =
        document.getElementById("programFormArea");

    if (!area) {
        return;
    }

    area.innerHTML = `

        <div class="form-panel">

            <input
                id="programName"
                placeholder="Program / Offer Name">

            <select id="programProvider">

                <option value="">
                    Select Provider
                </option>

                ${
                    data.providers.map(provider => `
                        <option value="${provider.id}">
                            ${escapeHTML(provider.name)}
                        </option>
                    `).join("")
                }

            </select>


            <select id="programCategory">

                <option value="">
                    Select Category
                </option>

                ${
                    data.categories.map(category => `
                        <option value="${category.id}">
                            ${escapeHTML(category.name)}
                        </option>
                    `).join("")
                }

            </select>


            <input
                id="programAffiliateUrl"
                placeholder="Affiliate / Offer URL">


            <input
                id="programCommission"
                type="number"
                min="0"
                step="0.01"
                value="${data.settings.defaultCommissionRate}"
                placeholder="Commission %">


            <button
                class="primary-action"
                onclick="createProgram()">
                Save Program
            </button>

        </div>
    `;
}


function createProgram() {

    const name =
        document.getElementById("programName")?.value.trim();

    const providerId =
        document.getElementById("programProvider")?.value;

    const categoryId =
        document.getElementById("programCategory")?.value;

    const affiliateUrl =
        document.getElementById("programAffiliateUrl")?.value.trim();

    const commissionRate =
        Number(
            document.getElementById("programCommission")?.value
        ) || 0;

    if (!name) {
        alert("Please enter program name.");
        return;
    }

    data.programs.push({
        id: createId("program"),
        name,
        providerId,
        categoryId,
        affiliateUrl,
        commissionRate,
        createdAt: new Date().toISOString()
    });

    saveData();

    renderProgramModule(
        document.getElementById("moduleContent")
    );
}


function deleteProgram(id) {

    if (!confirm("Delete this program?")) {
        return;
    }

    data.programs =
        data.programs.filter(
            item => item.id !== id
        );

    saveData();

    renderProgramModule(
        document.getElementById("moduleContent")
    );
}


/* =========================================================
   PROMOTERS / WORKERS
   ========================================================= */

function renderPromoterModule(content) {

    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>👥 Promoters / Workers</h2>
                <p>Manage your marketing promoters and workers.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>


        <div class="module-panel">

            <button
                class="primary-action"
                onclick="showPromoterForm()">
                + Add Promoter
            </button>

            <div id="promoterFormArea"></div>

            <div class="module-list">

                ${
                    data.promoters.length
                    ?
                    data.promoters.map(promoter => `

                        <div class="list-item">

                            <div>

                                <strong>
                                    ${escapeHTML(promoter.name)}
                                </strong>

                                <small>
                                    ${escapeHTML(promoter.phone || "")}
                                </small>

                                <small>
                                    ${escapeHTML(promoter.email || "")}
                                </small>

                            </div>

                            <button
                                onclick="deletePromoter('${promoter.id}')">
                                Delete
                            </button>

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

        </div>
    `;
}


function showPromoterForm() {

    const area =
        document.getElementById("promoterFormArea");

    if (!area) {
        return;
    }

    area.innerHTML = `

        <div class="form-panel">

            <input
                id="promoterName"
                placeholder="Promoter Name">

            <input
                id="promoterPhone"
                placeholder="Phone Number">

            <input
                id="promoterEmail"
                type="email"
                placeholder="Email">

            <button
                class="primary-action"
                onclick="createPromoter()">
                Save Promoter
            </button>

        </div>
    `;
}


function createPromoter() {

    const name =
        document.getElementById("promoterName")?.value.trim();

    const phone =
        document.getElementById("promoterPhone")?.value.trim();

    const email =
        document.getElementById("promoterEmail")?.value.trim();

    if (!name) {
        alert("Please enter promoter name.");
        return;
    }

    data.promoters.push({
        id: createId("promoter"),
        name,
        phone,
        email,
        createdAt: new Date().toISOString()
    });

    saveData();

    renderPromoterModule(
        document.getElementById("moduleContent")
    );
}


function deletePromoter(id) {

    if (!confirm("Delete this promoter?")) {
        return;
    }

    data.promoters =
        data.promoters.filter(
            item => item.id !== id
        );

    data.assignments =
        data.assignments.filter(
            item => item.promoterId !== id
        );

    saveData();

    renderPromoterModule(
        document.getElementById("moduleContent")
    );
}


/* =========================================================
   TRACKING
   ========================================================= */

function renderTrackingModule(content) {

    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>🔗 Tracking Links</h2>
                <p>Create and manage promoter tracking links.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>


        <div class="module-panel">

            <button
                class="primary-action"
                onclick="showAssignmentForm()">
                + Assign Program to Promoter
            </button>

            <button
                class="secondary-action"
                onclick="showSocialLinkForm()">
                + Social Media Link
            </button>


            <div id="assignmentFormArea"></div>


            <h3>🔗 Promoter Tracking Links</h3>

            <div class="module-list">

                ${
                    data.trackingLinks.length
                    ?
                    data.trackingLinks.map(link => {

                        const promoter =
                            getPromoter(link.promoterId);

                        const program =
                            getProgram(link.programId);

                        const url =
                            link.url || "";

                        return `

                            <div class="list-item">

                                <div>

                                    <strong>
                                        ${escapeHTML(program?.name || "Program")}
                                    </strong>

                                    <small>
                                        Promoter:
                                        ${escapeHTML(promoter?.name || "Unknown")}
                                    </small>

                                    <small>
                                        Clicks:
                                        ${Number(link.clicks) || 0}
                                    </small>

                                    <small class="link-text">
                                        ${escapeHTML(url)}
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

                    }).join("")
                    :
                    `
                    <div class="empty-module">
                        No promoter tracking links created yet.
                    </div>
                    `
                }

            </div>


            <h3>📱 Social Media Links</h3>

            <p>
                Admin-generated links for Facebook,
                Instagram, TikTok and WhatsApp.
            </p>

            <div id="socialLinkFormArea"></div>

            <div id="socialLinksArea">

                ${
                    data.socialLinks.length
                    ?
                    data.socialLinks.map(link => `

                        <div class="list-item">

                            <div>

                                <strong>
                                    ${escapeHTML(link.platform)}
                                </strong>

                                <small>
                                    Program:
                                    ${escapeHTML(
                                        getProgram(link.programId)?.name ||
                                        "Program"
                                    )}
                                </small>

                                <small>
                                    Clicks:
                                    ${Number(link.clicks) || 0}
                                </small>

                                <small>
                                    ${escapeHTML(link.url)}
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

                    `).join("")
                    :
                    `
                    <div class="empty-module">
                        No social media links created yet.
                    </div>
                    `
                }

            </div>

        </div>
    `;
}


/* =========================================================
   ASSIGNMENT
   ========================================================= */

function showAssignmentForm() {

    const area =
        document.getElementById("assignmentFormArea");

    if (!area) {
        return;
    }

    if (!data.promoters.length) {

        alert(
            "Please add a promoter first."
        );

        return;
    }

    if (!data.programs.length) {

        alert(
            "Please add a program first."
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
                    data.promoters.map(item => `
                        <option value="${item.id}">
                            ${escapeHTML(item.name)}
                        </option>
                    `).join("")
                }

            </select>


            <select id="assignmentProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(item => `
                        <option value="${item.id}">
                            ${escapeHTML(item.name)}
                        </option>
                    `).join("")
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
        document.getElementById("assignmentPromoter")?.value;

    const programId =
        document.getElementById("assignmentProgram")?.value;

    if (!promoterId || !programId) {

        alert(
            "Please select promoter and program."
        );

        return;
    }

    const code =
        "TRK_" +
        Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();

    const url =
        window.location.origin +
        window.location.pathname +
        "?track=" +
        encodeURIComponent(code);


    const assignment = {

        id: createId("assignment"),

        promoterId,

        programId,

        code,

        createdAt:
            new Date().toISOString()
    };


    const link = {

        id: createId("tracking"),

        assignmentId:
            assignment.id,

        promoterId,

        programId,

        code,

        url,

        clicks: 0,

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
        document.getElementById("moduleContent")
    );


    alert(
        "Tracking link created successfully."
    );
}


function copyTrackingLink(id) {

    const link =
        data.trackingLinks.find(
            item => item.id === id
        );

    if (!link) {
        return;
    }

    navigator.clipboard
        ?.writeText(link.url)
        .then(() => {
            alert("Tracking link copied.");
        })
        .catch(() => {
            prompt(
                "Copy this tracking link:",
                link.url
            );
        });
}


function testTrackingLink(id) {

    const link =
        data.trackingLinks.find(
            item => item.id === id
        );

    if (!link) {
        return;
    }

    window.open(
        link.url,
        "_blank"
    );
}


function deleteTrackingLink(id) {

    if (!confirm("Delete this tracking link?")) {
        return;
    }

    data.trackingLinks =
        data.trackingLinks.filter(
            item => item.id !== id
        );

    saveData();

    renderTrackingModule(
        document.getElementById("moduleContent")
    );
}


/* =========================================================
   PUBLIC TRACKING LINK
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
            item => item.code === code
        );

    if (!link) {
        return;
    }

    link.clicks =
        (Number(link.clicks) || 0) + 1;


    data.clicks.push({

        id: createId("click"),

        type: "tracking",

        trackingCode: code,

        trackingLinkId: link.id,

        promoterId: link.promoterId,

        programId: link.programId,

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
   SOCIAL MEDIA LINKS
   ========================================================= */

function showSocialLinkForm() {

    const area =
        document.getElementById("socialLinkFormArea");

    if (!area) {
        return;
    }

    if (!data.programs.length) {

        alert(
            "Please add a program first."
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

            </select>


            <select id="socialProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(program => `
                        <option value="${program.id}">
                            ${escapeHTML(program.name)}
                        </option>
                    `).join("")
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
        document.getElementById("socialPlatform")?.value;

    const programId =
        document.getElementById("socialProgram")?.value;

    if (!platform || !programId) {

        alert(
            "Please select platform and program."
        );

        return;
    }


    const code =
        "SOC_" +
        Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();


    const url =
        window.location.origin +
        window.location.pathname +
        "?social=" +
        encodeURIComponent(code);


    data.socialLinks.push({

        id: createId("social"),

        code,

        platform,

        programId,

        url,

        clicks: 0,

        createdAt:
            new Date().toISOString()
    });


    saveData();


    renderTrackingModule(
        document.getElementById("moduleContent")
    );


    alert(
        "Social media link created successfully."
    );
}


function copySocialLink(id) {

    const link =
        data.socialLinks.find(
            item => item.id === id
        );

    if (!link) {
        return;
    }

    navigator.clipboard
        ?.writeText(link.url)
        .then(() => {
            alert("Social link copied.");
        })
        .catch(() => {
            prompt(
                "Copy this social media link:",
                link.url
            );
        });
}


function testSocialLink(id) {

    const link =
        data.socialLinks.find(
            item => item.id === id
        );

    if (!link) {
        return;
    }

    window.open(
        link.url,
        "_blank"
    );
}


function deleteSocialLink(id) {

    if (!confirm("Delete this social link?")) {
        return;
    }

    data.socialLinks =
        data.socialLinks.filter(
            item => item.id !== id
        );

    saveData();

    renderTrackingModule(
        document.getElementById("moduleContent")
    );
}


/* =========================================================
   PUBLIC SOCIAL LINK
   ========================================================= */

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
            item => item.code === code
        );

    if (!link) {
        return;
    }


    link.clicks =
        (Number(link.clicks) || 0) + 1;


    data.clicks.push({

        id: createId("socialclick"),

        type: "social",

        socialCode: link.code,

        socialLinkId: link.id,

        programId: link.programId,

        platform: link.platform,

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
   PUBLIC LANDING MESSAGE
   ========================================================= */

function showPublicLandingMessage(
    type,
    link
) {

    const program =
        getProgram(link.programId);

    const box =
        document.createElement("div");

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
                Your ${type === "social" ? "social media" : "tracking"}
                visit has been recorded.
            </p>

            ${
                program?.affiliateUrl
                ?
                `
                <a
                    class="primary-action public-link-button"
                    href="${escapeHTML(program.affiliateUrl)}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Continue to Offer
                </a>
                `
                :
                `
                <p>
                    Offer link is not configured yet.
                </p>
                `
            }

        </div>
    `;


    document.body.appendChild(box);
}


/* =========================================================
   ORDERS & CLICKS
   ========================================================= */

function renderOrdersModule(content) {

    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>🛒 Orders & Clicks</h2>
                <p>Track clicks, orders and sales.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>


        <div class="module-panel">

            <button
                class="primary-action"
                onclick="showOrderForm()">
                + Add Order
            </button>


            <div id="orderFormArea"></div>


            <h3>📊 Click Statistics</h3>

            <div class="stats-grid">

                <div class="stat-card">
                    <span>Total Clicks</span>
                    <strong>${data.clicks.length}</strong>
                </div>

                <div class="stat-card">
                    <span>Tracking Clicks</span>
                    <strong>
                        ${
                            data.clicks.filter(
                                item => item.type === "tracking"
                            ).length
                        }
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Social Clicks</span>
                    <strong>
                        ${
                            data.clicks.filter(
                                item => item.type === "social"
                            ).length
                        }
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Total Orders</span>
                    <strong>${data.orders.length}</strong>
                </div>

            </div>


            <h3>🛍 Orders</h3>

            <div class="module-list">

                ${
                    data.orders.length
                    ?
                    data.orders.map(order => `

                        <div class="list-item">

                            <div>

                                <strong>
                                    ${escapeHTML(order.customerName)}
                                </strong>

                                <small>
                                    Program:
                                    ${escapeHTML(
                                        getProgram(order.programId)?.name ||
                                        "Unknown"
                                    )}
                                </small>

                                <small>
                                    Amount:
                                    ${formatMoney(order.amount)}
                                </small>

                                <small>
                                    Status:
                                    ${escapeHTML(order.status)}
                                </small>

                            </div>

                            <button
                                onclick="deleteOrder('${order.id}')">
                                Delete
                            </button>

                        </div>

                    `).join("")
                    :
                    `
                    <div class="empty-module">
                        No orders recorded yet.
                    </div>
                    `
                }

            </div>

        </div>
    `;
}


function showOrderForm() {

    const area =
        document.getElementById("orderFormArea");

    if (!area) {
        return;
    }

    if (!data.programs.length) {

        alert(
            "Please add a program first."
        );

        return;
    }

    area.innerHTML = `

        <div class="form-panel">

            <input
                id="orderCustomer"
                placeholder="Customer Name">


            <select id="orderProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(program => `
                        <option value="${program.id}">
                            ${escapeHTML(program.name)}
                        </option>
                    `).join("")
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
        document.getElementById("orderCustomer")?.value.trim();

    const programId =
        document.getElementById("orderProgram")?.value;

    const amount =
        Number(
            document.getElementById("orderAmount")?.value
        ) || 0;

    const status =
        document.getElementById("orderStatus")?.value ||
        "Pending";

    const trackingCode =
        document.getElementById("orderTrackingCode")?.value.trim();


    if (!customerName) {

        alert(
            "Please enter customer name."
        );

        return;
    }

    if (!programId) {

        alert(
            "Please select program."
        );

        return;
    }


    const program =
        getProgram(programId);


    const commissionRate =
        Number(
            program?.commissionRate
        ) ||
        Number(
            data.settings.defaultCommissionRate
        ) ||
        0;


    const commissionAmount =
        amount *
        commissionRate /
        100;


    const order = {

        id: createId("order"),

        customerName,

        programId,

        amount,

        status,

        trackingCode,

        commissionRate,

        commissionAmount,

        createdAt:
            new Date().toISOString()
    };


    data.orders.push(order);


    if (
        status === "Confirmed" ||
        status === "Completed"
    ) {

        data.commissions.push({

            id: createId("commission"),

            orderId: order.id,

            programId,

            amount: commissionAmount,

            status: "Pending",

            createdAt:
                new Date().toISOString()
        });
    }


    saveData();


    renderOrdersModule(
        document.getElementById("moduleContent")
    );


    alert(
        "Order saved successfully."
    );
}


function deleteOrder(id) {

    if (!confirm("Delete this order?")) {
        return;
    }

    data.orders =
        data.orders.filter(
            item => item.id !== id
        );

    data.commissions =
        data.commissions.filter(
            item => item.orderId !== id
        );

    saveData();

    renderOrdersModule(
        document.getElementById("moduleContent")
    );
}


/* =========================================================
   COMMISSION & PAYMENTS
   ========================================================= */

function renderCommissionModule(content) {

    const totalCommission =
        data.commissions.reduce(
            (sum, item) =>
                sum + (Number(item.amount) || 0),
            0
        );


    const totalPaid =
        data.payments.reduce(
            (sum, item) =>
                sum + (Number(item.amount) || 0),
            0
        );


    const pending =
        totalCommission -
        totalPaid;


    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>💰 Commission & Payments</h2>
                <p>Manage commissions and promoter payments.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <span>Total Commission</span>

                <strong>
                    ${formatMoney(totalCommission)}
                </strong>

            </div>


            <div class="stat-card">

                <span>Total Paid</span>

                <strong>
                    ${formatMoney(totalPaid)}
                </strong>

            </div>


            <div class="stat-card">

                <span>Pending</span>

                <strong>
                    ${formatMoney(
                        Math.max(pending, 0)
                    )}
                </strong>

            </div>

        </div>


        <div class="module-panel">

            <h3>Commission Records</h3>

            <div class="module-list">

                ${
                    data.commissions.length
                    ?
                    data.commissions.map(item => `

                        <div class="list-item">

                            <div>

                                <strong>
                                    ${formatMoney(item.amount)}
                                </strong>

                                <small>
                                    Status:
                                    ${escapeHTML(item.status)}
                                </small>

                                <small>
                                    Order:
                                    ${escapeHTML(item.orderId)}
                                </small>

                            </div>


                            ${
                                item.status === "Pending"
                                ?
                                `
                                <button
                                    onclick="markCommissionPaid('${item.id}')">
                                    Mark Paid
                                </button>
                                `
                                :
                                `
                                <span class="paid-label">
                                    PAID
                                </span>
                                `
                            }

                        </div>

                    `).join("")
                    :
                    `
                    <div class="empty-module">
                        No commission records yet.
                    </div>
                    `
                }

            </div>

        </div>


        <div class="module-panel">

            <h3>Payment Records</h3>

            <div class="module-list">

                ${
                    data.payments.length
                    ?
                    data.payments.map(payment => `

                        <div class="list-item">

                            <div>

                                <strong>
                                    ${formatMoney(payment.amount)}
                                </strong>

                                <small>
                                    Promoter:
                                    ${escapeHTML(
                                        getPromoter(payment.promoterId)?.name ||
                                        "Not assigned"
                                    )}
                                </small>

                                <small>
                                    Method:
                                    ${escapeHTML(payment.method || "")}
                                </small>

                            </div>

                        </div>

                    `).join("")
                    :
                    `
                    <div class="empty-module">
                        No payments recorded yet.
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
            item => item.id === id
        );

    if (!commission) {
        return;
    }

    commission.status = "Paid";

    data.payments.push({

        id: createId("payment"),

        commissionId: commission.id,

        amount: commission.amount,

        method: "Manual",

        createdAt:
            new Date().toISOString()
    });


    saveData();


    renderCommissionModule(
        document.getElementById("moduleContent")
    );


    alert(
        "Commission marked as paid."
    );
}


/* =========================================================
   REPORTS
   ========================================================= */

function renderReportsModule(content) {

    const totalClicks =
        data.clicks.length;

    const totalOrders =
        data.orders.length;

    const completedOrders =
        data.orders.filter(
            order =>
                order.status === "Completed" ||
                order.status === "Confirmed"
        ).length;


    const sales =
        data.orders.reduce(
            (sum, order) =>
                sum + (Number(order.amount) || 0),
            0
        );


    const commission =
        data.commissions.reduce(
            (sum, item) =>
                sum + (Number(item.amount) || 0),
            0
        );


    const conversion =
        totalClicks > 0
        ?
        (
            totalOrders /
            totalClicks *
            100
        ).toFixed(2)
        :
        "0.00";


    content.innerHTML = `

        <div class="module-header">

            <div>
                <h2>📈 Reports & Analytics</h2>
                <p>View marketing performance and statistics.</p>
            </div>

            <button onclick="closeModule()">✕ Close</button>

        </div>


        <div class="stats-grid">

            <div class="stat-card">

                <span>Total Clicks</span>

                <strong>
                    ${totalClicks}
                </strong>

            </div>


            <div class="stat-card">

                <span>Total Orders</span>

                <strong>
                    ${totalOrders}
                </strong>

            </div>


            <div class="stat-card">

                <span>Confirmed / Completed</span>

                <strong>
                    ${completedOrders}
                </strong>

            </div>


            <div class="stat-card">

                <span>Conversion Rate</span>

                <strong>
                    ${conversion}%
                </strong>

            </div>


            <div class="stat-card">

                <span>Total Sales</span>

                <strong>
                    ${formatMoney(sales)}
                </strong>

            </div>


            <div class="stat-card">

                <span>Total Commission</span>

                <strong>
                    ${formatMoney(commission)}
                </strong>

            </div>

        </div>


        <div class="module-panel">

            <h3>📊 Performance Summary</h3>

            <p>
                Programs:
                <strong>${data.programs.length}</strong>
            </p>

            <p>
                Promoters:
                <strong>${data.promoters.length}</strong>
            </p>

            <p>
                Tracking Links:
                <strong>${data.trackingLinks.length}</strong>
            </p>

            <p>
                Social Links:
                <strong>${data.socialLinks.length}</strong>
            </p>

        </div>
    `;
}


/* =========================================================
   ANIMATED JANJUA BRANDING
   ========================================================= */

function addAnimatedBranding() {

    const header =
        document.querySelector("header");

    if (!header) {
        return;
    }


    const oldBrand =
        header.querySelector(".brand-area");

    if (oldBrand) {
        oldBrand.style.display = "none";
    }


    const oldStatus =
        header.querySelector(".header-status");

    if (oldStatus) {
        oldStatus.style.display = "none";
    }


    const oldAnimated =
        document.getElementById(
            "janjuaAnimatedBrand"
        );

    if (oldAnimated) {
        oldAnimated.remove();
    }


    const box =
        document.createElement("div");

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


    header.prepend(box);
}


/* =========================================================
   BRAND ANIMATION CSS
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
        document.createElement("style");

    style.id =
        "janjuaBrandAnimationCSS";


    style.textContent = `

        #janjuaAnimatedBrand {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }


        .janjua-brand-animation {
            position: relative;
            min-height: 170px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }


        .brand-main {
            position: relative;
            z-index: 5;
            text-align: center;
        }


        .brand-title {
            font-size: 48px;
            font-weight: 900;
            letter-spacing: 8px;
            text-shadow:
                0 0 10px rgba(255,255,255,.6),
                0 0 25px rgba(0,200,255,.5);
            animation: janjuaPulse 2.5s infinite;
        }


        .brand-subtitle {
            font-size: 15px;
            margin-top: 5px;
            opacity: .95;
        }


        .brand-status {
            margin-top: 10px;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 2px;
        }


        .status-dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #00ff88;
            box-shadow: 0 0 12px #00ff88;
            margin-right: 7px;
            animation: statusPulse 1.4s infinite;
        }


        .brand-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            border: 1px solid rgba(255,255,255,.35);
            border-radius: 50%;
            transform: translate(-50%,-50%);
        }


        .orbit-one {
            width: 250px;
            height: 80px;
            animation: orbitSpin 6s linear infinite;
        }


        .orbit-two {
            width: 330px;
            height: 105px;
            animation: orbitSpinReverse 9s linear infinite;
        }


        .orbit-three {
            width: 420px;
            height: 135px;
            animation: orbitSpin 13s linear infinite;
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


        @keyframes orbitSpinReverse {

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
                transform: scale(1);
            }

            50% {
                transform: scale(1.04);
            }
        }


        @keyframes statusPulse {

            0%,100% {
                opacity: 1;
                transform: scale(1);
            }

            50% {
                opacity: .45;
                transform: scale(.75);
            }
        }


        @media(max-width:600px){

            .brand-title {
                font-size: 35px;
                letter-spacing: 5px;
            }

            .brand-subtitle {
                font-size: 12px;
            }

            .orbit-one {
                width: 200px;
            }

            .orbit-two {
                width: 270px;
            }

            .orbit-three {
                width: 340px;
            }
        }

    `;


    document.head.appendChild(style);
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
        document.createElement("style");

    style.id =
        "janjuaModuleCSS";


    style.textContent = `

        .janjua-module-area {
            width: 100%;
            margin: 35px 0;
            display: block;
        }


        #moduleContent {
            width: 100%;
        }


        .module-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 15px;
            background: rgba(255,255,255,.08);
            border: 1px solid rgba(255,255,255,.15);
        }


        .module-header h2 {
            margin: 0 0 5px;
        }


        .module-header p {
            margin: 0;
            opacity: .75;
        }


        .module-header button,
        .list-item button,
        .button-group button {
            border: none;
            border-radius: 8px;
            padding: 9px 13px;
            cursor: pointer;
        }


        .module-panel {
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 15px;
            background: rgba(255,255,255,.07);
            border: 1px solid rgba(255,255,255,.12);
        }


        .stats-grid {
            display: grid;
            grid-template-columns:
                repeat(auto-fit,minmax(160px,1fr));
            gap: 15px;
            margin-bottom: 20px;
        }


        .stat-card {
            padding: 20px;
            border-radius: 14px;
            background: rgba(255,255,255,.08);
            border: 1px solid rgba(255,255,255,.12);
        }


        .stat-card span {
            display: block;
            opacity: .7;
            margin-bottom: 8px;
        }


        .stat-card strong {
            display: block;
            font-size: 24px;
        }


        .module-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
        }


        .list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 15px;
            border-radius: 12px;
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.1);
        }


        .list-item > div:first-child {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }


        .list-item small {
            opacity: .7;
        }


        .form-panel {
            display: grid;
            gap: 12px;
            padding: 15px;
            margin: 15px 0;
            border-radius: 12px;
            background: rgba(0,0,0,.12);
        }


        .form-panel input,
        .form-panel select {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid rgba(255,255,255,.2);
            background: rgba(255,255,255,.1);
            color: inherit;
            box-sizing: border-box;
        }


        .form-panel option {
            color: #111;
        }


        .primary-action,
        .secondary-action {
            display: inline-block;
            margin: 5px;
            padding: 11px 16px;
            border: none;
            border-radius: 9px;
            cursor: pointer;
            font-weight: bold;
        }


        .secondary-action {
            opacity: .85;
        }


        .button-group {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }


        .empty-module,
        .module-placeholder {
            padding: 30px;
            text-align: center;
            border-radius: 14px;
            background: rgba(255,255,255,.06);
        }


        .paid-label {
            font-weight: bold;
        }


        .link-text {
            word-break: break-all;
        }


        .public-link-message {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background: rgba(0,0,0,.82);
        }


        .public-link-card {
            width: min(500px,100%);
            padding: 35px;
            text-align: center;
            border-radius: 20px;
            background: #17202a;
            box-shadow: 0 20px 60px rgba(0,0,0,.5);
        }


        .public-logo {
            font-size: 32px;
            font-weight: 900;
            letter-spacing: 5px;
            margin-bottom: 15px;
        }


        .public-link-button {
            text-decoration: none;
            margin-top: 15px;
        }


        @media(max-width:650px){

            .module-header {
                flex-direction: column;
                align-items: flex-start;
            }


            .list-item {
                flex-direction: column;
                align-items: flex-start;
            }


            .button-group {
                width: 100%;
            }

        }

    `;


    document.head.appendChild(style);
}
