/* =========================================================
   JANJUA - ALL IN ONE MARKETING PLATFORM
   COMPLETE APP.JS
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v4";


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultData = {

    categories: [
        { id: "cat1", name: "Banks & Finance", visible: true },
        { id: "cat2", name: "Motorcycles", visible: true },
        { id: "cat3", name: "Cars & Vehicles", visible: true },
        { id: "cat4", name: "Spare Parts", visible: true },
        { id: "cat5", name: "Food & Restaurants", visible: true },
        { id: "cat6", name: "Hotels", visible: true },
        { id: "cat7", name: "Factories", visible: true },
        { id: "cat8", name: "Weddings", visible: true },
        { id: "cat9", name: "Travel & Tourism", visible: true },
        { id: "cat10", name: "Property", visible: true },
        { id: "cat11", name: "Loans & Financing", visible: true },
        { id: "cat12", name: "Education", visible: true },
        { id: "cat13", name: "Healthcare", visible: true },
        { id: "cat14", name: "Freelance & Services", visible: true }
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
        brand: "JANJUA",
        subtitle: "Janjua Digital Marketing Platform Online",
        status: "AVAILABLE 24 HOURS"
    }
};


/* =========================================================
   LOAD DATA
   ========================================================= */

function loadData(){

    try{

        const saved = localStorage.getItem(STORAGE_KEY);

        if(!saved){
            return JSON.parse(JSON.stringify(defaultData));
        }

        const parsed = JSON.parse(saved);

        return {
            ...JSON.parse(JSON.stringify(defaultData)),
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

    }catch(error){

        console.error("Data loading error:", error);

        return JSON.parse(JSON.stringify(defaultData));
    }
}


let data = loadData();


/* =========================================================
   SAVE DATA
   ========================================================= */

function saveData(){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function createId(prefix){

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


function escapeHTML(value){

    if(value === null || value === undefined){
        return "";
    }

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");
}


function formatMoney(value){

    const number = Number(value || 0);

    return "Rs. " + number.toLocaleString("en-PK");
}


function formatDate(value){

    if(!value){
        return "-";
    }

    const d = new Date(value);

    if(isNaN(d.getTime())){
        return escapeHTML(value);
    }

    return d.toLocaleString();
}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        addAnimatedBranding();

        addBrandAnimationCSS();

        addModuleCSS();

        renderCategories();

        attachDashboardEvents();

        handlePublicTracking();

        handlePublicSocialLink();

    }
);


/* =========================================================
   ANIMATED JANJUA BRANDING
   ========================================================= */

function addAnimatedBranding(){

    const header = document.querySelector("header");

    if(!header){
        return;
    }


    const oldBrand = header.querySelector(".brand-area");

    if(oldBrand){
        oldBrand.style.display = "none";
    }


    const oldStatus = header.querySelector(".header-status");

    if(oldStatus){
        oldStatus.style.display = "none";
    }


    const oldAnimated =
        document.getElementById("janjuaAnimatedBrand");

    if(oldAnimated){
        oldAnimated.remove();
    }


    const box = document.createElement("div");

    box.id = "janjuaAnimatedBrand";


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
   DASHBOARD EVENT
   ========================================================= */

function attachDashboardEvents(){

    document.querySelectorAll(
        "[onclick^=\"openModule\"]"
    ).forEach(function(button){

        button.addEventListener(
            "click",
            function(){
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );

    });
}


/* =========================================================
   OPEN MODULE
   ========================================================= */

function openModule(module){

    const overlay = document.createElement("div");

    overlay.className = "module-overlay";


    const content = document.createElement("div");

    content.className = "module-content";


    overlay.innerHTML = `
        <div class="module-window">
            <div class="module-header">

                <h1>
                    ${escapeHTML(getModuleTitle(module))}
                </h1>

                <button
                    class="module-close"
                    onclick="closeModule(this)"
                >
                    ✕
                </button>

            </div>

            <div class="module-body"></div>

        </div>
    `;


    overlay
        .querySelector(".module-body")
        .appendChild(content);


    document.body.appendChild(overlay);


    switch(module){

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

                    <h3>
                        ${escapeHTML(module)}
                    </h3>

                    <p>
                        Module ready for integration.
                    </p>

                </div>

            `;
    }
}


function closeModule(button){

    const overlay =
        button.closest(".module-overlay");

    if(overlay){
        overlay.remove();
    }
}


function getModuleTitle(module){

    const titles = {

        dashboard: "Dashboard",

        categories: "Marketing Categories",

        providers: "Providers & Companies",

        programs: "Programs & Offers",

        promoters: "Promoters / Workers",

        tracking: "Tracking Links",

        orders: "Orders & Clicks",

        payments: "Commission & Payments",

        reports: "Reports & Analytics"

    };

    return titles[module] || module;
}


/* =========================================================
   DASHBOARD MODULE
   ========================================================= */

function renderDashboardModule(container){

    const totalClicks =
        data.clicks.length;

    const totalOrders =
        data.orders.length;

    const completedOrders =
        data.orders.filter(
            o => o.status === "Completed"
        ).length;


    container.innerHTML = `

        <div class="dashboard-module">

            <div class="control-center">

                <h2>
                    JANJUA Marketing Control Center
                </h2>

                <p>
                    Manage your complete digital
                    marketing system from one place.
                </p>

            </div>


            <div class="stats-grid">

                <div class="stat-card">
                    <span>Providers</span>
                    <strong>
                        ${data.providers.length}
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Programs</span>
                    <strong>
                        ${data.programs.length}
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Promoters</span>
                    <strong>
                        ${data.promoters.length}
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Tracking Links</span>
                    <strong>
                        ${data.trackingLinks.length}
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Social Media Links</span>
                    <strong>
                        ${data.socialLinks.length}
                    </strong>
                </div>

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
                    <span>Completed Orders</span>
                    <strong>
                        ${completedOrders}
                    </strong>
                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   CATEGORIES
   ========================================================= */

function renderCategories(){

    const list =
        document.getElementById("categoryList");

    if(!list){
        return;
    }


    const visibleCategories =
        data.categories.filter(
            category => category.visible !== false
        );


    if(!visibleCategories.length){

        list.innerHTML = `
            <div class="empty-module">
                No categories available.
            </div>
        `;

        return;
    }


    list.innerHTML =
        visibleCategories.map(
            category => `

                <div class="category-card">

                    <div>
                        <strong>
                            ${escapeHTML(category.name)}
                        </strong>
                    </div>

                    <button
                        onclick="deleteCategory('${category.id}')"
                    >
                        Delete
                    </button>

                </div>

            `
        ).join("");
}


function addCategory(){

    const name =
        prompt("Enter category name:");

    if(!name || !name.trim()){
        return;
    }


    data.categories.push({

        id: createId("cat"),

        name: name.trim(),

        visible: true

    });


    saveData();

    renderCategories();
}


function deleteCategory(id){

    if(!confirm("Delete this category?")){
        return;
    }


    data.categories =
        data.categories.filter(
            category => category.id !== id
        );


    saveData();

    renderCategories();
}


/* =========================================================
   CATEGORY MODULE
   ========================================================= */

function renderCategoryModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button onclick="addCategory()">
                + Add Category
            </button>

        </div>

        <div class="admin-list">

            ${
                data.categories.length
                ?
                data.categories.map(
                    category => `

                        <div class="admin-row">

                            <div>

                                <strong>
                                    ${escapeHTML(category.name)}
                                </strong>

                                <small>
                                    ${category.visible !== false
                                        ? "Visible"
                                        : "Hidden"}
                                </small>

                            </div>

                            <div>

                                <button
                                    onclick="deleteCategory('${category.id}')"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `
                ).join("")
                :
                `<div class="empty-module">
                    No categories.
                </div>`
            }

        </div>
    `;
}


/* =========================================================
   PROVIDERS
   ========================================================= */

function renderProviderModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button onclick="showProviderForm()">
                + Add Provider / Company
            </button>

        </div>

        <div id="providerFormArea"></div>

        <div id="providersListArea">

            ${
                data.providers.length
                ?
                data.providers.map(
                    provider => `

                        <div class="admin-row">

                            <div>

                                <strong>
                                    ${escapeHTML(provider.name)}
                                </strong>

                                <small>
                                    ${escapeHTML(provider.website || "")}
                                </small>

                            </div>

                            <div>

                                <button
                                    onclick="editProvider('${provider.id}')"
                                >
                                    Edit
                                </button>

                                <button
                                    onclick="deleteProvider('${provider.id}')"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `
                ).join("")
                :
                `<div class="empty-module">
                    No providers added yet.
                </div>`
            }

        </div>
    `;
}


function showProviderForm(id = ""){

    const area =
        document.getElementById("providerFormArea");

    if(!area){
        return;
    }


    const provider =
        data.providers.find(
            item => item.id === id
        ) || {};


    area.innerHTML = `

        <div class="form-card">

            <h2>
                ${id ? "Edit Provider" : "Add Provider / Company"}
            </h2>

            <input
                id="providerName"
                placeholder="Company / Provider Name"
                value="${escapeHTML(provider.name || "")}"
            >

            <input
                id="providerWebsite"
                placeholder="Website"
                value="${escapeHTML(provider.website || "")}"
            >

            <input
                id="providerAffiliate"
                placeholder="Original Affiliate Link"
                value="${escapeHTML(provider.affiliateLink || "")}"
            >

            <input
                id="providerAccount"
                placeholder="Account ID"
                value="${escapeHTML(provider.accountId || "")}"
            >

            <label>
                <input
                    type="checkbox"
                    id="providerSubId"
                    ${provider.subIdSupport ? "checked" : ""}
                >
                SubID Support
            </label>

            <label>
                <input
                    type="checkbox"
                    id="providerClickId"
                    ${provider.clickIdSupport ? "checked" : ""}
                >
                ClickID Support
            </label>

            <label>
                <input
                    type="checkbox"
                    id="providerApi"
                    ${provider.api ? "checked" : ""}
                >
                API Available
            </label>

            <label>
                <input
                    type="checkbox"
                    id="providerWebhook"
                    ${provider.webhook ? "checked" : ""}
                >
                Webhook Available
            </label>

            <div class="form-actions">

                <button
                    onclick="saveProvider('${id}')"
                >
                    Save
                </button>

                <button
                    onclick="cancelProviderForm()"
                >
                    Cancel
                </button>

            </div>

        </div>
    `;
}


function saveProvider(id){

    const name =
        document.getElementById("providerName").value.trim();


    if(!name){
        alert("Please enter provider/company name.");
        return;
    }


    const obj = {

        id: id || createId("provider"),

        name,

        website:
            document.getElementById("providerWebsite").value.trim(),

        affiliateLink:
            document.getElementById("providerAffiliate").value.trim(),

        accountId:
            document.getElementById("providerAccount").value.trim(),

        subIdSupport:
            document.getElementById("providerSubId").checked,

        clickIdSupport:
            document.getElementById("providerClickId").checked,

        api:
            document.getElementById("providerApi").checked,

        webhook:
            document.getElementById("providerWebhook").checked,

        visible: true
    };


    if(id){

        const index =
            data.providers.findIndex(
                item => item.id === id
            );

        if(index !== -1){
            data.providers[index] = obj;
        }

    }else{

        data.providers.push(obj);

    }


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderProviderModule(active);
    }
}


function editProvider(id){

    const area =
        document.getElementById("providerFormArea");

    if(area){
        showProviderForm(id);
    }
}


function cancelProviderForm(){

    const area =
        document.getElementById("providerFormArea");

    if(area){
        area.innerHTML = "";
    }
}


function deleteProvider(id){

    if(!confirm("Delete this provider?")){
        return;
    }


    data.providers =
        data.providers.filter(
            item => item.id !== id
        );


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderProviderModule(active);
    }
}


/* =========================================================
   PROGRAMS
   ========================================================= */

function renderProgramModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button onclick="showProgramForm()">
                + Add Program / Offer
            </button>

        </div>

        <div id="programFormArea"></div>

        <div id="programsListArea">

            ${
                data.programs.length
                ?
                data.programs.map(
                    program => {

                        const provider =
                            data.providers.find(
                                p => p.id === program.providerId
                            );

                        const category =
                            data.categories.find(
                                c => c.id === program.categoryId
                            );

                        return `

                            <div class="admin-row">

                                <div>

                                    <strong>
                                        ${escapeHTML(program.name)}
                                    </strong>

                                    <small>
                                        Provider:
                                        ${escapeHTML(provider?.name || "-")}
                                        |
                                        Category:
                                        ${escapeHTML(category?.name || "-")}
                                    </small>

                                </div>

                                <div>

                                    <button
                                        onclick="editProgram('${program.id}')"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onclick="deleteProgram('${program.id}')"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        `;
                    }
                ).join("")
                :
                `<div class="empty-module">
                    No programs added yet.
                </div>`
            }

        </div>
    `;
}


function showProgramForm(id = ""){

    const area =
        document.getElementById("programFormArea");

    if(!area){
        return;
    }


    const program =
        data.programs.find(
            item => item.id === id
        ) || {};


    area.innerHTML = `

        <div class="form-card">

            <h2>
                ${id ? "Edit Program" : "Add Program / Offer"}
            </h2>

            <input
                id="programName"
                placeholder="Program / Offer Name"
                value="${escapeHTML(program.name || "")}"
            >


            <select id="programProvider">

                <option value="">
                    Select Provider
                </option>

                ${
                    data.providers.map(
                        provider => `

                            <option
                                value="${provider.id}"
                                ${program.providerId === provider.id
                                    ? "selected"
                                    : ""}
                            >
                                ${escapeHTML(provider.name)}
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
                                ${program.categoryId === category.id
                                    ? "selected"
                                    : ""}
                            >
                                ${escapeHTML(category.name)}
                            </option>

                        `
                    ).join("")
                }

            </select>


            <input
                id="programAffiliate"
                placeholder="Original Affiliate Link"
                value="${escapeHTML(program.affiliateLink || "")}"
            >


            <input
                id="programCommission"
                type="number"
                min="0"
                step="0.01"
                placeholder="Commission %"
                value="${program.commissionPercent ?? ""}"
            >


            <input
                id="programCookie"
                type="number"
                min="0"
                placeholder="Cookie Days"
                value="${program.cookieDays ?? ""}"
            >


            <div class="form-actions">

                <button
                    onclick="saveProgram('${id}')"
                >
                    Save
                </button>

                <button
                    onclick="cancelProgramForm()"
                >
                    Cancel
                </button>

            </div>

        </div>
    `;
}


function saveProgram(id){

    const name =
        document.getElementById("programName").value.trim();


    if(!name){
        alert("Please enter program name.");
        return;
    }


    const obj = {

        id: id || createId("program"),

        name,

        providerId:
            document.getElementById("programProvider").value,

        categoryId:
            document.getElementById("programCategory").value,

        affiliateLink:
            document.getElementById("programAffiliate").value.trim(),

        commissionPercent:
            Number(
                document.getElementById("programCommission").value || 0
            ),

        cookieDays:
            Number(
                document.getElementById("programCookie").value || 0
            )
    };


    if(id){

        const index =
            data.programs.findIndex(
                item => item.id === id
            );

        if(index !== -1){
            data.programs[index] = obj;
        }

    }else{

        data.programs.push(obj);

    }


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderProgramModule(active);
    }
}


function editProgram(id){

    showProgramForm(id);
}


function cancelProgramForm(){

    const area =
        document.getElementById("programFormArea");

    if(area){
        area.innerHTML = "";
    }
}


function deleteProgram(id){

    if(!confirm("Delete this program?")){
        return;
    }


    data.programs =
        data.programs.filter(
            item => item.id !== id
        );


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderProgramModule(active);
    }
}


/* =========================================================
   PROMOTERS / WORKERS
   ========================================================= */

function renderPromoterModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button onclick="showPromoterForm()">
                + Add Promoter / Worker
            </button>

        </div>

        <div id="promoterFormArea"></div>

        <div id="promotersListArea">

            ${
                data.promoters.length
                ?
                data.promoters.map(
                    promoter => `

                        <div class="admin-row">

                            <div>

                                <strong>
                                    ${escapeHTML(promoter.name)}
                                </strong>

                                <small>
                                    ${escapeHTML(promoter.phone || "")}
                                    |
                                    ${escapeHTML(promoter.email || "")}
                                </small>

                            </div>

                            <div>

                                <button
                                    onclick="editPromoter('${promoter.id}')"
                                >
                                    Edit
                                </button>

                                <button
                                    onclick="deletePromoter('${promoter.id}')"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `
                ).join("")
                :
                `<div class="empty-module">
                    No promoters added yet.
                </div>`
            }

        </div>
    `;
}


function showPromoterForm(id = ""){

    const area =
        document.getElementById("promoterFormArea");

    if(!area){
        return;
    }


    const promoter =
        data.promoters.find(
            item => item.id === id
        ) || {};


    area.innerHTML = `

        <div class="form-card">

            <h2>
                ${id ? "Edit Promoter" : "Add Promoter / Worker"}
            </h2>

            <input
                id="promoterName"
                placeholder="Full Name"
                value="${escapeHTML(promoter.name || "")}"
            >

            <input
                id="promoterPhone"
                placeholder="Phone"
                value="${escapeHTML(promoter.phone || "")}"
            >

            <input
                id="promoterEmail"
                type="email"
                placeholder="Email"
                value="${escapeHTML(promoter.email || "")}"
            >


            <select id="promoterPaymentMethod">

                <option value="Bank"
                    ${promoter.paymentMethod === "Bank" ? "selected" : ""}>
                    Bank
                </option>

                <option value="JazzCash"
                    ${promoter.paymentMethod === "JazzCash" ? "selected" : ""}>
                    JazzCash
                </option>

                <option value="Easypaisa"
                    ${promoter.paymentMethod === "Easypaisa" ? "selected" : ""}>
                    Easypaisa
                </option>

            </select>


            <input
                id="promoterPaymentAccount"
                placeholder="Payment Account"
                value="${escapeHTML(promoter.paymentAccount || "")}"
            >


            <div class="form-actions">

                <button
                    onclick="savePromoter('${id}')"
                >
                    Save
                </button>

                <button
                    onclick="cancelPromoterForm()"
                >
                    Cancel
                </button>

            </div>

        </div>
    `;
}


function savePromoter(id){

    const name =
        document.getElementById("promoterName").value.trim();


    if(!name){
        alert("Please enter promoter name.");
        return;
    }


    const obj = {

        id: id || createId("promoter"),

        name,

        phone:
            document.getElementById("promoterPhone").value.trim(),

        email:
            document.getElementById("promoterEmail").value.trim(),

        paymentMethod:
            document.getElementById("promoterPaymentMethod").value,

        paymentAccount:
            document
                .getElementById("promoterPaymentAccount")
                .value
                .trim()
    };


    if(id){

        const index =
            data.promoters.findIndex(
                item => item.id === id
            );

        if(index !== -1){
            data.promoters[index] = obj;
        }

    }else{

        data.promoters.push(obj);

    }


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderPromoterModule(active);
    }
}


function editPromoter(id){

    showPromoterForm(id);
}


function cancelPromoterForm(){

    const area =
        document.getElementById("promoterFormArea");

    if(area){
        area.innerHTML = "";
    }
}


function deletePromoter(id){

    if(!confirm("Delete this promoter?")){
        return;
    }


    data.promoters =
        data.promoters.filter(
            item => item.id !== id
        );


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderPromoterModule(active);
    }
}


/* =========================================================
   TRACKING LINKS
   ========================================================= */

function renderTrackingModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button onclick="showAssignmentForm()">
                + Assign Program to Promoter
            </button>

            <button onclick="showSocialLinkForm()">
                + Social Media Link
            </button>

        </div>


        <div id="assignmentFormArea"></div>

        <div id="trackingLinksArea">

            <h2>
                🔗 Promoter Tracking Links
            </h2>

            ${
                data.trackingLinks.length
                ?
                data.trackingLinks.map(
                    link => {

                        const promoter =
                            data.promoters.find(
                                p => p.id === link.promoterId
                            );

                        const program =
                            data.programs.find(
                                p => p.id === link.programId
                            );

                        return `

                            <div class="admin-row">

                                <div>

                                    <strong>
                                        ${escapeHTML(link.code)}
                                    </strong>

                                    <small>
                                        Promoter:
                                        ${escapeHTML(promoter?.name || "-")}
                                        |
                                        Program:
                                        ${escapeHTML(program?.name || "-")}
                                        |
                                        Clicks:
                                        ${link.clicks || 0}
                                    </small>

                                </div>

                                <div>

                                    <button
                                        onclick="copyTrackingLink('${link.id}')"
                                    >
                                        Copy
                                    </button>

                                    <button
                                        onclick="testTrackingLink('${link.id}')"
                                    >
                                        Test
                                    </button>

                                    <button
                                        onclick="toggleTrackingLink('${link.id}')"
                                    >
                                        ${link.active ? "Disable" : "Enable"}
                                    </button>

                                    <button
                                        onclick="deleteTrackingLink('${link.id}')"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        `;
                    }
                ).join("")
                :
                `<div class="empty-module">
                    No promoter tracking links.
                </div>`
            }

        </div>


        <hr>


        <div class="form-card">

            <h2>
                🔗 Social Media Links
            </h2>

            <p>
                Admin-generated links for Facebook,
                Instagram, TikTok and WhatsApp.
            </p>

            <p>
                Original Affiliate Links remain
                inside Admin data.
            </p>

        </div>


        <div id="socialLinkFormArea"></div>

        <div id="socialLinksArea">

            ${
                data.socialLinks.length
                ?
                data.socialLinks.map(
                    link => {

                        const program =
                            data.programs.find(
                                p => p.id === link.programId
                            );

                        return `

                            <div class="admin-row">

                                <div>

                                    <strong>
                                        ${escapeHTML(link.platform)}
                                    </strong>

                                    <small>
                                        Program:
                                        ${escapeHTML(program?.name || "-")}
                                        |
                                        Clicks:
                                        ${link.clicks || 0}
                                    </small>

                                </div>

                                <div>

                                    <button
                                        onclick="copySocialLink('${link.id}')"
                                    >
                                        Copy
                                    </button>

                                    <button
                                        onclick="testSocialLink('${link.id}')"
                                    >
                                        Test
                                    </button>

                                    <button
                                        onclick="toggleSocialLink('${link.id}')"
                                    >
                                        ${link.active ? "Disable" : "Enable"}
                                    </button>

                                    <button
                                        onclick="deleteSocialLink('${link.id}')"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        `;
                    }
                ).join("")
                :
                `<div class="empty-module">
                    No social links created.
                </div>`
            }

        </div>
    `;
}


/* =========================================================
   ASSIGN PROGRAM TO PROMOTER
   ========================================================= */

function showAssignmentForm(){

    const area =
        document.getElementById("assignmentFormArea");

    if(!area){
        return;
    }


    area.innerHTML = `

        <div class="form-card">

            <h2>
                Assign Program to Promoter
            </h2>


            <select id="assignmentPromoter">

                <option value="">
                    Select Promoter
                </option>

                ${
                    data.promoters.map(
                        promoter => `

                            <option value="${promoter.id}">
                                ${escapeHTML(promoter.name)}
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
                                ${escapeHTML(program.name)}
                            </option>

                        `
                    ).join("")
                }

            </select>


            <div class="form-actions">

                <button onclick="createTrackingLink()">
                    Create Tracking Link
                </button>

                <button onclick="cancelAssignmentForm()">
                    Cancel
                </button>

            </div>

        </div>
    `;
}


function cancelAssignmentForm(){

    const area =
        document.getElementById("assignmentFormArea");

    if(area){
        area.innerHTML = "";
    }
}


function createTrackingLink(){

    const promoterId =
        document.getElementById("assignmentPromoter").value;

    const programId =
        document.getElementById("assignmentProgram").value;


    if(!promoterId || !programId){

        alert(
            "Please select promoter and program."
        );

        return;
    }


    const code =
        "REF_" +
        Math.random()
            .toString(36)
            .substring(2,10)
            .toUpperCase();


    const url =
        window.location.origin +
        window.location.pathname +
        "?ref=" +
        encodeURIComponent(code);


    data.trackingLinks.push({

        id: createId("track"),

        promoterId,

        programId,

        code,

        url,

        active: true,

        clicks: 0,

        createdAt: new Date().toISOString()

    });


    data.assignments.push({

        id: createId("assign"),

        promoterId,

        programId,

        code,

        createdAt: new Date().toISOString()

    });


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderTrackingModule(active);
    }
}


function copyTrackingLink(id){

    const link =
        data.trackingLinks.find(
            item => item.id === id
        );

    if(!link){
        return;
    }


    navigator.clipboard.writeText(link.url)
        .then(
            () => alert("Tracking link copied.")
        )
        .catch(
            () => prompt(
                "Copy this link:",
                link.url
            )
        );
}


function testTrackingLink(id){

    const link =
        data.trackingLinks.find(
            item => item.id === id
        );

    if(link){
        window.open(
            link.url,
            "_blank"
        );
    }
}


function toggleTrackingLink(id){

    const link =
        data.trackingLinks.find(
            item => item.id === id
        );

    if(!link){
        return;
    }


    link.active = !link.active;

    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderTrackingModule(active);
    }
}


function deleteTrackingLink(id){

    if(!confirm("Delete this tracking link?")){
        return;
    }


    data.trackingLinks =
        data.trackingLinks.filter(
            item => item.id !== id
        );


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderTrackingModule(active);
    }
}


/* =========================================================
   SOCIAL MEDIA LINKS
   ========================================================= */

function showSocialLinkForm(){

    const area =
        document.getElementById("socialLinkFormArea");

    if(!area){
        return;
    }


    area.innerHTML = `

        <div class="form-card">

            <h2>
                Create Social Media Link
            </h2>


            <select id="socialProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(
                        program => `

                            <option value="${program.id}">
                                ${escapeHTML(program.name)}
                            </option>

                        `
                    ).join("")
                }

            </select>


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

                <option value="All">
                    All
                </option>

            </select>


            <div class="form-actions">

                <button onclick="createSocialMediaLink()">
                    Create Link
                </button>

                <button onclick="cancelSocialLinkForm()">
                    Cancel
                </button>

            </div>

        </div>
    `;
}


function cancelSocialLinkForm(){

    const area =
        document.getElementById("socialLinkFormArea");

    if(area){
        area.innerHTML = "";
    }
}


function createSocialMediaLink(){

    const programId =
        document.getElementById("socialProgram").value;

    const platform =
        document.getElementById("socialPlatform").value;


    if(!programId){

        alert("Please select a program.");

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

        id: createId("social"),

        programId,

        code,

        url,

        platform,

        active: true,

        clicks: 0,

        createdAt: new Date().toISOString()

    });


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderTrackingModule(active);
    }
}


function copySocialLink(id){

    const link =
        data.socialLinks.find(
            item => item.id === id
        );

    if(!link){
        return;
    }


    navigator.clipboard.writeText(link.url)
        .then(
            () => alert("Social link copied.")
        )
        .catch(
            () => prompt(
                "Copy this link:",
                link.url
            )
        );
}


function testSocialLink(id){

    const link =
        data.socialLinks.find(
            item => item.id === id
        );

    if(link){
        window.open(
            link.url,
            "_blank"
        );
    }
}


function toggleSocialLink(id){

    const link =
        data.socialLinks.find(
            item => item.id === id
        );

    if(!link){
        return;
    }


    link.active = !link.active;

    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderTrackingModule(active);
    }
}


function deleteSocialLink(id){

    if(!confirm("Delete this social link?")){
        return;
    }


    data.socialLinks =
        data.socialLinks.filter(
            item => item.id !== id
        );


    saveData();


    const active =
        document.querySelector(".module-overlay .module-body");

    if(active){
        renderTrackingModule(active);
    }
}


/* =========================================================
   PUBLIC TRACKING
   ========================================================= */

function handlePublicTracking(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const ref =
        params.get("ref");


    if(!ref){
        return;
    }


    const link =
        data.trackingLinks.find(
            item => item.code === ref
        );


    if(!link || !link.active){
        return;
    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    data.clicks.push({

        id: createId("click"),

        type: "promoter",

        trackingCode: link.code,

        promoterId: link.promoterId,

        programId: link.programId,

        createdAt: new Date().toISOString()

    });


    saveData();
}


/* =========================================================
   PUBLIC SOCIAL TRACKING
   ========================================================= */

function handlePublicSocialLink(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const social =
        params.get("social");


    if(!social){
        return;
    }


    const link =
        data.socialLinks.find(
            item => item.code === social
        );


    if(!link || !link.active){
        return;
    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    data.clicks.push({

        id: createId("socialclick"),

        type: "social",

        socialCode: link.code,

        programId: link.programId,

        platform: link.platform,

        createdAt: new Date().toISOString()

    });


    saveData();


    showSocialLandingMessage(link);
}


function showSocialLandingMessage(link){

    const program =
        data.programs.find(
            p => p.id === link.programId
        );


    const box =
        document.createElement("div");

    box.className =
        "public-landing-message";


    box.innerHTML = `

        <div>

            <h2>
                JANJUA
            </h2>

            <p>
                Thank you for visiting.
            </p>

            <p>
                Offer:
                <strong>
                    ${escapeHTML(program?.name || "Available Offer")}
                </strong>
            </p>

        </div>

    `;


    document.body.appendChild(box);
}


/* =========================================================
   ORDERS & CLICKS
   ========================================================= */

function renderOrdersModule(container){

    const totalClicks =
        data.clicks.length;


    const promoterClicks =
        data.clicks.filter(
            click => click.type === "promoter"
        ).length;


    const socialClicks =
        data.clicks.filter(
            click => click.type === "social"
        ).length;


    const totalOrders =
        data.orders.length;


    const completed =
        data.orders.filter(
            order => order.status === "Completed"
        ).length;


    const pending =
        data.orders.filter(
            order => order.status === "Pending"
        ).length;


    const cancelled =
        data.orders.filter(
            order => order.status === "Cancelled"
        ).length;


    const totalSales =
        data.orders
            .filter(
                order => order.status === "Completed"
            )
            .reduce(
                (sum, order) =>
                    sum + Number(order.amount || 0),
                0
            );


    container.innerHTML = `

        <div class="stats-grid">

            <div class="stat-card">
                <span>Total Clicks</span>
                <strong>${totalClicks}</strong>
            </div>

            <div class="stat-card">
                <span>Promoter Clicks</span>
                <strong>${promoterClicks}</strong>
            </div>

            <div class="stat-card">
                <span>Social Media Clicks</span>
                <strong>${socialClicks}</strong>
            </div>

            <div class="stat-card">
                <span>Total Orders</span>
                <strong>${totalOrders}</strong>
            </div>

            <div class="stat-card">
                <span>Completed</span>
                <strong>${completed}</strong>
            </div>

            <div class="stat-card">
                <span>Pending</span>
                <strong>${pending}</strong>
            </div>

            <div class="stat-card">
                <span>Cancelled</span>
                <strong>${cancelled}</strong>
            </div>

            <div class="stat-card">
                <span>Total Sales</span>
                <strong>${formatMoney(totalSales)}</strong>
            </div>

        </div>


        <div class="module-toolbar">

            <button onclick="showOrderForm()">
                + Add Order
            </button>

        </div>


        <div id="orderFormArea"></div>


        <div id="ordersListArea">

            ${renderOrdersHTML()}

        </div>

    `;
}


/* =========================================================
   ORDERS HTML
   ========================================================= */

function renderOrdersHTML(){

    if(!data.orders.length){

        return `

            <div class="empty-module">

                <h3>
                    No Orders Yet
                </h3>

                <p>
                    Add your first order using
                    the "+ Add Order" button.
                </p>

            </div>

        `;
    }


    const orders =
        [...data.orders].sort(
            (a,b) =>
                new Date(b.date || b.createdAt) -
                new Date(a.date || a.createdAt)
        );


    return orders.map(
        order => {

            const program =
                data.programs.find(
                    p => p.id === order.programId
                );


            const promoter =
                data.promoters.find(
                    p => p.id === order.promoterId
                );


            return `

                <div class="order-card">

                    <div class="order-main">

                        <div>

                            <strong>
                                Order #${escapeHTML(order.orderId)}
                            </strong>

                            <span>
                                ${escapeHTML(program?.name || "-")}
                            </span>

                        </div>


                        <div>

                            <span>
                                Source:
                                ${escapeHTML(order.source || "Direct")}
                            </span>

                            ${
                                promoter
                                ?
                                `<span>
                                    Promoter:
                                    ${escapeHTML(promoter.name)}
                                </span>`
                                :
                                ""
                            }

                            ${
                                order.platform
                                ?
                                `<span>
                                    Platform:
                                    ${escapeHTML(order.platform)}
                                </span>`
                                :
                                ""
                            }

                        </div>


                        <div>

                            <span>
                                Customer:
                                ${escapeHTML(order.customerRef || "-")}
                            </span>

                            <span>
                                Amount:
                                <strong>
                                    ${formatMoney(order.amount)}
                                </strong>
                            </span>

                        </div>


                        <div>

                            <span>
                                Status:
                                <strong class="status-${String(order.status).toLowerCase()}">
                                    ${escapeHTML(order.status)}
                                </strong>
                            </span>

                            <span>
                                ${formatDate(order.date)}
                            </span>

                        </div>

                    </div>


                    <div class="order-actions">

                        <button
                            onclick="editOrder('${order.id}')"
                        >
                            Edit
                        </button>

                        <button
                            onclick="deleteOrder('${order.id}')"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `;
        }
    ).join("");
}


/* =========================================================
   ACTIVE MODULE HELPER
   ========================================================= */

function getActiveModuleContent(){

    const all =
        document.querySelectorAll(
            ".module-overlay .module-body"
        );


    return all.length
        ? all[all.length - 1]
        : null;
}


/* =========================================================
   ORDER FORM
   ========================================================= */

function showOrderForm(id = ""){

    const area =
        document.getElementById("orderFormArea");


    if(!area){
        return;
    }


    const order =
        data.orders.find(
            item => item.id === id
        ) || {};


    area.innerHTML = `

        <div class="form-card">

            <h2>
                ${id ? "Edit Order" : "Add New Order"}
            </h2>


            <input
                id="orderId"
                placeholder="Order ID / Order Number"
                value="${escapeHTML(order.orderId || "")}"
            >


            <select
                id="orderSource"
                onchange="updateOrderSourceFields()"
            >

                <option
                    value="Direct"
                    ${order.source === "Direct" || !order.source
                        ? "selected"
                        : ""}
                >
                    Direct
                </option>

                <option
                    value="Promoter"
                    ${order.source === "Promoter"
                        ? "selected"
                        : ""}
                >
                    Promoter
                </option>

                <option
                    value="Social"
                    ${order.source === "Social"
                        ? "selected"
                        : ""}
                >
                    Social Media
                </option>

            </select>


            <div id="orderSourceFields"></div>


            <select id="orderProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(
                        program => `

                            <option
                                value="${program.id}"
                                ${order.programId === program.id
                                    ? "selected"
                                    : ""}
                            >
                                ${escapeHTML(program.name)}
                            </option>

                        `
                    ).join("")
                }

            </select>


            <input
                id="orderCustomer"
                placeholder="Customer / Order Reference"
                value="${escapeHTML(order.customerRef || "")}"
            >


            <input
                id="orderAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="Order Amount"
                value="${order.amount ?? ""}"
            >


            <select id="orderStatus">

                <option
                    value="Pending"
                    ${order.status === "Pending" || !order.status
                        ? "selected"
                        : ""}
                >
                    Pending
                </option>

                <option
                    value="Completed"
                    ${order.status === "Completed"
                        ? "selected"
                        : ""}
                >
                    Completed
                </option>

                <option
                    value="Cancelled"
                    ${order.status === "Cancelled"
                        ? "selected"
                        : ""}
                >
                    Cancelled
                </option>

            </select>


            <input
                id="orderDate"
                type="datetime-local"
                value="${getDateTimeLocalValue(order.date)}"
            >


            <div class="form-actions">

                <button
                    onclick="saveOrder('${id}')"
                >
                    Save Order
                </button>

                <button
                    onclick="cancelOrderForm()"
                >
                    Cancel
                </button>

            </div>

        </div>
    `;


    updateOrderSourceFields(order);
}


/* =========================================================
   ORDER SOURCE FIELDS
   ========================================================= */

function updateOrderSourceFields(existingOrder = null){

    const sourceElement =
        document.getElementById("orderSource");

    const area =
        document.getElementById("orderSourceFields");


    if(!sourceElement || !area){
        return;
    }


    const source =
        sourceElement.value;


    if(source === "Promoter"){

        area.innerHTML = `

            <select
                id="orderTrackingLink"
                onchange="setProgramFromTrackingLink()"
            >

                <option value="">
                    Select Promoter Tracking Link
                </option>

                ${
                    data.trackingLinks.map(
                        link => {

                            const promoter =
                                data.promoters.find(
                                    p => p.id === link.promoterId
                                );

                            const program =
                                data.programs.find(
                                    p => p.id === link.programId
                                );


                            const selected =
                                existingOrder?.trackingLinkId === link.id
                                    ? "selected"
                                    : "";


                            return `

                                <option
                                    value="${link.id}"
                                    ${selected}
                                >
                                    ${escapeHTML(
                                        promoter?.name || "Promoter"
                                    )}
                                    -
                                    ${escapeHTML(
                                        program?.name || "Program"
                                    )}
                                    -
                                    ${escapeHTML(link.code)}
                                </option>

                            `;
                        }
                    ).join("")
                }

            </select>

        `;


        setTimeout(
            setProgramFromTrackingLink,
            0
        );

    }


    else if(source === "Social"){

        area.innerHTML = `

            <select
                id="orderSocialLink"
                onchange="setProgramFromSocialLink()"
            >

                <option value="">
                    Select Social Media Link
                </option>

                ${
                    data.socialLinks.map(
                        link => {

                            const program =
                                data.programs.find(
                                    p => p.id === link.programId
                                );


                            const selected =
                                existingOrder?.socialLinkId === link.id
                                    ? "selected"
                                    : "";


                            return `

                                <option
                                    value="${link.id}"
                                    ${selected}
                                >
                                    ${escapeHTML(link.platform)}
                                    -
                                    ${escapeHTML(
                                        program?.name || "Program"
                                    )}
                                    -
                                    ${escapeHTML(link.code)}
                                </option>

                            `;
                        }
                    ).join("")
                }

            </select>

        `;


        setTimeout(
            setProgramFromSocialLink,
            0
        );

    }


    else{

        area.innerHTML = `

            <div class="source-note">
                Direct order - no promoter or social
                tracking link required.
            </div>

        `;

    }
}


/* =========================================================
   PROGRAM AUTO SELECT
   ========================================================= */

function setProgramFromTrackingLink(){

    const select =
        document.getElementById("orderTrackingLink");

    const programSelect =
        document.getElementById("orderProgram");


    if(!select || !programSelect){
        return;
    }


    const link =
        data.trackingLinks.find(
            item => item.id === select.value
        );


    if(link){

        programSelect.value =
            link.programId;

    }
}


function setProgramFromSocialLink(){

    const select =
        document.getElementById("orderSocialLink");

    const programSelect =
        document.getElementById("orderProgram");


    if(!select || !programSelect){
        return;
    }


    const link =
        data.socialLinks.find(
            item => item.id === select.value
        );


    if(link){

        programSelect.value =
            link.programId;

    }
}


/* =========================================================
   DATE INPUT
   ========================================================= */

function getDateTimeLocalValue(value){

    const date =
        value
        ? new Date(value)
        : new Date();


    if(isNaN(date.getTime())){
        return "";
    }


    const offset =
        date.getTimezoneOffset();


    const local =
        new Date(
            date.getTime() -
            offset * 60000
        );


    return local
        .toISOString()
        .slice(0,16);
}


/* =========================================================
   SAVE ORDER
   ========================================================= */

function saveOrder(id){

    const orderId =
        document.getElementById("orderId")
            .value
            .trim();


    const source =
        document.getElementById("orderSource")
            .value;


    const programId =
        document.getElementById("orderProgram")
            .value;


    const customerRef =
        document.getElementById("orderCustomer")
            .value
            .trim();


    const amount =
        Number(
            document.getElementById("orderAmount")
                .value || 0
        );


    const status =
        document.getElementById("orderStatus")
            .value;


    const date =
        document.getElementById("orderDate")
            .value;


    if(!orderId){

        alert("Please enter Order ID.");

        return;
    }


    if(!programId){

        alert("Please select Program.");

        return;
    }


    if(amount < 0){

        alert("Order amount cannot be negative.");

        return;
    }


    let promoterId = null;

    let trackingLinkId = null;

    let socialLinkId = null;

    let platform = null;


    if(source === "Promoter"){

        const select =
            document.getElementById(
                "orderTrackingLink"
            );


        trackingLinkId =
            select?.value || null;


        if(!trackingLinkId){

            alert(
                "Please select promoter tracking link."
            );

            return;
        }


        const link =
            data.trackingLinks.find(
                item => item.id === trackingLinkId
            );


        if(link){

            promoterId =
                link.promoterId;

        }

    }


    if(source === "Social"){

        const select =
            document.getElementById(
                "orderSocialLink"
            );


        socialLinkId =
            select?.value || null;


        if(!socialLinkId){

            alert(
                "Please select social media link."
            );

            return;
        }


        const link =
            data.socialLinks.find(
                item => item.id === socialLinkId
            );


        if(link){

            platform =
                link.platform;

        }

    }


    const existing =
        data.orders.find(
            item => item.id === id
        );


    const order = {

        id:
            id || createId("order"),

        orderId,

        source,

        trackingLinkId,

        socialLinkId,

        promoterId,

        programId,

        platform,

        customerRef,

        amount,

        status,

        date:
            date
            ? new Date(date).toISOString()
            : new Date().toISOString(),

        createdAt:
            existing?.createdAt ||
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    if(id){

        const index =
            data.orders.findIndex(
                item => item.id === id
            );


        if(index !== -1){

            data.orders[index] =
                order;

        }

    }else{

        data.orders.push(order);

    }


    saveData();


    const active =
        getActiveModuleContent();


    if(active){

        renderOrdersModule(active);

    }
}


/* =========================================================
   CANCEL ORDER FORM
   ========================================================= */

function cancelOrderForm(){

    const area =
        document.getElementById("orderFormArea");


    if(area){

        area.innerHTML = "";

    }
}


/* =========================================================
   EDIT ORDER
   ========================================================= */

function editOrder(id){

    showOrderForm(id);
}


/* =========================================================
   DELETE ORDER
   ========================================================= */

function deleteOrder(id){

    if(!confirm("Delete this order?")){
        return;
    }


    data.orders =
        data.orders.filter(
            item => item.id !== id
        );


    saveData();


    const active =
        getActiveModuleContent();


    if(active){

        renderOrdersModule(active);

    }
}


/* =========================================================
   COMMISSION & PAYMENTS
   ========================================================= */

function renderCommissionModule(container){

    const completedOrders =
        data.orders.filter(
            order => order.status === "Completed"
        );


    const sales =
        completedOrders.reduce(
            (sum, order) =>
                sum + Number(order.amount || 0),
            0
        );


    const estimatedCommission =
        completedOrders.reduce(
            (sum, order) => {

                const program =
                    data.programs.find(
                        p => p.id === order.programId
                    );


                const percent =
                    Number(
                        program?.commissionPercent || 0
                    );


                return sum +
                    (
                        Number(order.amount || 0) *
                        percent /
                        100
                    );

            },
            0
        );


    container.innerHTML = `

        <div class="stats-grid">

            <div class="stat-card">

                <span>
                    Completed Orders
                </span>

                <strong>
                    ${completedOrders.length}
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Completed Sales
                </span>

                <strong>
                    ${formatMoney(sales)}
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Estimated Commission
                </span>

                <strong>
                    ${formatMoney(estimatedCommission)}
                </strong>

            </div>


            <div class="stat-card">

                <span>
                    Recorded Payments
                </span>

                <strong>
                    ${data.payments.length}
                </strong>

            </div>

        </div>


        <div class="form-card">

            <h2>
                Commission & Payments
            </h2>

            <p>
                Commission calculations are currently
                based on completed manual orders and
                the commission percentage saved in each
                program.
            </p>

            <p>
                Automatic affiliate-network conversion
                and payment APIs can be connected in
                the backend phase.
            </p>

        </div>

    `;
}


/* =========================================================
   REPORTS & ANALYTICS
   ========================================================= */

function renderReportsModule(container){

    const promoterClicks =
        data.clicks.filter(
            click => click.type === "promoter"
        ).length;


    const socialClicks =
        data.clicks.filter(
            click => click.type === "social"
        ).length;


    const completed =
        data.orders.filter(
            order => order.status === "Completed"
        ).length;


    const pending =
        data.orders.filter(
            order => order.status === "Pending"
        ).length;


    const cancelled =
        data.orders.filter(
            order => order.status === "Cancelled"
        ).length;


    const sales =
        data.orders
            .filter(
                order => order.status === "Completed"
            )
            .reduce(
                (sum, order) =>
                    sum + Number(order.amount || 0),
                0
            );


    container.innerHTML = `

        <div class="stats-grid">

            <div class="stat-card">
                <span>Total Categories</span>
                <strong>
                    ${data.categories.length}
                </strong>
            </div>

            <div class="stat-card">
                <span>Providers</span>
                <strong>
                    ${data.providers.length}
                </strong>
            </div>

            <div class="stat-card">
                <span>Programs</span>
                <strong>
                    ${data.programs.length}
                </strong>
            </div>

            <div class="stat-card">
                <span>Promoters</span>
                <strong>
                    ${data.promoters.length}
                </strong>
            </div>

            <div class="stat-card">
                <span>Promoter Clicks</span>
                <strong>
                    ${promoterClicks}
                </strong>
            </div>

            <div class="stat-card">
                <span>Social Clicks</span>
                <strong>
                    ${socialClicks}
                </strong>
            </div>

            <div class="stat-card">
                <span>Completed Orders</span>
                <strong>
                    ${completed}
                </strong>
            </div>

            <div class="stat-card">
                <span>Pending Orders</span>
                <strong>
                    ${pending}
                </strong>
            </div>

            <div class="stat-card">
                <span>Cancelled Orders</span>
                <strong>
                    ${cancelled}
                </strong>
            </div>

            <div class="stat-card">
                <span>Total Completed Sales</span>
                <strong>
                    ${formatMoney(sales)}
                </strong>
            </div>

        </div>


        <div class="form-card">

            <h2>
                📊 JANJUA Analytics
            </h2>

            <p>
                Total tracking events:
                <strong>
                    ${data.clicks.length}
                </strong>
            </p>

            <p>
                Total orders:
                <strong>
                    ${data.orders.length}
                </strong>
            </p>

            <p>
                Total social links:
                <strong>
                    ${data.socialLinks.length}
                </strong>
            </p>

            <p>
                Total promoter links:
                <strong>
                    ${data.trackingLinks.length}
                </strong>
            </p>

        </div>

    `;
}


/* =========================================================
   MODULE CSS
   ========================================================= */

function addModuleCSS(){

    if(document.getElementById("janjuaModuleCSS")){
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "janjuaModuleCSS";


    style.textContent = `

        .module-overlay{

            position:fixed;

            inset:0;

            z-index:99999;

            background:rgba(0,0,0,.78);

            display:flex;

            align-items:flex-start;

            justify-content:center;

            padding:25px;

            overflow:auto;

        }


        .module-window{

            width:min(1100px,100%);

            background:#fff;

            color:#17202a;

            border-radius:18px;

            box-shadow:0 25px 80px rgba(0,0,0,.45);

            overflow:hidden;

        }


        .module-header{

            display:flex;

            align-items:center;

            justify-content:space-between;

            padding:18px 22px;

            background:linear-gradient(
                135deg,
                #111827,
                #1f2937
            );

            color:#fff;

        }


        .module-header h1{

            margin:0;

            font-size:22px;

        }


        .module-close{

            border:0;

            background:#ef4444;

            color:#fff;

            width:40px;

            height:40px;

            border-radius:50%;

            cursor:pointer;

            font-size:18px;

        }


        .module-body{

            padding:22px;

        }


        .module-toolbar{

            display:flex;

            gap:10px;

            flex-wrap:wrap;

            margin-bottom:20px;

        }


        .module-toolbar button,
        .form-actions button,
        .admin-row button,
        .order-actions button{

            border:0;

            padding:10px 14px;

            border-radius:8px;

            cursor:pointer;

            background:#111827;

            color:#fff;

        }


        .module-toolbar button:hover,
        .form-actions button:hover,
        .admin-row button:hover,
        .order-actions button:hover{

            opacity:.85;

        }


        .stats-grid{

            display:grid;

            grid-template-columns:
                repeat(auto-fit,minmax(160px,1fr));

            gap:14px;

            margin-bottom:22px;

        }


        .stat-card{

            padding:18px;

            border-radius:14px;

            background:#f3f4f6;

            border:1px solid #e5e7eb;

        }


        .stat-card span{

            display:block;

            font-size:13px;

            color:#6b7280;

            margin-bottom:7px;

        }


        .stat-card strong{

            font-size:24px;

        }


        .control-center{

            padding:20px;

            background:#f8fafc;

            border-radius:15px;

            margin-bottom:20px;

        }


        .control-center h2{

            margin-top:0;

        }


        .form-card{

            padding:20px;

            margin-bottom:20px;

            background:#f8fafc;

            border:1px solid #e5e7eb;

            border-radius:14px;

        }


        .form-card input,
        .form-card select{

            width:100%;

            padding:12px;

            margin:7px 0;

            border:1px solid #d1d5db;

            border-radius:8px;

            font-size:15px;

            box-sizing:border-box;

        }


        .form-card label{

            display:block;

            margin:10px 0;

        }


        .form-actions{

            display:flex;

            gap:10px;

            flex-wrap:wrap;

            margin-top:12px;

        }


        .admin-list{

            display:flex;

            flex-direction:column;

            gap:10px;

        }


        .admin-row{

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:15px;

            padding:15px;

            border:1px solid #e5e7eb;

            border-radius:12px;

            background:#fff;

        }


        .admin-row small{

            display:block;

            margin-top:5px;

            color:#6b7280;

        }


        .admin-row > div:last-child{

            display:flex;

            gap:7px;

            flex-wrap:wrap;

        }


        .empty-module{

            padding:35px;

            text-align:center;

            background:#f8fafc;

            border-radius:14px;

        }


        .category-card{

            display:flex;

            align-items:center;

            justify-content:space-between;

            padding:14px;

            margin-bottom:10px;

            background:#fff;

            border:1px solid #e5e7eb;

            border-radius:12px;

        }


        .category-card button{

            border:0;

            padding:8px 12px;

            background:#ef4444;

            color:#fff;

            border-radius:7px;

            cursor:pointer;

        }


        .order-card{

            display:flex;

            align-items:flex-start;

            justify-content:space-between;

            gap:15px;

            padding:17px;

            margin-bottom:12px;

            background:#fff;

            border:1px solid #e5e7eb;

            border-radius:14px;

        }


        .order-main{

            display:flex;

            flex-direction:column;

            gap:7px;

        }


        .order-main > div{

            display:flex;

            gap:12px;

            flex-wrap:wrap;

        }


        .order-main span{

            color:#4b5563;

            font-size:14px;

        }


        .order-actions{

            display:flex;

            gap:7px;

            flex-wrap:wrap;

        }


        .status-completed{

            color:#15803d;

        }


        .status-pending{

            color:#ca8a04;

        }


        .status-cancelled{

            color:#dc2626;

        }


        .source-note{

            padding:10px;

            background:#eef2ff;

            border-radius:8px;

            margin:5px 0 10px;

            font-size:14px;

        }


        .public-landing-message{

            position:fixed;

            inset:0;

            z-index:100000;

            display:flex;

            align-items:center;

            justify-content:center;

            background:rgba(0,0,0,.8);

            padding:20px;

        }


        .public-landing-message > div{

            max-width:500px;

            width:100%;

            padding:35px;

            background:#fff;

            border-radius:20px;

            text-align:center;

        }


        @media(max-width:700px){

            .module-overlay{

                padding:8px;

            }


            .module-body{

                padding:13px;

            }


            .admin-row,
            .order-card{

                flex-direction:column;

            }


            .admin-row > div:last-child,
            .order-actions{

                width:100%;

            }


            .admin-row button,
            .order-actions button{

                flex:1;

            }

        }

    `;


    document.head.appendChild(style);
}


/* =========================================================
   JANJUA BRAND ANIMATION CSS
   ========================================================= */

function addBrandAnimationCSS(){

    if(document.getElementById("janjuaBrandAnimationCSS")){
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "janjuaBrandAnimationCSS";


    style.textContent = `

        #janjuaAnimatedBrand{

            width:100%;

            display:flex;

            justify-content:center;

            align-items:center;

            padding:12px 0;

            overflow:hidden;

        }


        .janjua-brand-animation{

            position:relative;

            width:420px;

            height:150px;

            display:flex;

            align-items:center;

            justify-content:center;

        }


        .brand-main{

            position:relative;

            z-index:10;

            text-align:center;

            color:#fff;

            animation:
                janjuaPulse 2.8s ease-in-out infinite;

        }


        .brand-title{

            font-size:44px;

            font-weight:900;

            letter-spacing:7px;

            text-shadow:
                0 0 10px rgba(255,255,255,.8),
                0 0 25px rgba(0,200,255,.7);

        }


        .brand-subtitle{

            font-size:12px;

            margin-top:3px;

            opacity:.9;

            letter-spacing:.5px;

        }


        .brand-status{

            margin-top:8px;

            font-size:11px;

            letter-spacing:2px;

        }


        .status-dot{

            display:inline-block;

            width:8px;

            height:8px;

            border-radius:50%;

            background:#22c55e;

            margin-right:5px;

            box-shadow:
                0 0 10px #22c55e;

            animation:
                janjuaStatusPulse 1.4s infinite;

        }


        .brand-orbit{

            position:absolute;

            border:1px solid rgba(255,255,255,.35);

            border-radius:50%;

            top:50%;

            left:50%;

            transform:
                translate(-50%,-50%);

        }


        .orbit-one{

            width:250px;

            height:80px;

            animation:
                janjuaOrbitOne 5s linear infinite;

        }


        .orbit-two{

            width:320px;

            height:105px;

            animation:
                janjuaOrbitTwo 7s linear infinite;

        }


        .orbit-three{

            width:390px;

            height:130px;

            animation:
                janjuaOrbitThree 9s linear infinite;

        }


        .orbit-one::after,
        .orbit-two::after,
        .orbit-three::after{

            content:"";

            position:absolute;

            width:8px;

            height:8px;

            border-radius:50%;

            background:#fff;

            box-shadow:
                0 0 15px #fff,
                0 0 25px rgba(0,200,255,.9);

        }


        .orbit-one::after{

            top:-4px;

            left:50%;

        }


        .orbit-two::after{

            right:-4px;

            top:50%;

        }


        .orbit-three::after{

            bottom:-4px;

            left:50%;

        }


        @keyframes janjuaPulse{

            0%,100%{

                transform:scale(1);

            }

            50%{

                transform:scale(1.04);

            }

        }


        @keyframes janjuaStatusPulse{

            0%,100%{

                opacity:1;

                transform:scale(1);

            }

            50%{

                opacity:.35;

                transform:scale(.7);

            }

        }


        @keyframes janjuaOrbitOne{

            from{

                transform:
                    translate(-50%,-50%)
                    rotate(0deg);

            }

            to{

                transform:
                    translate(-50%,-50%)
                    rotate(360deg);

            }

        }


        @keyframes janjuaOrbitTwo{

            from{

                transform:
                    translate(-50%,-50%)
                    rotate(360deg);

            }

            to{

                transform:
                    translate(-50%,-50%)
                    rotate(0deg);

            }

        }


        @keyframes janjuaOrbitThree{

            from{

                transform:
                    translate(-50%,-50%)
                    rotate(0deg);

            }

            to{

                transform:
                    translate(-50%,-50%)
                    rotate(360deg);

            }

        }


        @media(max-width:600px){

            .janjua-brand-animation{

                width:330px;

                height:130px;

            }


            .brand-title{

                font-size:32px;

            }


            .brand-subtitle{

                font-size:10px;

            }


            .orbit-one{

                width:210px;

            }


            .orbit-two{

                width:270px;

            }


            .orbit-three{

                width:320px;

            }

        }

    `;


    document.head.appendChild(style);
}
