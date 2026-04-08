const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [
        {
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            image: String,
        },
    ],

    address: {
        fullName: String,
        phoneNumber: String,
        addressLine: String,
        city: String,
        pincode: String,
    },

    paymentMethod: {
        type: String,
        enum: ["DEBIT_CARD","CREDIT_CARD", "COD"],
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
    },

    totalAmount: Number,

    status: {
        type: String,
        enum: ["Pending","Shipped","Delivered","Cancelled"],
        default: "Pending",
    },

    createdAt: {
        type:  Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);