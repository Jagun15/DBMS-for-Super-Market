const Product = require("../models/Product");


// ADD PRODUCT
const addProduct = async (req, res) => {

    try {

        const {
            productName,
            category,
            quantity,
            price
        } = req.body;

        const newProduct = new Product({
            productName,
            category,
            quantity,
            price
        });

        await newProduct.save();

        res.status(201).json({
            message: "Product Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// GET PRODUCTS
const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

    try {

        const {
            productName,
            category,
            quantity,
            price
        } = req.body;


        await Product.findByIdAndUpdate(
            req.params.id,
            {
                productName,
                category,
                quantity,
                price
            }
        );

        res.status(200).json({
            message: "Product Updated Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Product Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
};