const Sale = require("../models/Sale");


// GET SALES REPORT
const getSalesReport = async (req, res) => {

    try {

        const sales = await Sale.find();

        let totalSales = 0;

        sales.forEach((sale) => {

            totalSales += sale.totalPrice;

        });


        res.status(200).json({

            sales,

            totalSales

        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = {
    getSalesReport
};