/* =========================================================
   JANJUA - ALL IN ONE MARKETING PLATFORM
   COMPLETE APP.JS
   Orders + Tracking + Promoter + Social Analytics
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v4";

/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultData = {

    categories: [
        {id:"cat1",name:"Automotive"},
        {id:"cat2",name:"Motorcycles"},
        {id:"cat3",name:"Mobile & Electronics"},
        {id:"cat4",name:"Fashion"},
        {id:"cat5",name:"Beauty"},
        {id:"cat6",name:"Health"},
        {id:"cat7",name:"Home & Living"},
        {id:"cat8",name:"Food"},
        {id:"cat9",name:"Travel"},
        {id:"cat10",name:"Jobs & Services"},
        {id:"cat11",name:"Banking & Finance"},
        {id:"cat12",name:"Insurance"},
        {id:"cat13",name:"Education"},
        {id:"cat14",name:"Other"}
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
   LOAD DATA
   ========================================================= */

let data = loadData();

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

        console.error("Data loading error:",error);

        return JSON.parse(JSON.stringify(defaultData));

    }

}


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
   HELPERS
   ========================================================= */

function createId(prefix="id"){

    return prefix + "_" +
        Date.now().toString(36) +
        "_" +
        Math.random()
            .toString(36)
            .substring(2,8);

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

    const number = Number(value) || 0;

    return "Rs. " +
        number.toLocaleString("en-PK",{
            maximumFractionDigits:2
        });

}


function formatDate(value){

    if(!value){

        return "-";

    }

    const d = new Date(value);

    if(isNaN(d.getTime())){

        return value;

    }

    return d.toLocaleString();

}


function getProgram(id){

    return data.programs.find(
        p => p.id === id
    );

}


function getPromoter(id){

    return data.promoters.find(
        p => p.id === id
    );

}


function getTrackingLink(id){

    return data.trackingLinks.find(
        x => x.id === id
    );

}


function getSocialLink(id){

    return data.socialLinks.find(
        x => x.id === id
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded",function(){

    addAnimatedBranding();

    addBrandAnimationCSS();

    handlePublicTracking();

    handlePublicSocialLink();

    renderCategories();

});


/* =========================================================
   ANIMATED JANJUA BRAND
   ========================================================= */

function addAnimatedBranding(){

    const header = document.querySelector("header");

    if(!header){

        return;

    }

    const oldBrand =
        header.querySelector(".brand-area");

    if(oldBrand){

        oldBrand.style.display = "none";

    }

    const oldStatus =
        header.querySelector(".header-status");

    if(oldStatus){

        oldStatus.style.display = "none";

    }

    const oldAnimated =
        document.getElementById(
            "janjuaAnimatedBrand"
        );

    if(oldAnimated){

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
   OPEN MODULE
   ========================================================= */

function openModule(module){

    const content =
        document.getElementById(
            "moduleContent"
        );

    if(!content){

        return;

    }

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

    const moduleBox =
        document.getElementById(
            "moduleArea"
        );

    if(moduleBox){

        moduleBox.scrollIntoView({
            behavior:"smooth"
        });

    }

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboardModule(content){

    const totalClicks =
        data.clicks.length;

    const promoterClicks =
        data.clicks.filter(
            x => x.type === "promoter"
        ).length;

    const socialClicks =
        data.clicks.filter(
            x => x.type === "social"
        ).length;

    const totalOrders =
        data.orders.length;

    const completed =
        data.orders.filter(
            x => x.status === "Completed"
        ).length;

    const pending =
        data.orders.filter(
            x => x.status === "Pending"
        ).length;

    const cancelled =
        data.orders.filter(
            x => x.status === "Cancelled"
        ).length;

    const sales =
        data.orders
            .filter(x => x.status === "Completed")
            .reduce(
                (sum,x) =>
                    sum + (Number(x.amount) || 0),
                0
            );

    const conversion =
        totalClicks > 0
        ? ((completed / totalClicks) * 100).toFixed(2)
        : "0.00";

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Dashboard
                </h2>

                <p>
                    JANJUA Marketing Performance Overview
                </p>

            </div>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total Clicks",
                totalClicks,
                "🔗"
            )}

            ${statCard(
                "Promoter Clicks",
                promoterClicks,
                "👤"
            )}

            ${statCard(
                "Social Clicks",
                socialClicks,
                "📱"
            )}

            ${statCard(
                "Total Orders",
                totalOrders,
                "🛒"
            )}

            ${statCard(
                "Completed",
                completed,
                "✅"
            )}

            ${statCard(
                "Pending",
                pending,
                "⏳"
            )}

            ${statCard(
                "Cancelled",
                cancelled,
                "❌"
            )}

            ${statCard(
                "Conversion Rate",
                conversion + "%",
                "📈"
            )}

            ${statCard(
                "Total Sales",
                formatMoney(sales),
                "💰"
            )}

        </div>


        <div class="analytics-panel">

            <h3>
                Quick Performance
            </h3>

            <p>
                Clicks → Orders → Completed Orders
            </p>

            <div class="performance-bar">

                <div>
                    Clicks:
                    <strong>${totalClicks}</strong>
                </div>

                <div>
                    Orders:
                    <strong>${totalOrders}</strong>
                </div>

                <div>
                    Completed:
                    <strong>${completed}</strong>
                </div>

                <div>
                    Conversion:
                    <strong>${conversion}%</strong>
                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   STAT CARD
   ========================================================= */

function statCard(title,value,icon){

    return `

        <div class="stat-card">

            <div class="stat-icon">
                ${icon}
            </div>

            <div>

                <div class="stat-title">
                    ${escapeHTML(title)}
                </div>

                <div class="stat-value">
                    ${escapeHTML(value)}
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
        document.getElementById(
            "categoryList"
        );

    if(!list){

        return;

    }

    list.innerHTML =
        data.categories.map(cat => `

            <div class="category-card">

                <h3>
                    ${escapeHTML(cat.name)}
                </h3>

                <small>
                    Category ID:
                    ${escapeHTML(cat.id)}
                </small>

            </div>

        `).join("");

}


function renderCategoryModule(content){

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Categories
                </h2>

                <p>
                    Manage marketing categories
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="showCategoryForm()"
            >
                + Add Category
            </button>

        </div>

        <div id="categoryFormArea"></div>

        <div class="module-list">

            ${data.categories.map(cat => `

                <div class="list-card">

                    <div>

                        <h3>
                            ${escapeHTML(cat.name)}
                        </h3>

                        <small>
                            ${escapeHTML(cat.id)}
                        </small>

                    </div>

                    <button
                        class="danger-btn"
                        onclick="deleteCategory('${cat.id}')"
                    >
                        Delete
                    </button>

                </div>

            `).join("")}

        </div>

    `;

}


function showCategoryForm(){

    const area =
        document.getElementById(
            "categoryFormArea"
        );

    if(!area){

        return;

    }

    area.innerHTML = `

        <div class="form-card">

            <input
                id="newCategoryName"
                placeholder="Category Name"
            >

            <button
                class="primary-btn"
                onclick="saveCategory()"
            >
                Save
            </button>

            <button
                class="secondary-btn"
                onclick="renderCategoryModule(
                    document.getElementById('moduleContent')
                )"
            >
                Cancel
            </button>

        </div>

    `;

}


function saveCategory(){

    const input =
        document.getElementById(
            "newCategoryName"
        );

    const name =
        input ? input.value.trim() : "";

    if(!name){

        alert("Please enter category name.");

        return;

    }

    data.categories.push({

        id:createId("cat"),

        name:name

    });

    saveData();

    renderCategories();

    renderCategoryModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


function deleteCategory(id){

    if(!confirm("Delete this category?")){

        return;

    }

    data.categories =
        data.categories.filter(
            x => x.id !== id
        );

    saveData();

    renderCategories();

    renderCategoryModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


/* =========================================================
   PROVIDERS
   ========================================================= */

function renderProviderModule(content){

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Providers & Companies
                </h2>

                <p>
                    Affiliate providers and companies
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="showProviderForm()"
            >
                + Add Provider
            </button>

        </div>

        <div id="providerFormArea"></div>

        <div class="module-list">

            ${
                data.providers.length
                ?
                data.providers.map(p => `

                    <div class="list-card">

                        <div>

                            <h3>
                                ${escapeHTML(p.name)}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    p.website || ""
                                )}
                            </p>

                        </div>

                        <button
                            class="danger-btn"
                            onclick="deleteProvider('${p.id}')"
                        >
                            Delete
                        </button>

                    </div>

                `).join("")
                :
                `<div class="empty-module">
                    No providers added yet.
                </div>`
            }

        </div>

    `;

}


function showProviderForm(){

    const area =
        document.getElementById(
            "providerFormArea"
        );

    area.innerHTML = `

        <div class="form-card">

            <input
                id="providerName"
                placeholder="Provider / Company Name"
            >

            <input
                id="providerWebsite"
                placeholder="Website"
            >

            <button
                class="primary-btn"
                onclick="saveProvider()"
            >
                Save Provider
            </button>

        </div>

    `;

}


function saveProvider(){

    const name =
        document.getElementById(
            "providerName"
        ).value.trim();

    const website =
        document.getElementById(
            "providerWebsite"
        ).value.trim();

    if(!name){

        alert("Enter provider name.");

        return;

    }

    data.providers.push({

        id:createId("provider"),

        name:name,

        website:website

    });

    saveData();

    renderProviderModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


function deleteProvider(id){

    if(!confirm("Delete provider?")){

        return;

    }

    data.providers =
        data.providers.filter(
            x => x.id !== id
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

function renderProgramModule(content){

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Programs & Offers
                </h2>

                <p>
                    Manage affiliate programs and offers
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="showProgramForm()"
            >
                + Add Program
            </button>

        </div>

        <div id="programFormArea"></div>

        <div class="module-list">

            ${
                data.programs.length
                ?
                data.programs.map(p => `

                    <div class="list-card">

                        <div>

                            <h3>
                                ${escapeHTML(p.name)}
                            </h3>

                            <p>
                                Commission:
                                ${escapeHTML(
                                    String(
                                        p.commissionRate || 0
                                    )
                                )}%
                            </p>

                        </div>

                        <button
                            class="danger-btn"
                            onclick="deleteProgram('${p.id}')"
                        >
                            Delete
                        </button>

                    </div>

                `).join("")
                :
                `<div class="empty-module">
                    No programs added yet.
                </div>`
            }

        </div>

    `;

}


function showProgramForm(){

    const area =
        document.getElementById(
            "programFormArea"
        );

    area.innerHTML = `

        <div class="form-card">

            <input
                id="programName"
                placeholder="Program / Offer Name"
            >

            <input
                id="programRate"
                type="number"
                min="0"
                step="0.01"
                placeholder="Commission %"
            >

            <input
                id="programAffiliateUrl"
                placeholder="Original Affiliate URL"
            >

            <button
                class="primary-btn"
                onclick="saveProgram()"
            >
                Save Program
            </button>

        </div>

    `;

}


function saveProgram(){

    const name =
        document.getElementById(
            "programName"
        ).value.trim();

    const rate =
        Number(
            document.getElementById(
                "programRate"
            ).value
        ) || 0;

    const url =
        document.getElementById(
            "programAffiliateUrl"
        ).value.trim();

    if(!name){

        alert("Enter program name.");

        return;

    }

    data.programs.push({

        id:createId("program"),

        name:name,

        commissionRate:rate,

        affiliateUrl:url

    });

    saveData();

    renderProgramModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


function deleteProgram(id){

    if(!confirm("Delete program?")){

        return;

    }

    data.programs =
        data.programs.filter(
            x => x.id !== id
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

function renderPromoterModule(content){

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Promoters / Workers
                </h2>

                <p>
                    Manage promoters and performance
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="showPromoterForm()"
            >
                + Add Promoter
            </button>

        </div>

        <div id="promoterFormArea"></div>

        <div class="module-list">

            ${
                data.promoters.length
                ?
                data.promoters.map(p => {

                    const stats =
                        getPromoterStats(p.id);

                    return `

                        <div class="list-card">

                            <div>

                                <h3>
                                    ${escapeHTML(p.name)}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        p.phone || ""
                                    )}
                                </p>

                                <small>

                                    Clicks:
                                    ${stats.clicks}
                                    |
                                    Orders:
                                    ${stats.orders}
                                    |
                                    Completed:
                                    ${stats.completed}
                                    |
                                    Conversion:
                                    ${stats.conversion}%

                                </small>

                            </div>

                            <button
                                class="danger-btn"
                                onclick="deletePromoter('${p.id}')"
                            >
                                Delete
                            </button>

                        </div>

                    `;

                }).join("")
                :
                `<div class="empty-module">
                    No promoters added yet.
                </div>`
            }

        </div>

    `;

}


function showPromoterForm(){

    const area =
        document.getElementById(
            "promoterFormArea"
        );

    area.innerHTML = `

        <div class="form-card">

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

            <button
                class="primary-btn"
                onclick="savePromoter()"
            >
                Save Promoter
            </button>

        </div>

    `;

}


function savePromoter(){

    const name =
        document.getElementById(
            "promoterName"
        ).value.trim();

    const phone =
        document.getElementById(
            "promoterPhone"
        ).value.trim();

    const email =
        document.getElementById(
            "promoterEmail"
        ).value.trim();

    if(!name){

        alert("Enter promoter name.");

        return;

    }

    data.promoters.push({

        id:createId("promoter"),

        name:name,

        phone:phone,

        email:email

    });

    saveData();

    renderPromoterModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


function deletePromoter(id){

    if(!confirm("Delete promoter?")){

        return;

    }

    data.promoters =
        data.promoters.filter(
            x => x.id !== id
        );

    data.assignments =
        data.assignments.filter(
            x => x.promoterId !== id
        );

    saveData();

    renderPromoterModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


/* =========================================================
   PROMOTER STATS
   ========================================================= */

function getPromoterStats(promoterId){

    const clicks =
        data.clicks.filter(
            x =>
                x.type === "promoter" &&
                x.promoterId === promoterId
        );

    const orders =
        data.orders.filter(
            x =>
                x.source === "Promoter" &&
                x.promoterId === promoterId
        );

    const completed =
        orders.filter(
            x => x.status === "Completed"
        );

    const conversion =
        clicks.length > 0
        ?
        (
            completed.length /
            clicks.length *
            100
        ).toFixed(2)
        :
        "0.00";

    const sales =
        completed.reduce(
            (sum,x) =>
                sum + Number(x.amount || 0),
            0
        );

    return {

        clicks:clicks.length,

        orders:orders.length,

        completed:completed.length,

        conversion:conversion,

        sales:sales

    };

}


/* =========================================================
   TRACKING MODULE
   ========================================================= */

function renderTrackingModule(content){

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Tracking Links
                </h2>

                <p>
                    Track promoter and social marketing performance.
                </p>

            </div>

            <div class="button-row">

                <button
                    class="primary-btn"
                    onclick="showAssignmentForm()"
                >
                    + Assign Program to Promoter
                </button>

                <button
                    class="secondary-btn"
                    onclick="showSocialLinkForm()"
                >
                    + Social Media Link
                </button>

            </div>

        </div>


        <div id="assignmentFormArea"></div>

        <div id="socialLinkFormArea"></div>


        <div class="analytics-panel">

            <h3>
                Tracking Overview
            </h3>

            <div class="performance-bar">

                <div>
                    Total:
                    <strong>
                        ${data.clicks.length}
                    </strong>
                </div>

                <div>
                    Promoter:
                    <strong>
                        ${
                            data.clicks.filter(
                                x => x.type === "promoter"
                            ).length
                        }
                    </strong>
                </div>

                <div>
                    Social:
                    <strong>
                        ${
                            data.clicks.filter(
                                x => x.type === "social"
                            ).length
                        }
                    </strong>
                </div>

            </div>

        </div>


        <h3>
            🔗 Promoter Tracking Links
        </h3>

        <div class="module-list">

            ${
                data.trackingLinks.length
                ?
                data.trackingLinks.map(link => {

                    const promoter =
                        getPromoter(
                            link.promoterId
                        );

                    const program =
                        getProgram(
                            link.programId
                        );

                    const clicks =
                        data.clicks.filter(
                            x =>
                                x.type === "promoter" &&
                                x.trackingLinkId === link.id
                        ).length;

                    const orders =
                        data.orders.filter(
                            x =>
                                x.trackingLinkId === link.id
                        );

                    const completed =
                        orders.filter(
                            x =>
                                x.status === "Completed"
                        ).length;

                    const conversion =
                        clicks > 0
                        ?
                        (
                            completed /
                            clicks *
                            100
                        ).toFixed(2)
                        :
                        "0.00";

                    return `

                        <div class="list-card">

                            <div>

                                <h3>
                                    ${escapeHTML(
                                        promoter?.name || "Unknown"
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        program?.name || "Program"
                                    )}
                                </p>

                                <small>

                                    Clicks:
                                    ${clicks}
                                    |
                                    Orders:
                                    ${orders.length}
                                    |
                                    Conversion:
                                    ${conversion}%

                                </small>

                                <br>

                                <small>
                                    ${escapeHTML(link.url)}
                                </small>

                            </div>

                            <div class="button-row">

                                <button
                                    class="secondary-btn"
                                    onclick="copyTrackingLink('${link.id}')"
                                >
                                    Copy
                                </button>

                                <button
                                    class="secondary-btn"
                                    onclick="testTrackingLink('${link.id}')"
                                >
                                    Test
                                </button>

                                <button
                                    class="danger-btn"
                                    onclick="deleteTrackingLink('${link.id}')"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `;

                }).join("")
                :
                `<div class="empty-module">
                    No promoter tracking links yet.
                </div>`
            }

        </div>


        <h2>
            📱 Social Media Links
        </h2>

        <p>
            Admin-generated links for Facebook,
            Instagram, TikTok and WhatsApp.
        </p>

        <div id="socialLinksArea">

            ${
                renderSocialLinksHTML()
            }

        </div>

    `;

}


/* =========================================================
   ASSIGN PROGRAM TO PROMOTER
   ========================================================= */

function showAssignmentForm(){

    const area =
        document.getElementById(
            "assignmentFormArea"
        );

    if(!area){

        return;

    }

    area.innerHTML = `

        <div class="form-card">

            <h3>
                Assign Program to Promoter
            </h3>

            <select id="assignmentPromoter">

                <option value="">
                    Select Promoter
                </option>

                ${
                    data.promoters.map(p => `

                        <option value="${p.id}">
                            ${escapeHTML(p.name)}
                        </option>

                    `).join("")
                }

            </select>


            <select id="assignmentProgram">

                <option value="">
                    Select Program
                </option>

                ${
                    data.programs.map(p => `

                        <option value="${p.id}">
                            ${escapeHTML(p.name)}
                        </option>

                    `).join("")
                }

            </select>


            <button
                class="primary-btn"
                onclick="createPromoterTrackingLink()"
            >
                Create Tracking Link
            </button>

        </div>

    `;

}


function createPromoterTrackingLink(){

    const promoterId =
        document.getElementById(
            "assignmentPromoter"
        ).value;

    const programId =
        document.getElementById(
            "assignmentProgram"
        ).value;

    if(!promoterId || !programId){

        alert(
            "Select promoter and program."
        );

        return;

    }

    const program =
        getProgram(programId);

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

    const link = {

        id:createId("tracking"),

        code:code,

        promoterId:promoterId,

        programId:programId,

        originalUrl:
            program?.affiliateUrl || "",

        url:url,

        clicks:0,

        active:true,

        createdAt:
            new Date().toISOString()

    };

    data.trackingLinks.push(link);

    data.assignments.push({

        id:createId("assignment"),

        promoterId:promoterId,

        programId:programId,

        trackingLinkId:link.id,

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
        "Promoter tracking link created."
    );

}


/* =========================================================
   COPY / TEST / DELETE TRACKING LINK
   ========================================================= */

function copyTrackingLink(id){

    const link =
        getTrackingLink(id);

    if(!link){

        return;

    }

    navigator.clipboard
        .writeText(link.url)
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


function testTrackingLink(id){

    const link =
        getTrackingLink(id);

    if(!link){

        return;

    }

    window.open(
        link.url,
        "_blank"
    );

}


function deleteTrackingLink(id){

    if(!confirm(
        "Delete this tracking link?"
    )){

        return;

    }

    data.trackingLinks =
        data.trackingLinks.filter(
            x => x.id !== id
        );

    data.assignments =
        data.assignments.filter(
            x =>
                x.trackingLinkId !== id
        );

    saveData();

    renderTrackingModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


/* =========================================================
   PUBLIC PROMOTER TRACKING
   ========================================================= */

function handlePublicTracking(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const code =
        params.get("track");

    if(!code){

        return;

    }

    const link =
        data.trackingLinks.find(
            x =>
                x.code === code &&
                x.active !== false
        );

    if(!link){

        return;

    }

    link.clicks =
        Number(link.clicks || 0) + 1;

    data.clicks.push({

        id:createId("click"),

        type:"promoter",

        trackingLinkId:link.id,

        promoterId:link.promoterId,

        programId:link.programId,

        code:code,

        createdAt:
            new Date().toISOString()

    });

    saveData();

    showPublicLandingMessage(
        "Promoter",
        link
    );

}


/* =========================================================
   SOCIAL MEDIA
   ========================================================= */

function showSocialLinkForm(){

    const area =
        document.getElementById(
            "socialLinkFormArea"
        );

    if(!area){

        return;

    }

    area.innerHTML = `

        <div class="form-card">

            <h3>
                Create Social Media Link
            </h3>

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
                    data.programs.map(p => `

                        <option value="${p.id}">
                            ${escapeHTML(p.name)}
                        </option>

                    `).join("")
                }

            </select>


            <button
                class="primary-btn"
                onclick="createSocialMediaLink()"
            >
                Create Link
            </button>

        </div>

    `;

}


function createSocialMediaLink(){

    const platform =
        document.getElementById(
            "socialPlatform"
        ).value;

    const programId =
        document.getElementById(
            "socialProgram"
        ).value;

    if(!platform || !programId){

        alert(
            "Select platform and program."
        );

        return;

    }

    const program =
        getProgram(programId);

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

        code:code,

        platform:platform,

        programId:programId,

        originalUrl:
            program?.affiliateUrl || "",

        url:url,

        clicks:0,

        active:true,

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
        "Social media link created."
    );

}


/* =========================================================
   SOCIAL LINKS HTML
   ========================================================= */

function renderSocialLinksHTML(){

    if(!data.socialLinks.length){

        return `

            <div class="empty-module">

                No social media links yet.

            </div>

        `;

    }

    return data.socialLinks.map(link => {

        const program =
            getProgram(
                link.programId
            );

        const clicks =
            data.clicks.filter(
                x =>
                    x.type === "social" &&
                    x.socialCode === link.code
            ).length;

        const orders =
            data.orders.filter(
                x =>
                    x.source === "Social Media" &&
                    x.socialLinkId === link.id
            );

        const completed =
            orders.filter(
                x =>
                    x.status === "Completed"
            ).length;

        const conversion =
            clicks > 0
            ?
            (
                completed /
                clicks *
                100
            ).toFixed(2)
            :
            "0.00";

        return `

            <div class="list-card">

                <div>

                    <h3>
                        ${escapeHTML(
                            link.platform
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            program?.name || ""
                        )}
                    </p>

                    <small>

                        Clicks:
                        ${clicks}
                        |
                        Orders:
                        ${orders.length}
                        |
                        Completed:
                        ${completed}
                        |
                        Conversion:
                        ${conversion}%

                    </small>

                    <br>

                    <small>
                        ${escapeHTML(link.url)}
                    </small>

                </div>

                <div class="button-row">

                    <button
                        class="secondary-btn"
                        onclick="copySocialLink('${link.id}')"
                    >
                        Copy
                    </button>

                    <button
                        class="secondary-btn"
                        onclick="testSocialLink('${link.id}')"
                    >
                        Test
                    </button>

                    <button
                        class="danger-btn"
                        onclick="deleteSocialLink('${link.id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;

    }).join("");

}


/* =========================================================
   SOCIAL LINK FUNCTIONS
   ========================================================= */

function copySocialLink(id){

    const link =
        getSocialLink(id);

    if(!link){

        return;

    }

    navigator.clipboard
        .writeText(link.url)
        .then(() => {

            alert(
                "Social link copied."
            );

        })
        .catch(() => {

            prompt(
                "Copy this link:",
                link.url
            );

        });

}


function testSocialLink(id){

    const link =
        getSocialLink(id);

    if(!link){

        return;

    }

    window.open(
        link.url,
        "_blank"
    );

}


function deleteSocialLink(id){

    if(!confirm(
        "Delete this social media link?"
    )){

        return;

    }

    data.socialLinks =
        data.socialLinks.filter(
            x => x.id !== id
        );

    saveData();

    renderTrackingModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


/* =========================================================
   PUBLIC SOCIAL TRACKING
   ========================================================= */

function handlePublicSocialLink(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const code =
        params.get("social");

    if(!code){

        return;

    }

    const link =
        data.socialLinks.find(
            x =>
                x.code === code &&
                x.active !== false
        );

    if(!link){

        return;

    }

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

    showPublicLandingMessage(
        "Social Media",
        link
    );

}


/* =========================================================
   PUBLIC LANDING
   ========================================================= */

function showPublicLandingMessage(
    type,
    link
){

    const program =
        getProgram(
            link.programId
        );

    const box =
        document.createElement("div");

    box.className =
        "public-tracking-box";

    box.innerHTML = `

        <div>

            <h2>
                JANJUA
            </h2>

            <p>
                ${escapeHTML(type)}
                Tracking Active
            </p>

            <h3>
                ${escapeHTML(
                    program?.name || "Marketing Offer"
                )}
            </h3>

            <p>
                Your visit has been recorded.
            </p>

            ${
                link.originalUrl
                ?
                `<button
                    class="primary-btn"
                    id="continueAffiliateButton"
                >
                    Continue
                </button>`
                :
                ""
            }

        </div>

    `;

    document.body.innerHTML = "";

    document.body.appendChild(box);

    const btn =
        document.getElementById(
            "continueAffiliateButton"
        );

    if(btn){

        btn.onclick = function(){

            if(link.originalUrl){

                window.location.href =
                    link.originalUrl;

            }

        };

    }

}


/* =========================================================
   ORDERS & CLICKS
   ========================================================= */

function renderOrdersModule(content){

    const completed =
        data.orders.filter(
            x => x.status === "Completed"
        );

    const pending =
        data.orders.filter(
            x => x.status === "Pending"
        );

    const cancelled =
        data.orders.filter(
            x => x.status === "Cancelled"
        );

    const sales =
        completed.reduce(
            (sum,x) =>
                sum + Number(x.amount || 0),
            0
        );

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Orders & Clicks
                </h2>

                <p>
                    Track clicks, orders and attribution.
                </p>

            </div>

            <button
                class="primary-btn"
                onclick="showOrderForm()"
            >
                + Add Order
            </button>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total Clicks",
                data.clicks.length,
                "🔗"
            )}

            ${statCard(
                "Promoter Clicks",
                data.clicks.filter(
                    x => x.type === "promoter"
                ).length,
                "👤"
            )}

            ${statCard(
                "Social Clicks",
                data.clicks.filter(
                    x => x.type === "social"
                ).length,
                "📱"
            )}

            ${statCard(
                "Total Orders",
                data.orders.length,
                "🛒"
            )}

            ${statCard(
                "Completed",
                completed.length,
                "✅"
            )}

            ${statCard(
                "Pending",
                pending.length,
                "⏳"
            )}

            ${statCard(
                "Cancelled",
                cancelled.length,
                "❌"
            )}

            ${statCard(
                "Total Sales",
                formatMoney(sales),
                "💰"
            )}

        </div>


        <div id="orderFormArea"></div>


        <div class="module-list">

            ${
                data.orders.length
                ?
                [...data.orders]
                    .sort(
                        (a,b) =>
                            new Date(b.createdAt) -
                            new Date(a.createdAt)
                    )
                    .map(order =>
                        orderCard(order)
                    )
                    .join("")
                :
                `<div class="empty-module">
                    No orders yet.
                </div>`
            }

        </div>

    `;

}


/* =========================================================
   ORDER CARD
   ========================================================= */

function orderCard(order){

    const program =
        getProgram(
            order.programId
        );

    let sourceText =
        order.source || "Direct";

    if(order.source === "Promoter"){

        const promoter =
            getPromoter(
                order.promoterId
            );

        sourceText +=
            " - " +
            (
                promoter?.name ||
                "Unknown Promoter"
            );

    }

    if(order.source === "Social Media"){

        sourceText +=
            " - " +
            (
                order.platform ||
                "Social"
            );

    }

    return `

        <div class="list-card">

            <div>

                <h3>
                    Order:
                    ${escapeHTML(
                        order.orderNumber
                    )}
                </h3>

                <p>
                    Customer:
                    ${escapeHTML(
                        order.customer || "-"
                    )}
                </p>

                <p>
                    Program:
                    ${escapeHTML(
                        program?.name || "-"
                    )}
                </p>

                <p>
                    Source:
                    ${escapeHTML(
                        sourceText
                    )}
                </p>

                <small>

                    Amount:
                    <strong>
                        ${formatMoney(
                            order.amount
                        )}
                    </strong>

                    |
                    Status:
                    ${escapeHTML(
                        order.status
                    )}

                </small>

                <br>

                <small>
                    ${formatDate(
                        order.createdAt
                    )}
                </small>

            </div>

            <div class="button-row">

                <button
                    class="secondary-btn"
                    onclick="editOrder('${order.id}')"
                >
                    Edit
                </button>

                <button
                    class="danger-btn"
                    onclick="deleteOrder('${order.id}')"
                >
                    Delete
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   ORDER FORM
   ========================================================= */

function showOrderForm(orderId=null){

    const area =
        document.getElementById(
            "orderFormArea"
        );

    if(!area){

        return;

    }

    const order =
        orderId
        ?
        data.orders.find(
            x => x.id === orderId
        )
        :
        null;

    area.innerHTML = `

        <div class="form-card">

            <h3>
                ${order ? "Edit Order" : "Add Order"}
            </h3>


            <input
                id="orderNumber"
                placeholder="Order ID / Order Number"
                value="${escapeHTML(
                    order?.orderNumber || ""
                )}"
            >


            <select
                id="orderSource"
                onchange="updateOrderSourceFields()"
            >

                <option
                    value="Direct"
                    ${
                        order?.source === "Direct"
                        ? "selected"
                        : ""
                    }
                >
                    Direct
                </option>

                <option
                    value="Promoter"
                    ${
                        order?.source === "Promoter"
                        ? "selected"
                        : ""
                    }
                >
                    Promoter
                </option>

                <option
                    value="Social Media"
                    ${
                        order?.source === "Social Media"
                        ? "selected"
                        : ""
                    }
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
                    data.programs.map(p => `

                        <option
                            value="${p.id}"
                            ${
                                order?.programId === p.id
                                ? "selected"
                                : ""
                            }
                        >
                            ${escapeHTML(p.name)}
                        </option>

                    `).join("")
                }

            </select>


            <input
                id="orderCustomer"
                placeholder="Customer / Order Reference"
                value="${escapeHTML(
                    order?.customer || ""
                )}"
            >


            <input
                id="orderAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="Order Amount"
                value="${order?.amount || ""}"
            >


            <select id="orderStatus">

                <option
                    value="Pending"
                    ${
                        !order ||
                        order.status === "Pending"
                        ? "selected"
                        : ""
                    }
                >
                    Pending
                </option>

                <option
                    value="Completed"
                    ${
                        order?.status === "Completed"
                        ? "selected"
                        : ""
                    }
                >
                    Completed
                </option>

                <option
                    value="Cancelled"
                    ${
                        order?.status === "Cancelled"
                        ? "selected"
                        : ""
                    }
                >
                    Cancelled
                </option>

            </select>


            <input
                id="orderDateTime"
                type="datetime-local"
                value="${
                    order
                    ?
                    toDateTimeLocal(
                        order.createdAt
                    )
                    :
                    toDateTimeLocal(
                        new Date()
                    )
                }"
            >


            <input
                type="hidden"
                id="editingOrderId"
                value="${order?.id || ""}"
            >


            <div class="button-row">

                <button
                    class="primary-btn"
                    onclick="saveOrder()"
                >
                    Save Order
                </button>

                <button
                    class="secondary-btn"
                    onclick="cancelOrderForm()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

    updateOrderSourceFields(
        order
    );

}


/* =========================================================
   DATETIME
   ========================================================= */

function toDateTimeLocal(value){

    const d =
        value instanceof Date
        ?
        value
        :
        new Date(value);

    if(isNaN(d.getTime())){

        return "";

    }

    const pad =
        n => String(n).padStart(2,"0");

    return (
        d.getFullYear() +
        "-" +
        pad(d.getMonth()+1) +
        "-" +
        pad(d.getDate()) +
        "T" +
        pad(d.getHours()) +
        ":" +
        pad(d.getMinutes())
    );

}


/* =========================================================
   ORDER SOURCE FIELDS
   ========================================================= */

function updateOrderSourceFields(existingOrder=null){

    const source =
        document.getElementById(
            "orderSource"
        )?.value;

    const area =
        document.getElementById(
            "orderSourceFields"
        );

    if(!area){

        return;

    }

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
                    data.trackingLinks.map(link => {

                        const promoter =
                            getPromoter(
                                link.promoterId
                            );

                        const program =
                            getProgram(
                                link.programId
                            );

                        return `

                            <option
                                value="${link.id}"
                                ${
                                    existingOrder?.trackingLinkId === link.id
                                    ? "selected"
                                    : ""
                                }
                            >
                                ${
                                    escapeHTML(
                                        promoter?.name || "Promoter"
                                    )
                                }
                                -
                                ${
                                    escapeHTML(
                                        program?.name || "Program"
                                    )
                                }
                            </option>

                        `;

                    }).join("")
                }

            </select>

        `;

    }
    else if(source === "Social Media"){

        area.innerHTML = `

            <select
                id="orderSocialLink"
                onchange="setProgramFromSocialLink()"
            >

                <option value="">
                    Select Social Link
                </option>

                ${
                    data.socialLinks.map(link => `

                        <option
                            value="${link.id}"
                            ${
                                existingOrder?.socialLinkId === link.id
                                ? "selected"
                                : ""
                            }
                        >
                            ${
                                escapeHTML(
                                    link.platform
                                )
                            }
                            -
                            ${
                                escapeHTML(
                                    getProgram(
                                        link.programId
                                    )?.name || ""
                                )
                            }
                        </option>

                    `).join("")
                }

            </select>

        `;

    }
    else{

        area.innerHTML = "";

    }

}


/* =========================================================
   AUTO PROGRAM FROM TRACKING LINK
   ========================================================= */

function setProgramFromTrackingLink(){

    const id =
        document.getElementById(
            "orderTrackingLink"
        )?.value;

    const link =
        getTrackingLink(id);

    if(!link){

        return;

    }

    const programSelect =
        document.getElementById(
            "orderProgram"
        );

    if(programSelect){

        programSelect.value =
            link.programId;

    }

}


/* =========================================================
   AUTO PROGRAM FROM SOCIAL LINK
   ========================================================= */

function setProgramFromSocialLink(){

    const id =
        document.getElementById(
            "orderSocialLink"
        )?.value;

    const link =
        getSocialLink(id);

    if(!link){

        return;

    }

    const programSelect =
        document.getElementById(
            "orderProgram"
        );

    if(programSelect){

        programSelect.value =
            link.programId;

    }

}


/* =========================================================
   SAVE ORDER
   ========================================================= */

function saveOrder(){

    const orderNumber =
        document.getElementById(
            "orderNumber"
        ).value.trim();

    const source =
        document.getElementById(
            "orderSource"
        ).value;

    const programId =
        document.getElementById(
            "orderProgram"
        ).value;

    const customer =
        document.getElementById(
            "orderCustomer"
        ).value.trim();

    const amount =
        Number(
            document.getElementById(
                "orderAmount"
            ).value
        ) || 0;

    const status =
        document.getElementById(
            "orderStatus"
        ).value;

    const dateTime =
        document.getElementById(
            "orderDateTime"
        ).value;

    const editingId =
        document.getElementById(
            "editingOrderId"
        ).value;

    if(!orderNumber){

        alert(
            "Please enter order number."
        );

        return;

    }

    if(!programId){

        alert(
            "Please select program."
        );

        return;

    }

    let trackingLinkId = "";

    let socialLinkId = "";

    let promoterId = "";

    let platform = "";

    if(source === "Promoter"){

        trackingLinkId =
            document.getElementById(
                "orderTrackingLink"
            )?.value || "";

        const link =
            getTrackingLink(
                trackingLinkId
            );

        if(link){

            promoterId =
                link.promoterId;

        }

    }

    if(source === "Social Media"){

        socialLinkId =
            document.getElementById(
                "orderSocialLink"
            )?.value || "";

        const link =
            getSocialLink(
                socialLinkId
            );

        if(link){

            platform =
                link.platform;

        }

    }

    const orderData = {

        orderNumber,

        source,

        trackingLinkId,

        socialLinkId,

        promoterId,

        platform,

        programId,

        customer,

        amount,

        status,

        createdAt:
            dateTime
            ?
            new Date(
                dateTime
            ).toISOString()
            :
            new Date().toISOString()

    };

    if(editingId){

        const index =
            data.orders.findIndex(
                x => x.id === editingId
            );

        if(index !== -1){

            data.orders[index] = {

                ...data.orders[index],

                ...orderData

            };

        }

    }
    else{

        data.orders.push({

            id:createId("order"),

            ...orderData

        });

    }

    saveData();

    renderOrdersModule(
        document.getElementById(
            "moduleContent"
        )
    );

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

    if(!confirm(
        "Delete this order?"
    )){

        return;

    }

    data.orders =
        data.orders.filter(
            x => x.id !== id
        );

    saveData();

    renderOrdersModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


/* =========================================================
   CANCEL ORDER FORM
   ========================================================= */

function cancelOrderForm(){

    renderOrdersModule(
        document.getElementById(
            "moduleContent"
        )
    );

}


/* =========================================================
   COMMISSION & PAYMENTS
   ========================================================= */

function renderCommissionModule(content){

    const completed =
        data.orders.filter(
            x => x.status === "Completed"
        );

    let totalCommission = 0;

    completed.forEach(order => {

        const program =
            getProgram(
                order.programId
            );

        const rate =
            Number(
                program?.commissionRate ||
                data.settings.defaultCommissionRate ||
                0
            );

        totalCommission +=
            Number(order.amount || 0) *
            rate /
            100;

    });

    const paid =
        data.payments.reduce(
            (sum,x) =>
                sum + Number(x.amount || 0),
            0
        );

    const outstanding =
        totalCommission - paid;

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Commission & Payments
                </h2>

                <p>
                    Completed order commissions and payments.
                </p>

            </div>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Completed Orders",
                completed.length,
                "✅"
            )}

            ${statCard(
                "Estimated Commission",
                formatMoney(
                    totalCommission
                ),
                "💵"
            )}

            ${statCard(
                "Paid",
                formatMoney(paid),
                "✔️"
            )}

            ${statCard(
                "Outstanding",
                formatMoney(
                    outstanding
                ),
                "⏳"
            )}

        </div>


        <h3>
            Commission by Promoter
        </h3>

        <div class="module-list">

            ${
                data.promoters.length
                ?
                data.promoters.map(
                    promoter => {

                        const stats =
                            getPromoterStats(
                                promoter.id
                            );

                        const promoterOrders =
                            data.orders.filter(
                                x =>
                                    x.promoterId ===
                                    promoter.id &&
                                    x.status ===
                                    "Completed"
                            );

                        let commission = 0;

                        promoterOrders.forEach(
                            order => {

                                const program =
                                    getProgram(
                                        order.programId
                                    );

                                const rate =
                                    Number(
                                        program?.commissionRate ||
                                        data.settings.defaultCommissionRate ||
                                        0
                                    );

                                commission +=
                                    Number(
                                        order.amount || 0
                                    ) *
                                    rate /
                                    100;

                            }
                        );

                        return `

                            <div class="list-card">

                                <div>

                                    <h3>
                                        ${escapeHTML(
                                            promoter.name
                                        )}
                                    </h3>

                                    <small>

                                        Clicks:
                                        ${stats.clicks}
                                        |
                                        Orders:
                                        ${stats.orders}
                                        |
                                        Completed:
                                        ${stats.completed}
                                        |
                                        Conversion:
                                        ${stats.conversion}%

                                    </small>

                                </div>

                                <strong>
                                    ${formatMoney(
                                        commission
                                    )}
                                </strong>

                            </div>

                        `;

                    }
                ).join("")
                :
                `<div class="empty-module">
                    No promoter data yet.
                </div>`
            }

        </div>

    `;

}


/* =========================================================
   REPORTS & ANALYTICS
   ========================================================= */

function renderReportsModule(content){

    const totalClicks =
        data.clicks.length;

    const totalOrders =
        data.orders.length;

    const completed =
        data.orders.filter(
            x => x.status === "Completed"
        );

    const conversion =
        totalClicks > 0
        ?
        (
            completed.length /
            totalClicks *
            100
        ).toFixed(2)
        :
        "0.00";

    const promoterRows =
        data.promoters.map(
            promoter => {

                const stats =
                    getPromoterStats(
                        promoter.id
                    );

                return `

                    <div class="list-card">

                        <div>

                            <h3>
                                ${escapeHTML(
                                    promoter.name
                                )}
                            </h3>

                            <small>

                                Clicks:
                                ${stats.clicks}
                                |
                                Orders:
                                ${stats.orders}
                                |
                                Completed:
                                ${stats.completed}
                                |
                                Sales:
                                ${formatMoney(
                                    stats.sales
                                )}
                                |
                                Conversion:
                                ${stats.conversion}%

                            </small>

                        </div>

                    </div>

                `;

            }
        ).join("");

    const platforms = [
        "Facebook",
        "Instagram",
        "TikTok",
        "WhatsApp"
    ];

    const socialRows =
        platforms.map(platform => {

            const clicks =
                data.clicks.filter(
                    x =>
                        x.type === "social" &&
                        x.platform === platform
                ).length;

            const orders =
                data.orders.filter(
                    x =>
                        x.source === "Social Media" &&
                        x.platform === platform
                );

            const completedOrders =
                orders.filter(
                    x =>
                        x.status === "Completed"
                );

            const sales =
                completedOrders.reduce(
                    (sum,x) =>
                        sum +
                        Number(
                            x.amount || 0
                        ),
                    0
                );

            const rate =
                clicks > 0
                ?
                (
                    completedOrders.length /
                    clicks *
                    100
                ).toFixed(2)
                :
                "0.00";

            return `

                <div class="list-card">

                    <div>

                        <h3>
                            ${platform}
                        </h3>

                        <small>

                            Clicks:
                            ${clicks}
                            |
                            Orders:
                            ${orders.length}
                            |
                            Completed:
                            ${completedOrders.length}
                            |
                            Sales:
                            ${formatMoney(
                                sales
                            )}
                            |
                            Conversion:
                            ${rate}%

                        </small>

                    </div>

                </div>

            `;

        }).join("");

    content.innerHTML = `

        <div class="module-header">

            <div>

                <h2>
                    Reports & Analytics
                </h2>

                <p>
                    Marketing performance report.
                </p>

            </div>

        </div>


        <div class="stats-grid">

            ${statCard(
                "Total Clicks",
                totalClicks,
                "🔗"
            )}

            ${statCard(
                "Total Orders",
                totalOrders,
                "🛒"
            )}

            ${statCard(
                "Completed Orders",
                completed.length,
                "✅"
            )}

            ${statCard(
                "Conversion Rate",
                conversion + "%",
                "📈"
            )}

        </div>


        <h3>
            👤 Promoter Performance
        </h3>

        <div class="module-list">

            ${
                promoterRows ||
                `<div class="empty-module">
                    No promoter performance data.
                </div>`
            }

        </div>


        <h3>
            📱 Social Platform Performance
        </h3>

        <div class="module-list">

            ${socialRows}

        </div>


        <div class="analytics-panel">

            <h3>
                Conversion Formula
            </h3>

            <p>
                Completed Orders ÷ Total Clicks × 100
            </p>

            <strong>
                ${conversion}%
            </strong>

        </div>

    `;

}


/* =========================================================
   BRAND ANIMATION CSS
   ========================================================= */

function addBrandAnimationCSS(){

    if(
        document.getElementById(
            "janjuaBrandAnimationCSS"
        )
    ){

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

        }


        .janjua-brand-animation{

            position:relative;

            width:500px;

            height:150px;

            display:flex;

            justify-content:center;

            align-items:center;

            overflow:hidden;

        }


        .brand-main{

            position:relative;

            z-index:10;

            text-align:center;

        }


        .brand-title{

            font-size:42px;

            font-weight:900;

            letter-spacing:8px;

            color:#ffffff;

            text-shadow:
                0 0 8px rgba(255,255,255,.6),
                0 0 20px rgba(0,200,255,.5);

            animation:
                brandPulse 2s infinite;

        }


        .brand-subtitle{

            margin-top:5px;

            font-size:12px;

            letter-spacing:1px;

            color:#d8e9ff;

        }


        .brand-status{

            margin-top:8px;

            font-size:11px;

            letter-spacing:2px;

            color:#ffffff;

        }


        .status-dot{

            display:inline-block;

            width:8px;

            height:8px;

            border-radius:50%;

            background:#00ff88;

            margin-right:5px;

            box-shadow:
                0 0 10px #00ff88;

            animation:
                statusPulse 1.2s infinite;

        }


        .brand-orbit{

            position:absolute;

            border:1px solid rgba(255,255,255,.35);

            border-radius:50%;

            left:50%;

            top:50%;

            transform:
                translate(-50%,-50%);

        }


        .orbit-one{

            width:250px;

            height:80px;

            animation:
                orbitRotate 5s linear infinite;

        }


        .orbit-two{

            width:340px;

            height:100px;

            animation:
                orbitRotateReverse 8s linear infinite;

        }


        .orbit-three{

            width:430px;

            height:125px;

            animation:
                orbitRotate 11s linear infinite;

        }


        .orbit-one::after,
        .orbit-two::after,
        .orbit-three::after{

            content:"";

            position:absolute;

            width:8px;

            height:8px;

            border-radius:50%;

            background:#ffffff;

            box-shadow:
                0 0 12px #ffffff;

        }


        .orbit-one::after{

            top:-4px;

            left:50%;

        }


        .orbit-two::after{

            right:15%;

            top:3%;

        }


        .orbit-three::after{

            bottom:2%;

            left:12%;

        }


        @keyframes orbitRotate{

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


        @keyframes orbitRotateReverse{

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


        @keyframes brandPulse{

            0%,100%{

                transform:scale(1);

            }

            50%{

                transform:scale(1.04);

            }

        }


        @keyframes statusPulse{

            0%,100%{

                opacity:1;

            }

            50%{

                opacity:.35;

            }

        }


        .module-header{

            display:flex;

            justify-content:space-between;

            align-items:center;

            gap:15px;

            flex-wrap:wrap;

            margin-bottom:20px;

        }


        .module-header h2{

            margin:0 0 5px;

        }


        .module-header p{

            margin:0;

            opacity:.7;

        }


        .stats-grid{

            display:grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(180px,1fr)
                );

            gap:15px;

            margin:20px 0;

        }


        .stat-card{

            display:flex;

            align-items:center;

            gap:14px;

            padding:18px;

            border-radius:15px;

            background:
                rgba(255,255,255,.08);

            border:
                1px solid
                rgba(255,255,255,.12);

        }


        .stat-icon{

            font-size:28px;

        }


        .stat-title{

            font-size:12px;

            opacity:.7;

        }


        .stat-value{

            font-size:20px;

            font-weight:bold;

            margin-top:4px;

        }


        .form-card{

            padding:20px;

            margin:15px 0;

            border-radius:15px;

            background:
                rgba(255,255,255,.06);

            border:
                1px solid
                rgba(255,255,255,.12);

            display:flex;

            flex-direction:column;

            gap:12px;

        }


        .form-card input,
        .form-card select{

            width:100%;

            padding:12px;

            border-radius:8px;

            border:
                1px solid
                rgba(255,255,255,.2);

            background:
                rgba(0,0,0,.15);

            color:inherit;

        }


        .button-row{

            display:flex;

            gap:8px;

            flex-wrap:wrap;

        }


        .primary-btn,
        .secondary-btn,
        .danger-btn{

            border:none;

            padding:10px 15px;

            border-radius:8px;

            cursor:pointer;

            font-weight:bold;

        }


        .primary-btn{

            background:#1677ff;

            color:#ffffff;

        }


        .secondary-btn{

            background:#666;

            color:#ffffff;

        }


        .danger-btn{

            background:#d93636;

            color:#ffffff;

        }


        .module-list{

            display:flex;

            flex-direction:column;

            gap:12px;

            margin:15px 0 25px;

        }


        .list-card{

            display:flex;

            justify-content:space-between;

            align-items:center;

            gap:15px;

            flex-wrap:wrap;

            padding:16px;

            border-radius:13px;

            background:
                rgba(255,255,255,.06);

            border:
                1px solid
                rgba(255,255,255,.1);

        }


        .list-card h3{

            margin:0 0 5px;

        }


        .list-card p{

            margin:4px 0;

        }


        .analytics-panel{

            margin:20px 0;

            padding:20px;

            border-radius:15px;

            background:
                rgba(255,255,255,.06);

            border:
                1px solid
                rgba(255,255,255,.1);

        }


        .performance-bar{

            display:grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(150px,1fr)
                );

            gap:10px;

            margin-top:15px;

        }


        .performance-bar div{

            padding:12px;

            border-radius:8px;

            background:
                rgba(255,255,255,.06);

        }


        .empty-module{

            padding:30px;

            text-align:center;

            opacity:.7;

        }


        .public-tracking-box{

            min-height:100vh;

            display:flex;

            justify-content:center;

            align-items:center;

            text-align:center;

            padding:20px;

        }


        .public-tracking-box > div{

            max-width:500px;

            width:100%;

            padding:40px;

            border-radius:20px;

            background:
                rgba(255,255,255,.08);

            border:
                1px solid
                rgba(255,255,255,.15);

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
