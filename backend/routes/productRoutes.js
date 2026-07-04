const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");


// ADD PRODUCT
router.post("/add", addProduct);


// GET PRODUCTS
router.get("/", getProducts);


// UPDATE PRODUCT
router.put("/:id", updateProduct);


// DELETE PRODUCT
router.delete("/:id", deleteProduct);


module.exports = router;