async function loadChart() {

    try {

        // FETCH SALES REPORT DATA

        const response = await fetch(
            "http://localhost:5000/api/reports"
        );

        const data = await response.json();


        // ARRAYS

        const productNames = [];

        const salesAmounts = [];


        // LOOP SALES DATA

        data.sales.forEach((sale) => {

            productNames.push(
                sale.productName
            );

            salesAmounts.push(
                sale.totalPrice
            );

        });


        // GET CANVAS

        const ctx =
            document.getElementById("salesChart");


        // CREATE CHART

        new Chart(ctx, {

            type: "bar",

            data: {

                labels: productNames,

                datasets: [{

                    label: "Sales Amount",

                    data: salesAmounts,

                    backgroundColor: [
                        "#243b55",
                        "#141e30",
                        "#3b5998",
                        "#4a69bd",
                        "#6a89cc"
                    ],

                    borderRadius: 10

                }]
            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: true
                    }
                }
            }
        });

    } catch (error) {

        console.log("Chart Error");
    }
}


// LOAD CHART

loadChart();