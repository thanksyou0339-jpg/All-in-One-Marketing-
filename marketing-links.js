/* =========================================
   A ALL-IN-ONE MARKETING
   MARKETING LINKS ADMIN
========================================= */

import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


/* =========================================
   FIREBASE
========================================= */

const firebaseConfig = {
    apiKey: "AIzaSyA8_4ArKXAdfKWZ5mi5DaT9qiayL3h_Yzw",
    authDomain: "janjua-traders.firebaseapp.com",
    projectId: "janjua-traders",
    storageBucket: "janjua-traders.firebasestorage.app",
    messagingSenderId: "154904774188",
    appId: "1:904774188:web:1830f9d533e77dae6a7389"
};


const app =
    getApps().length
        ? getApp()
        : initializeApp(firebaseConfig);


const db =
    getFirestore(app);


/* =========================================
   DOM
========================================= */

const docIdInput =
    document.getElementById("marketingDocId");

const companyInput =
    document.getElementById("marketingCompany");

const categoryInput =
    document.getElementById("marketingCategory");

const slugInput =
    document.getElementById("marketingSlug");

const affiliateInput =
    document.getElementById("marketingAffiliateLink");

const statusInput =
    document.getElementById("marketingStatus");

const saveBtn =
    document.getElementById("saveMarketingBtn");

const newBtn =
    document.getElementById("newMarketingBtn");

const table =
    document.getElementById("marketingLinksTable");

const generatedBox =
    document.getElementById(
        "marketingGeneratedLink"
    );


/* =========================================
   PUBLIC LINK
========================================= */

function getPublicMarketingLink(slug){

    const base =
        window.location.origin +
        window.location.pathname
            .replace(/Admin\.html.*$/i, "");

    return (
        base +
        "go.html?c=" +
        encodeURIComponent(
            String(slug || "").trim()
        )
    );

}


/* =========================================
   CLEAN SLUG
========================================= */

function cleanSlug(value){

    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

}


/* =========================================
   NEW FORM
========================================= */

function newMarketing(){

    if(docIdInput){

        docIdInput.value = "";

    }

    if(companyInput){

        companyInput.value = "";

    }

    if(categoryInput){

        categoryInput.value = "Food";

    }

    if(slugInput){

        slugInput.value = "";

    }

    if(affiliateInput){

        affiliateInput.value = "";

    }

    if(statusInput){

        statusInput.value = "true";

    }

    if(generatedBox){

        generatedBox.style.display = "none";

        generatedBox.innerHTML = "";

    }

}


/* =========================================
   SAVE
========================================= */

async function saveMarketing(){

    try{

        const company =
            companyInput.value.trim();

        const category =
            categoryInput.value.trim();

        const slug =
            cleanSlug(slugInput.value);

        const affiliateLink =
            affiliateInput.value.trim();

        const active =
            statusInput.value === "true";

        const existingDocId =
            docIdInput.value.trim();


        if(!company){

            alert(
                "Company / Platform لکھیں۔"
            );

            return;

        }


        if(!slug){

            alert(
                "Short Name لکھیں۔ مثال: food"
            );

            return;

        }


        if(!affiliateLink){

            alert(
                "Affiliate Link ڈالیں۔"
            );

            return;

        }


        if(
            !affiliateLink.startsWith("http://") &&
            !affiliateLink.startsWith("https://")
        ){

            alert(
                "Affiliate Link صحیح URL ہونا چاہیے۔"
            );

            return;

        }


        const data = {

            company: company,

            category: category,

            slug: slug,

            affiliateLink: affiliateLink,

            active: active,

            updatedAt: serverTimestamp()

        };


        if(existingDocId){

            await updateDoc(

                doc(
                    db,
                    "marketingLinks",
                    existingDocId
                ),

                data

            );

            alert(
                "Marketing Link update ہو گیا۔"
            );

        }else{

            data.clicks = 0;

            data.createdAt =
                serverTimestamp();

            await addDoc(

                collection(
                    db,
                    "marketingLinks"
                ),

                data

            );

            alert(
                "Marketing Link save ہو گیا۔"
            );

        }


        showGeneratedLink(slug);

        await loadMarketingLinks();


    }catch(error){

        console.error(
            "MARKETING SAVE ERROR:",
            error
        );

        alert(
            "Marketing Link save نہیں ہو سکا۔"
        );

    }

}


/* =========================================
   GENERATED LINK
========================================= */

function showGeneratedLink(slug){

    if(!generatedBox){

        return;

    }


    const link =
        getPublicMarketingLink(slug);


    generatedBox.style.display =
        "block";


    generatedBox.innerHTML = `

        <strong>
            Your Janjua Marketing Link:
        </strong>

        <br><br>

        <span>
            ${escapeHtml(link)}
        </span>

        <br><br>

        <button
            type="button"
            id="copyMarketingGenerated"
        >
            COPY LINK
        </button>

    `;


    const copyBtn =
        document.getElementById(
            "copyMarketingGenerated"
        );


    if(copyBtn){

        copyBtn.addEventListener(
            "click",
            async function(){

                try{

                    await navigator.clipboard.writeText(
                        link
                    );

                    this.textContent =
                        "COPIED ✓";

                }catch(error){

                    alert(link);

                }

            }
        );

    }

}


/* =========================================
   LOAD
========================================= */

async function loadMarketingLinks(){

    if(!table){

        return;

    }


    try{

        let snapshot;


        try{

            snapshot =
                await getDocs(
                    query(
                        collection(
                            db,
                            "marketingLinks"
                        ),
                        orderBy(
                            "createdAt",
                            "desc"
                        )
                    )
                );

        }catch(error){

            snapshot =
                await getDocs(
                    collection(
                        db,
                        "marketingLinks"
                    )
                );

        }


        if(snapshot.empty){

            table.innerHTML = `

                <tr>

                    <td colspan="6">
                        ابھی کوئی Marketing Link نہیں۔
                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            snapshot.docs
                .map(
                    function(item){

                        const data =
                            item.data();

                        const publicLink =
                            getPublicMarketingLink(
                                data.slug
                            );


                        return `

                            <tr>

                                <td>
                                    ${escapeHtml(
                                        data.company || ""
                                    )}
                                </td>


                                <td>
                                    ${escapeHtml(
                                        data.category || ""
                                    )}
                                </td>


                                <td
                                    style="
                                    max-width:220px;
                                    word-break:break-all;
                                    "
                                >
                                    ${escapeHtml(
                                        publicLink
                                    )}
                                </td>


                                <td>
                                    ${Number(
                                        data.clicks || 0
                                    )}
                                </td>


                                <td>
                                    ${
                                        data.active === false
                                        ? "Inactive"
                                        : "Active"
                                    }
                                </td>


                                <td>

                                    <button
                                        type="button"
                                        data-action="copy"
                                        data-link="${escapeAttribute(publicLink)}"
                                    >
                                        COPY
                                    </button>


                                    <button
                                        type="button"
                                        data-action="edit"
                                        data-id="${escapeAttribute(item.id)}"
                                    >
                                        EDIT
                                    </button>


                                    <button
                                        type="button"
                                        data-action="delete"
                                        data-id="${escapeAttribute(item.id)}"
                                    >
                                        DELETE
                                    </button>

                                </td>

                            </tr>

                        `;

                    }
                )
                .join("");


        table
            .querySelectorAll(
                "[data-action='copy']"
            )
            .forEach(
                function(button){

                    button.addEventListener(
                        "click",
                        async function(){

                            const link =
                                this.dataset.link;

                            try{

                                await navigator.clipboard.writeText(
                                    link
                                );

                                this.textContent =
                                    "COPIED ✓";

                            }catch(error){

                                alert(link);

                            }

                        }
                    );

                }
            );


        table
            .querySelectorAll(
                "[data-action='edit']"
            )
            .forEach(
                function(button){

                    button.addEventListener(
                        "click",
                        function(){

                            editMarketing(
                                this.dataset.id,
                                snapshot.docs
                            );

                        }
                    );

                }
            );


        table
            .querySelectorAll(
                "[data-action='delete']"
            )
            .forEach(
                function(button){

                    button.addEventListener(
                        "click",
                        function(){

                            deleteMarketing(
                                this.dataset.id
                            );

                        }
                    );

                }
            );


    }catch(error){

        console.error(
            "MARKETING LOAD ERROR:",
            error
        );


        table.innerHTML = `

            <tr>

                <td colspan="6">
                    Marketing Links load نہیں ہو سکے۔
                </td>

            </tr>

        `;

    }

}


/* =========================================
   EDIT
========================================= */

function editMarketing(id, docs){

    const found =
        docs.find(
            function(item){

                return item.id === id;

            }
        );


    if(!found){

        return;

    }


    const data =
        found.data();


    docIdInput.value =
        found.id;

    companyInput.value =
        data.company || "";

    categoryInput.value =
        data.category || "Other";

    slugInput.value =
        data.slug || "";

    affiliateInput.value =
        data.affiliateLink || "";

    statusInput.value =
        data.active === false
            ? "false"
            : "true";


    showGeneratedLink(
        data.slug || ""
    );


    window.scrollTo({

        top:
            document.getElementById(
                "marketingLinksSection"
            ).offsetTop - 20,

        behavior:"smooth"

    });

}


/* =========================================
   DELETE
========================================= */

async function deleteMarketing(id){

    const ok =
        confirm(
            "کیا یہ Marketing Link delete کرنا ہے؟"
        );


    if(!ok){

        return;

    }


    try{

        await deleteDoc(
            doc(
                db,
                "marketingLinks",
                id
            )
        );


        alert(
            "Marketing Link delete ہو گیا۔"
        );


        await loadMarketingLinks();


    }catch(error){

        console.error(
            "MARKETING DELETE ERROR:",
            error
        );

        alert(
            "Delete نہیں ہو سکا۔"
        );

    }

}


/* =========================================
   ESCAPE
========================================= */

function escapeHtml(value){

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


function escapeAttribute(value){

    return escapeHtml(value);

}


/* =========================================
   EVENTS
========================================= */

if(saveBtn){

    saveBtn.addEventListener(
        "click",
        saveMarketing
    );

}


if(newBtn){

    newBtn.addEventListener(
        "click",
        newMarketing
    );

}


/* =========================================
   START
========================================= */

loadMarketingLinks();
