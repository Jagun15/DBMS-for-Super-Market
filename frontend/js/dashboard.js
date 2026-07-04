// LOAD DASHBOARD DATA

async function loadDashboardData() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/dashboard"
        );

        const data = await response.json();


        // DASHBOARD CARDS

        document.getElementById("totalProducts").innerText =
            data.totalProducts;

        document.getElementById("totalQuantity").innerText =
            data.totalQuantity;

        document.getElementById("totalValue").innerText =
            "₹" + data.totalValue;

    }

    catch (error) {

        console.log("Dashboard Error");

    }

}



// LOAD LOW STOCK PRODUCTS

async function loadLowStock() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/low-stock"
        );

        const products = await response.json();

        const table =
            document.getElementById("lowStockTable");

        table.innerHTML = "";


        // IF NO LOW STOCK PRODUCTS

        if (products.length === 0) {

            table.innerHTML = `

                <tr>

                    <td colspan="3">

                        No Low Stock Products

                    </td>

                </tr>

            `;

            return;

        }


        // DISPLAY PRODUCTS

        products.forEach((product) => {

            table.innerHTML += `

                <tr>

                    <td>${product.productName}</td>

                    <td>${product.category}</td>

                    <td style="color:red;font-weight:bold;">

                        ${product.quantity}

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.log("Low Stock Error");

    }

}



// LOAD BOTH FUNCTIONS

loadDashboardData();

loadLowStock();