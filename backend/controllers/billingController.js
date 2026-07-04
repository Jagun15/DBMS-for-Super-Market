const Product = require("../models/Product");

const Sale = require("../models/Sale");


// CREATE BILL
const createBill = async (req, res) => {

    try {

        const {
            customerName,
            productId,
            quantity
        } = req.body;


        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                message: "Product Not Found"
            });
        }


        if (product.quantity < quantity) {

            return res.status(400).json({
                message: "Insufficient Stock"
            });
        }


        const totalPrice = quantity * product.price;


        // REDUCE STOCK
        product.quantity -= quantity;

        await product.save();


        // SAVE SALE
        const newSale = new Sale({

            customerName,

            productName: product.productName,

            quantity,

            totalPrice

        });

        await newSale.save();


        res.status(201).json({

            message: "Bill Generated Successfully",

            totalPrice

        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = {
    createBill
};