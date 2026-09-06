/* =========================================================
   JANJUA — ALL IN ONE MARKETING
   COMPLETE FRONTEND PLATFORM
========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v5";
const OLD_STORAGE_KEY = "all_in_one_marketing_v4";

let loginType = "admin";
let currentUser = null;

const defaultData = {

    settings: {
        currency: "PKR",
        defaultCommissionRate: 5
    },

    users: [
        {
            id: "admin_1",
            username: "admin",
            password: "admin123",
            role: "admin",
            name: "JANJUA Admin",
            status: "active"
        }
    ],

    categories: [
        {id:"cat_1",name:"Automotive",status:"active"},
        {id:"cat_2",name:"Motorcycles",status:"active"},
        {id:"cat_3",name:"Mobile & Electronics",status:"active"},
        {id:"cat_4",name:"Fashion",status:"active"},
        {id:"cat_5",name:"Beauty",status:"active"},
        {id:"cat_6",name:"Health",status:"active"},
        {id:"cat_7",name:"Home & Living",status:"active"},
        {id:"cat_8",name:"Food",status:"active"},
        {id:"cat_9",name:"Travel",status:"active"},
        {id:"cat_10",name:"Jobs & Services",status:"active"},
        {id:"cat_11",name:"Banking & Finance",status:"active"},
        {id:"cat_12",name:"Insurance",status:"active"},
        {id:"cat_13",name:"Education",status:"active"},
        {id:"cat_14",name:"Other",status:"active"}
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

    payments: []
};


/* =========================================================
   STORAGE
========================================================= */

function cloneDefaultData() {
    return JSON.parse(JSON.stringify(defaultData));
}

function loadData() {

    try {

        let raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            raw = localStorage.getItem(OLD_STORAGE_KEY);
        }

        if (!raw) {
            const fresh = cloneDefaultData();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
            return fresh;
        }

        const parsed = JSON.parse(raw);

        const merged = cloneDefaultData();

        Object.keys(merged).forEach(key => {

            if (Array.isArray(merged[key])) {

                if (Array.isArray(parsed[key])) {
                    merged[key] = parsed[key];
                }

            } else if (
                typeof merged[key] === "object" &&
                parsed[key]
            ) {

                merged[key] = {
                    ...merged[key],
                    ...parsed[key]
                };

            }

        });

        return merged;

    } catch (error) {

        console.error(error);

        return cloneDefaultData();
    }
}

let data = loadData();

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =========================================================
   HELPERS
========================================================= */

function createId(prefix = "id") {

    return (
        prefix +
        "_" +
        Date.now().toString(36) +
        "_" +
        Math.random()
            .toString(36)
            .substring(2,8)
    );
}

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

function formatMoney(value) {

    const number = Number(value || 0);

    return (
        data.settings.currency +
        " " +
        number.toLocaleString()
    );
}

function today() {

    return new Date()
        .toISOString()
        .slice(0,10);
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

function getTracking(id) {

    return data.trackingLinks.find(
        item => item.id === id
    );
}

function statusBadge(status) {

    const safe = escapeHTML(status || "active");

    return `
        <span class="status-badge status-${safe.toLowerCase()}">
            ${safe}
        </span>
    `;
}

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(() => {
            toast.classList.remove("show");
        },3000);
}


/* =========================================================
   LOGIN
========================================================= */

function setLoginType(type) {

    loginType = type;

    document
        .getElementById("adminLoginTab")
        .classList.toggle(
            "active",
            type === "admin"
        );

    document
        .getElementById("promoterLoginTab")
        .classList.toggle(
            "active",
            type === "promoter"
        );

    document
        .getElementById("loginMessage")
        .textContent = "";

    document
        .getElementById("loginUsername")
        .value = "";

    document
        .getElementById("loginPassword")
        .value = "";
}

function login(event) {

    event.preventDefault();

    const username =
        document
            .getElementById("loginUsername")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;

    const message =
        document.getElementById("loginMessage");

    if (loginType === "admin") {

        const user = data.users.find(
            item =>
                item.username === username &&
                item.password === password &&
                item.role === "admin" &&
                item.status === "active"
        );

        if (!user) {

            message.textContent =
                "Invalid Admin username or password.";

            return;
        }

        currentUser = {
            id: user.id,
            username: user.username,
            role: user.role,
            name: user.name
        };

    } else {

        const promoter = data.promoters.find(
            item =>
                item.username === username &&
                item.password === password &&
                item.status === "active"
        );

        if (!promoter) {

            message.textContent =
                "Invalid Promoter username or password.";

            return;
        }

        currentUser = {
            id: promoter.id,
            username: promoter.username,
            role: "promoter",
            name: promoter.name
        };
    }

    sessionStorage.setItem(
        "janjua_current_user",
        JSON.stringify(currentUser)
    );

    enterApplication();
}

function logout() {

    currentUser = null;

    sessionStorage.removeItem(
        "janjua_current_user"
    );

    document
        .getElementById("appScreen")
        .classList.add("hidden");

    document
        .getElementById("loginScreen")
        .classList.remove("hidden");

    document
        .getElementById("loginUsername")
        .value = "";

    document
        .getElementById("loginPassword")
        .value = "";

    showToast("Logged out.");
}

function restoreSession() {

    try {

        const raw =
            sessionStorage.getItem(
                "janjua_current_user"
            );

        if (!raw) return;

        currentUser = JSON.parse(raw);

        enterApplication();

    } catch (error) {

        console.error(error);
    }
}

function enterApplication() {

    document
        .getElementById("loginScreen")
        .classList.add("hidden");

    document
        .getElementById("appScreen")
        .classList.remove("hidden");

    document
        .getElementById("currentUserLabel")
        .textContent =
        currentUser.role.toUpperCase() +
        " — " +
        currentUser.name;

    const admin =
        currentUser.role === "admin";

    document
        .getElementById("adminDashboard")
        .classList.toggle(
            "hidden",
            !admin
        );

    document
        .getElementById("promoterDashboard")
        .classList.toggle(
            "hidden",
            admin
        );

    if (admin) {

        renderCategories();

        openModule("dashboard");

    } else {

        renderPromoterDashboard();
    }
}


/* =========================================================
   MODULE AREA
========================================================= */

function openModule(module) {

    if (!currentUser) return;

    if (
        currentUser.role !== "admin"
    ) {

        showToast(
            "Admin access required."
        );

        return;
    }

    const moduleArea =
        document.getElementById("moduleArea");

    const moduleContent =
        document.getElementById("moduleContent");

    moduleArea.classList.remove("hidden");

    moduleArea.style.display = "block";

    moduleContent.innerHTML = "";

    switch(module) {

        case "dashboard":
            renderDashboard();
            break;

        case "categories":
            renderCategoriesModule();
            break;

        case "providers":
            renderProviders();
            break;

        case "programs":
            renderPrograms();
            break;

        case "promoters":
            renderPromoters();
            break;

        case "tracking":
            renderTracking();
            break;

        case "orders":
            renderOrders();
            break;

        case "payments":
            renderPayments();
            break;

        case "reports":
            renderReports();
            break;

        default:
            renderDashboard();
    }

    setTimeout(() => {

        moduleArea.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    },100);
}

function closeModule() {

    const area =
        document.getElementById("moduleArea");

    area.classList.add("hidden");

    area.style.display = "none";

    document
        .getElementById("moduleContent")
        .innerHTML = "";
}

function moduleShell(
    title,
    subtitle,
    content
) {

    return `
        <div class="module-wrapper">

            <div class="module-header">

                <div>
                    <h2>${escapeHTML(title)}</h2>
                    <p>${escapeHTML(subtitle)}</p>
                </div>

                <button
                    class="close-module"
                    onclick="closeModule()">
                    ✕ Close
                </button>

            </div>

            <div class="module-body">

                ${content}

            </div>

        </div>
    `;
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const clicks =
        data.clicks.length;

    const orders =
        data.orders.length;

    const confirmed =
        data.orders.filter(
            o =>
                o.status === "confirmed" ||
                o.status === "completed"
        ).length;

    const sales =
        data.orders
            .filter(
                o =>
                    o.status === "confirmed" ||
                    o.status === "completed"
            )
            .reduce(
                (sum,o) =>
                    sum + Number(o.amount || 0),
                0
            );

    const commission =
        data.commissions
            .reduce(
                (sum,c) =>
                    sum + Number(c.amount || 0),
                0
            );

    const pending =
        data.commissions
            .filter(c => c.status === "pending")
            .reduce(
                (sum,c) =>
                    sum + Number(c.amount || 0),
                0
            );

    const conversion =
        clicks > 0
            ? ((confirmed / clicks) * 100).toFixed(2)
            : "0.00";

    const recentOrders =
        [...data.orders]
            .sort(
                (a,b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0,8);

    const recentRows =
        recentOrders.length
            ? recentOrders.map(order => {

                const program =
                    getProgram(order.programId);

                const promoter =
                    getPromoter(order.promoterId);

                return `
                    <tr>

                        <td>
                            ${escapeHTML(order.orderNumber || order.id)}
                        </td>

                        <td>
                            ${escapeHTML(order.customer)}
                        </td>

                        <td>
                            ${escapeHTML(program?.name || "-")}
                        </td>

                        <td>
                            ${escapeHTML(promoter?.name || "-")}
                        </td>

                        <td>
                            ${formatMoney(order.amount)}
                        </td>

                        <td>
                            ${statusBadge(order.status)}
                        </td>

                    </tr>
                `;

            }).join("")
            :
            `
                <tr>
                    <td colspan="6">
                        No orders yet.
                    </td>
                </tr>
            `;

    const content = `

        <div class="report-grid">

            <div class="report-card">
                <h4>Total Clicks</h4>
                <strong>${clicks}</strong>
            </div>

            <div class="report-card">
                <h4>Total Orders</h4>
                <strong>${orders}</strong>
            </div>

            <div class="report-card">
                <h4>Confirmed Orders</h4>
                <strong>${confirmed}</strong>
            </div>

            <div class="report-card">
                <h4>Total Sales</h4>
                <strong>${formatMoney(sales)}</strong>
            </div>

            <div class="report-card">
                <h4>Total Commission</h4>
                <strong>${formatMoney(commission)}</strong>
            </div>

            <div class="report-card">
                <h4>Pending Commission</h4>
                <strong>${formatMoney(pending)}</strong>
            </div>

        </div>

        <div class="module-toolbar">

            <div class="toolbar-left">

                <button
                    class="action-button"
                    onclick="renderDashboard()">
                    🔄 Refresh
                </button>

                <button
                    class="action-button"
                    onclick="exportAllData()">
                    💾 Backup
                </button>

            </div>

        </div>

        <h3>
            Recent Orders
        </h3>

        <div class="table-wrapper">

            <table class="janjua-table">

                <thead>

                    <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Program</th>
                        <th>Promoter</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>
                    ${recentRows}
                </tbody>

            </table>

        </div>

        <br>

        <div class="report-grid">

            <div class="report-card">
                <h4>Conversion Rate</h4>
                <strong>${conversion}%</strong>
            </div>

            <div class="report-card">
                <h4>Providers</h4>
                <strong>${data.providers.length}</strong>
            </div>

            <div class="report-card">
                <h4>Programs</h4>
                <strong>${data.programs.length}</strong>
            </div>

        </div>
    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Dashboard",
            "Complete marketing performance overview.",
            content
        );
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

    const list =
        document.getElementById("categoryList");

    if (!list) return;

    list.innerHTML =
        data.categories
            .filter(
                category =>
                    category.status !== "deleted"
            )
            .map(category => {

                const count =
                    data.programs.filter(
                        p =>
                            p.categoryId === category.id
                    ).length;

                return `
                    <div class="category-card">

                        <h3>
                            ${escapeHTML(category.name)}
                        </h3>

                        <p>
                            ${count} program(s)
                        </p>

                        <div style="margin-top:8px;">
                            ${statusBadge(category.status)}
                        </div>

                    </div>
                `;

            }).join("");
}

function renderCategoriesModule() {

    const content = `

        <div class="module-toolbar">

            <div class="toolbar-left">

                <input
                    id="categorySearch"
                    class="search-input"
                    placeholder="Search category..."
                    oninput="filterCategories()">

            </div>

            <div class="toolbar-right">

                <button
                    class="action-button"
                    onclick="showCategoryForm()">
                    + Add Category
                </button>

            </div>

        </div>

        <div id="categoryFormArea"></div>

        <div
            id="categoryTableArea">
        </div>
    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Categories",
            "Manage marketing categories.",
            content
        );

    drawCategoryTable();
}

function showCategoryForm(id = "") {

    const category =
        data.categories.find(
            item => item.id === id
        );

    document
        .getElementById("categoryFormArea")
        .innerHTML = `

            <form
                class="janjua-form"
                onsubmit="saveCategory(event,'${id}')">

                <label>
                    Category Name
                    <input
                        id="categoryName"
                        required
                        value="${escapeHTML(category?.name || "")}">
                </label>

                <label>
                    Status
                    <select id="categoryStatus">

                        <option
                            value="active"
                            ${category?.status === "active" ? "selected":""}>
                            Active
                        </option>

                        <option
                            value="inactive"
                            ${category?.status === "inactive" ? "selected":""}>
                            Inactive
                        </option>

                    </select>
                </label>

                <div class="form-actions">

                    <button
                        class="action-button"
                        type="submit">
                        Save Category
                    </button>

                    <button
                        class="small-button"
                        type="button"
                        onclick="cancelForm('categoryFormArea')">
                        Cancel
                    </button>

                </div>

            </form>
        `;
}

function saveCategory(event,id) {

    event.preventDefault();

    const name =
        document
            .getElementById("categoryName")
            .value
            .trim();

    const status =
        document
            .getElementById("categoryStatus")
            .value;

    if (!name) return;

    if (id) {

        const category =
            getCategory(id);

        category.name = name;
        category.status = status;

        showToast("Category updated.");

    } else {

        data.categories.push({

            id:createId("cat"),
            name,
            status

        });

        showToast("Category added.");
    }

    saveData();

    document
        .getElementById("categoryFormArea")
        .innerHTML = "";

    drawCategoryTable();

    renderCategories();
}

function drawCategoryTable() {

    const search =
        document
            .getElementById("categorySearch")
            ?.value
            .toLowerCase() || "";

    const rows =
        data.categories
            .filter(
                c =>
                    c.status !== "deleted" &&
                    c.name
                        .toLowerCase()
                        .includes(search)
            )
            .map(c => `

                <tr>

                    <td>
                        ${escapeHTML(c.name)}
                    </td>

                    <td>
                        ${statusBadge(c.status)}
                    </td>

                    <td>
                        <button
                            class="small-button"
                            onclick="showCategoryForm('${c.id}')">
                            Edit
                        </button>

                        <button
                            class="small-button"
                            onclick="toggleCategory('${c.id}')">
                            Toggle
                        </button>

                        <button
                            class="small-button danger"
                            onclick="deleteCategory('${c.id}')">
                            Delete
                        </button>
                    </td>

                </tr>
            `)
            .join("");

    document
        .getElementById("categoryTableArea")
        .innerHTML = `

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                                <tr>
                                    <td colspan="3">
                                        No categories found.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}

function filterCategories() {

    drawCategoryTable();
}

function toggleCategory(id) {

    const item =
        getCategory(id);

    if (!item) return;

    item.status =
        item.status === "active"
            ? "inactive"
            : "active";

    saveData();

    drawCategoryTable();

    renderCategories();
}

function deleteCategory(id) {

    if (!confirm("Delete this category?")) {
        return;
    }

    const item =
        getCategory(id);

    if (!item) return;

    item.status = "deleted";

    saveData();

    drawCategoryTable();

    renderCategories();

    showToast("Category deleted.");
}

function cancelForm(id) {

    const area =
        document.getElementById(id);

    if (area) {
        area.innerHTML = "";
    }
}


/* =========================================================
   PROVIDERS
========================================================= */

function renderProviders() {

    const content = `

        <div class="module-toolbar">

            <div class="toolbar-left">

                <input
                    id="providerSearch"
                    class="search-input"
                    placeholder="Search company/provider..."
                    oninput="drawProviders()">

            </div>

            <div class="toolbar-right">

                <button
                    class="action-button"
                    onclick="showProviderForm()">
                    + Add Provider
                </button>

            </div>

        </div>

        <div id="providerFormArea"></div>

        <div id="providerTableArea"></div>

    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Providers & Companies",
            "Manage banks, brands, companies and service providers.",
            content
        );

    drawProviders();
}

function showProviderForm(id = "") {

    const item =
        getProvider(id);

    document
        .getElementById("providerFormArea")
        .innerHTML = `

            <form
                class="janjua-form"
                onsubmit="saveProvider(event,'${id}')">

                <label>
                    Company / Provider Name
                    <input
                        id="providerName"
                        required
                        value="${escapeHTML(item?.name || "")}">
                </label>

                <label>
                    Category
                    <select id="providerCategory">

                        ${data.categories
                            .filter(c => c.status !== "deleted")
                            .map(c => `
                                <option
                                    value="${c.id}"
                                    ${item?.categoryId === c.id ? "selected":""}>
                                    ${escapeHTML(c.name)}
                                </option>
                            `).join("")
                        }

                    </select>
                </label>

                <label>
                    Contact
                    <input
                        id="providerContact"
                        value="${escapeHTML(item?.contact || "")}">
                </label>

                <label>
                    Website / URL
                    <input
                        id="providerUrl"
                        type="url"
                        value="${escapeHTML(item?.url || "")}">
                </label>

                <label>
                    Status
                    <select id="providerStatus">

                        <option
                            value="active"
                            ${item?.status === "active" ? "selected":""}>
                            Active
                        </option>

                        <option
                            value="inactive"
                            ${item?.status === "inactive" ? "selected":""}>
                            Inactive
                        </option>

                    </select>
                </label>

                <label>
                    Notes
                    <input
                        id="providerNotes"
                        value="${escapeHTML(item?.notes || "")}">
                </label>

                <div class="form-actions">

                    <button
                        class="action-button"
                        type="submit">
                        Save Provider
                    </button>

                    <button
                        type="button"
                        class="small-button"
                        onclick="cancelForm('providerFormArea')">
                        Cancel
                    </button>

                </div>

            </form>
        `;
}

function saveProvider(event,id) {

    event.preventDefault();

    const obj = {

        name:
            document
                .getElementById("providerName")
                .value
                .trim(),

        categoryId:
            document
                .getElementById("providerCategory")
                .value,

        contact:
            document
                .getElementById("providerContact")
                .value
                .trim(),

        url:
            document
                .getElementById("providerUrl")
                .value
                .trim(),

        status:
            document
                .getElementById("providerStatus")
                .value,

        notes:
            document
                .getElementById("providerNotes")
                .value
                .trim()
    };

    if (id) {

        Object.assign(
            getProvider(id),
            obj
        );

        showToast("Provider updated.");

    } else {

        data.providers.push({
            id:createId("provider"),
            ...obj
        });

        showToast("Provider added.");
    }

    saveData();

    document
        .getElementById("providerFormArea")
        .innerHTML = "";

    drawProviders();
}

function drawProviders() {

    const search =
        document
            .getElementById("providerSearch")
            ?.value
            .toLowerCase() || "";

    const rows =
        data.providers
            .filter(
                p =>
                    p.name
                        .toLowerCase()
                        .includes(search)
            )
            .map(p => {

                const category =
                    getCategory(p.categoryId);

                return `
                    <tr>

                        <td>
                            ${escapeHTML(p.name)}
                        </td>

                        <td>
                            ${escapeHTML(category?.name || "-")}
                        </td>

                        <td>
                            ${escapeHTML(p.contact || "-")}
                        </td>

                        <td>
                            ${statusBadge(p.status)}
                        </td>

                        <td>

                            <button
                                class="small-button"
                                onclick="showProviderForm('${p.id}')">
                                Edit
                            </button>

                            <button
                                class="small-button danger"
                                onclick="deleteProvider('${p.id}')">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            })
            .join("");

    document
        .getElementById("providerTableArea")
        .innerHTML = `

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>
                        <tr>
                            <th>Provider</th>
                            <th>Category</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                                <tr>
                                    <td colspan="5">
                                        No providers found.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}

function deleteProvider(id) {

    if (!confirm("Delete this provider?")) {
        return;
    }

    data.providers =
        data.providers.filter(
            p => p.id !== id
        );

    saveData();

    drawProviders();

    showToast("Provider deleted.");
}


/* =========================================================
   PROGRAMS
========================================================= */

function renderPrograms() {

    const content = `

        <div class="module-toolbar">

            <div class="toolbar-left">

                <input
                    id="programSearch"
                    class="search-input"
                    placeholder="Search programs..."
                    oninput="drawPrograms()">

            </div>

            <div class="toolbar-right">

                <button
                    class="action-button"
                    onclick="showProgramForm()">
                    + Add Program / Offer
                </button>

            </div>

        </div>

        <div id="programFormArea"></div>

        <div id="programTableArea"></div>

    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Programs & Offers",
            "Manage affiliate programs, offers and commission rates.",
            content
        );

    drawPrograms();
}

function showProgramForm(id = "") {

    const item =
        getProgram(id);

    document
        .getElementById("programFormArea")
        .innerHTML = `

            <form
                class="janjua-form"
                onsubmit="saveProgram(event,'${id}')">

                <label>
                    Program / Offer Name
                    <input
                        id="programName"
                        required
                        value="${escapeHTML(item?.name || "")}">
                </label>

                <label>
                    Provider / Company
                    <select id="programProvider">

                        <option value="">
                            Select Provider
                        </option>

                        ${data.providers
                            .map(p => `
                                <option
                                    value="${p.id}"
                                    ${item?.providerId === p.id ? "selected":""}>
                                    ${escapeHTML(p.name)}
                                </option>
                            `).join("")
                        }

                    </select>
                </label>

                <label>
                    Category
                    <select id="programCategory">

                        ${data.categories
                            .filter(c => c.status !== "deleted")
                            .map(c => `
                                <option
                                    value="${c.id}"
                                    ${item?.categoryId === c.id ? "selected":""}>
                                    ${escapeHTML(c.name)}
                                </option>
                            `).join("")
                        }

                    </select>
                </label>

                <label>
                    Commission %
                    <input
                        id="programCommission"
                        type="number"
                        step="0.01"
                        min="0"
                        value="${item?.commissionRate ?? data.settings.defaultCommissionRate}">
                </label>

                <label class="full">
                    Affiliate / Offer URL
                    <input
                        id="programUrl"
                        type="url"
                        value="${escapeHTML(item?.affiliateUrl || "")}">
                </label>

                <label>
                    Status
                    <select id="programStatus">

                        <option
                            value="active"
                            ${item?.status === "active" ? "selected":""}>
                            Active
                        </option>

                        <option
                            value="inactive"
                            ${item?.status === "inactive" ? "selected":""}>
                            Inactive
                        </option>

                    </select>
                </label>

                <label>
                    Offer Type
                    <select id="programType">

                        <option
                            value="affiliate"
                            ${item?.type === "affiliate" ? "selected":""}>
                            Affiliate
                        </option>

                        <option
                            value="lead"
                            ${item?.type === "lead" ? "selected":""}>
                            Lead Generation
                        </option>

                        <option
                            value="sale"
                            ${item?.type === "sale" ? "selected":""}>
                            Sale
                        </option>

                        <option
                            value="service"
                            ${item?.type === "service" ? "selected":""}>
                            Service
                        </option>

                    </select>
                </label>

                <label class="full">
                    Description
                    <textarea
                        id="programDescription">${escapeHTML(item?.description || "")}</textarea>
                </label>

                <div class="form-actions">

                    <button
                        class="action-button"
                        type="submit">
                        Save Program
                    </button>

                    <button
                        type="button"
                        class="small-button"
                        onclick="cancelForm('programFormArea')">
                        Cancel
                    </button>

                </div>

            </form>
        `;
}

function saveProgram(event,id) {

    event.preventDefault();

    const obj = {

        name:
            document
                .getElementById("programName")
                .value
                .trim(),

        providerId:
            document
                .getElementById("programProvider")
                .value,

        categoryId:
            document
                .getElementById("programCategory")
                .value,

        commissionRate:
            Number(
                document
                    .getElementById("programCommission")
                    .value
            ),

        affiliateUrl:
            document
                .getElementById("programUrl")
                .value
                .trim(),

        status:
            document
                .getElementById("programStatus")
                .value,

        type:
            document
                .getElementById("programType")
                .value,

        description:
            document
                .getElementById("programDescription")
                .value
                .trim()
    };

    if (id) {

        Object.assign(
            getProgram(id),
            obj
        );

        showToast("Program updated.");

    } else {

        data.programs.push({

            id:createId("program"),
            ...obj,
            createdAt:new Date().toISOString()

        });

        showToast("Program added.");
    }

    saveData();

    document
        .getElementById("programFormArea")
        .innerHTML = "";

    drawPrograms();
}

function drawPrograms() {

    const search =
        document
            .getElementById("programSearch")
            ?.value
            .toLowerCase() || "";

    const rows =
        data.programs
            .filter(
                p =>
                    p.name
                        .toLowerCase()
                        .includes(search)
            )
            .map(p => {

                const provider =
                    getProvider(p.providerId);

                const category =
                    getCategory(p.categoryId);

                return `
                    <tr>

                        <td>
                            ${escapeHTML(p.name)}
                        </td>

                        <td>
                            ${escapeHTML(provider?.name || "-")}
                        </td>

                        <td>
                            ${escapeHTML(category?.name || "-")}
                        </td>

                        <td>
                            ${p.commissionRate}%
                        </td>

                        <td>
                            ${statusBadge(p.status)}
                        </td>

                        <td>

                            <button
                                class="small-button"
                                onclick="showProgramForm('${p.id}')">
                                Edit
                            </button>

                            ${
                                p.affiliateUrl
                                ?
                                `
                                    <button
                                        class="small-button dark"
                                        onclick="window.open('${escapeHTML(p.affiliateUrl)}','_blank')">
                                        Open
                                    </button>
                                `
                                :
                                ""
                            }

                            <button
                                class="small-button danger"
                                onclick="deleteProgram('${p.id}')">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            })
            .join("");

    document
        .getElementById("programTableArea")
        .innerHTML = `

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Program</th>
                            <th>Provider</th>
                            <th>Category</th>
                            <th>Commission</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                                <tr>
                                    <td colspan="6">
                                        No programs found.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}

function deleteProgram(id) {

    if (!confirm("Delete this program?")) {
        return;
    }

    data.programs =
        data.programs.filter(
            p => p.id !== id
        );

    saveData();

    drawPrograms();

    showToast("Program deleted.");
}


/* =========================================================
   PROMOTERS
========================================================= */

function renderPromoters() {

    const content = `

        <div class="module-toolbar">

            <div class="toolbar-left">

                <input
                    id="promoterSearch"
                    class="search-input"
                    placeholder="Search promoters..."
                    oninput="drawPromoters()">

            </div>

            <div class="toolbar-right">

                <button
                    class="action-button"
                    onclick="showPromoterForm()">
                    + Add Promoter
                </button>

            </div>

        </div>

        <div id="promoterFormArea"></div>

        <div id="promoterTableArea"></div>

    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Promoters / Workers",
            "Create promoter accounts and manage marketing workers.",
            content
        );

    drawPromoters();
}

function showPromoterForm(id = "") {

    const item =
        getPromoter(id);

    document
        .getElementById("promoterFormArea")
        .innerHTML = `

            <form
                class="janjua-form"
                onsubmit="savePromoter(event,'${id}')">

                <label>
                    Full Name
                    <input
                        id="promoterName"
                        required
                        value="${escapeHTML(item?.name || "")}">
                </label>

                <label>
                    Username
                    <input
                        id="promoterUsername"
                        required
                        value="${escapeHTML(item?.username || "")}">
                </label>

                <label>
                    Password
                    <input
                        id="promoterPassword"
                        type="text"
                        required="${id ? "false":"true"}"
                        value="${escapeHTML(item?.password || "")}">
                </label>

                <label>
                    Phone
                    <input
                        id="promoterPhone"
                        value="${escapeHTML(item?.phone || "")}">
                </label>

                <label>
                    Email
                    <input
                        id="promoterEmail"
                        type="email"
                        value="${escapeHTML(item?.email || "")}">
                </label>

                <label>
                    Status
                    <select id="promoterStatus">

                        <option
                            value="active"
                            ${item?.status === "active" ? "selected":""}>
                            Active
                        </option>

                        <option
                            value="inactive"
                            ${item?.status === "inactive" ? "selected":""}>
                            Inactive
                        </option>

                    </select>
                </label>

                <label class="full">
                    Notes
                    <textarea
                        id="promoterNotes">${escapeHTML(item?.notes || "")}</textarea>
                </label>

                <div class="form-actions">

                    <button
                        class="action-button"
                        type="submit">
                        Save Promoter
                    </button>

                    <button
                        type="button"
                        class="small-button"
                        onclick="cancelForm('promoterFormArea')">
                        Cancel
                    </button>

                </div>

            </form>
        `;
}

function savePromoter(event,id) {

    event.preventDefault();

    const username =
        document
            .getElementById("promoterUsername")
            .value
            .trim();

    const password =
        document
            .getElementById("promoterPassword")
            .value;

    const duplicate =
        data.promoters.find(
            p =>
                p.username === username &&
                p.id !== id
        );

    if (duplicate) {

        showToast(
            "Username already exists."
        );

        return;
    }

    const obj = {

        name:
            document
                .getElementById("promoterName")
                .value
                .trim(),

        username,

        password,

        phone:
            document
                .getElementById("promoterPhone")
                .value
                .trim(),

        email:
            document
                .getElementById("promoterEmail")
                .value
                .trim(),

        status:
            document
                .getElementById("promoterStatus")
                .value,

        notes:
            document
                .getElementById("promoterNotes")
                .value
                .trim()
    };

    if (id) {

        Object.assign(
            getPromoter(id),
            obj
        );

        showToast("Promoter updated.");

    } else {

        const promoter = {

            id:createId("promoter"),

            ...obj,

            code:
                "PROM_" +
                Math.random()
                    .toString(36)
                    .substring(2,8)
                    .toUpperCase(),

            createdAt:
                new Date().toISOString()

        };

        data.promoters.push(promoter);

        showToast("Promoter created.");
    }

    saveData();

    document
        .getElementById("promoterFormArea")
        .innerHTML = "";

    drawPromoters();
}

function drawPromoters() {

    const search =
        document
            .getElementById("promoterSearch")
            ?.value
            .toLowerCase() || "";

    const rows =
        data.promoters
            .filter(
                p =>
                    p.name
                        .toLowerCase()
                        .includes(search) ||
                    p.username
                        .toLowerCase()
                        .includes(search) ||
                    p.code
                        .toLowerCase()
                        .includes(search)
            )
            .map(p => {

                const links =
                    data.trackingLinks.filter(
                        l =>
                            l.promoterId === p.id
                    ).length;

                return `
                    <tr>

                        <td>
                            ${escapeHTML(p.name)}
                        </td>

                        <td>
                            ${escapeHTML(p.username)}
                        </td>

                        <td>
                            ${escapeHTML(p.code)}
                        </td>

                        <td>
                            ${links}
                        </td>

                        <td>
                            ${statusBadge(p.status)}
                        </td>

                        <td>

                            <button
                                class="small-button"
                                onclick="showPromoterForm('${p.id}')">
                                Edit
                            </button>

                            <button
                                class="small-button"
                                onclick="showAssignmentForm('${p.id}')">
                                Assign Programs
                            </button>

                            <button
                                class="small-button danger"
                                onclick="deletePromoter('${p.id}')">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            })
            .join("");

    document
        .getElementById("promoterTableArea")
        .innerHTML = `

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Code</th>
                            <th>Links</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                                <tr>
                                    <td colspan="6">
                                        No promoters found.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}

function deletePromoter(id) {

    if (!confirm("Delete this promoter?")) {
        return;
    }

    data.promoters =
        data.promoters.filter(
            p => p.id !== id
        );

    data.assignments =
        data.assignments.filter(
            a => a.promoterId !== id
        );

    saveData();

    drawPromoters();

    showToast("Promoter deleted.");
}


/* =========================================================
   ASSIGN PROGRAMS
========================================================= */

function showAssignmentForm(promoterId) {

    const promoter =
        getPromoter(promoterId);

    if (!promoter) return;

    const assigned =
        data.assignments
            .filter(
                a =>
                    a.promoterId === promoterId
            )
            .map(a => a.programId);

    const html = `

        <div class="janjua-form">

            <div class="full">

                <strong>
                    Assign Programs to:
                    ${escapeHTML(promoter.name)}
                </strong>

            </div>

            ${
                data.programs.length
                ?
                data.programs.map(program => `

                    <label>

                        <span>

                            <input
                                type="checkbox"
                                value="${program.id}"
                                class="assign-program"
                                ${assigned.includes(program.id) ? "checked":""}>

                            ${escapeHTML(program.name)}

                        </span>

                    </label>

                `).join("")
                :
                `
                    <div class="full">
                        No programs available.
                    </div>
                `
            }

            <div class="form-actions">

                <button
                    class="action-button"
                    onclick="saveAssignments('${promoterId}')">
                    Save Assignments
                </button>

            </div>

        </div>
    `;

    document
        .getElementById("promoterFormArea")
        .innerHTML = html;
}

function saveAssignments(promoterId) {

    const checked =
        [
            ...document.querySelectorAll(
                ".assign-program:checked"
            )
        ].map(
            input => input.value
        );

    data.assignments =
        data.assignments.filter(
            a =>
                a.promoterId !== promoterId
        );

    checked.forEach(programId => {

        data.assignments.push({

            id:createId("assignment"),

            promoterId,

            programId,

            createdAt:
                new Date().toISOString()

        });

    });

    saveData();

    document
        .getElementById("promoterFormArea")
        .innerHTML = "";

    showToast(
        "Program assignments saved."
    );
}


/* =========================================================
   TRACKING LINKS
========================================================= */

function renderTracking() {

    const content = `

        <div class="module-toolbar">

            <div class="toolbar-left">

                <input
                    id="trackingSearch"
                    class="search-input"
                    placeholder="Search tracking links..."
                    oninput="drawTracking()">

            </div>

            <div class="toolbar-right">

                <button
                    class="action-button"
                    onclick="showTrackingForm()">
                    + Create Tracking Link
                </button>

                <button
                    class="action-button"
                    onclick="showSocialLinkForm()">
                    + Social Link
                </button>

            </div>

        </div>

        <div id="trackingFormArea"></div>

        <div id="trackingTableArea"></div>

        <hr style="margin:30px 0;border:0;border-top:1px solid #e5e9ef;">

        <h3>
            Social Media Automation Links
        </h3>

        <div id="socialLinksArea"></div>

    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Tracking Links",
            "Create unique promoter tracking and social links.",
            content
        );

    drawTracking();

    drawSocialLinks();
}

function showTrackingForm() {

    const programs =
        data.programs.filter(
            p => p.status === "active"
        );

    const promoters =
        data.promoters.filter(
            p => p.status === "active"
        );

    document
        .getElementById("trackingFormArea")
        .innerHTML = `

            <form
                class="janjua-form"
                onsubmit="createTrackingLink(event)">

                <label>
                    Program
                    <select
                        id="trackingProgram"
                        required>

                        <option value="">
                            Select Program
                        </option>

                        ${programs.map(p => `
                            <option value="${p.id}">
                                ${escapeHTML(p.name)}
                            </option>
                        `).join("")}

                    </select>
                </label>

                <label>
                    Promoter
                    <select
                        id="trackingPromoter"
                        required>

                        <option value="">
                            Select Promoter
                        </option>

                        ${promoters.map(p => `
                            <option value="${p.id}">
                                ${escapeHTML(p.name)}
                            </option>
                        `).join("")}

                    </select>
                </label>

                <div class="form-actions">

                    <button
                        class="action-button"
                        type="submit">
                        Generate Link
                    </button>

                    <button
                        class="small-button"
                        type="button"
                        onclick="cancelForm('trackingFormArea')">
                        Cancel
                    </button>

                </div>

            </form>
        `;
}

function createTrackingLink(event) {

    event.preventDefault();

    const programId =
        document
            .getElementById("trackingProgram")
            .value;

    const promoterId =
        document
            .getElementById("trackingPromoter")
            .value;

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

    data.trackingLinks.push({

        id:createId("tracking"),

        code,

        url,

        programId,

        promoterId,

        clicks:0,

        createdAt:
            new Date().toISOString(),

        status:"active"

    });

    saveData();

    document
        .getElementById("trackingFormArea")
        .innerHTML = "";

    drawTracking();

    showToast(
        "Tracking link created."
    );
}

function drawTracking() {

    const search =
        document
            .getElementById("trackingSearch")
            ?.value
            .toLowerCase() || "";

    const rows =
        data.trackingLinks
            .filter(
                l => {

                    const promoter =
                        getPromoter(l.promoterId);

                    const program =
                        getProgram(l.programId);

                    return (
                        l.code
                            .toLowerCase()
                            .includes(search) ||

                        promoter?.name
                            .toLowerCase()
                            .includes(search) ||

                        program?.name
                            .toLowerCase()
                            .includes(search)
                    );

                }
            )
            .map(l => {

                const promoter =
                    getPromoter(l.promoterId);

                const program =
                    getProgram(l.programId);

                return `
                    <tr>

                        <td>
                            ${escapeHTML(l.code)}
                        </td>

                        <td>
                            ${escapeHTML(program?.name || "-")}
                        </td>

                        <td>
                            ${escapeHTML(promoter?.name || "-")}
                        </td>

                        <td>
                            ${l.clicks || 0}
                        </td>

                        <td>
                            ${statusBadge(l.status)}
                        </td>

                        <td>

                            <button
                                class="small-button"
                                onclick="copyTrackingLink('${l.id}')">
                                Copy
                            </button>

                            <button
                                class="small-button"
                                onclick="testTrackingLink('${l.id}')">
                                Test
                            </button>

                            <button
                                class="small-button danger"
                                onclick="deleteTrackingLink('${l.id}')">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            })
            .join("");

    document
        .getElementById("trackingTableArea")
        .innerHTML = `

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Code</th>
                            <th>Program</th>
                            <th>Promoter</th>
                            <th>Clicks</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                                <tr>
                                    <td colspan="6">
                                        No tracking links.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}

function copyTrackingLink(id) {

    const link =
        getTracking(id);

    if (!link) return;

    navigator.clipboard
        .writeText(link.url)
        .then(
            () => showToast("Link copied.")
        )
        .catch(
            () => prompt("Copy link:",link.url)
        );
}

function testTrackingLink(id) {

    const link =
        getTracking(id);

    if (!link) return;

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
            l => l.id !== id
        );

    saveData();

    drawTracking();

    showToast("Tracking link deleted.");
}


/* =========================================================
   SOCIAL MEDIA LINKS
========================================================= */

function showSocialLinkForm() {

    const programs =
        data.programs.filter(
            p => p.status === "active"
        );

    document
        .getElementById("trackingFormArea")
        .innerHTML = `

            <form
                class="janjua-form"
                onsubmit="createSocialMediaLink(event)">

                <label>
                    Social Platform

                    <select id="socialPlatform">

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

                        <option value="Other">
                            Other
                        </option>

                    </select>

                </label>

                <label>
                    Program
                    <select
                        id="socialProgram"
                        required>

                        <option value="">
                            Select Program
                        </option>

                        ${programs.map(p => `
                            <option value="${p.id}">
                                ${escapeHTML(p.name)}
                            </option>
                        `).join("")}

                    </select>
                </label>

                <label class="full">
                    Original Social / Affiliate URL

                    <input
                        id="socialUrl"
                        type="url"
                        required
                        placeholder="https://example.com/...">

                </label>

                <div class="form-actions">

                    <button
                        class="action-button"
                        type="submit">
                        Create Social Link
                    </button>

                    <button
                        type="button"
                        class="small-button"
                        onclick="cancelForm('trackingFormArea')">
                        Cancel
                    </button>

                </div>

            </form>
        `;
}

function createSocialMediaLink(event) {

    event.preventDefault();

    const platform =
        document
            .getElementById("socialPlatform")
            .value;

    const programId =
        document
            .getElementById("socialProgram")
            .value;

    const originalUrl =
        document
            .getElementById("socialUrl")
            .value
            .trim();

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

        id:createId("social"),

        code,

        url,

        originalUrl,

        programId,

        platform,

        clicks:0,

        status:"active",

        createdAt:
            new Date().toISOString()

    });

    saveData();

    document
        .getElementById("trackingFormArea")
        .innerHTML = "";

    drawSocialLinks();

    showToast(
        "Social link created."
    );
}

function drawSocialLinks() {

    const area =
        document.getElementById(
            "socialLinksArea"
        );

    if (!area) return;

    if (!data.socialLinks.length) {

        area.innerHTML =
            "<p>No social links yet.</p>";

        return;
    }

    area.innerHTML =
        data.socialLinks
            .map(link => {

                const program =
                    getProgram(link.programId);

                return `

                    <div class="link-box">

                        <strong>
                            ${escapeHTML(link.platform)}
                        </strong>

                        —
                        ${escapeHTML(program?.name || "-")}

                        <br>

                        <small>
                            Code:
                            ${escapeHTML(link.code)}
                        </small>

                        <br><br>

                        <small>
                            ${escapeHTML(link.url)}
                        </small>

                        <br>

                        Clicks:
                        ${link.clicks || 0}

                        <br><br>

                        <button
                            class="small-button"
                            onclick="copySocialLink('${link.id}')">
                            Copy
                        </button>

                        <button
                            class="small-button"
                            onclick="testSocialLink('${link.id}')">
                            Test
                        </button>

                        <button
                            class="small-button danger"
                            onclick="deleteSocialLink('${link.id}')">
                            Delete
                        </button>

                    </div>
                `;

            })
            .join("");
}

function copySocialLink(id) {

    const link =
        data.socialLinks.find(
            l => l.id === id
        );

    if (!link) return;

    navigator.clipboard
        .writeText(link.url)
        .then(
            () => showToast("Social link copied.")
        )
        .catch(
            () => prompt("Copy link:",link.url)
        );
}

function testSocialLink(id) {

    const link =
        data.socialLinks.find(
            l => l.id === id
        );

    if (!link) return;

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
            l => l.id !== id
        );

    saveData();

    drawSocialLinks();

    showToast("Social link deleted.");
}


/* =========================================================
   ORDERS
========================================================= */

function renderOrders() {

    const content = `

        <div class="module-toolbar">

            <div class="toolbar-left">

                <input
                    id="orderSearch"
                    class="search-input"
                    placeholder="Search orders..."
                    oninput="drawOrders()">

                <select
                    id="orderStatusFilter"
                    class="filter-select"
                    onchange="drawOrders()">

                    <option value="">
                        All Status
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                    <option value="confirmed">
                        Confirmed
                    </option>

                    <option value="completed">
                        Completed
                    </option>

                    <option value="cancelled">
                        Cancelled
                    </option>

                </select>

            </div>

            <div class="toolbar-right">

                <button
                    class="action-button"
                    onclick="showOrderForm()">
                    + Add Order
                </button>

            </div>

        </div>

        <div id="orderFormArea"></div>

        <div id="orderTableArea"></div>

        <hr style="margin:30px 0;border:0;border-top:1px solid #e5e9ef;">

        <h3>
            Click Activity
        </h3>

        <div id="clickTableArea"></div>

    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Orders & Clicks",
            "Track customer orders and marketing clicks.",
            content
        );

    drawOrders();

    drawClicks();
}

function showOrderForm() {

    document
        .getElementById("orderFormArea")
        .innerHTML = `

            <form
                class="janjua-form"
                onsubmit="saveOrder(event)">

                <label>
                    Customer Name
                    <input
                        id="orderCustomer"
                        required>
                </label>

                <label>
                    Customer Phone
                    <input
                        id="orderPhone">
                </label>

                <label>
                    Program
                    <select
                        id="orderProgram"
                        required>

                        <option value="">
                            Select Program
                        </option>

                        ${data.programs.map(p => `
                            <option value="${p.id}">
                                ${escapeHTML(p.name)}
                            </option>
                        `).join("")}

                    </select>
                </label>

                <label>
                    Promoter
                    <select id="orderPromoter">

                        <option value="">
                            None
                        </option>

                        ${data.promoters.map(p => `
                            <option value="${p.id}">
                                ${escapeHTML(p.name)}
                            </option>
                        `).join("")}

                    </select>
                </label>

                <label>
                    Amount
                    <input
                        id="orderAmount"
                        type="number"
                        step="0.01"
                        min="0"
                        required>
                </label>

                <label>
                    Status
                    <select id="orderStatus">

                        <option value="pending">
                            Pending
                        </option>

                        <option value="confirmed">
                            Confirmed
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>

                    </select>
                </label>

                <label>
                    Tracking Code
                    <input
                        id="orderTracking"
                        placeholder="TRK_...">
                </label>

                <label>
                    Notes
                    <input id="orderNotes">
                </label>

                <div class="form-actions">

                    <button
                        class="action-button"
                        type="submit">
                        Save Order
                    </button>

                    <button
                        class="small-button"
                        type="button"
                        onclick="cancelForm('orderFormArea')">
                        Cancel
                    </button>

                </div>

            </form>
        `;
}

function saveOrder(event) {

    event.preventDefault();

    const programId =
        document
            .getElementById("orderProgram")
            .value;

    const promoterId =
        document
            .getElementById("orderPromoter")
            .value;

    const amount =
        Number(
            document
                .getElementById("orderAmount")
                .value
        );

    const status =
        document
            .getElementById("orderStatus")
            .value;

    const order = {

        id:createId("order"),

        orderNumber:
            "ORD-" +
            Date.now(),

        customer:
            document
                .getElementById("orderCustomer")
                .value
                .trim(),

        phone:
            document
                .getElementById("orderPhone")
                .value
                .trim(),

        programId,

        promoterId,

        amount,

        status,

        trackingCode:
            document
                .getElementById("orderTracking")
                .value
                .trim(),

        notes:
            document
                .getElementById("orderNotes")
                .value
                .trim(),

        createdAt:
            new Date().toISOString()

    };

    data.orders.push(order);

    if (
        status === "confirmed" ||
        status === "completed"
    ) {

        createOrUpdateCommission(order);
    }

    saveData();

    document
        .getElementById("orderFormArea")
        .innerHTML = "";

    drawOrders();

    showToast("Order saved.");
}

function createOrUpdateCommission(order) {

    if (!order.promoterId) {
        return;
    }

    const program =
        getProgram(order.programId);

    const rate =
        Number(
            program?.commissionRate ??
            data.settings.defaultCommissionRate
        );

    const amount =
        Number(order.amount || 0) *
        rate /
        100;

    const existing =
        data.commissions.find(
            c =>
                c.orderId === order.id
        );

    if (existing) {

        existing.amount = amount;
        existing.rate = rate;
        existing.status = "pending";

    } else {

        data.commissions.push({

            id:createId("commission"),

            orderId:order.id,

            promoterId:order.promoterId,

            programId:order.programId,

            rate,

            amount,

            status:"pending",

            createdAt:
                new Date().toISOString()

        });

    }
}

function drawOrders() {

    const search =
        document
            .getElementById("orderSearch")
            ?.value
            .toLowerCase() || "";

    const statusFilter =
        document
            .getElementById("orderStatusFilter")
            ?.value || "";

    const rows =
        data.orders
            .filter(o => {

                const matchSearch =
                    !search ||
                    (
                        o.orderNumber +
                        " " +
                        o.customer +
                        " " +
                        o.phone
                    )
                    .toLowerCase()
                    .includes(search);

                const matchStatus =
                    !statusFilter ||
                    o.status === statusFilter;

                return (
                    matchSearch &&
                    matchStatus
                );

            })
            .map(o => {

                const program =
                    getProgram(o.programId);

                const promoter =
                    getPromoter(o.promoterId);

                return `
                    <tr>

                        <td>
                            ${escapeHTML(o.orderNumber)}
                        </td>

                        <td>
                            ${escapeHTML(o.customer)}
                        </td>

                        <td>
                            ${escapeHTML(program?.name || "-")}
                        </td>

                        <td>
                            ${escapeHTML(promoter?.name || "-")}
                        </td>

                        <td>
                            ${formatMoney(o.amount)}
                        </td>

                        <td>
                            ${statusBadge(o.status)}
                        </td>

                        <td>

                            <button
                                class="small-button success"
                                onclick="confirmOrder('${o.id}')">
                                Confirm
                            </button>

                            <button
                                class="small-button"
                                onclick="completeOrder('${o.id}')">
                                Complete
                            </button>

                            <button
                                class="small-button danger"
                                onclick="cancelOrder('${o.id}')">
                                Cancel
                            </button>

                        </td>

                    </tr>
                `;

            })
            .join("");

    document
        .getElementById("orderTableArea")
        .innerHTML = `

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Order</th>
                            <th>Customer</th>
                            <th>Program</th>
                            <th>Promoter</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                                <tr>
                                    <td colspan="7">
                                        No orders found.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}

function updateOrderStatus(id,status) {

    const order =
        data.orders.find(
            o => o.id === id
        );

    if (!order) return;

    order.status = status;

    if (
        status === "confirmed" ||
        status === "completed"
    ) {

        createOrUpdateCommission(order);
    }

    saveData();

    drawOrders();

    showToast(
        "Order status updated."
    );
}

function confirmOrder(id) {

    updateOrderStatus(
        id,
        "confirmed"
    );
}

function completeOrder(id) {

    updateOrderStatus(
        id,
        "completed"
    );
}

function cancelOrder(id) {

    updateOrderStatus(
        id,
        "cancelled"
    );
}

function drawClicks() {

    const rows =
        [...data.clicks]
            .sort(
                (a,b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0,100)
            .map(click => {

                const program =
                    getProgram(click.programId);

                const promoter =
                    getPromoter(click.promoterId);

                return `
                    <tr>

                        <td>
                            ${escapeHTML(click.type || "tracking")}
                        </td>

                        <td>
                            ${escapeHTML(click.code || click.socialCode || "-")}
                        </td>

                        <td>
                            ${escapeHTML(program?.name || "-")}
                        </td>

                        <td>
                            ${escapeHTML(promoter?.name || "-")}
                        </td>

                        <td>
                            ${new Date(click.createdAt).toLocaleString()}
                        </td>

                    </tr>
                `;

            })
            .join("");

    document
        .getElementById("clickTableArea")
        .innerHTML = `

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Type</th>
                            <th>Code</th>
                            <th>Program</th>
                            <th>Promoter</th>
                            <th>Date</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            rows ||
                            `
                                <tr>
                                    <td colspan="5">
                                        No clicks recorded.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}


/* =========================================================
   PAYMENTS / COMMISSIONS
========================================================= */

function renderPayments() {

    const total =
        data.commissions
            .reduce(
                (sum,c) =>
                    sum + Number(c.amount || 0),
                0
            );

    const pending =
        data.commissions
            .filter(
                c => c.status === "pending"
            )
            .reduce(
                (sum,c) =>
                    sum + Number(c.amount || 0),
                0
            );

    const paid =
        data.commissions
            .filter(
                c => c.status === "paid"
            )
            .reduce(
                (sum,c) =>
                    sum + Number(c.amount || 0),
                0
            );

    const content = `

        <div class="report-grid">

            <div class="report-card">
                <h4>Total Commission</h4>
                <strong>${formatMoney(total)}</strong>
            </div>

            <div class="report-card">
                <h4>Pending</h4>
                <strong>${formatMoney(pending)}</strong>
            </div>

            <div class="report-card">
                <h4>Paid</h4>
                <strong>${formatMoney(paid)}</strong>
            </div>

        </div>

        <div class="table-wrapper">

            <table class="janjua-table">

                <thead>

                    <tr>
                        <th>Promoter</th>
                        <th>Program</th>
                        <th>Order</th>
                        <th>Rate</th>
                        <th>Commission</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    ${
                        data.commissions
                            .map(c => {

                                const promoter =
                                    getPromoter(c.promoterId);

                                const program =
                                    getProgram(c.programId);

                                const order =
                                    data.orders.find(
                                        o =>
                                            o.id === c.orderId
                                    );

                                return `
                                    <tr>

                                        <td>
                                            ${escapeHTML(promoter?.name || "-")}
                                        </td>

                                        <td>
                                            ${escapeHTML(program?.name || "-")}
                                        </td>

                                        <td>
                                            ${escapeHTML(order?.orderNumber || "-")}
                                        </td>

                                        <td>
                                            ${c.rate}%
                                        </td>

                                        <td>
                                            ${formatMoney(c.amount)}
                                        </td>

                                        <td>
                                            ${statusBadge(c.status)}
                                        </td>

                                        <td>

                                            ${
                                                c.status === "pending"
                                                ?
                                                `
                                                    <button
                                                        class="small-button success"
                                                        onclick="markCommissionPaid('${c.id}')">
                                                        Mark Paid
                                                    </button>
                                                `
                                                :
                                                "Paid"
                                            }

                                        </td>

                                    </tr>
                                `;

                            })
                            .join("")
                        ||
                        `
                            <tr>
                                <td colspan="7">
                                    No commissions yet.
                                </td>
                            </tr>
                        `
                    }

                </tbody>

            </table>

        </div>

        <br>

        <h3>
            Payment History
        </h3>

        <div class="table-wrapper">

            <table class="janjua-table">

                <thead>

                    <tr>
                        <th>Promoter</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Reference</th>
                    </tr>

                </thead>

                <tbody>

                    ${
                        data.payments
                            .map(payment => {

                                const promoter =
                                    getPromoter(
                                        payment.promoterId
                                    );

                                return `
                                    <tr>

                                        <td>
                                            ${escapeHTML(promoter?.name || "-")}
                                        </td>

                                        <td>
                                            ${formatMoney(payment.amount)}
                                        </td>

                                        <td>
                                            ${new Date(payment.createdAt).toLocaleString()}
                                        </td>

                                        <td>
                                            ${escapeHTML(payment.reference || "-")}
                                        </td>

                                    </tr>
                                `;

                            })
                            .join("")
                        ||
                        `
                            <tr>
                                <td colspan="4">
                                    No payment history.
                                </td>
                            </tr>
                        `
                    }

                </tbody>

            </table>

        </div>
    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Commission & Payments",
            "Manage promoter commissions and payment history.",
            content
        );
}

function markCommissionPaid(id) {

    const commission =
        data.commissions.find(
            c => c.id === id
        );

    if (!commission) return;

    commission.status = "paid";

    data.payments.push({

        id:createId("payment"),

        promoterId:
            commission.promoterId,

        commissionId:id,

        amount:
            commission.amount,

        reference:
            "PAY-" +
            Date.now(),

        createdAt:
            new Date().toISOString()

    });

    saveData();

    renderPayments();

    showToast(
        "Commission marked as paid."
    );
}


/* =========================================================
   REPORTS
========================================================= */

function renderReports() {

    const confirmed =
        data.orders.filter(
            o =>
                o.status === "confirmed" ||
                o.status === "completed"
        );

    const totalSales =
        confirmed.reduce(
            (sum,o) =>
                sum + Number(o.amount || 0),
            0
        );

    const totalCommission =
        data.commissions.reduce(
            (sum,c) =>
                sum + Number(c.amount || 0),
            0
        );

    const conversion =
        data.clicks.length
            ?
            (
                confirmed.length /
                data.clicks.length *
                100
            ).toFixed(2)
            :
            "0.00";

    const programPerformance =
        data.programs
            .map(program => {

                const orders =
                    data.orders.filter(
                        o =>
                            o.programId === program.id
                    );

                const sales =
                    orders
                        .filter(
                            o =>
                                o.status === "confirmed" ||
                                o.status === "completed"
                        )
                        .reduce(
                            (sum,o) =>
                                sum + Number(o.amount || 0),
                            0
                        );

                const clicks =
                    data.clicks.filter(
                        c =>
                            c.programId === program.id
                    ).length;

                return {

                    name:program.name,

                    clicks,

                    orders:orders.length,

                    sales

                };

            });

    const promoterPerformance =
        data.promoters
            .map(promoter => {

                const clicks =
                    data.clicks.filter(
                        c =>
                            c.promoterId === promoter.id
                    ).length;

                const orders =
                    data.orders.filter(
                        o =>
                            o.promoterId === promoter.id
                    ).length;

                const commission =
                    data.commissions
                        .filter(
                            c =>
                                c.promoterId === promoter.id
                        )
                        .reduce(
                            (sum,c) =>
                                sum + Number(c.amount || 0),
                            0
                        );

                return {

                    name:promoter.name,

                    clicks,

                    orders,

                    commission

                };

            });

    const content = `

        <div class="report-grid">

            <div class="report-card">
                <h4>Total Clicks</h4>
                <strong>${data.clicks.length}</strong>
            </div>

            <div class="report-card">
                <h4>Total Orders</h4>
                <strong>${data.orders.length}</strong>
            </div>

            <div class="report-card">
                <h4>Conversion</h4>
                <strong>${conversion}%</strong>
            </div>

            <div class="report-card">
                <h4>Total Sales</h4>
                <strong>${formatMoney(totalSales)}</strong>
            </div>

            <div class="report-card">
                <h4>Total Commission</h4>
                <strong>${formatMoney(totalCommission)}</strong>
            </div>

            <div class="report-card">
                <h4>Active Promoters</h4>
                <strong>
                    ${
                        data.promoters.filter(
                            p =>
                                p.status === "active"
                        ).length
                    }
                </strong>
            </div>

        </div>


        <div class="module-toolbar">

            <button
                class="action-button"
                onclick="exportOrdersCSV()">
                Export Orders CSV
            </button>

            <button
                class="action-button"
                onclick="exportCommissionsCSV()">
                Export Commission CSV
            </button>

            <button
                class="action-button"
                onclick="exportAllData()">
                Backup All Data
            </button>

        </div>


        <h3>
            Program Performance
        </h3>

        <div class="table-wrapper">

            <table class="janjua-table">

                <thead>

                    <tr>
                        <th>Program</th>
                        <th>Clicks</th>
                        <th>Orders</th>
                        <th>Sales</th>
                    </tr>

                </thead>

                <tbody>

                    ${
                        programPerformance
                            .map(p => `
                                <tr>

                                    <td>
                                        ${escapeHTML(p.name)}
                                    </td>

                                    <td>
                                        ${p.clicks}
                                    </td>

                                    <td>
                                        ${p.orders}
                                    </td>

                                    <td>
                                        ${formatMoney(p.sales)}
                                    </td>

                                </tr>
                            `)
                            .join("")
                        ||
                        `
                            <tr>
                                <td colspan="4">
                                    No program data.
                                </td>
                            </tr>
                        `
                    }

                </tbody>

            </table>

        </div>


        <br>


        <h3>
            Promoter Performance
        </h3>

        <div class="table-wrapper">

            <table class="janjua-table">

                <thead>

                    <tr>
                        <th>Promoter</th>
                        <th>Clicks</th>
                        <th>Orders</th>
                        <th>Commission</th>
                    </tr>

                </thead>

                <tbody>

                    ${
                        promoterPerformance
                            .map(p => `
                                <tr>

                                    <td>
                                        ${escapeHTML(p.name)}
                                    </td>

                                    <td>
                                        ${p.clicks}
                                    </td>

                                    <td>
                                        ${p.orders}
                                    </td>

                                    <td>
                                        ${formatMoney(p.commission)}
                                    </td>

                                </tr>
                            `)
                            .join("")
                        ||
                        `
                            <tr>
                                <td colspan="4">
                                    No promoter data.
                                </td>
                            </tr>
                        `
                    }

                </tbody>

            </table>

        </div>

    `;

    document
        .getElementById("moduleContent")
        .innerHTML =
        moduleShell(
            "Reports & Analytics",
            "Performance, sales, clicks and promoter analytics.",
            content
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

    if (!code) return;

    const link =
        data.trackingLinks.find(
            l =>
                l.code === code &&
                l.status === "active"
        );

    if (!link) return;

    link.clicks =
        Number(link.clicks || 0) + 1;

    const program =
        getProgram(link.programId);

    data.clicks.push({

        id:createId("click"),

        type:"tracking",

        code:link.code,

        trackingLinkId:link.id,

        programId:link.programId,

        promoterId:link.promoterId,

        createdAt:
            new Date().toISOString()

    });

    saveData();

    showPublicLandingMessage(
        "tracking",
        link,
        program
    );
}

function handlePublicSocialLink() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const code =
        params.get("social");

    if (!code) return;

    const link =
        data.socialLinks.find(
            l =>
                l.code === code &&
                l.status === "active"
        );

    if (!link) return;

    link.clicks =
        Number(link.clicks || 0) + 1;

    data.clicks.push({

        id:createId("socialclick"),

        type:"social",

        socialCode:link.code,

        socialLinkId:link.id,

        programId:link.programId,

        platform:link.platform,

        createdAt:
            new Date().toISOString()

    });

    saveData();

    const program =
        getProgram(link.programId);

    showPublicLandingMessage(
        "social",
        link,
        program
    );
}

function showPublicLandingMessage(
    type,
    link,
    program
) {

    const app =
        document.getElementById(
            "appScreen"
        );

    if (!app) return;

    app.classList.remove("hidden");

    const login =
        document.getElementById(
            "loginScreen"
        );

    login.classList.add("hidden");

    document
        .getElementById("adminDashboard")
        .classList.add("hidden");

    document
        .getElementById("promoterDashboard")
        .classList.add("hidden");

    document
        .getElementById("moduleArea")
        .classList.add("hidden");

    const content =
        document.querySelector(
            ".container"
        );

    content.innerHTML = `

        <section
            style="
                max-width:700px;
                margin:60px auto;
                background:white;
                padding:35px;
                border-radius:20px;
                text-align:center;
                box-shadow:0 15px 40px rgba(0,0,0,.12);
            ">

            <div style="font-size:50px;">
                🎯
            </div>

            <h2>
                ${escapeHTML(program?.name || "JANJUA Offer")}
            </h2>

            <p>
                ${escapeHTML(program?.description || "Marketing offer")}
            </p>

            <p>
                You reached this offer through
                <strong>
                    ${escapeHTML(type === "social" ? link.platform : "JANJUA Tracking")}
                </strong>.
            </p>

            ${
                link.originalUrl || program?.affiliateUrl
                ?
                `
                    <button
                        class="action-button"
                        onclick="window.location.href='${escapeHTML(link.originalUrl || program.affiliateUrl)}'">
                        CONTINUE
                    </button>
                `
                :
                `
                    <p>
                        Offer link is not configured yet.
                    </p>
                `
            }

        </section>
    `;
}


/* =========================================================
   PROMOTER DASHBOARD
========================================================= */

function renderPromoterDashboard() {

    const promoterId =
        currentUser.id;

    const promoter =
        getPromoter(promoterId);

    if (!promoter) return;

    const clicks =
        data.clicks.filter(
            c =>
                c.promoterId === promoterId
        ).length;

    const orders =
        data.orders.filter(
            o =>
                o.promoterId === promoterId
        );

    const sales =
        orders
            .filter(
                o =>
                    o.status === "confirmed" ||
                    o.status === "completed"
            )
            .reduce(
                (sum,o) =>
                    sum + Number(o.amount || 0),
                0
            );

    const commissions =
        data.commissions.filter(
            c =>
                c.promoterId === promoterId
        );

    const commissionTotal =
        commissions.reduce(
            (sum,c) =>
                sum + Number(c.amount || 0),
            0
        );

    document
        .getElementById(
            "promoterWelcomeText"
        )
        .textContent =
        "Welcome, " +
        promoter.name +
        " — Code: " +
        promoter.code;

    document
        .getElementById(
            "promoterStats"
        )
        .innerHTML = `

            <div class="stat-card">
                <small>My Clicks</small>
                <strong>${clicks}</strong>
            </div>

            <div class="stat-card">
                <small>My Orders</small>
                <strong>${orders.length}</strong>
            </div>

            <div class="stat-card">
                <small>My Sales</small>
                <strong>${formatMoney(sales)}</strong>
            </div>

            <div class="stat-card">
                <small>Commission</small>
                <strong>${formatMoney(commissionTotal)}</strong>
            </div>
        `;

    const links =
        data.trackingLinks.filter(
            l =>
                l.promoterId === promoterId
        );

    const assigned =
        data.assignments
            .filter(
                a =>
                    a.promoterId === promoterId
            );

    document
        .getElementById(
            "promoterContent"
        )
        .innerHTML = `

            <h3>
                My Tracking Links
            </h3>

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Code</th>
                            <th>Program</th>
                            <th>Clicks</th>
                            <th>Link</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            links.map(link => {

                                const program =
                                    getProgram(link.programId);

                                return `
                                    <tr>

                                        <td>
                                            ${escapeHTML(link.code)}
                                        </td>

                                        <td>
                                            ${escapeHTML(program?.name || "-")}
                                        </td>

                                        <td>
                                            ${link.clicks || 0}
                                        </td>

                                        <td>

                                            <button
                                                class="small-button"
                                                onclick="copyTrackingLink('${link.id}')">
                                                Copy
                                            </button>

                                        </td>

                                    </tr>
                                `;

                            }).join("")
                            ||
                            `
                                <tr>
                                    <td colspan="4">
                                        No tracking links assigned yet.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>


            <br>


            <h3>
                Assigned Programs
            </h3>

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Program</th>
                            <th>Category</th>
                            <th>Commission</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            assigned.map(a => {

                                const program =
                                    getProgram(a.programId);

                                const category =
                                    getCategory(
                                        program?.categoryId
                                    );

                                return `
                                    <tr>

                                        <td>
                                            ${escapeHTML(program?.name || "-")}
                                        </td>

                                        <td>
                                            ${escapeHTML(category?.name || "-")}
                                        </td>

                                        <td>
                                            ${program?.commissionRate || 0}%
                                        </td>

                                    </tr>
                                `;

                            }).join("")
                            ||
                            `
                                <tr>
                                    <td colspan="3">
                                        No programs assigned.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>


            <br>


            <h3>
                My Commission
            </h3>

            <div class="table-wrapper">

                <table class="janjua-table">

                    <thead>

                        <tr>
                            <th>Program</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            commissions.map(c => {

                                const program =
                                    getProgram(c.programId);

                                return `
                                    <tr>

                                        <td>
                                            ${escapeHTML(program?.name || "-")}
                                        </td>

                                        <td>
                                            ${formatMoney(c.amount)}
                                        </td>

                                        <td>
                                            ${statusBadge(c.status)}
                                        </td>

                                    </tr>
                                `;

                            }).join("")
                            ||
                            `
                                <tr>
                                    <td colspan="3">
                                        No commission yet.
                                    </td>
                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
}


/* =========================================================
   CSV EXPORT
========================================================= */

function downloadFile(
    filename,
    content,
    type = "text/plain"
) {

    const blob =
        new Blob(
            [content],
            {type}
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);
}

function csvEscape(value) {

    const text =
        String(value ?? "");

    return '"' +
        text.replaceAll('"','""') +
        '"';
}

function exportOrdersCSV() {

    const rows = [

        [
            "Order",
            "Customer",
            "Phone",
            "Program",
            "Promoter",
            "Amount",
            "Status",
            "Date"
        ]

    ];

    data.orders.forEach(order => {

        rows.push([

            order.orderNumber,

            order.customer,

            order.phone,

            getProgram(order.programId)?.name || "",

            getPromoter(order.promoterId)?.name || "",

            order.amount,

            order.status,

            order.createdAt

        ]);

    });

    const csv =
        rows
            .map(
                row =>
                    row.map(csvEscape).join(",")
            )
            .join("\n");

    downloadFile(
        "janjua-orders.csv",
        csv,
        "text/csv"
    );
}

function exportCommissionsCSV() {

    const rows = [

        [
            "Promoter",
            "Program",
            "Order",
            "Rate",
            "Amount",
            "Status",
            "Date"
        ]

    ];

    data.commissions.forEach(c => {

        rows.push([

            getPromoter(c.promoterId)?.name || "",

            getProgram(c.programId)?.name || "",

            data.orders.find(
                o => o.id === c.orderId
            )?.orderNumber || "",

            c.rate,

            c.amount,

            c.status,

            c.createdAt

        ]);

    });

    const csv =
        rows
            .map(
                row =>
                    row.map(csvEscape).join(",")
            )
            .join("\n");

    downloadFile(
        "janjua-commissions.csv",
        csv,
        "text/csv"
    );
}

function exportAllData() {

    const backup = {

        exportedAt:
            new Date().toISOString(),

        version:"JANJUA_V5",

        data

    };

    downloadFile(
        "janjua-backup.json",
        JSON.stringify(
            backup,
            null,
            2
        ),
        "application/json"
    );

    showToast(
        "Backup downloaded."
    );
}


/* =========================================================
   RESET
========================================================= */

function resetPlatformData() {

    if (
        currentUser?.role !== "admin"
    ) {
        return;
    }

    const answer =
        prompt(
            "Type RESET to erase platform data."
        );

    if (answer !== "RESET") {
        return;
    }

    data =
        cloneDefaultData();

    saveData();

    location.reload();
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        restoreSession();

        handlePublicTracking();

        handlePublicSocialLink();

        if (!currentUser) {

            document
                .getElementById("loginScreen")
                .classList.remove("hidden");

            document
                .getElementById("appScreen")
                .classList.add("hidden");

        }

    }
);
