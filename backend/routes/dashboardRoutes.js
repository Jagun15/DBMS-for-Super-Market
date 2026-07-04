const express = require("express");

const router = express.Router();

const {
    getDashboardData
} = require("../controllers/dashboardController");


router.get("/", getDashboardData);


module.exports = router;