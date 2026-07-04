const express = require("express");

const router = express.Router();

const {
    createBill
} = require("../controllers/billingController");


router.post("/create", createBill);


module.exports = router;