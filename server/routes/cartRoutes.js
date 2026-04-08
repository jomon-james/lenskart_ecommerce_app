const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();



router.post("/add", async (req, res) => {
  try {
    const { userId, product, qty } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty
          }
        ]
      });
    } else {
      const index = cart.items.findIndex(
        item => item.productId === product._id
      );

      if (index !== -1) {
        cart.items[index].qty += qty;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty
        });
      }
    }

    await cart.save();
    res.json(cart);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
});



router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.json({ items: [] });

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});



router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter(
        item => item.productId !== productId
      );
      await cart.save();
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
});

module.exports = router;