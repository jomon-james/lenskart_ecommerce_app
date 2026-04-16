const express = require("express");
const router = express.Router();


const { placeOrder, updateOrderStatus, getAllOrders , getUserOrders, createCheckoutSession,confirmOrder} = require("../controllers/orderController");

router.post("/place-order", placeOrder);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/confirm-order", confirmOrder);
router.put("/update-status/:orderId",updateOrderStatus);
router.get("/all",getAllOrders);
router.get("/user/:userId", getUserOrders);

module.exports = router;