const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");


// ROUTES
const authRoutes = require("./routes/authRoutes");

const productRoutes = require("./routes/productRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const billingRoutes = require("./routes/billingRoutes");

const reportRoutes = require("./routes/reportRoutes");

const lowStockRoutes = require("./routes/lowStockRoutes");
dotenv.config();


// DATABASE CONNECTION
connectDB();


const app = express();


// CORS
app.use(cors({
    origin: "*"
}));


// MIDDLEWARE
app.use(express.json());


// API ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/billing", billingRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/low-stock", lowStockRoutes);
// DEFAULT ROUTE
app.get("/", (req, res) => {

    res.send("Supermarket Stock Management Backend Running");

});


// PORT
const PORT = process.env.PORT || 5000;


// START SERVER
app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});