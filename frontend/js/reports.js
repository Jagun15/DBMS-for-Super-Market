const reportTable =
    document.getElementById("reportTable");


// LOAD REPORTS
async function loadReports() {

    const response = await fetch(
        "http://localhost:5000/api/reports"
    );

    const data = await response.json();


    // TOTAL SALES
    document.getElementById("totalSales")
        .innerText =
        "Total Sales: ₹" + data.totalSales;


    // TABLE DATA
    reportTable.innerHTML = "";


    data.sales.forEach((sale) => {

        const date =
            new Date(sale.date).toLocaleDateString();


        reportTable.innerHTML += `

            <tr>

                <td>${sale.customerName}</td>

                <td>${sale.productName}</td>

                <td>${sale.quantity}</td>

                <td>₹${sale.totalPrice}</td>

                <td>${date}</td>

            </tr>
        `;
    });
}


loadReports();