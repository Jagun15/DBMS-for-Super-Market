const express = require("express");

const router = express.Router();

const {
    getLowStockProducts
} = require("../controllers/lowStockController");

router.get("/", getLowStockProducts);

module.exports = router;