/* =========================================================
   JANJUA - ALL IN ONE MARKETING PLATFORM
   COMPLETE APP.JS
   Social Media Link Automation Included
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

let data = loadData();


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

            ...JSON.parse(
                JSON.stringify(defaultData)
            ),

            ...parsed,

            categories:
                parsed.categories ||
                defaultData.categories,

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
                parsed.payments || []

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

function makeId(prefix = "ID"){

    return (

        prefix +

        "_" +

        Date.now().toString(36) +

        "_" +

        Math.random()
            .toString(36)
            .substring(2,8)

    ).toUpperCase();

}


function escapeHTML(value){

    if(value === null || value === undefined){

        return "";

    }

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


function getProviderName(id){

    const item =
        data.providers.find(
            x => x.id === id
        );

    return item
        ? item.name
        : "Unknown Provider";

}


function getProgramName(id){

    const item =
        data.programs.find(
            x => x.id === id
        );

    return item
        ? item.name
        : "Unknown Program";

}


function getPromoterName(id){

    const item =
        data.promoters.find(
            x => x.id === id
        );

    return item
        ? item.name
        : "Unknown Promoter";

}


/* =========================================================
   PAGE START
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
   DASHBOARD EVENTS
========================================================= */

function attachDashboardEvents(){

    document
        .querySelectorAll("[data-module]")
        .forEach(card => {

            card.addEventListener(
                "click",
                function(){

                    openModule(
                        this.dataset.module
                    );

                }
            );

        });

}


/* =========================================================
   ANIMATED BRANDING
   HIDE OLD STATIC BRANDING
========================================================= */

function addAnimatedBranding(){

    const header =
        document.querySelector("header");

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

    const overlay =
        document.createElement("div");

    overlay.className =
        "module-overlay";


    const windowBox =
        document.createElement("div");

    windowBox.className =
        "module-window";


    const header =
        document.createElement("div");

    header.className =
        "module-header";


    header.innerHTML = `

        <div>

            <h2>
                ${escapeHTML(module)}
            </h2>

        </div>

        <button
            class="module-close"
            onclick="this.closest('.module-overlay').remove()"
        >
            ×
        </button>

    `;


    const content =
        document.createElement("div");

    content.className =
        "module-content";


    windowBox.appendChild(header);

    windowBox.appendChild(content);

    overlay.appendChild(windowBox);

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


/* =========================================================
   DASHBOARD MODULE
========================================================= */

function renderDashboardModule(container){

    container.innerHTML = `

        <div class="report-grid">

            <div class="report-card">

                <h3>Providers</h3>

                <strong>
                    ${data.providers.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>Programs</h3>

                <strong>
                    ${data.programs.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>Promoters</h3>

                <strong>
                    ${data.promoters.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>Tracking Links</h3>

                <strong>
                    ${data.trackingLinks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>Social Media Links</h3>

                <strong>
                    ${data.socialLinks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>Total Clicks</h3>

                <strong>
                    ${data.clicks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>Total Orders</h3>

                <strong>
                    ${data.orders.length}
                </strong>

            </div>

        </div>


        <div class="form-card">

            <h3>
                JANJUA Marketing Control Center
            </h3>

            <p>

                Provider →
                Program →
                Promoter →
                Tracking →
                Social Media →
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


    const visibleCategories =
        data.categories.filter(
            x => x.visible !== false
        );


    container.innerHTML =
        visibleCategories.map(
            category => `

                <div class="category-card">

                    <div class="category-title">

                        ${escapeHTML(
                            category.name
                        )}

                    </div>

                    <div class="category-actions">

                        <button
                            onclick="editCategory('${category.id}')"
                        >
                            Edit
                        </button>

                        <button
                            onclick="toggleCategory('${category.id}')"
                        >
                            Hide
                        </button>

                    </div>

                </div>

            `
        ).join("");

}


function renderCategoryModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                onclick="addCategory()"
            >
                + Add Category
            </button>

        </div>


        <div id="moduleCategories"></div>

    `;

    renderModuleCategories();

}


function renderModuleCategories(){

    const container =
        document.getElementById(
            "moduleCategories"
        );

    if(!container){

        return;

    }


    container.innerHTML =
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
                            ${
                                category.visible
                                ? "Visible"
                                : "Hidden"
                            }

                        </p>

                    </div>


                    <div class="card-actions">

                        <button
                            onclick="editCategory('${category.id}')"
                        >
                            Edit
                        </button>

                        <button
                            onclick="toggleCategory('${category.id}')"
                        >
                            ${
                                category.visible
                                ? "Hide"
                                : "Show"
                            }
                        </button>

                        <button
                            onclick="deleteCategory('${category.id}')"
                        >
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
            "Enter category name:"
        );

    if(!name){

        return;

    }


    data.categories.push({

        id: makeId("CAT"),

        name: name.trim(),

        visible: true

    });


    saveData();

    renderCategories();

    renderModuleCategories();

}


function editCategory(id){

    const item =
        data.categories.find(
            x => x.id === id
        );

    if(!item){

        return;

    }


    const name =
        prompt(
            "Edit category:",
            item.name
        );

    if(!name){

        return;

    }


    item.name =
        name.trim();


    saveData();

    renderCategories();

    renderModuleCategories();

}


function toggleCategory(id){

    const item =
        data.categories.find(
            x => x.id === id
        );

    if(!item){

        return;

    }


    item.visible =
        !item.visible;


    saveData();

    renderCategories();

    renderModuleCategories();

}


function deleteCategory(id){

    if(
        !confirm(
            "Delete this category?"
        )
    ){

        return;

    }


    data.categories =
        data.categories.filter(
            x => x.id !== id
        );


    saveData();

    renderCategories();

    renderModuleCategories();

}


/* =========================================================
   PROVIDERS
========================================================= */

function renderProviderModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                onclick="showProviderForm()"
            >
                + Add Provider / Company
            </button>

        </div>


        <div id="providerFormArea"></div>

        <div id="providersList"></div>

    `;


    renderProviders();

}


function renderProviders(){

    const container =
        document.getElementById(
            "providersList"
        );

    if(!container){

        return;

    }


    if(!data.providers.length){

        container.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Providers Added
                </h3>

                <p>
                    Add your first affiliate company.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
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
                                provider.accountId || "-"
                            )}
                        </p>

                        <p>
                            SubID:
                            ${provider.subIdSupport ? "Yes" : "No"}
                            |
                            ClickID:
                            ${provider.clickIdSupport ? "Yes" : "No"}
                        </p>

                        <p>
                            API:
                            ${provider.api ? "Yes" : "No"}
                            |
                            Webhook:
                            ${provider.webhook ? "Yes" : "No"}
                        </p>

                        <p>
                            Status:
                            ${
                                provider.visible
                                ? "Active"
                                : "Hidden"
                            }
                        </p>

                    </div>


                    <div class="card-actions">

                        <button
                            onclick="editProvider('${provider.id}')"
                        >
                            Edit
                        </button>

                        <button
                            onclick="toggleProvider('${provider.id}')"
                        >
                            ${
                                provider.visible
                                ? "Hide"
                                : "Show"
                            }
                        </button>

                        <button
                            onclick="deleteProvider('${provider.id}')"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `
        ).join("");

}


function showProviderForm(id = ""){

    const container =
        document.getElementById(
            "providerFormArea"
        );

    if(!container){

        return;

    }


    const item =
        data.providers.find(
            x => x.id === id
        );


    container.innerHTML = `

        <div class="form-card">

            <h3>
                ${
                    item
                    ? "Edit Provider"
                    : "Add Provider / Company"
                }
            </h3>


            <input
                id="providerName"
                placeholder="Company / Provider Name"
                value="${escapeHTML(
                    item?.name || ""
                )}"
            />


            <input
                id="providerWebsite"
                placeholder="Website"
                value="${escapeHTML(
                    item?.website || ""
                )}"
            />


            <input
                id="providerAffiliateLink"
                placeholder="Original Affiliate Link"
                value="${escapeHTML(
                    item?.affiliateLink || ""
                )}"
            />


            <input
                id="providerAccountId"
                placeholder="Affiliate / Account ID"
                value="${escapeHTML(
                    item?.accountId || ""
                )}"
            />


            <label>

                <input
                    type="checkbox"
                    id="providerSubId"
                    ${
                        item?.subIdSupport
                        ? "checked"
                        : ""
                    }
                >

                SubID Support

            </label>


            <label>

                <input
                    type="checkbox"
                    id="providerClickId"
                    ${
                        item?.clickIdSupport
                        ? "checked"
                        : ""
                    }
                >

                ClickID Support

            </label>


            <label>

                <input
                    type="checkbox"
                    id="providerAPI"
                    ${
                        item?.api
                        ? "checked"
                        : ""
                    }
                >

                API Support

            </label>


            <label>

                <input
                    type="checkbox"
                    id="providerWebhook"
                    ${
                        item?.webhook
                        ? "checked"
                        : ""
                    }
                >

                Webhook Support

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
        document.getElementById(
            "providerName"
        ).value.trim();


    if(!name){

        alert(
            "Provider name is required."
        );

        return;

    }


    const item = {

        name,

        website:
            document.getElementById(
                "providerWebsite"
            ).value.trim(),

        affiliateLink:
            document.getElementById(
                "providerAffiliateLink"
            ).value.trim(),

        accountId:
            document.getElementById(
                "providerAccountId"
            ).value.trim(),

        subIdSupport:
            document.getElementById(
                "providerSubId"
            ).checked,

        clickIdSupport:
            document.getElementById(
                "providerClickId"
            ).checked,

        api:
            document.getElementById(
                "providerAPI"
            ).checked,

        webhook:
            document.getElementById(
                "providerWebhook"
            ).checked,

        visible: true,

        createdAt:
            new Date().toISOString()

    };


    if(id){

        const index =
            data.providers.findIndex(
                x => x.id === id
            );

        if(index !== -1){

            data.providers[index] = {

                ...data.providers[index],

                ...item

            };

        }

    }else{

        data.providers.push({

            id: makeId("PROVIDER"),

            ...item

        });

    }


    saveData();

    renderProviders();

    cancelProviderForm();

}


function editProvider(id){

    showProviderForm(id);

}


function toggleProvider(id){

    const item =
        data.providers.find(
            x => x.id === id
        );

    if(!item){

        return;

    }


    item.visible =
        !item.visible;


    saveData();

    renderProviders();

}


function deleteProvider(id){

    if(
        !confirm(
            "Delete this provider?"
        )
    ){

        return;

    }


    data.providers =
        data.providers.filter(
            x => x.id !== id
        );


    saveData();

    renderProviders();

}


function cancelProviderForm(){

    const container =
        document.getElementById(
            "providerFormArea"
        );

    if(container){

        container.innerHTML = "";

    }

}


/* =========================================================
   PROGRAMS
========================================================= */

function renderProgramModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                onclick="showProgramForm()"
            >
                + Add Program / Offer
            </button>

        </div>


        <div id="programFormArea"></div>

        <div id="programsList"></div>

    `;


    renderPrograms();

}


function renderPrograms(){

    const container =
        document.getElementById(
            "programsList"
        );

    if(!container){

        return;

    }


    if(!data.programs.length){

        container.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Programs Added
                </h3>

                <p>
                    Add affiliate offers here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
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
                            )} days
                        </p>

                    </div>


                    <div class="card-actions">

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

            `
        ).join("");

}


function showProgramForm(id = ""){

    const container =
        document.getElementById(
            "programFormArea"
        );

    if(!container){

        return;

    }


    const item =
        data.programs.find(
            x => x.id === id
        );


    const providerOptions =
        data.providers.map(
            provider => `

                <option
                    value="${provider.id}"
                    ${
                        item?.providerId === provider.id
                        ? "selected"
                        : ""
                    }
                >
                    ${escapeHTML(
                        provider.name
                    )}
                </option>

            `
        ).join("");


    const categoryOptions =
        data.categories.map(
            category => `

                <option
                    value="${escapeHTML(
                        category.name
                    )}"
                    ${
                        item?.category === category.name
                        ? "selected"
                        : ""
                    }
                >
                    ${escapeHTML(
                        category.name
                    )}
                </option>

            `
        ).join("");


    container.innerHTML = `

        <div class="form-card">

            <h3>
                ${
                    item
                    ? "Edit Program"
                    : "Add Program / Offer"
                }
            </h3>


            <input
                id="programName"
                placeholder="Program / Offer Name"
                value="${escapeHTML(
                    item?.name || ""
                )}"
            />


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
                id="programAffiliateLink"
                placeholder="Original Affiliate Link"
                value="${escapeHTML(
                    item?.affiliateLink || ""
                )}"
            />


            <input
                id="programCommission"
                type="number"
                placeholder="Commission %"
                value="${escapeHTML(
                    item?.commission || ""
                )}"
            />


            <input
                id="programCookie"
                type="number"
                placeholder="Cookie Days"
                value="${escapeHTML(
                    item?.cookieDays || ""
                )}"
            />


            <div class="form-actions">

                <button
                    onclick="saveProgram('${id}')"
                >
                    Save
                </button>

                <button
                    onclick="document.getElementById('programFormArea').innerHTML=''"
                >
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
            "Program name is required."
        );

        return;

    }


    if(!providerId){

        alert(
            "Please select a provider."
        );

        return;

    }


    const item = {

        name,

        providerId,

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
            ).value,

        createdAt:
            new Date().toISOString()

    };


    if(id){

        const index =
            data.programs.findIndex(
                x => x.id === id
            );

        if(index !== -1){

            data.programs[index] = {

                ...data.programs[index],

                ...item

            };

        }

    }else{

        data.programs.push({

            id: makeId("PROGRAM"),

            ...item

        });

    }


    saveData();

    renderPrograms();

    document.getElementById(
        "programFormArea"
    ).innerHTML = "";

}


function editProgram(id){

    showProgramForm(id);

}


function deleteProgram(id){

    if(
        !confirm(
            "Delete this program?"
        )
    ){

        return;

    }


    data.programs =
        data.programs.filter(
            x => x.id !== id
        );


    saveData();

    renderPrograms();

}


/* =========================================================
   PROMOTERS
========================================================= */

function renderPromoterModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                onclick="showPromoterForm()"
            >
                + Add Promoter / Worker
            </button>

        </div>


        <div id="promoterFormArea"></div>

        <div id="promotersList"></div>

    `;


    renderPromoters();

}


function renderPromoters(){

    const container =
        document.getElementById(
            "promotersList"
        );

    if(!container){

        return;

    }


    if(!data.promoters.length){

        container.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Promoters Added
                </h3>

                <p>
                    Add your first promoter.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
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


                    <div class="card-actions">

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
        ).join("");

}


function showPromoterForm(id = ""){

    const container =
        document.getElementById(
            "promoterFormArea"
        );

    if(!container){

        return;

    }


    const item =
        data.promoters.find(
            x => x.id === id
        );


    container.innerHTML = `

        <div class="form-card">

            <h3>
                ${
                    item
                    ? "Edit Promoter"
                    : "Add Promoter / Worker"
                }
            </h3>


            <input
                id="promoterName"
                placeholder="Full Name"
                value="${escapeHTML(
                    item?.name || ""
                )}"
            />


            <input
                id="promoterPhone"
                placeholder="Phone"
                value="${escapeHTML(
                    item?.phone || ""
                )}"
            />


            <input
                id="promoterEmail"
                placeholder="Email"
                value="${escapeHTML(
                    item?.email || ""
                )}"
            />


            <select id="promoterPaymentMethod">

                <option value="Bank">
                    Bank
                </option>

                <option value="JazzCash">
                    JazzCash
                </option>

                <option value="Easypaisa">
                    Easypaisa
                </option>

            </select>


            <input
                id="promoterPaymentAccount"
                placeholder="Payment Account"
                value="${escapeHTML(
                    item?.paymentAccount || ""
                )}"
            />


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
        document.getElementById(
            "promoterName"
        ).value.trim();


    if(!name){

        alert(
            "Name is required."
        );

        return;

    }


    const item = {

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
                "promoterPaymentMethod"
            ).value,

        paymentAccount:
            document.getElementById(
                "promoterPaymentAccount"
            ).value.trim(),

        createdAt:
            new Date().toISOString()

    };


    if(id){

        const index =
            data.promoters.findIndex(
                x => x.id === id
            );

        if(index !== -1){

            data.promoters[index] = {

                ...data.promoters[index],

                ...item

            };

        }

    }else{

        data.promoters.push({

            id: makeId("PROMOTER"),

            ...item

        });

    }


    saveData();

    renderPromoters();

    cancelPromoterForm();

}


function editPromoter(id){

    showPromoterForm(id);

}


function deletePromoter(id){

    if(
        !confirm(
            "Delete this promoter and related tracking links?"
        )
    ){

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


    data.trackingLinks =
        data.trackingLinks.filter(
            x => x.promoterId !== id
        );


    saveData();

    renderPromoters();

}


function cancelPromoterForm(){

    const container =
        document.getElementById(
            "promoterFormArea"
        );

    if(container){

        container.innerHTML = "";

    }

}


/* =========================================================
   TRACKING MODULE
========================================================= */

function renderTrackingModule(container){

    container.innerHTML = `

        <div class="module-toolbar">

            <button
                onclick="showAssignmentForm()"
            >
                + Assign Program to Promoter
            </button>

            <button
                onclick="showSocialLinkForm()"
            >
                + Social Media Link
            </button>

        </div>


        <div id="assignmentFormArea"></div>


        <div id="trackingLinksArea"></div>


        <hr>


        <div class="form-card">

            <h2>
                🔗 Social Media Links
            </h2>

            <p>
                Admin-generated links for
                Facebook, Instagram, TikTok
                and WhatsApp.
            </p>

            <p>
                🔒 Original Affiliate Links remain
                inside Admin data.
            </p>

        </div>


        <div id="socialLinkFormArea"></div>


        <div id="socialLinksArea"></div>

    `;


    renderTrackingLinks();

    renderSocialMediaLinks();

}


/* =========================================================
   PROMOTER ASSIGNMENT
========================================================= */

function showAssignmentForm(){

    const container =
        document.getElementById(
            "assignmentFormArea"
        );

    if(!container){

        return;

    }


    const promoterOptions =
        data.promoters.map(
            promoter => `

                <option value="${promoter.id}">

                    ${escapeHTML(
                        promoter.name
                    )}

                </option>

            `
        ).join("");


    const programOptions =
        data.programs.map(
            program => `

                <option value="${program.id}">

                    ${escapeHTML(
                        program.name
                    )}

                </option>

            `
        ).join("");


    container.innerHTML = `

        <div class="form-card">

            <h3>
                Assign Program to Promoter
            </h3>


            <select id="assignmentPromoter">

                <option value="">
                    Select Promoter
                </option>

                ${promoterOptions}

            </select>


            <select id="assignmentProgram">

                <option value="">
                    Select Program
                </option>

                ${programOptions}

            </select>


            <div class="form-actions">

                <button
                    onclick="createTrackingAssignment()"
                >
                    Generate Tracking Link
                </button>

                <button
                    onclick="cancelAssignmentForm()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

}


function createTrackingAssignment(){

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
            "Please select promoter and program."
        );

        return;

    }


    const duplicate =
        data.trackingLinks.find(
            x =>
                x.promoterId === promoterId &&
                x.programId === programId
        );


    if(duplicate){

        alert(
            "This promoter already has this program."
        );

        return;

    }


    const promoter =
        data.promoters.find(
            x => x.id === promoterId
        );


    const prefix =
        promoter
        ? promoter.name
            .replace(/[^a-zA-Z0-9]/g,"")
            .substring(0,8)
            .toUpperCase()
        : "PROMOTER";


    const code =
        prefix +
        "_" +
        Math.random()
            .toString(36)
            .substring(2,8)
            .toUpperCase();


    const url =
        window.location.origin +
        window.location.pathname +
        "?ref=" +
        encodeURIComponent(code);


    data.trackingLinks.push({

        id: makeId("TRACK"),

        promoterId,

        programId,

        code,

        url,

        active: true,

        clicks: 0,

        createdAt:
            new Date().toISOString()

    });


    saveData();

    cancelAssignmentForm();

    renderTrackingLinks();

}


function cancelAssignmentForm(){

    const container =
        document.getElementById(
            "assignmentFormArea"
        );

    if(container){

        container.innerHTML = "";

    }

}


/* =========================================================
   TRACKING LINKS
========================================================= */

function renderTrackingLinks(){

    const container =
        document.getElementById(
            "trackingLinksArea"
        );

    if(!container){

        return;

    }


    if(!data.trackingLinks.length){

        container.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Tracking Links
                </h3>

                <p>
                    Assign a program to a promoter
                    to generate a tracking link.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="form-card">

            <h2>
                🔒 Affiliate Tracking Links
            </h2>

            <p>
                These are promoter tracking links.
            </p>

        </div>


        ${

            data.trackingLinks.map(
                link => `

                    <div class="data-card">

                        <div>

                            <h3>

                                ${escapeHTML(
                                    getProgramName(
                                        link.programId
                                    )
                                )}

                            </h3>

                            <p>

                                Promoter:
                                ${escapeHTML(
                                    getPromoterName(
                                        link.promoterId
                                    )
                                )}

                            </p>

                            <p>

                                Code:
                                ${escapeHTML(
                                    link.code
                                )}

                            </p>

                            <p>

                                Clicks:
                                ${link.clicks || 0}

                            </p>

                            <p>

                                Status:
                                ${
                                    link.active
                                    ? "Active"
                                    : "Inactive"
                                }

                            </p>

                        </div>


                        <div class="card-actions">

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
                                ${
                                    link.active
                                    ? "Disable"
                                    : "Enable"
                                }
                            </button>

                        </div>

                    </div>

                `
            ).join("")

        }

    `;

}


function copyTrackingLink(id){

    const link =
        data.trackingLinks.find(
            x => x.id === id
        );

    if(!link){

        return;

    }


    copyText(
        link.url,
        "Tracking link copied."
    );

}


function testTrackingLink(id){

    const link =
        data.trackingLinks.find(
            x => x.id === id
        );

    if(!link){

        return;

    }


    window.open(
        link.url,
        "_blank"
    );

}


function toggleTrackingLink(id){

    const link =
        data.trackingLinks.find(
            x => x.id === id
        );

    if(!link){

        return;

    }


    link.active =
        !link.active;


    saveData();

    renderTrackingLinks();

}


/* =========================================================
   SOCIAL MEDIA LINK FORM
========================================================= */

function showSocialLinkForm(){

    const container =
        document.getElementById(
            "socialLinkFormArea"
        );

    if(!container){

        return;

    }


    if(!data.programs.length){

        container.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Program Available
                </h3>

                <p>
                    First add a Program / Offer.
                </p>

            </div>

        `;

        return;

    }


    const programOptions =
        data.programs.map(
            program => `

                <option value="${program.id}">

                    ${escapeHTML(
                        program.name
                    )}

                </option>

            `
        ).join("");


    container.innerHTML = `

        <div class="form-card">

            <h3>
                Create Social Media Link
            </h3>


            <select id="socialProgram">

                <option value="">
                    Select Program / Offer
                </option>

                ${programOptions}

            </select>


            <select id="socialPlatform">

                <option value="All">
                    All Social Media
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


            <div class="form-actions">

                <button
                    onclick="createSocialMediaLink()"
                >
                    Generate Social Media Link
                </button>

                <button
                    onclick="cancelSocialLinkForm()"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

}


function cancelSocialLinkForm(){

    const container =
        document.getElementById(
            "socialLinkFormArea"
        );

    if(container){

        container.innerHTML = "";

    }

}


/* =========================================================
   CREATE SOCIAL MEDIA LINK
========================================================= */

function createSocialMediaLink(){

    const programId =
        document.getElementById(
            "socialProgram"
        ).value;


    const platform =
        document.getElementById(
            "socialPlatform"
        ).value;


    if(!programId){

        alert(
            "Please select a program."
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

        id: makeId("SOCIAL"),

        programId,

        code,

        url,

        platform,

        active: true,

        clicks: 0,

        createdAt:
            new Date().toISOString()

    });


    saveData();

    cancelSocialLinkForm();

    renderSocialMediaLinks();

    alert(
        "Social Media Link generated successfully."
    );

}


/* =========================================================
   SOCIAL MEDIA LINKS DISPLAY
========================================================= */

function renderSocialMediaLinks(){

    const container =
        document.getElementById(
            "socialLinksArea"
        );

    if(!container){

        return;

    }


    if(!data.socialLinks.length){

        container.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Social Media Links
                </h3>

                <p>
                    Click "+ Social Media Link"
                    to create one.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="form-card">

            <h2>
                📱 Social Media Automation Links
            </h2>

            <p>
                Copy these links and share them
                on your social media platforms.
            </p>

        </div>


        ${

            data.socialLinks.map(
                link => `

                    <div class="data-card">

                        <div>

                            <h3>

                                ${escapeHTML(
                                    getProgramName(
                                        link.programId
                                    )
                                )}

                            </h3>

                            <p>

                                Platform:
                                <strong>
                                    ${escapeHTML(
                                        link.platform
                                    )}
                                </strong>

                            </p>


                            <p>

                                Social Code:
                                ${escapeHTML(
                                    link.code
                                )}

                            </p>


                            <p>

                                Clicks:
                                ${link.clicks || 0}

                            </p>


                            <p>

                                Status:
                                ${
                                    link.active
                                    ? "Active"
                                    : "Inactive"
                                }

                            </p>


                            <input
                                readonly
                                value="${escapeHTML(
                                    link.url
                                )}"
                                style="
                                    width:100%;
                                    margin-top:8px;
                                    padding:10px;
                                "
                            >

                        </div>


                        <div class="card-actions">

                            <button
                                onclick="copySocialLink('${link.id}')"
                            >
                                📋 Copy Link
                            </button>


                            <button
                                onclick="testSocialLink('${link.id}')"
                            >
                                🔗 Test
                            </button>


                            <button
                                onclick="toggleSocialLink('${link.id}')"
                            >
                                ${
                                    link.active
                                    ? "Disable"
                                    : "Enable"
                                }
                            </button>


                            <button
                                onclick="deleteSocialLink('${link.id}')"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                `
            ).join("")

        }

    `;

}


/* =========================================================
   COPY SOCIAL LINK
========================================================= */

function copySocialLink(id){

    const link =
        data.socialLinks.find(
            x => x.id === id
        );

    if(!link){

        return;

    }


    copyText(
        link.url,
        "Social Media Link copied."
    );

}


/* =========================================================
   TEST SOCIAL LINK
========================================================= */

function testSocialLink(id){

    const link =
        data.socialLinks.find(
            x => x.id === id
        );

    if(!link){

        return;

    }


    window.open(
        link.url,
        "_blank"
    );

}


/* =========================================================
   TOGGLE SOCIAL LINK
========================================================= */

function toggleSocialLink(id){

    const link =
        data.socialLinks.find(
            x => x.id === id
        );

    if(!link){

        return;

    }


    link.active =
        !link.active;


    saveData();

    renderSocialMediaLinks();

}


/* =========================================================
   DELETE SOCIAL LINK
========================================================= */

function deleteSocialLink(id){

    if(
        !confirm(
            "Delete this Social Media Link?"
        )
    ){

        return;

    }


    data.socialLinks =
        data.socialLinks.filter(
            x => x.id !== id
        );


    saveData();

    renderSocialMediaLinks();

}


/* =========================================================
   COPY TEXT HELPER
========================================================= */

function copyText(text, message){

    if(
        navigator.clipboard &&
        navigator.clipboard.writeText
    ){

        navigator.clipboard
            .writeText(text)
            .then(
                () => alert(message)
            )
            .catch(
                () => fallbackCopy(text, message)
            );

        return;

    }


    fallbackCopy(
        text,
        message
    );

}


function fallbackCopy(text, message){

    const textarea =
        document.createElement(
            "textarea"
        );

    textarea.value =
        text;

    document.body.appendChild(
        textarea
    );

    textarea.select();

    try{

        document.execCommand(
            "copy"
        );

        alert(message);

    }catch(error){

        alert(
            "Please copy the link manually."
        );

    }

    textarea.remove();

}


/* =========================================================
   PUBLIC TRACKING LINK HANDLER
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
            x =>
                x.code === ref &&
                x.active
        );


    if(!link){

        return;

    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    data.clicks.push({

        id: makeId("CLICK"),

        trackingLinkId:
            link.id,

        code:
            link.code,

        promoterId:
            link.promoterId,

        programId:
            link.programId,

        type:
            "promoter",

        createdAt:
            new Date().toISOString()

    });


    saveData();

}


/* =========================================================
   PUBLIC SOCIAL MEDIA LINK HANDLER
========================================================= */

function handlePublicSocialLink(){

    const params =
        new URLSearchParams(
            window.location.search
        );


    const socialCode =
        params.get("social");


    if(!socialCode){

        return;

    }


    const link =
        data.socialLinks.find(
            x =>
                x.code === socialCode &&
                x.active
        );


    if(!link){

        return;

    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    data.clicks.push({

        id: makeId("SOCIALCLICK"),

        socialLinkId:
            link.id,

        code:
            link.code,

        programId:
            link.programId,

        type:
            "social",

        platform:
            link.platform,

        createdAt:
            new Date().toISOString()

    });


    saveData();


    /*
       IMPORTANT:

       This frontend prototype records the click.

       It does NOT securely redirect to the original
       affiliate link because the original affiliate
       URL is still stored in browser localStorage.

       Secure affiliate redirection will be connected
       later through a backend/server.
    */


    showSocialLandingMessage(link);

}


/* =========================================================
   SOCIAL LANDING MESSAGE
========================================================= */

function showSocialLandingMessage(link){

    const box =
        document.createElement(
            "div"
        );


    box.style.position =
        "fixed";

    box.style.inset =
        "0";

    box.style.background =
        "rgba(0,0,0,0.75)";

    box.style.display =
        "flex";

    box.style.alignItems =
        "center";

    box.style.justifyContent =
        "center";

    box.style.zIndex =
        "999999";


    box.innerHTML = `

        <div
            style="
                background:white;
                max-width:500px;
                width:90%;
                padding:30px;
                border-radius:18px;
                text-align:center;
                box-shadow:0 20px 50px rgba(0,0,0,.3);
            "
        >

            <h2>
                JANJUA
            </h2>


            <h3>
                ${escapeHTML(
                    getProgramName(
                        link.programId
                    )
                )}
            </h3>


            <p>
                Thank you for visiting.
            </p>


            <p>
                Your request has been recorded.
            </p>


            <button
                onclick="this.closest('div[style]').parentElement.remove()"
                style="
                    padding:12px 22px;
                    border:0;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                Continue
            </button>

        </div>

    `;


    document.body.appendChild(
        box
    );

}


/* =========================================================
   ORDERS & CLICKS
========================================================= */

function renderOrdersModule(container){

    container.innerHTML = `

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
                    Promoter Clicks
                </h3>

                <strong>
                    ${
                        data.clicks.filter(
                            x => x.type === "promoter"
                        ).length
                    }
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Social Media Clicks
                </h3>

                <strong>
                    ${
                        data.clicks.filter(
                            x => x.type === "social"
                        ).length
                    }
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

        </div>


        <div class="form-card">

            <h3>
                Orders & Conversion Tracking
            </h3>

            <p>
                Orders will be connected with
                tracking codes and affiliate
                conversions in the next phase.
            </p>

        </div>

    `;

}


/* =========================================================
   COMMISSION & PAYMENTS
========================================================= */

function renderCommissionModule(container){

    container.innerHTML = `

        <div class="report-grid">

            <div class="report-card">

                <h3>
                    Commissions
                </h3>

                <strong>
                    ${data.commissions.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Payments
                </h3>

                <strong>
                    ${data.payments.length}
                </strong>

            </div>

        </div>


        <div class="form-card">

            <h3>
                Commission & Promoter Payments
            </h3>

            <p>
                Commission calculation and payment
                management will be connected in
                the next phase.
            </p>

        </div>

    `;

}


/* =========================================================
   REPORTS
========================================================= */

function renderReportsModule(container){

    const socialClicks =
        data.clicks.filter(
            x => x.type === "social"
        ).length;


    const promoterClicks =
        data.clicks.filter(
            x => x.type === "promoter"
        ).length;


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
                    Tracking Links
                </h3>

                <strong>
                    ${data.trackingLinks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Social Links
                </h3>

                <strong>
                    ${data.socialLinks.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Promoter Clicks
                </h3>

                <strong>
                    ${promoterClicks}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Social Clicks
                </h3>

                <strong>
                    ${socialClicks}
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


/* =========================================================
   MODULE CSS
========================================================= */

function addModuleCSS(){

    if(
        document.getElementById(
            "janjuaModuleCSS"
        )
    ){

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "janjuaModuleCSS";


    style.innerHTML = `

        .module-overlay{

            position:fixed;
            inset:0;
            background:rgba(0,0,0,.65);
            z-index:9999;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:15px;

        }


        .module-window{

            background:#ffffff;
            width:min(1100px,96vw);
            max-height:92vh;
            overflow:auto;
            border-radius:18px;
            box-shadow:0 20px 70px rgba(0,0,0,.35);

        }


        .module-header{

            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:18px 22px;
            background:#111827;
            color:white;
            position:sticky;
            top:0;
            z-index:2;

        }


        .module-header h2{

            margin:0;
            text-transform:capitalize;

        }


        .module-close{

            background:transparent;
            border:0;
            color:white;
            font-size:32px;
            cursor:pointer;

        }


        .module-content{

            padding:20px;

        }


        .module-toolbar{

            display:flex;
            gap:10px;
            flex-wrap:wrap;
            margin-bottom:20px;

        }


        .module-toolbar button,
        .form-actions button,
        .card-actions button{

            border:0;
            border-radius:8px;
            padding:10px 14px;
            cursor:pointer;

        }


        .form-card{

            background:#f5f7fa;
            border-radius:14px;
            padding:18px;
            margin-bottom:20px;

        }


        .form-card h2,
        .form-card h3{

            margin-top:0;

        }


        .form-card input,
        .form-card select{

            width:100%;
            padding:12px;
            margin:7px 0;
            border:1px solid #d5d9df;
            border-radius:8px;
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


        .data-card{

            display:flex;
            justify-content:space-between;
            gap:20px;
            align-items:center;
            background:white;
            border:1px solid #e2e6eb;
            border-radius:14px;
            padding:16px;
            margin-bottom:12px;

        }


        .data-card h3{

            margin:0 0 8px;

        }


        .data-card p{

            margin:5px 0;

        }


        .card-actions{

            display:flex;
            gap:7px;
            flex-wrap:wrap;
            justify-content:flex-end;

        }


        .empty-module{

            text-align:center;
            padding:35px 20px;
            background:#f7f8fa;
            border-radius:14px;

        }


        .report-grid{

            display:grid;
            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(160px,1fr)
                );
            gap:14px;
            margin-bottom:20px;

        }


        .report-card{

            background:#f5f7fa;
            border-radius:14px;
            padding:20px;
            text-align:center;

        }


        .report-card h3{

            margin:0 0 10px;

        }


        .report-card strong{

            display:block;
            font-size:30px;

        }


        @media(max-width:650px){

            .data-card{

                flex-direction:column;
                align-items:stretch;

            }


            .card-actions{

                justify-content:flex-start;

            }

        }

    `;


    document.head.appendChild(
        style
    );

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
        document.createElement(
            "style"
        );


    style.id =
        "janjuaBrandAnimationCSS";


    style.innerHTML = `

        #janjuaAnimatedBrand{

            width:100%;
            display:flex;
            justify-content:center;
            align-items:center;
            overflow:hidden;

        }


        .janjua-brand-animation{

            position:relative;
            width:100%;
            max-width:700px;
            min-height:125px;
            display:flex;
            align-items:center;
            justify-content:center;
            overflow:hidden;

        }


        .brand-main{

            position:relative;
            z-index:5;
            text-align:center;
            padding:15px 30px;

        }


        .brand-title{

            font-size:38px;
            font-weight:900;
            letter-spacing:7px;

        }


        .brand-subtitle{

            font-size:14px;
            margin-top:3px;

        }


        .brand-status{

            margin-top:7px;
            font-size:12px;
            letter-spacing:2px;

        }


        .status-dot{

            display:inline-block;
            width:9px;
            height:9px;
            border-radius:50%;
            margin-right:6px;
            background:#20d46b;
            box-shadow:
                0 0 12px #20d46b;
            animation:
                brandPulse 1.5s infinite;

        }


        .brand-orbit{

            position:absolute;
            border:1px solid rgba(255,255,255,.35);
            border-radius:50%;
            pointer-events:none;

        }


        .orbit-one{

            width:310px;
            height:85px;
            transform:rotate(-12deg);
            animation:
                brandOrbitOne 5s linear infinite;

        }


        .orbit-two{

            width:420px;
            height:120px;
            transform:rotate(18deg);
            animation:
                brandOrbitTwo 7s linear infinite;

        }


        .orbit-three{

            width:540px;
            height:145px;
            transform:rotate(-25deg);
            animation:
                brandOrbitThree 9s linear infinite;

        }


        @keyframes brandOrbitOne{

            from{
                transform:
                    rotate(-12deg)
                    scale(1);
            }

            50%{
                transform:
                    rotate(168deg)
                    scale(1.04);
            }

            to{
                transform:
                    rotate(348deg)
                    scale(1);
            }

        }


        @keyframes brandOrbitTwo{

            from{
                transform:
                    rotate(18deg);
            }

            to{
                transform:
                    rotate(378deg);
            }

        }


        @keyframes brandOrbitThree{

            from{
                transform:
                    rotate(-25deg);
            }

            to{
                transform:
                    rotate(335deg);
            }

        }


        @keyframes brandPulse{

            0%,100%{

                opacity:.5;
                transform:scale(.8);

            }

            50%{

                opacity:1;
                transform:scale(1.25);

            }

        }


        @media(max-width:600px){

            .brand-title{

                font-size:28px;
                letter-spacing:4px;

            }


            .brand-subtitle{

                font-size:11px;

            }


            .janjua-brand-animation{

                min-height:115px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}
