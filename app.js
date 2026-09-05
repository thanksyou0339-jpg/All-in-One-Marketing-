/* =========================================================
   JANJUA - ALL IN ONE MARKETING
   V5
   Complete Admin Marketing Platform
   Providers + Programs + Promoters + Assignments
   Tracking + Clicks + Orders + Commission + Payments
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v5";


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {

    categories: [

        {id:"cat_1", name:"Banks & Finance", visible:true},
        {id:"cat_2", name:"Motorcycles", visible:true},
        {id:"cat_3", name:"Cars & Vehicles", visible:true},
        {id:"cat_4", name:"Spare Parts", visible:true},
        {id:"cat_5", name:"Food & Restaurants", visible:true},
        {id:"cat_6", name:"Hotels", visible:true},
        {id:"cat_7", name:"Factories", visible:true},
        {id:"cat_8", name:"Weddings", visible:true},
        {id:"cat_9", name:"Travel & Tourism", visible:true},
        {id:"cat_10", name:"Property", visible:true},
        {id:"cat_11", name:"Loans & Financing", visible:true},
        {id:"cat_12", name:"Education", visible:true},
        {id:"cat_13", name:"Healthcare", visible:true},
        {id:"cat_14", name:"Freelance & Services", visible:true}

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

        brand:"JANJUA",
        subtitle:"Janjua Digital Marketing Platform Online",
        status:"AVAILABLE 24 HOURS"

    }

};


/* =========================================================
   LOAD DATA
========================================================= */

function loadData(){

    try{

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if(!saved){

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
                Array.isArray(parsed.categories)
                ? parsed.categories
                : [],

            providers:
                Array.isArray(parsed.providers)
                ? parsed.providers
                : [],

            programs:
                Array.isArray(parsed.programs)
                ? parsed.programs
                : [],

            promoters:
                Array.isArray(parsed.promoters)
                ? parsed.promoters
                : [],

            assignments:
                Array.isArray(parsed.assignments)
                ? parsed.assignments
                : [],

            trackingLinks:
                Array.isArray(parsed.trackingLinks)
                ? parsed.trackingLinks
                : [],

            clicks:
                Array.isArray(parsed.clicks)
                ? parsed.clicks
                : [],

            orders:
                Array.isArray(parsed.orders)
                ? parsed.orders
                : [],

            commissions:
                Array.isArray(parsed.commissions)
                ? parsed.commissions
                : [],

            payments:
                Array.isArray(parsed.payments)
                ? parsed.payments
                : []

        };

    }catch(error){

        console.error(
            "Data loading error:",
            error
        );

        return JSON.parse(
            JSON.stringify(defaultData)
        );

    }

}


let data = loadData();


/* =========================================================
   SAVE DATA
========================================================= */

function saveData(){

    try{

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

    }catch(error){

        console.error(
            "Data saving error:",
            error
        );

    }

}


/* =========================================================
   HELPERS
========================================================= */

function makeId(prefix){

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

    if(
        value === null ||
        value === undefined
    ){

        return "";

    }

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


function getProviderName(id){

    const provider =
        data.providers.find(
            p => p.id === id
        );

    return provider
        ? provider.name
        : "-";

}


function getProgramName(id){

    const program =
        data.programs.find(
            p => p.id === id
        );

    return program
        ? program.name
        : "-";

}


function getPromoterName(id){

    const promoter =
        data.promoters.find(
            p => p.id === id
        );

    return promoter
        ? promoter.name
        : "-";

}


function formatMoney(value){

    const number =
        Number(value) || 0;

    return number.toLocaleString(
        "en-PK",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        addAnimatedBranding();

        renderCategories();

        attachDashboardEvents();

        handlePublicTracking();

    }
);


/* =========================================================
   DASHBOARD EVENTS
========================================================= */

function attachDashboardEvents(){

    document.addEventListener(
        "click",
        function(event){

            const card =
                event.target.closest(
                    "[data-module]"
                );

            if(!card){
                return;
            }

            const module =
                card.dataset.module;

            if(module){

                openModule(module);

            }

        }
    );

}


/* =========================================================
   ANIMATED BRANDING
   OLD STATIC BRANDING IS HIDDEN
========================================================= */

function addAnimatedBranding(){

    const header =
        document.querySelector("header");

    if(!header){
        return;
    }


    /* -----------------------------------------
       HIDE ORIGINAL STATIC BRANDING
    ----------------------------------------- */

    const oldBrand =
        header.querySelector(".brand-area");

    if(oldBrand){

        oldBrand.style.display = "none";

    }


    /* -----------------------------------------
       HIDE ORIGINAL STATIC STATUS
    ----------------------------------------- */

    const oldStatus =
        header.querySelector(".header-status");

    if(oldStatus){

        oldStatus.style.display = "none";

    }


    /* -----------------------------------------
       REMOVE OLD ANIMATED BRAND IF EXISTS
    ----------------------------------------- */

    const oldAnimated =
        document.getElementById(
            "janjuaAnimatedBrand"
        );

    if(oldAnimated){

        oldAnimated.remove();

    }


    /* -----------------------------------------
       CREATE NEW ANIMATED BRAND
    ----------------------------------------- */

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


    /* Put animated branding at top */

    header.prepend(box);


    /* Add animation CSS */

    addBrandAnimationCSS();

}


function addBrandAnimationCSS(){

    if(
        document.getElementById(
            "janjuaAnimationCSS"
        )
    ){

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "janjuaAnimationCSS";


    style.textContent = `

        #janjuaAnimatedBrand{

            width:100%;

            display:flex;

            justify-content:center;

            align-items:center;

            padding:18px 10px 12px;

            overflow:hidden;

        }


        .janjua-brand-animation{

            position:relative;

            width:min(900px,96%);

            min-height:145px;

            display:flex;

            justify-content:center;

            align-items:center;

            overflow:hidden;

            border-radius:22px;

            background:

                radial-gradient(

                    circle at center,

                    rgba(0,200,255,.16),

                    transparent 45%

                ),

                rgba(0,0,0,.12);

            box-shadow:

                0 0 30px
                rgba(0,200,255,.10),

                inset 0 0 25px
                rgba(255,255,255,.04);

        }


        .brand-main{

            position:relative;

            z-index:5;

            text-align:center;

            animation:
                brandFloat
                4s
                ease-in-out
                infinite;

        }


        .brand-title{

            font-size:
                clamp(38px,8vw,72px);

            font-weight:900;

            letter-spacing:8px;

            line-height:1;

            background:

                linear-gradient(

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

                brandShine
                4s
                linear
                infinite,

                brandPulse
                2.5s
                ease-in-out
                infinite;

        }


        .brand-subtitle{

            margin-top:10px;

            font-size:
                clamp(14px,2.5vw,22px);

            font-weight:700;

            letter-spacing:2px;

            animation:

                subtitleFade
                3s
                ease-in-out
                infinite;

        }


        .brand-status{

            margin-top:10px;

            display:inline-flex;

            align-items:center;

            gap:8px;

            padding:6px 12px;

            border-radius:50px;

            font-size:12px;

            font-weight:800;

            letter-spacing:2px;

            border:1px solid
                rgba(0,255,140,.25);

            animation:

                statusGlow
                2s
                ease-in-out
                infinite;

        }


        .status-dot{

            width:9px;

            height:9px;

            border-radius:50%;

            background:#00ff88;

            box-shadow:

                0 0 7px #00ff88,

                0 0 15px #00ff88;

            animation:

                dotBlink
                1.2s
                infinite;

        }


        .brand-orbit{

            position:absolute;

            border:1px solid
                rgba(0,220,255,.22);

            border-radius:50%;

        }


        .orbit-one{

            width:230px;

            height:230px;

            animation:

                orbitRotate
                9s
                linear
                infinite;

        }


        .orbit-two{

            width:420px;

            height:150px;

            transform:rotate(25deg);

            animation:

                orbitRotateReverse
                12s
                linear
                infinite;

        }


        .orbit-three{

            width:650px;

            height:210px;

            transform:rotate(-18deg);

            animation:

                orbitRotate
                16s
                linear
                infinite;

        }


        @keyframes brandShine{

            0%{

                background-position:0% 50%;

            }

            100%{

                background-position:300% 50%;

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


        @keyframes brandFloat{

            0%,100%{

                transform:translateY(0);

            }

            50%{

                transform:translateY(-5px);

            }

        }


        @keyframes subtitleFade{

            0%,100%{

                opacity:.65;

            }

            50%{

                opacity:1;

            }

        }


        @keyframes statusGlow{

            0%,100%{

                box-shadow:
                    0 0 0
                    rgba(0,255,140,0);

            }

            50%{

                box-shadow:

                    0 0 20px
                    rgba(0,255,140,.16);

            }

        }


        @keyframes dotBlink{

            0%,100%{

                opacity:1;

                transform:scale(1);

            }

            50%{

                opacity:.35;

                transform:scale(.75);

            }

        }


        @keyframes orbitRotate{

            from{

                transform:rotate(0deg);

            }

            to{

                transform:rotate(360deg);

            }

        }


        @keyframes orbitRotateReverse{

            from{

                transform:rotate(360deg);

            }

            to{

                transform:rotate(0deg);

            }

        }


        @media(max-width:600px){

            .janjua-brand-animation{

                min-height:125px;

            }


            .brand-title{

                letter-spacing:5px;

            }


            .brand-subtitle{

                letter-spacing:1px;

            }


            .orbit-three{

                width:420px;

            }

        }

    `;


    document.head.appendChild(style);

}


/* =========================================================
   OPEN MODULE
========================================================= */

function openModule(module){

    closeModule();


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


    const title =
        titles[module] || module;


    const panel =
        document.createElement("div");


    panel.id =
        "modulePanel";


    panel.innerHTML = `

        <div class="module-overlay">

            <div class="module-window">

                <div class="module-header">

                    <h2>
                        ${escapeHTML(title)}
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
        document.getElementById(
            "moduleContent"
        );


    switch(module){

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


        default:

            content.innerHTML = `

                <div class="empty-module">

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    <p>
                        Module ready for integration.
                    </p>

                </div>

            `;

    }

}


/* =========================================================
   CLOSE MODULE
========================================================= */

function closeModule(){

    const panel =
        document.getElementById(
            "modulePanel"
        );


    if(panel){

        panel.remove();

    }

}


/* =========================================================
   DASHBOARD MODULE
========================================================= */

function renderDashboardModule(container){

    container.innerHTML = `

        <div class="dashboard-module-title">

            <h2>
                JANJUA Marketing Control Center
            </h2>

            <p>
                Complete affiliate marketing management system
            </p>

        </div>


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
                    Assignments
                </h3>

                <strong>
                    ${data.assignments.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Tracking Links
                </h3>

                <strong>
                    ${data.trackingLinks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Total Clicks
                </h3>

                <strong>
                    ${data.clicks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Total Orders
                </h3>

                <strong>
                    ${data.orders.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Commissions
                </h3>

                <strong>
                    ${data.commissions.length}
                </strong>

            </div>

        </div>


        <div class="form-card">

            <h3>
                Marketing Flow
            </h3>

            <p>

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

            </p>

        </div>

    `;

}


/* =========================================================
   PROVIDERS
========================================================= */

function renderProviderModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="showProviderForm()">

                + Add Provider / Company

            </button>

        </div>


        <div id="providerFormArea"></div>


        <div
            id="providerList"
            class="data-list">
        </div>

    `;


    renderProviders();

}


function renderProviders(){

    const list =
        document.getElementById(
            "providerList"
        );


    if(!list){
        return;
    }


    if(
        data.providers.length === 0
    ){

        list.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Providers Added
                </h3>

                <p>
                    Add your first company/provider.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        data.providers.map(
            provider => `

            <div class="data-card">

                <div>

                    <h3>
                        ${escapeHTML(
                            provider.name
                        )}
                    </h3>


                    <p>
                        Website:
                        ${escapeHTML(
                            provider.website || "-"
                        )}
                    </p>


                    <p>
                        Affiliate ID:
                        ${escapeHTML(
                            provider.affiliateId || "-"
                        )}
                    </p>


                    <p>

                        SubID:
                        ${escapeHTML(
                            provider.subId || "No"
                        )}

                        |

                        ClickID:
                        ${escapeHTML(
                            provider.clickId || "No"
                        )}

                    </p>


                    <p>

                        API:
                        ${provider.api
                            ? "YES"
                            : "NO"}

                        |

                        Webhook:
                        ${provider.webhook
                            ? "YES"
                            : "NO"}

                    </p>


                    <p>

                        Status:

                        <strong>

                            ${provider.visible
                                ? "ACTIVE"
                                : "HIDDEN"}

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

                        ${provider.visible
                            ? "Hide"
                            : "Show"}

                    </button>


                    <button
                        class="danger-btn"
                        onclick="deleteProvider('${provider.id}')">

                        Delete

                    </button>

                </div>

            </div>

        `
        ).join("");

}


function showProviderForm(id=null){

    const area =
        document.getElementById(
            "providerFormArea"
        );


    if(!area){
        return;
    }


    const provider =
        id
        ? data.providers.find(
            p => p.id === id
        )
        : null;


    area.innerHTML = `

        <div class="form-card">

            <h3>

                ${provider
                    ? "Edit Provider"
                    : "Add Provider"}

            </h3>


            <div class="form-grid">

                <label>

                    Company / Provider Name

                    <input
                        id="providerName"
                        value="${escapeHTML(
                            provider?.name || ""
                        )}">

                </label>


                <label>

                    Website

                    <input
                        id="providerWebsite"
                        value="${escapeHTML(
                            provider?.website || ""
                        )}">

                </label>


                <label>

                    Original Affiliate Link

                    <input
                        id="providerAffiliateLink"
                        value="${escapeHTML(
                            provider?.affiliateLink || ""
                        )}">

                </label>


                <label>

                    Affiliate / Account ID

                    <input
                        id="providerAffiliateId"
                        value="${escapeHTML(
                            provider?.affiliateId || ""
                        )}">

                </label>


                <label>

                    SubID Support

                    <select id="providerSubId">

                        <option value="No">
                            No
                        </option>

                        <option
                            value="Yes"
                            ${provider?.subId === "Yes"
                                ? "selected"
                                : ""}>

                            Yes

                        </option>

                    </select>

                </label>


                <label>

                    ClickID Support

                    <select id="providerClickId">

                        <option value="No">
                            No
                        </option>

                        <option
                            value="Yes"
                            ${provider?.clickId === "Yes"
                                ? "selected"
                                : ""}>

                            Yes

                        </option>

                    </select>

                </label>


                <label>

                    API Available

                    <select id="providerApi">

                        <option value="No">
                            No
                        </option>

                        <option
                            value="Yes"
                            ${provider?.api
                                ? "selected"
                                : ""}>

                            Yes

                        </option>

                    </select>

                </label>


                <label>

                    Webhook Available

                    <select id="providerWebhook">

                        <option value="No">
                            No
                        </option>

                        <option
                            value="Yes"
                            ${provider?.webhook
                                ? "selected"
                                : ""}>

                            Yes

                        </option>

                    </select>

                </label>

            </div>


            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="saveProvider('${id || ""}')">

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


function saveProvider(id){

    const name =
        document.getElementById(
            "providerName"
        ).value.trim();


    if(!name){

        alert(
            "Please enter Provider Name."
        );

        return;

    }


    const providerData = {

        name:name,

        website:
            document.getElementById(
                "providerWebsite"
            ).value.trim(),

        affiliateLink:
            document.getElementById(
                "providerAffiliateLink"
            ).value.trim(),

        affiliateId:
            document.getElementById(
                "providerAffiliateId"
            ).value.trim(),

        subId:
            document.getElementById(
                "providerSubId"
            ).value,

        clickId:
            document.getElementById(
                "providerClickId"
            ).value,

        api:
            document.getElementById(
                "providerApi"
            ).value === "Yes",

        webhook:
            document.getElementById(
                "providerWebhook"
            ).value === "Yes"

    };


    if(id){

        const provider =
            data.providers.find(
                p => p.id === id
            );


        if(provider){

            Object.assign(
                provider,
                providerData
            );

        }

    }else{

        data.providers.push({

            id:makeId("provider"),

            ...providerData,

            visible:true,

            createdAt:
                new Date().toISOString()

        });

    }


    saveData();

    renderProviders();

    cancelProviderForm();


    alert(
        "Provider saved successfully."
    );

}


function editProvider(id){

    showProviderForm(id);

}


function toggleProvider(id){

    const provider =
        data.providers.find(
            p => p.id === id
        );


    if(!provider){
        return;
    }


    provider.visible =
        !provider.visible;


    saveData();

    renderProviders();

}


function deleteProvider(id){

    if(
        !confirm(
            "Delete this Provider?"
        )
    ){

        return;

    }


    data.providers =
        data.providers.filter(
            p => p.id !== id
        );


    data.programs =
        data.programs.filter(
            p => p.providerId !== id
        );


    saveData();

    renderProviders();

}


function cancelProviderForm(){

    const area =
        document.getElementById(
            "providerFormArea"
        );


    if(area){

        area.innerHTML = "";

    }

}


/* =========================================================
   PROGRAMS
========================================================= */

function renderProgramModule(container){

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


function renderPrograms(){

    const list =
        document.getElementById(
            "programList"
        );


    if(!list){
        return;
    }


    if(
        data.programs.length === 0
    ){

        list.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Programs Yet
                </h3>

                <p>
                    Add a Program / Offer.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        data.programs.map(
            program => `

            <div class="data-card">

                <div>

                    <h3>
                        ${escapeHTML(
                            program.name
                        )}
                    </h3>


                    <p>

                        Provider:

                        ${escapeHTML(
                            getProviderName(
                                program.providerId
                            )
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


                    <p>

                        Cookie:

                        ${escapeHTML(
                            program.cookieDays || "0"
                        )}

                        days

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

        `
        ).join("");

}


function showProgramForm(id=null){

    const area =
        document.getElementById(
            "programFormArea"
        );


    if(!area){
        return;
    }


    const program =
        id
        ? data.programs.find(
            p => p.id === id
        )
        : null;


    area.innerHTML = `

        <div class="form-card">

            <h3>

                ${program
                    ? "Edit Program"
                    : "Add Program"}

            </h3>


            <div class="form-grid">

                <label>

                    Program Name

                    <input
                        id="programName"
                        value="${escapeHTML(
                            program?.name || ""
                        )}">

                </label>


                <label>

                    Provider / Company

                    <select id="programProvider">

                        <option value="">
                            Select Provider
                        </option>

                        ${data.providers
                            .filter(
                                p => p.visible
                            )
                            .map(
                                p => `

                                <option
                                    value="${p.id}"
                                    ${program?.providerId === p.id
                                        ? "selected"
                                        : ""}>

                                    ${escapeHTML(
                                        p.name
                                    )}

                                </option>

                            `
                            )
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
                            .filter(
                                c => c.visible
                            )
                            .map(
                                c => `

                                <option
                                    value="${escapeHTML(
                                        c.name
                                    )}"
                                    ${program?.category === c.name
                                        ? "selected"
                                        : ""}>

                                    ${escapeHTML(
                                        c.name
                                    )}

                                </option>

                            `
                            )
                            .join("")}

                    </select>

                </label>


                <label>

                    Original Affiliate Link

                    <input
                        id="programAffiliateLink"
                        value="${escapeHTML(
                            program?.affiliateLink || ""
                        )}">

                </label>


                <label>

                    Commission %

                    <input
                        id="programCommission"
                        type="number"
                        min="0"
                        step="0.01"
                        value="${escapeHTML(
                            program?.commission || ""
                        )}">

                </label>


                <label>

                    Cookie Days

                    <input
                        id="programCookie"
                        type="number"
                        min="0"
                        value="${escapeHTML(
                            program?.cookieDays || ""
                        )}">

                </label>

            </div>


            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="saveProgram('${id || ""}')">

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


function saveProgram(id){

    const name =
        document.getElementById(
            "programName"
        ).value.trim();


    const providerId =
        document.getElementById(
            "programProvider"
        ).value;


    if(!name){

        alert(
            "Please enter Program Name."
        );

        return;

    }


    if(!providerId){

        alert(
            "Please select Provider."
        );

        return;

    }


    const programData = {

        name:name,

        providerId:providerId,

        category:
            document.getElementById(
                "programCategory"
            ).value,

        affiliateLink:
            document.getElementById(
                "programAffiliateLink"
            ).value.trim(),

        commission:
            document.getElementById(
                "programCommission"
            ).value,

        cookieDays:
            document.getElementById(
                "programCookie"
            ).value

    };


    if(id){

        const program =
            data.programs.find(
                p => p.id === id
            );


        if(program){

            Object.assign(
                program,
                programData
            );

        }

    }else{

        data.programs.push({

            id:makeId("program"),

            ...programData,

            createdAt:
                new Date().toISOString()

        });

    }


    saveData();

    renderPrograms();

    cancelProgramForm();


    alert(
        "Program saved successfully."
    );

}


function editProgram(id){

    showProgramForm(id);

}


function deleteProgram(id){

    if(
        !confirm(
            "Delete this Program?"
        )
    ){

        return;

    }


    data.programs =
        data.programs.filter(
            p => p.id !== id
        );


    data.assignments =
        data.assignments.filter(
            a => a.programId !== id
        );


    data.trackingLinks =
        data.trackingLinks.filter(
            t => t.programId !== id
        );


    saveData();

    renderPrograms();

}


function cancelProgramForm(){

    const area =
        document.getElementById(
            "programFormArea"
        );


    if(area){

        area.innerHTML = "";

    }

}


/* =========================================================
   PROMOTERS
========================================================= */

function renderPromoterModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="showPromoterForm()">

                + Add Promoter / Worker

            </button>

        </div>


        <div id="promoterFormArea"></div>


        <div
            id="promoterList"
            class="data-list">
        </div>

    `;


    renderPromoters();

}


function renderPromoters(){

    const list =
        document.getElementById(
            "promoterList"
        );


    if(!list){
        return;
    }


    if(
        data.promoters.length === 0
    ){

        list.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Promoters / Workers
                </h3>

                <p>
                    Add your first promoter.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        data.promoters.map(
            promoter => `

            <div class="data-card">

                <div>

                    <h3>
                        ${escapeHTML(
                            promoter.name
                        )}
                    </h3>


                    <p>

                        Phone:

                        ${escapeHTML(
                            promoter.phone || "-"
                        )}

                    </p>


                    <p>

                        Email:

                        ${escapeHTML(
                            promoter.email || "-"
                        )}

                    </p>


                    <p>

                        Payment:

                        ${escapeHTML(
                            promoter.paymentMethod || "-"
                        )}

                    </p>


                    <p>

                        Account:

                        ${escapeHTML(
                            promoter.paymentAccount || "-"
                        )}

                    </p>

                </div>


                <div class="data-card-actions">

                    <button
                        onclick="editPromoter('${promoter.id}')">

                        Edit

                    </button>


                    <button
                        class="danger-btn"
                        onclick="deletePromoter('${promoter.id}')">

                        Delete

                    </button>

                </div>

            </div>

        `
        ).join("");

}


function showPromoterForm(id=null){

    const area =
        document.getElementById(
            "promoterFormArea"
        );


    if(!area){
        return;
    }


    const promoter =
        id
        ? data.promoters.find(
            p => p.id === id
        )
        : null;


    area.innerHTML = `

        <div class="form-card">

            <h3>

                ${promoter
                    ? "Edit Promoter"
                    : "Add Promoter / Worker"}

            </h3>


            <div class="form-grid">

                <label>

                    Full Name

                    <input
                        id="promoterName"
                        value="${escapeHTML(
                            promoter?.name || ""
                        )}">

                </label>


                <label>

                    Phone

                    <input
                        id="promoterPhone"
                        value="${escapeHTML(
                            promoter?.phone || ""
                        )}">

                </label>


                <label>

                    Email

                    <input
                        id="promoterEmail"
                        value="${escapeHTML(
                            promoter?.email || ""
                        )}">

                </label>


                <label>

                    Payment Method

                    <select
                        id="promoterPayment">

                        <option value="">
                            Select
                        </option>

                        <option
                            value="Bank"
                            ${promoter?.paymentMethod === "Bank"
                                ? "selected"
                                : ""}>

                            Bank

                        </option>

                        <option
                            value="JazzCash"
                            ${promoter?.paymentMethod === "JazzCash"
                                ? "selected"
                                : ""}>

                            JazzCash

                        </option>

                        <option
                            value="Easypaisa"
                            ${promoter?.paymentMethod === "Easypaisa"
                                ? "selected"
                                : ""}>

                            Easypaisa

                        </option>

                    </select>

                </label>


                <label>

                    Payment Account

                    <input
                        id="promoterPaymentAccount"
                        value="${escapeHTML(
                            promoter?.paymentAccount || ""
                        )}"
                        placeholder="Account / Number">

                </label>

            </div>


            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="savePromoter('${id || ""}')">

                    Save Promoter

                </button>


                <button
                    onclick="cancelPromoterForm()">

                    Cancel

                </button>

            </div>

        </div>

    `;

}


function savePromoter(id){

    const name =
        document.getElementById(
            "promoterName"
        ).value.trim();


    if(!name){

        alert(
            "Please enter Promoter Name."
        );

        return;

    }


    const promoterData = {

        name:name,

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
                "promoterPaymentAccount"
            ).value.trim()

    };


    if(id){

        const promoter =
            data.promoters.find(
                p => p.id === id
            );


        if(promoter){

            Object.assign(
                promoter,
                promoterData
            );

        }

    }else{

        data.promoters.push({

            id:makeId("promoter"),

            ...promoterData,

            createdAt:
                new Date().toISOString()

        });

    }


    saveData();

    renderPromoters();

    cancelPromoterForm();


    alert(
        "Promoter saved successfully."
    );

}


function editPromoter(id){

    showPromoterForm(id);

}


function deletePromoter(id){

    if(
        !confirm(
            "Delete this Promoter?"
        )
    ){

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


    data.trackingLinks =
        data.trackingLinks.filter(
            t => t.promoterId !== id
        );


    saveData();

    renderPromoters();

}


function cancelPromoterForm(){

    const area =
        document.getElementById(
            "promoterFormArea"
        );


    if(area){

        area.innerHTML = "";

    }

}


/* =========================================================
   ASSIGNMENT + TRACKING
========================================================= */

function renderTrackingModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="showAssignmentForm()">

                + Assign Program / Create Link

            </button>

        </div>


        <div id="assignmentFormArea"></div>


        <div
            id="trackingList"
            class="data-list">
        </div>

    `;


    renderTrackingLinks();

}


function showAssignmentForm(){

    const area =
        document.getElementById(
            "assignmentFormArea"
        );


    if(!area){
        return;
    }


    if(
        data.promoters.length === 0
    ){

        alert(
            "First add a Promoter / Worker."
        );

        return;

    }


    if(
        data.programs.length === 0
    ){

        alert(
            "First add a Program / Offer."
        );

        return;

    }


    area.innerHTML = `

        <div class="form-card">

            <h3>
                Assign Program & Create Tracking Link
            </h3>


            <div class="form-grid">

                <label>

                    Promoter / Worker

                    <select id="assignPromoter">

                        <option value="">
                            Select Promoter
                        </option>

                        ${data.promoters
                            .map(
                                p => `

                                <option
                                    value="${p.id}">

                                    ${escapeHTML(
                                        p.name
                                    )}

                                </option>

                            `
                            )
                            .join("")}

                    </select>

                </label>


                <label>

                    Program / Offer

                    <select id="assignProgram">

                        <option value="">
                            Select Program
                        </option>

                        ${data.programs
                            .map(
                                p => `

                                <option
                                    value="${p.id}">

                                    ${escapeHTML(
                                        p.name
                                    )}

                                </option>

                            `
                            )
                            .join("")}

                    </select>

                </label>

            </div>


            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="createTrackingAssignment()">

                    Create Tracking Link

                </button>


                <button
                    onclick="cancelAssignmentForm()">

                    Cancel

                </button>

            </div>

        </div>

    `;

}


function createTrackingAssignment(){

    const promoterId =
        document.getElementById(
            "assignPromoter"
        ).value;


    const programId =
        document.getElementById(
            "assignProgram"
        ).value;


    if(
        !promoterId ||
        !programId
    ){

        alert(
            "Please select Promoter and Program."
        );

        return;

    }


    const alreadyExists =
        data.assignments.find(
            a =>
                a.promoterId === promoterId &&
                a.programId === programId
        );


    if(alreadyExists){

        alert(
            "This Program is already assigned to this Promoter."
        );

        return;

    }


    const promoter =
        data.promoters.find(
            p => p.id === promoterId
        );


    const program =
        data.programs.find(
            p => p.id === programId
        );


    if(
        !promoter ||
        !program
    ){

        return;

    }


    let trackingCode =
        "J" +
        promoter.name
            .replace(
                /[^a-zA-Z0-9]/g,
                ""
            )
            .substring(0,6)
            .toUpperCase() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2,8)
            .toUpperCase();


    while(
        data.trackingLinks.some(
            t =>
                t.trackingCode === trackingCode
        )
    ){

        trackingCode =
            "J" +
            Math.random()
                .toString(36)
                .substring(2,10)
                .toUpperCase();

    }


    const assignment = {

        id:
            makeId("assignment"),

        promoterId:
            promoterId,

        programId:
            programId,

        trackingCode:
            trackingCode,

        createdAt:
            new Date().toISOString()

    };


    data.assignments.push(
        assignment
    );


    const publicUrl =
        window.location.origin +
        window.location.pathname +
        "?ref=" +
        encodeURIComponent(
            trackingCode
        );


    data.trackingLinks.push({

        id:
            makeId("track"),

        assignmentId:
            assignment.id,

        promoterId:
            promoterId,

        programId:
            programId,

        trackingCode:
            trackingCode,

        publicUrl:
            publicUrl,

        clicks:0,

        active:true,

        createdAt:
            new Date().toISOString()

    });


    saveData();

    renderTrackingLinks();

    cancelAssignmentForm();


    alert(
        "Tracking link created successfully."
    );

}


function renderTrackingLinks(){

    const list =
        document.getElementById(
            "trackingList"
        );


    if(!list){
        return;
    }


    if(
        data.trackingLinks.length === 0
    ){

        list.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Tracking Links
                </h3>

                <p>
                    Assign a Program to a Promoter
                    to create a unique link.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        data.trackingLinks.map(
            link => `

            <div class="data-card">

                <div>

                    <h3>

                        ${escapeHTML(
                            getPromoterName(
                                link.promoterId
                            )
                        )}

                    </h3>


                    <p>

                        Program:

                        ${escapeHTML(
                            getProgramName(
                                link.programId
                            )
                        )}

                    </p>


                    <p>

                        Tracking Code:

                        <strong>
                            ${escapeHTML(
                                link.trackingCode
                            )}
                        </strong>

                    </p>


                    <p>

                        Clicks:

                        <strong>
                            ${link.clicks || 0}
                        </strong>

                    </p>


                    <p>

                        Status:

                        <strong>

                            ${link.active
                                ? "ACTIVE"
                                : "DISABLED"}

                        </strong>

                    </p>


                    <p class="tracking-url">

                        ${escapeHTML(
                            link.publicUrl
                        )}

                    </p>

                </div>


                <div class="data-card-actions">

                    <button
                        onclick="copyTrackingLink('${link.id}')">

                        Copy Link

                    </button>


                    <button
                        onclick="testTrackingLink('${link.id}')">

                        Test

                    </button>


                    <button
                        onclick="toggleTrackingLink('${link.id}')">

                        ${link.active
                            ? "Disable"
                            : "Enable"}

                    </button>

                </div>

            </div>

        `
        ).join("");

}


function copyTrackingLink(id){

    const link =
        data.trackingLinks.find(
            t => t.id === id
        );


    if(!link){
        return;
    }


    if(
        navigator.clipboard &&
        navigator.clipboard.writeText
    ){

        navigator.clipboard
            .writeText(
                link.publicUrl
            )
            .then(
                function(){

                    alert(
                        "Tracking link copied."
                    );

                }
            )
            .catch(
                function(){

                    prompt(
                        "Copy this tracking link:",
                        link.publicUrl
                    );

                }
            );

    }else{

        prompt(
            "Copy this tracking link:",
            link.publicUrl
        );

    }

}


function testTrackingLink(id){

    const link =
        data.trackingLinks.find(
            t => t.id === id
        );


    if(!link){
        return;
    }


    window.open(
        link.publicUrl,
        "_blank"
    );

}


function toggleTrackingLink(id){

    const link =
        data.trackingLinks.find(
            t => t.id === id
        );


    if(!link){
        return;
    }


    link.active =
        !link.active;


    saveData();

    renderTrackingLinks();

}


function cancelAssignmentForm(){

    const area =
        document.getElementById(
            "assignmentFormArea"
        );


    if(area){

        area.innerHTML = "";

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
            t =>
                t.trackingCode === ref &&
                t.active
        );


    if(!link){
        return;
    }


    const sessionKey =
        "janjua_click_" + ref;


    if(
        sessionStorage.getItem(
            sessionKey
        )
    ){

        return;

    }


    sessionStorage.setItem(
        sessionKey,
        "1"
    );


    link.clicks =
        Number(link.clicks || 0) + 1;


    data.clicks.push({

        id:
            makeId("click"),

        trackingLinkId:
            link.id,

        promoterId:
            link.promoterId,

        programId:
            link.programId,

        trackingCode:
            link.trackingCode,

        date:
            new Date().toISOString()

    });


    saveData();

}


/* =========================================================
   ORDERS & CLICKS
========================================================= */

function renderOrdersModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="showOrderForm()">

                + Add Order / Sale

            </button>

        </div>


        <div id="orderFormArea"></div>


        <div class="report-grid">

            <div class="report-card">

                <h3>
                    Total Clicks
                </h3>

                <strong>
                    ${data.clicks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Total Orders
                </h3>

                <strong>
                    ${data.orders.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Total Sales
                </h3>

                <strong>

                    Rs.
                    ${formatMoney(
                        data.orders.reduce(
                            (sum,o) =>
                                sum +
                                Number(
                                    o.amount || 0
                                ),
                            0
                        )
                    )}

                </strong>

            </div>

        </div>


        <div
            id="orderList"
            class="data-list">
        </div>

    `;


    renderOrders();

}


function showOrderForm(){

    const area =
        document.getElementById(
            "orderFormArea"
        );


    if(!area){
        return;
    }


    if(
        data.trackingLinks.length === 0
    ){

        alert(
            "First create a Tracking Link."
        );

        return;

    }


    area.innerHTML = `

        <div class="form-card">

            <h3>
                Add Order / Sale
            </h3>


            <div class="form-grid">

                <label>

                    Tracking Link

                    <select id="orderTracking">

                        <option value="">
                            Select Tracking Link
                        </option>

                        ${data.trackingLinks
                            .map(
                                link => `

                                <option
                                    value="${link.id}">

                                    ${escapeHTML(
                                        getPromoterName(
                                            link.promoterId
                                        )
                                    )}
                                    -
                                    ${escapeHTML(
                                        getProgramName(
                                            link.programId
                                        )
                                    )}
                                    -
                                    ${escapeHTML(
                                        link.trackingCode
                                    )}

                                </option>

                            `
                            )
                            .join("")}

                    </select>

                </label>


                <label>

                    Customer / Order ID

                    <input
                        id="orderNumber"
                        placeholder="Order ID">

                </label>


                <label>

                    Sale Amount

                    <input
                        id="orderAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0">

                </label>


                <label>

                    Order Status

                    <select id="orderStatus">

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Confirmed">
                            Confirmed
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>

                </label>

            </div>


            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="saveOrder()">

                    Save Order

                </button>


                <button
                    onclick="cancelOrderForm()">

                    Cancel

                </button>

            </div>

        </div>

    `;

}


function saveOrder(){

    const trackingLinkId =
        document.getElementById(
            "orderTracking"
        ).value;


    const orderNumber =
        document.getElementById(
            "orderNumber"
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


    if(!trackingLinkId){

        alert(
            "Please select Tracking Link."
        );

        return;

    }


    const link =
        data.trackingLinks.find(
            t => t.id === trackingLinkId
        );


    if(!link){

        alert(
            "Tracking Link not found."
        );

        return;

    }


    const order = {

        id:
            makeId("order"),

        trackingLinkId:
            trackingLinkId,

        promoterId:
            link.promoterId,

        programId:
            link.programId,

        trackingCode:
            link.trackingCode,

        orderNumber:
            orderNumber,

        amount:
            amount,

        status:
            status,

        createdAt:
            new Date().toISOString()

    };


    data.orders.push(order);


    if(
        status === "Confirmed"
    ){

        createCommissionForOrder(
            order
        );

    }


    saveData();

    renderOrders();

    cancelOrderForm();


    alert(
        "Order saved successfully."
    );

}


function createCommissionForOrder(order){

    const existing =
        data.commissions.find(
            c =>
                c.orderId === order.id
        );


    if(existing){
        return;
    }


    const program =
        data.programs.find(
            p =>
                p.id === order.programId
        );


    if(!program){
        return;
    }


    const commissionRate =
        Number(
            program.commission || 0
        );


    const commissionAmount =
        (
            Number(order.amount || 0) *
            commissionRate /
            100
        );


    data.commissions.push({

        id:
            makeId("commission"),

        orderId:
            order.id,

        promoterId:
            order.promoterId,

        programId:
            order.programId,

        trackingCode:
            order.trackingCode,

        saleAmount:
            Number(order.amount || 0),

        commissionRate:
            commissionRate,

        commissionAmount:
            commissionAmount,

        status:
            "Pending",

        createdAt:
            new Date().toISOString()

    });

}


function renderOrders(){

    const list =
        document.getElementById(
            "orderList"
        );


    if(!list){
        return;
    }


    if(
        data.orders.length === 0
    ){

        list.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Orders Yet
                </h3>

                <p>
                    Add your first order or sale.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        data.orders.map(
            order => `

            <div class="data-card">

                <div>

                    <h3>

                        Order
                        ${escapeHTML(
                            order.orderNumber || order.id
                        )}

                    </h3>


                    <p>

                        Promoter:

                        ${escapeHTML(
                            getPromoterName(
                                order.promoterId
                            )
                        )}

                    </p>


                    <p>

                        Program:

                        ${escapeHTML(
                            getProgramName(
                                order.programId
                            )
                        )}

                    </p>


                    <p>

                        Tracking:

                        <strong>
                            ${escapeHTML(
                                order.trackingCode
                            )}
                        </strong>

                    </p>


                    <p>

                        Amount:

                        <strong>

                            Rs.
                            ${formatMoney(
                                order.amount
                            )}

                        </strong>

                    </p>


                    <p>

                        Status:

                        <strong>
                            ${escapeHTML(
                                order.status
                            )}
                        </strong>

                    </p>

                </div>

            </div>

        `
        ).join("");

}


function cancelOrderForm(){

    const area =
        document.getElementById(
            "orderFormArea"
        );


    if(area){

        area.innerHTML = "";

    }

}


/* =========================================================
   COMMISSION & PAYMENTS
========================================================= */

function renderCommissionModule(container){

    const totalCommission =
        data.commissions.reduce(
            (sum,c) =>
                sum +
                Number(
                    c.commissionAmount || 0
                ),
            0
        );


    const paidCommission =
        data.commissions
            .filter(
                c => c.status === "Paid"
            )
            .reduce(
                (sum,c) =>
                    sum +
                    Number(
                        c.commissionAmount || 0
                    ),
                0
            );


    const pendingCommission =
        totalCommission -
        paidCommission;


    container.innerHTML = `

        <div class="module-toolbar">

            <button
                class="primary-btn"
                onclick="showPaymentForm()">

                + Mark Commission Payment

            </button>

        </div>


        <div class="report-grid">

            <div class="report-card">

                <h3>
                    Total Commission
                </h3>

                <strong>

                    Rs.
                    ${formatMoney(
                        totalCommission
                    )}

                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Paid
                </h3>

                <strong>

                    Rs.
                    ${formatMoney(
                        paidCommission
                    )}

                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Pending
                </h3>

                <strong>

                    Rs.
                    ${formatMoney(
                        pendingCommission
                    )}

                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Payment Records
                </h3>

                <strong>
                    ${data.payments.length}
                </strong>

            </div>

        </div>


        <div id="paymentFormArea"></div>


        <div
            id="commissionList"
            class="data-list">
        </div>

    `;


    renderCommissions();

}


function renderCommissions(){

    const list =
        document.getElementById(
            "commissionList"
        );


    if(!list){
        return;
    }


    if(
        data.commissions.length === 0
    ){

        list.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Commissions Yet
                </h3>

                <p>
                    Confirmed orders will generate commissions.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        data.commissions.map(
            commission => `

            <div class="data-card">

                <div>

                    <h3>

                        ${escapeHTML(
                            getPromoterName(
                                commission.promoterId
                            )
                        )}

                    </h3>


                    <p>

                        Program:

                        ${escapeHTML(
                            getProgramName(
                                commission.programId
                            )
                        )}

                    </p>


                    <p>

                        Sale:

                        Rs.
                        ${formatMoney(
                            commission.saleAmount
                        )}

                    </p>


                    <p>

                        Rate:

                        ${escapeHTML(
                            commission.commissionRate
                        )}%

                    </p>


                    <p>

                        Commission:

                        <strong>

                            Rs.
                            ${formatMoney(
                                commission.commissionAmount
                            )}

                        </strong>

                    </p>


                    <p>

                        Status:

                        <strong>
                            ${escapeHTML(
                                commission.status
                            )}
                        </strong>

                    </p>

                </div>


                <div class="data-card-actions">

                    ${
                        commission.status !== "Paid"
                        ?

                        `<button
                            class="primary-btn"
                            onclick="markCommissionPaid('${commission.id}')">

                            Mark Paid

                        </button>`

                        :

                        ""

                    }

                </div>

            </div>

        `
        ).join("");

}


function showPaymentForm(){

    const area =
        document.getElementById(
            "paymentFormArea"
        );


    if(!area){
        return;
    }


    const pending =
        data.commissions.filter(
            c => c.status !== "Paid"
        );


    if(
        pending.length === 0
    ){

        alert(
            "No pending commissions available."
        );

        return;

    }


    area.innerHTML = `

        <div class="form-card">

            <h3>
                Mark Commission Payment
            </h3>


            <div class="form-grid">

                <label>

                    Commission

                    <select id="paymentCommission">

                        <option value="">
                            Select Commission
                        </option>

                        ${pending
                            .map(
                                c => `

                                <option
                                    value="${c.id}">

                                    ${escapeHTML(
                                        getPromoterName(
                                            c.promoterId
                                        )
                                    )}
                                    -
                                    Rs.
                                    ${formatMoney(
                                        c.commissionAmount
                                    )}

                                </option>

                            `
                            )
                            .join("")}

                    </select>

                </label>


                <label>

                    Payment Method

                    <select id="paymentMethod">

                        <option value="Bank">
                            Bank
                        </option>

                        <option value="JazzCash">
                            JazzCash
                        </option>

                        <option value="Easypaisa">
                            Easypaisa
                        </option>

                        <option value="Cash">
                            Cash
                        </option>

                    </select>

                </label>


                <label>

                    Payment Reference

                    <input
                        id="paymentReference"
                        placeholder="Transaction ID">

                </label>

            </div>


            <div class="form-actions">

                <button
                    class="primary-btn"
                    onclick="savePayment()">

                    Save Payment

                </button>


                <button
                    onclick="cancelPaymentForm()">

                    Cancel

                </button>

            </div>

        </div>

    `;

}


function savePayment(){

    const commissionId =
        document.getElementById(
            "paymentCommission"
        ).value;


    const method =
        document.getElementById(
            "paymentMethod"
        ).value;


    const reference =
        document.getElementById(
            "paymentReference"
        ).value.trim();


    if(!commissionId){

        alert(
            "Please select Commission."
        );

        return;

    }


    const commission =
        data.commissions.find(
            c => c.id === commissionId
        );


    if(!commission){
        return;
    }


    commission.status =
        "Paid";


    data.payments.push({

        id:
            makeId("payment"),

        commissionId:
            commission.id,

        promoterId:
            commission.promoterId,

        amount:
            commission.commissionAmount,

        method:
            method,

        reference:
            reference,

        date:
            new Date().toISOString()

    });


    saveData();


    renderCommissionModule(
        document.getElementById(
            "moduleContent"
        )
    );


    alert(
        "Payment saved successfully."
    );

}


function markCommissionPaid(id){

    const commission =
        data.commissions.find(
            c => c.id === id
        );


    if(!commission){
        return;
    }


    commission.status =
        "Paid";


    data.payments.push({

        id:
            makeId("payment"),

        commissionId:
            commission.id,

        promoterId:
            commission.promoterId,

        amount:
            commission.commissionAmount,

        method:
            "Manual",

        reference:
            "",

        date:
            new Date().toISOString()

    });


    saveData();


    renderCommissionModule(
        document.getElementById(
            "moduleContent"
        )
    );


    alert(
        "Commission marked as Paid."
    );

}


function cancelPaymentForm(){

    const area =
        document.getElementById(
            "paymentFormArea"
        );


    if(area){

        area.innerHTML = "";

    }

}


/* =========================================================
   REPORTS
========================================================= */

function renderReportsModule(container){

    const sales =
        data.orders.reduce(
            (sum,o) =>
                sum +
                Number(
                    o.amount || 0
                ),
            0
        );


    const commissions =
        data.commissions.reduce(
            (sum,c) =>
                sum +
                Number(
                    c.commissionAmount || 0
                ),
            0
        );


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
                    Assignments
                </h3>

                <strong>
                    ${data.assignments.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Tracking Links
                </h3>

                <strong>
                    ${data.trackingLinks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Total Clicks
                </h3>

                <strong>
                    ${data.clicks.length}
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


            <div class="report-card">

                <h3>
                    Total Sales
                </h3>

                <strong>

                    Rs.
                    ${formatMoney(
                        sales
                    )}

                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Commission
                </h3>

                <strong>

                    Rs.
                    ${formatMoney(
                        commissions
                    )}

                </strong>

            </div>

        </div>


        <div class="form-card">

            <h3>
                JANJUA Marketing Flow
            </h3>

            <p>

                Provider →
                Program →
                Promoter →
                Tracking →
                Click →
                Order →
                Commission →
                Payment

            </p>

        </div>

    `;

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories(){

    const container =
        document.getElementById(
            "categoryList"
        );


    if(!container){
        return;
    }


    container.innerHTML =
        data.categories
            .filter(
                category =>
                    category.visible
            )
            .map(
                category => `

                <div class="category-card">

                    <div class="category-title">

                        ${escapeHTML(
                            category.name
                        )}

                    </div>


                    <div class="category-actions">

                        <button
                            onclick="editCategory('${category.id}')">

                            Edit

                        </button>


                        <button
                            onclick="toggleCategory('${category.id}')">

                            Hide

                        </button>


                        <button
                            onclick="deleteCategory('${category.id}')">

                            Delete

                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}


function renderCategoryModule(container){

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


function renderModuleCategories(){

    const list =
        document.getElementById(
            "moduleCategoryList"
        );


    if(!list){
        return;
    }


    if(
        data.categories.length === 0
    ){

        list.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Categories
                </h3>

            </div>

        `;

        return;

    }


    list.innerHTML =
        data.categories.map(
            category => `

            <div class="data-card">

                <div>

                    <h3>

                        ${escapeHTML(
                            category.name
                        )}

                    </h3>


                    <p>

                        Status:

                        <strong>

                            ${category.visible
                                ? "ACTIVE"
                                : "HIDDEN"}

                        </strong>

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

        `
        ).join("");

}


function addCategory(){

    const name =
        prompt(
            "Enter Category Name:"
        );


    if(!name){
        return;
    }


    const cleanName =
        name.trim();


    if(!cleanName){
        return;
    }


    const exists =
        data.categories.some(
            c =>
                c.name.toLowerCase() ===
                cleanName.toLowerCase()
        );


    if(exists){

        alert(
            "This category already exists."
        );

        return;

    }


    data.categories.push({

        id:
            makeId("cat"),

        name:
            cleanName,

        visible:
            true

    });


    saveData();

    renderCategories();

    renderModuleCategories();

}


function editCategory(id){

    const category =
        data.categories.find(
            c => c.id === id
        );


    if(!category){
        return;
    }


    const name =
        prompt(
            "Edit Category:",
            category.name
        );


    if(!name){
        return;
    }


    const cleanName =
        name.trim();


    if(!cleanName){
        return;
    }


    category.name =
        cleanName;


    saveData();

    renderCategories();

    renderModuleCategories();

}


function toggleCategory(id){

    const category =
        data.categories.find(
            c => c.id === id
        );


    if(!category){
        return;
    }


    category.visible =
        !category.visible;


    saveData();

    renderCategories();

    renderModuleCategories();

}


function deleteCategory(id){

    if(
        !confirm(
            "Delete this Category?"
        )
    ){

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


/* =========================================================
   MODULE CSS
========================================================= */

function addModuleCSS(){

    if(
        document.getElementById(
            "moduleCSS"
        )
    ){

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "moduleCSS";


    style.textContent = `

        .module-overlay{

            position:fixed;

            inset:0;

            z-index:99999;

            background:rgba(0,0,0,.72);

            display:flex;

            justify-content:center;

            align-items:center;

            padding:15px;

        }


        .module-window{

            width:min(1100px,100%);

            max-height:92vh;

            overflow:auto;

            background:#fff;

            color:#17202a;

            border-radius:18px;

            box-shadow:

                0 20px 70px
                rgba(0,0,0,.4);

        }


        .module-header{

            position:sticky;

            top:0;

            z-index:2;

            display:flex;

            justify-content:space-between;

            align-items:center;

            padding:16px 20px;

            background:#17202a;

            color:#fff;

        }


        .module-header h2{

            margin:0;

            font-size:20px;

        }


        .module-close{

            border:0;

            background:transparent;

            color:#fff;

            font-size:32px;

            cursor:pointer;

            line-height:1;

        }


        .module-content{

            padding:20px;

        }


        .dashboard-module-title{

            margin-bottom:20px;

        }


        .dashboard-module-title h2{

            margin:0 0 6px;

        }


        .dashboard-module-title p{

            margin:0;

            color:#667085;

        }


        .module-toolbar{

            display:flex;

            justify-content:flex-end;

            margin-bottom:18px;

        }


        .primary-btn{

            border:0;

            border-radius:10px;

            padding:11px 16px;

            background:#17202a;

            color:#fff;

            cursor:pointer;

            font-weight:700;

        }


        .primary-btn:hover{

            opacity:.9;

        }


        .danger-btn{

            background:#b42318 !important;

            color:#fff !important;

        }


        .form-card{

            padding:18px;

            margin-bottom:20px;

            border:1px solid #e1e5e8;

            border-radius:15px;

            background:#f8fafb;

        }


        .form-card h3{

            margin-top:0;

        }


        .form-grid{

            display:grid;

            grid-template-columns:
                repeat(2,minmax(0,1fr));

            gap:14px;

        }


        .form-grid label{

            display:flex;

            flex-direction:column;

            gap:6px;

            font-weight:700;

            font-size:13px;

        }


        .form-grid input,

        .form-grid select{

            width:100%;

            padding:11px;

            border:1px solid #ccd3d8;

            border-radius:9px;

            background:#fff;

            color:#17202a;

        }


        .form-grid input:focus,

        .form-grid select:focus{

            outline:2px solid
                rgba(0,150,255,.15);

        }


        .form-actions{

            display:flex;

            gap:10px;

            margin-top:18px;

            flex-wrap:wrap;

        }


        .form-actions button{

            padding:10px 15px;

            border:0;

            border-radius:9px;

            cursor:pointer;

            font-weight:700;

        }


        .data-list{

            display:flex;

            flex-direction:column;

            gap:12px;

        }


        .data-card{

            display:flex;

            justify-content:space-between;

            gap:15px;

            padding:16px;

            border:1px solid #e1e5e8;

            border-radius:14px;

            background:#fff;

        }


        .data-card h3{

            margin:0 0 8px;

        }


        .data-card p{

            margin:5px 0;

            font-size:13px;

        }


        .data-card-actions{

            display:flex;

            align-items:center;

            gap:7px;

            flex-wrap:wrap;

        }


        .data-card-actions button{

            padding:8px 11px;

            border:0;

            border-radius:8px;

            cursor:pointer;

            background:#eef2f5;

            font-weight:700;

        }


        .tracking-url{

            word-break:break-all;

            color:#667085;

        }


        .empty-module{

            padding:45px 20px;

            text-align:center;

        }


        .report-grid{

            display:grid;

            grid-template-columns:
                repeat(4,minmax(0,1fr));

            gap:15px;

            margin-bottom:20px;

        }


        .report-card{

            padding:22px;

            text-align:center;

            border:1px solid #e1e5e8;

            border-radius:14px;

            background:#fff;

        }


        .report-card h3{

            margin:0;

            font-size:14px;

        }


        .report-card strong{

            display:block;

            font-size:28px;

            margin-top:10px;

        }


        @media(max-width:850px){

            .report-grid{

                grid-template-columns:
                    repeat(2,minmax(0,1fr));

            }

        }


        @media(max-width:700px){

            .form-grid{

                grid-template-columns:1fr;

            }


            .data-card{

                flex-direction:column;

            }


            .report-grid{

                grid-template-columns:1fr 1fr;

            }

        }


        @media(max-width:450px){

            .module-content{

                padding:12px;

            }


            .report-grid{

                grid-template-columns:1fr;

            }


            .module-header{

                padding:13px 15px;

            }

        }

    `;


    document.head.appendChild(style);

}


/* =========================================================
   END
========================================================= */
