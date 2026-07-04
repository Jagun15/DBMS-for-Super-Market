const Product = require("../models/Product");

const getLowStockProducts = async (req, res) => {
    try {

        const lowStockProducts = await Product.find({
            quantity: { $lte: 10 }
        });

        res.status(200).json(lowStockProducts);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};

module.exports = {
    getLowStockProducts
};