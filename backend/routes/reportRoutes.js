const express = require("express");

const router = express.Router();

const {
    getSalesReport
} = require("../controllers/reportController");


router.get("/", getSalesReport);


module.exports = router;