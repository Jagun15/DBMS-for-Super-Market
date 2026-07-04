const Product = require("../models/Product");


// GET DASHBOARD DATA
const getDashboardData = async (req, res) => {

    try {

        const products = await Product.find();

        const totalProducts = products.length;

        let totalQuantity = 0;

        let totalValue = 0;


        products.forEach((product) => {

            totalQuantity += product.quantity;

            totalValue += product.quantity * product.price;

        });


        res.status(200).json({

            totalProducts,

            totalQuantity,

            totalValue

        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = {
    getDashboardData
};