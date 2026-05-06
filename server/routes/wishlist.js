const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Products");



// ADD TO WISHLIST
router.post("/add", async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const user = await User.findById(userId);

        if (!user.wishlist.includes(productId)) {

            user.wishlist.push(productId);

            await user.save();
        }

        res.json({
            success: true,
            message: "Added to wishlist",
        });

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
});




// REMOVE FROM WISHLIST
router.post("/remove", async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const user = await User.findById(userId);

        user.wishlist = user.wishlist.filter(
            item => item.toString() !== productId
        );

        await user.save();

        res.json({
            success: true,
            message: "Removed from wishlist",
        });

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
});




// GET WISHLIST
router.get("/:userId", async (req, res) => {

    try {

        const user = await User.findById(req.params.userId)
        .populate("wishlist");

        res.json(user.wishlist);

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });
    }
});

module.exports = router;