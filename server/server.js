const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");
const PORT = process.env.PORT || 5000;

const HOST = "0.0.0.0";

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors({
  origin: ["https://lenskart-ecommerce-app.vercel.app",
            "https://lenskart-ecommerce-app-git-main-jomon-james-projects.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the lenskart application - backend");
});

app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api",productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});