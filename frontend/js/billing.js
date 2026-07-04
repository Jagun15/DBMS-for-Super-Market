const productSelect =
    document.getElementById("productSelect");

const billingForm =
    document.getElementById("billingForm");

const downloadPdfBtn =
    document.getElementById("downloadPdfBtn");


// INVOICE DATA
let invoiceData = {};


// LOAD PRODUCTS
async function loadProducts() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/products"
        );

        const products = await response.json();


        productSelect.innerHTML = `

            <option value="">
                Select Product
            </option>
        `;


        products.forEach((product) => {

            productSelect.innerHTML += `

                <option value="${product._id}">
                    ${product.productName}
                </option>
            `;
        });

    } catch (error) {

        console.log("Product Load Error");
    }
}


// GENERATE BILL
billingForm.addEventListener("submit",
async (e) => {

    e.preventDefault();

    const customerName =
        document.getElementById("customerName").value;

    const productId =
        productSelect.value;

    const quantity =
        document.getElementById("quantity").value;


    try {

        const response = await fetch(
            "http://localhost:5000/api/billing/create",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    customerName,
                    productId,
                    quantity
                })
            }
        );


        const data = await response.json();


        if(response.ok){

            const selectedProduct =
                productSelect.options[
                    productSelect.selectedIndex
                ].text;


            // DISPLAY INVOICE
            document.getElementById("billCustomer")
                .innerText =
                "Customer: " + customerName;

            document.getElementById("billProduct")
                .innerText =
                "Product: " + selectedProduct;

            document.getElementById("billQuantity")
                .innerText =
                "Quantity: " + quantity;

            document.getElementById("billTotal")
                .innerText =
                "Total: ₹" + data.totalPrice;


            // SAVE DATA FOR PDF
            invoiceData = {

                customerName,

                productName: selectedProduct,

                quantity,

                totalPrice: data.totalPrice
            };


            alert("Bill Generated Successfully");


            // RESET FORM
            billingForm.reset();

        } else {

            alert(data.message);
        }

    } catch (error) {

        console.log("Billing Error");
    }
});


// DOWNLOAD PDF
downloadPdfBtn.addEventListener("click", () => {

    if(!invoiceData.customerName){

        alert("Generate Bill First");

        return;
    }


    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();


    // TITLE
    doc.setFontSize(22);

    doc.text(
        "Supermarket Invoice",
        55,
        20
    );


    // LINE
    doc.line(20, 30, 190, 30);


    // INVOICE DETAILS
    doc.setFontSize(16);

    doc.text(
        "Customer: " + invoiceData.customerName,
        20,
        50
    );

    doc.text(
        "Product: " + invoiceData.productName,
        20,
        70
    );

    doc.text(
        "Quantity: " + invoiceData.quantity,
        20,
        90
    );

    doc.text(
    "Total Amount: Rs. " + invoiceData.totalPrice,
    20,
    110
);


    // FOOTER
    doc.setFontSize(12);

    doc.text(
        "Thank You For Shopping!",
        65,
        150
    );


    // SAVE PDF
    doc.save("invoice.pdf");
});


// INITIAL LOAD
loadProducts();