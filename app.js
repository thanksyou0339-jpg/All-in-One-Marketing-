/* =========================================================
   ALL IN ONE MARKETING
   JANJUA DIGITAL MARKETING PLATFORM
   Main Application JavaScript
   ========================================================= */

const STORAGE_KEY = "all_in_one_marketing_v1";


/* =========================================================
   DEFAULT CATEGORIES
   ========================================================= */

const defaultCategories = [
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
        description: "Factory jobs, services and business opportunities.",
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
        description: "Property, real estate and housing offers.",
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
        description: "Healthcare services and related offers.",
        status: "coming-soon"
    },
    {
        id: "freelance-services",
        name: "Freelance & Services",
        icon: "💻",
        description: "Freelancing, digital and professional services.",
        status: "coming-soon"
    }
];


/* =========================================================
   DEFAULT APPLICATION DATA
   ========================================================= */

const defaultData = {
    categories: defaultCategories,

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

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultData)
            );

            return JSON.parse(
                JSON.stringify(defaultData)
            );
        }

        const parsed = JSON.parse(saved);

        return {
            ...defaultData,
            ...parsed
        };

    } catch (error) {

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

function saveData(data) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "Data saving error:",
            error
        );

        alert(
            "Data save نہیں ہو سکا۔"
        );

        return false;
    }
}


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let appData = loadData();


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCategories();

        updateDashboardStats();

    }
);


/* =========================================================
   RENDER CATEGORIES
   ========================================================= */

function renderCategories() {

    const categoryList =
        document.getElementById(
            "categoryList"
        );

    if (!categoryList) {
        return;
    }

    categoryList.innerHTML = "";

    if (
        !appData.categories ||
        appData.categories.length === 0
    ) {

        categoryList.innerHTML = `
            <div class="category-card">
                <h3>No Categories</h3>
                <p>
                    ابھی کوئی category موجود نہیں ہے۔
                </p>
            </div>
        `;

        return;
    }


    appData.categories.forEach(
        function (category) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "category-card";


            let statusHTML = "";

            if (
                category.status ===
                "coming-soon"
            ) {

                statusHTML = `
                    <span class="coming-soon">
                        COMING SOON
                    </span>
                `;

            } else {

                statusHTML = `
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
                        Open Category
                    </button>
                `;
            }


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

                ${statusHTML}
            `;


            categoryList.appendChild(card);

        }
    );
}


/* =========================================================
   OPEN CATEGORY
   ========================================================= */

function openCategory(categoryId) {

    const category =
        appData.categories.find(
            function (item) {
                return item.id === categoryId;
            }
        );


    if (!category) {

        alert(
            "Category نہیں ملی۔"
        );

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


    alert(
        "Category Opened: " +
        category.name +
        "\n\nاس category کے اندر Programs, Providers, Promoters اور Tracking Links manage کیے جائیں گے۔"
    );
}


/* =========================================================
   ADD CATEGORY
   ========================================================= */

function addCategory() {

    const name =
        prompt(
            "نئی Category کا نام لکھیں:"
        );


    if (!name) {
        return;
    }


    const description =
        prompt(
            "Category کی مختصر تفصیل لکھیں:"
        ) ||
        "Marketing category";


    const newCategory = {

        id:
            "category-" +
            Date.now(),

        name:
            name.trim(),

        icon:
            "📁",

        description:
            description.trim(),

        status:
            "active"
    };


    appData.categories.push(
        newCategory
    );


    saveData(appData);

    renderCategories();

    alert(
        "Category کامیابی سے شامل ہو گئی۔"
    );
}


/* =========================================================
   OPEN MODULE
   ========================================================= */

function openModule(moduleName) {

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
        titles[moduleName] ||
        moduleName;


    alert(
        title +
        "\n\nیہ module اگلے مرحلے میں مکمل طور پر functional بنایا جائے گا۔"
    );
}


/* =========================================================
   DASHBOARD STATS
   ========================================================= */

function updateDashboardStats() {

    const totalCategories =
        appData.categories
            ? appData.categories.length
            : 0;

    const totalProviders =
        appData.providers
            ? appData.providers.length
            : 0;

    const totalPrograms =
        appData.programs
            ? appData.programs.length
            : 0;

    const totalPromoters =
        appData.promoters
            ? appData.promoters.length
            : 0;


    console.log(
        "All in One Marketing Stats"
    );

    console.log(
        "Categories:",
        totalCategories
    );

    console.log(
        "Providers:",
        totalProviders
    );

    console.log(
        "Programs:",
        totalPrograms
    );

    console.log(
        "Promoters:",
        totalPromoters
    );
}


/* =========================================================
   CREATE TRACKING CODE
   ========================================================= */

function generateTrackingCode(
    promoterId,
    programId
) {

    const random =
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();


    return (
        "AIM-" +
        String(promoterId)
            .substring(0, 4)
            .toUpperCase() +
        "-" +
        String(programId)
            .substring(0, 4)
            .toUpperCase() +
        "-" +
        random
    );
}


/* =========================================================
   CREATE PUBLIC TRACKING LINK
   ========================================================= */

function createTrackingLink(
    promoterId,
    programId,
    originalAffiliateLink
) {

    const trackingCode =
        generateTrackingCode(
            promoterId,
            programId
        );


    const trackingRecord = {

        id:
            "link-" +
            Date.now(),

        promoterId:
            promoterId,

        programId:
            programId,

        trackingCode:
            trackingCode,

        originalAffiliateLink:
            originalAffiliateLink,

        publicLink:
            window.location.origin +
            window.location.pathname +
            "?ref=" +
            trackingCode,

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
    };


    appData.trackingLinks.push(
        trackingRecord
    );


    saveData(appData);


    return trackingRecord;
}


/* =========================================================
   TRACK CLICK
   ========================================================= */

function trackClick(
    trackingCode
) {

    const link =
        appData.trackingLinks.find(
            function (item) {

                return (
                    item.trackingCode ===
                    trackingCode
                );

            }
        );


    if (!link) {
        return false;
    }


    link.clicks =
        Number(link.clicks || 0) + 1;


    appData.clicks.push({

        id:
            "click-" +
            Date.now(),

        trackingCode:
            trackingCode,

        date:
            new Date().toISOString()
    });


    saveData(appData);


    return true;
}


/* =========================================================
   PUBLIC LINK HANDLER
   ========================================================= */

function handlePublicTracking() {

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
            function (item) {

                return (
                    item.trackingCode ===
                    ref
                );

            }
        );


    if (!link) {
        return;
    }


    trackClick(ref);


    /*
       Important:

       This is the basic frontend
       tracking mechanism.

       For a secure production system,
       the redirect and click tracking
       should later be moved to a
       server/backend.
    */


    if (
        link.originalAffiliateLink
    ) {

        window.location.href =
            link.originalAffiliateLink;
    }
}


/* =========================================================
   ADD PROVIDER
   ========================================================= */

function addProvider(provider) {

    if (!provider) {
        return null;
    }


    const record = {

        id:
            "provider-" +
            Date.now(),

        name:
            provider.name || "",

        website:
            provider.website || "",

        affiliateLink:
            provider.affiliateLink || "",

        affiliateId:
            provider.affiliateId || "",

        subIdSupport:
            provider.subIdSupport || false,

        clickIdSupport:
            provider.clickIdSupport || false,

        apiSupport:
            provider.apiSupport || false,

        webhookSupport:
            provider.webhookSupport || false,

        notes:
            provider.notes || "",

        createdAt:
            new Date().toISOString()
    };


    appData.providers.push(
        record
    );


    saveData(appData);


    return record;
}


/* =========================================================
   ADD PROGRAM
   ========================================================= */

function addProgram(program) {

    if (!program) {
        return null;
    }


    const record = {

        id:
            "program-" +
            Date.now(),

        providerId:
            program.providerId || "",

        categoryId:
            program.categoryId || "",

        name:
            program.name || "",

        originalAffiliateLink:
            program.originalAffiliateLink || "",

        commissionType:
            program.commissionType || "percentage",

        commissionValue:
            Number(
                program.commissionValue || 0
            ),

        cookieDays:
            Number(
                program.cookieDays || 0
            ),

        status:
            program.status || "active",

        createdAt:
            new Date().toISOString()
    };


    appData.programs.push(
        record
    );


    saveData(appData);


    return record;
}


/* =========================================================
   ADD PROMOTER
   ========================================================= */

function addPromoter(promoter) {

    if (!promoter) {
        return null;
    }


    const record = {

        id:
            "promoter-" +
            Date.now(),

        name:
            promoter.name || "",

        phone:
            promoter.phone || "",

        email:
            promoter.email || "",

        paymentMethod:
            promoter.paymentMethod || "",

        paymentAccount:
            promoter.paymentAccount || "",

        status:
            promoter.status || "active",

        createdAt:
            new Date().toISOString()
    };


    appData.promoters.push(
        record
    );


    saveData(appData);


    return record;
}


/* =========================================================
   ADD ASSIGNMENT
   ========================================================= */

function addAssignment(
    promoterId,
    programId
) {

    const assignment = {

        id:
            "assignment-" +
            Date.now(),

        promoterId:
            promoterId,

        programId:
            programId,

        assignedAt:
            new Date().toISOString(),

        status:
            "active"
    };


    appData.assignments.push(
        assignment
    );


    saveData(appData);


    return assignment;
}


/* =========================================================
   ADD ORDER
   ========================================================= */

function addOrder(order) {

    if (!order) {
        return null;
    }


    const record = {

        id:
            "order-" +
            Date.now(),

        trackingCode:
            order.trackingCode || "",

        orderReference:
            order.orderReference || "",

        customer:
            order.customer || "",

        saleAmount:
            Number(
                order.saleAmount || 0
            ),

        commission:
            Number(
                order.commission || 0
            ),

        status:
            order.status || "pending",

        createdAt:
            new Date().toISOString()
    };


    appData.orders.push(
        record
    );


    /*
       Update tracking statistics
    */

    const link =
        appData.trackingLinks.find(
            function (item) {

                return (
                    item.trackingCode ===
                    record.trackingCode
                );

            }
        );


    if (link) {

        link.orders =
            Number(link.orders || 0) + 1;

        link.sales =
            Number(link.sales || 0) +
            record.saleAmount;

        link.commission =
            Number(link.commission || 0) +
            record.commission;
    }


    saveData(appData);


    return record;
}


/* =========================================================
   ADD PAYMENT
   ========================================================= */

function addPayment(payment) {

    if (!payment) {
        return null;
    }


    const record = {

        id:
            "payment-" +
            Date.now(),

        promoterId:
            payment.promoterId || "",

        amount:
            Number(
                payment.amount || 0
            ),

        method:
            payment.method || "",

        transactionId:
            payment.transactionId || "",

        date:
            payment.date ||
            new Date().toISOString(),

        status:
            payment.status || "paid",

        notes:
            payment.notes || ""
    };


    appData.payments.push(
        record
    );


    saveData(appData);


    return record;
}


/* =========================================================
   GET PROMOTER PERFORMANCE
   ========================================================= */

function getPromoterPerformance(
    promoterId
) {

    const assignments =
        appData.assignments.filter(
            function (item) {

                return (
                    item.promoterId ===
                    promoterId
                );

            }
        );


    const programIds =
        assignments.map(
            function (item) {

                return item.programId;

            }
        );


    const links =
        appData.trackingLinks.filter(
            function (item) {

                return (
                    item.promoterId ===
                    promoterId
                );

            }
        );


    let clicks = 0;
    let orders = 0;
    let sales = 0;
    let commission = 0;


    links.forEach(
        function (link) {

            clicks +=
                Number(
                    link.clicks || 0
                );

            orders +=
                Number(
                    link.orders || 0
                );

            sales +=
                Number(
                    link.sales || 0
                );

            commission +=
                Number(
                    link.commission || 0
                );
        }
    );


    return {

        promoterId:
            promoterId,

        assignedPrograms:
            programIds.length,

        clicks:
            clicks,

        orders:
            orders,

        sales:
            sales,

        commission:
            commission
    };
}


/* =========================================================
   EXPORT DATA
   ========================================================= */

function exportAllData() {

    const data =
        JSON.stringify(
            appData,
            null,
            2
        );


    const blob =
        new Blob(
            [data],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const a =
        document.createElement(
            "a"
        );


    a.href = url;

    a.download =
        "all-in-one-marketing-backup.json";


    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}


/* =========================================================
   RESET DATA
   ========================================================= */

function resetApplicationData() {

    const confirmation =
        confirm(
            "کیا آپ تمام موجودہ local data ختم کرنا چاہتے ہیں؟"
        );


    if (!confirmation) {
        return;
    }


    appData =
        JSON.parse(
            JSON.stringify(defaultData)
        );


    saveData(appData);

    renderCategories();

    updateDashboardStats();


    alert(
        "Application data reset ہو گیا ہے۔"
    );
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
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
   START PUBLIC TRACKING
   ========================================================= */

handlePublicTracking();


/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

window.appData =
    appData;

window.openModule =
    openModule;

window.addCategory =
    addCategory;

window.openCategory =
    openCategory;

window.createTrackingLink =
    createTrackingLink;

window.trackClick =
    trackClick;

window.addProvider =
    addProvider;

window.addProgram =
    addProgram;

window.addPromoter =
    addPromoter;

window.addAssignment =
    addAssignment;

window.addOrder =
    addOrder;

window.addPayment =
    addPayment;

window.getPromoterPerformance =
    getPromoterPerformance;

window.exportAllData =
    exportAllData;

window.resetApplicationData =
    resetApplicationData;
