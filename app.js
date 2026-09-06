/* =========================================================
   ORDERS & CLICKS
   FUNCTIONAL ORDER MANAGEMENT
========================================================= */

function renderOrdersModule(container){

    const promoterClicks =
        data.clicks.filter(
            x => x.type === "promoter"
        ).length;

    const socialClicks =
        data.clicks.filter(
            x => x.type === "social"
        ).length;

    const completedOrders =
        data.orders.filter(
            x => x.status === "Completed"
        ).length;

    const pendingOrders =
        data.orders.filter(
            x => x.status === "Pending"
        ).length;

    const cancelledOrders =
        data.orders.filter(
            x => x.status === "Cancelled"
        ).length;

    const totalSales =
        data.orders
            .filter(
                x => x.status === "Completed"
            )
            .reduce(
                (sum, order) =>
                    sum + Number(order.amount || 0),
                0
            );


    container.innerHTML = `

        <div class="module-toolbar">

            <button
                onclick="showOrderForm()"
            >
                + Add Order
            </button>

        </div>


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
                    Total Orders
                </h3>

                <strong>
                    ${data.orders.length}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Completed
                </h3>

                <strong>
                    ${completedOrders}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Pending
                </h3>

                <strong>
                    ${pendingOrders}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Cancelled
                </h3>

                <strong>
                    ${cancelledOrders}
                </strong>

            </div>


            <div class="report-card">

                <h3>
                    Total Sales
                </h3>

                <strong>
                    Rs. ${totalSales.toLocaleString()}
                </strong>

            </div>

        </div>


        <div id="orderFormArea"></div>


        <div id="ordersListArea"></div>

    `;


    renderOrdersList();

}


/* =========================================================
   ORDER FORM
========================================================= */

function showOrderForm(id = ""){

    const container =
        document.getElementById(
            "orderFormArea"
        );

    if(!container){

        return;

    }


    const item =
        data.orders.find(
            x => x.id === id
        );


    const trackingOptions =
        data.trackingLinks.map(
            link => `

                <option
                    value="${escapeHTML(link.id)}"
                    ${
                        item?.trackingLinkId === link.id
                        ? "selected"
                        : ""
                    }
                >

                    ${escapeHTML(
                        getProgramName(
                            link.programId
                        )
                    )}

                    —
                    ${escapeHTML(
                        getPromoterName(
                            link.promoterId
                        )
                    )}

                    —
                    ${escapeHTML(
                        link.code
                    )}

                </option>

            `
        ).join("");


    const socialOptions =
        data.socialLinks.map(
            link => `

                <option
                    value="${escapeHTML(link.id)}"
                    ${
                        item?.socialLinkId === link.id
                        ? "selected"
                        : ""
                    }
                >

                    ${escapeHTML(
                        getProgramName(
                            link.programId
                        )
                    )}

                    —
                    ${escapeHTML(
                        link.platform
                    )}

                    —
                    ${escapeHTML(
                        link.code
                    )}

                </option>

            `
        ).join("");


    const programOptions =
        data.programs.map(
            program => `

                <option
                    value="${escapeHTML(program.id)}"
                    ${
                        item?.programId === program.id
                        ? "selected"
                        : ""
                    }
                >

                    ${escapeHTML(
                        program.name
                    )}

                </option>

            `
        ).join("");


    let dateValue = "";

    if(item?.createdAt){

        const d =
            new Date(item.createdAt);

        const localDate =
            new Date(
                d.getTime() -
                d.getTimezoneOffset() * 60000
            );

        dateValue =
            localDate
                .toISOString()
                .slice(0,16);

    }else{

        const now =
            new Date();

        const localNow =
            new Date(
                now.getTime() -
                now.getTimezoneOffset() * 60000
            );

        dateValue =
            localNow
                .toISOString()
                .slice(0,16);

    }


    container.innerHTML = `

        <div class="form-card">

            <h3>

                ${
                    item
                    ? "Edit Order"
                    : "Add New Order"
                }

            </h3>


            <input
                id="orderId"
                placeholder="Order ID"
                value="${escapeHTML(
                    item?.orderNumber || ""
                )}"
            />


            <select
                id="orderSource"
                onchange="updateOrderSourceFields()"
            >

                <option
                    value="Direct"
                    ${
                        !item ||
                        item?.sourceType === "Direct"
                        ? "selected"
                        : ""
                    }
                >
                    Direct Order
                </option>


                <option
                    value="Promoter"
                    ${
                        item?.sourceType === "Promoter"
                        ? "selected"
                        : ""
                    }
                >
                    Promoter Tracking
                </option>


                <option
                    value="Social"
                    ${
                        item?.sourceType === "Social"
                        ? "selected"
                        : ""
                    }
                >
                    Social Media
                </option>

            </select>


            <div id="orderPromoterField">

                <label>
                    Promoter Tracking Link
                </label>

                <select id="orderTrackingLink">

                    <option value="">
                        Select Tracking Link
                    </option>

                    ${trackingOptions}

                </select>

            </div>


            <div id="orderSocialField">

                <label>
                    Social Media Link
                </label>

                <select id="orderSocialLink">

                    <option value="">
                        Select Social Link
                    </option>

                    ${socialOptions}

                </select>

            </div>


            <label>
                Program / Offer
            </label>

            <select id="orderProgram">

                <option value="">
                    Select Program
                </option>

                ${programOptions}

            </select>


            <input
                id="orderCustomerRef"
                placeholder="Customer / Order Reference"
                value="${escapeHTML(
                    item?.customerRef || ""
                )}"
            />


            <input
                id="orderAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="Order Amount (Rs.)"
                value="${escapeHTML(
                    item?.amount ?? ""
                )}"
            />


            <select id="orderStatus">

                <option
                    value="Pending"
                    ${
                        !item ||
                        item?.status === "Pending"
                        ? "selected"
                        : ""
                    }
                >
                    Pending
                </option>


                <option
                    value="Completed"
                    ${
                        item?.status === "Completed"
                        ? "selected"
                        : ""
                    }
                >
                    Completed
                </option>


                <option
                    value="Cancelled"
                    ${
                        item?.status === "Cancelled"
                        ? "selected"
                        : ""
                    }
                >
                    Cancelled
                </option>

            </select>


            <label>
                Order Date & Time
            </label>

            <input
                id="orderDate"
                type="datetime-local"
                value="${dateValue}"
            />


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


    updateOrderSourceFields();

}


/* =========================================================
   UPDATE ORDER SOURCE FIELDS
========================================================= */

function updateOrderSourceFields(){

    const source =
        document.getElementById(
            "orderSource"
        );

    const promoterField =
        document.getElementById(
            "orderPromoterField"
        );

    const socialField =
        document.getElementById(
            "orderSocialField"
        );


    if(!source){

        return;

    }


    if(source.value === "Promoter"){

        promoterField.style.display =
            "block";

        socialField.style.display =
            "none";

    }else if(source.value === "Social"){

        promoterField.style.display =
            "none";

        socialField.style.display =
            "block";

    }else{

        promoterField.style.display =
            "none";

        socialField.style.display =
            "none";

    }

}


/* =========================================================
   SAVE ORDER
========================================================= */

function saveOrder(id){

    const orderNumber =
        document.getElementById(
            "orderId"
        ).value.trim();


    const sourceType =
        document.getElementById(
            "orderSource"
        ).value;


    const programId =
        document.getElementById(
            "orderProgram"
        ).value;


    const customerRef =
        document.getElementById(
            "orderCustomerRef"
        ).value.trim();


    const amount =
        Number(
            document.getElementById(
                "orderAmount"
            ).value
        );


    const status =
        document.getElementById(
            "orderStatus"
        ).value;


    const dateValue =
        document.getElementById(
            "orderDate"
        ).value;


    const trackingLinkId =
        document.getElementById(
            "orderTrackingLink"
        )?.value || "";


    const socialLinkId =
        document.getElementById(
            "orderSocialLink"
        )?.value || "";


    if(!orderNumber){

        alert(
            "Please enter Order ID."
        );

        return;

    }


    if(!programId){

        alert(
            "Please select a Program."
        );

        return;

    }


    if(
        isNaN(amount) ||
        amount < 0
    ){

        alert(
            "Please enter a valid order amount."
        );

        return;

    }


    if(
        sourceType === "Promoter" &&
        !trackingLinkId
    ){

        alert(
            "Please select a Promoter Tracking Link."
        );

        return;

    }


    if(
        sourceType === "Social" &&
        !socialLinkId
    ){

        alert(
            "Please select a Social Media Link."
        );

        return;

    }


    let promoterId = "";

    let finalProgramId =
        programId;


    if(
        sourceType === "Promoter" &&
        trackingLinkId
    ){

        const trackingLink =
            data.trackingLinks.find(
                x => x.id === trackingLinkId
            );


        if(trackingLink){

            promoterId =
                trackingLink.promoterId;

            finalProgramId =
                trackingLink.programId;

        }

    }


    if(
        sourceType === "Social" &&
        socialLinkId
    ){

        const socialLink =
            data.socialLinks.find(
                x => x.id === socialLinkId
            );


        if(socialLink){

            finalProgramId =
                socialLink.programId;

        }

    }


    let createdAt =
        new Date().toISOString();


    if(dateValue){

        const selectedDate =
            new Date(dateValue);

        if(
            !isNaN(
                selectedDate.getTime()
            )
        ){

            createdAt =
                selectedDate.toISOString();

        }

    }


    const orderData = {

        orderNumber,

        sourceType,

        trackingLinkId:
            sourceType === "Promoter"
            ? trackingLinkId
            : "",

        socialLinkId:
            sourceType === "Social"
            ? socialLinkId
            : "",

        promoterId,

        programId:
            finalProgramId,

        customerRef,

        amount,

        status,

        createdAt

    };


    if(id){

        const index =
            data.orders.findIndex(
                x => x.id === id
            );


        if(index !== -1){

            data.orders[index] = {

                ...data.orders[index],

                ...orderData,

                updatedAt:
                    new Date().toISOString()

            };

        }

    }else{

        data.orders.push({

            id:
                makeId("ORDER"),

            ...orderData

        });

    }


    saveData();

    cancelOrderForm();

    renderOrdersModule(
        document.querySelector(
            ".module-content:last-of-type"
        )
    );

}


/* =========================================================
   CANCEL ORDER FORM
========================================================= */

function cancelOrderForm(){

    const container =
        document.getElementById(
            "orderFormArea"
        );

    if(container){

        container.innerHTML = "";

    }

}


/* =========================================================
   RENDER ORDERS LIST
========================================================= */

function renderOrdersList(){

    const container =
        document.getElementById(
            "ordersListArea"
        );

    if(!container){

        return;

    }


    if(!data.orders.length){

        container.innerHTML = `

            <div class="empty-module">

                <h3>
                    No Orders Yet
                </h3>

                <p>
                    Click "+ Add Order" to
                    record your first order.
                </p>

            </div>

        `;

        return;

    }


    const sortedOrders =
        [...data.orders].sort(
            (a,b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );


    container.innerHTML = `

        <div class="form-card">

            <h2>
                📦 Orders
            </h2>

            <p>
                Click → Order → Sale tracking
            </p>

        </div>


        ${

            sortedOrders.map(
                order => {

                    let sourceLabel =
                        order.sourceType ||
                        "Direct";


                    let promoterName = "";

                    if(order.promoterId){

                        promoterName =
                            getPromoterName(
                                order.promoterId
                            );

                    }


                    let platform = "";

                    if(order.socialLinkId){

                        const socialLink =
                            data.socialLinks.find(
                                x =>
                                    x.id ===
                                    order.socialLinkId
                            );

                        platform =
                            socialLink
                            ? socialLink.platform
                            : "";

                    }


                    let dateText = "-";

                    if(order.createdAt){

                        const d =
                            new Date(
                                order.createdAt
                            );

                        if(
                            !isNaN(
                                d.getTime()
                            )
                        ){

                            dateText =
                                d.toLocaleString();

                        }

                    }


                    return `

                        <div class="data-card">

                            <div>

                                <h3>

                                    Order:
                                    ${escapeHTML(
                                        order.orderNumber
                                    )}

                                </h3>


                                <p>

                                    Program:
                                    ${escapeHTML(
                                        getProgramName(
                                            order.programId
                                        )
                                    )}

                                </p>


                                <p>

                                    Source:
                                    <strong>
                                        ${escapeHTML(
                                            sourceLabel
                                        )}
                                    </strong>

                                </p>


                                ${
                                    promoterName
                                    ? `
                                        <p>
                                            Promoter:
                                            ${escapeHTML(
                                                promoterName
                                            )}
                                        </p>
                                    `
                                    : ""
                                }


                                ${
                                    platform
                                    ? `
                                        <p>
                                            Platform:
                                            ${escapeHTML(
                                                platform
                                            )}
                                        </p>
                                    `
                                    : ""
                                }


                                <p>

                                    Customer Ref:
                                    ${escapeHTML(
                                        order.customerRef ||
                                        "-"
                                    )}

                                </p>


                                <p>

                                    Amount:
                                    <strong>
                                        Rs.
                                        ${Number(
                                            order.amount || 0
                                        ).toLocaleString()}
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


                                <p>

                                    Date:
                                    ${escapeHTML(
                                        dateText
                                    )}

                                </p>

                            </div>


                            <div class="card-actions">

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
            ).join("")

        }

    `;

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

    const order =
        data.orders.find(
            x => x.id === id
        );


    if(!order){

        return;

    }


    if(
        !confirm(
            "Delete Order " +
            order.orderNumber +
            "?"
        )
    ){

        return;

    }


    data.orders =
        data.orders.filter(
            x => x.id !== id
        );


    saveData();


    const content =
        document.querySelector(
            ".module-content:last-of-type"
        );


    if(content){

        renderOrdersModule(
            content
        );

    }

}
