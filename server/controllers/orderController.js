const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { response } = require("express");
const sendEmail = require("../externals/sendEmail");
const User = require("../models/User");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, paymentMethod, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      items,
      address,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
    });

    await newOrder.save();
    const user = await User.findById(userId);

    const itemsList = newOrder.items.map(item => `${item.name} (Qty: ${item.quantity}) \nPrice ${item.price}`).join('\n');

    const message =`Your order has been placed successfully!\nOrder ID: ${newOrder._id}\nItems:\n${itemsList}\n`

    await sendEmail(
      "jomonjames118@gmail.com", 
      "Order Confirmation",
      message
    );
   
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
};


const createCheckoutSession =  async ( req, res) => {
    try {
        const { items } = req.body;
        const lineItems = items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "stripe error" });
    }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

      const user = await User.findById(updatedOrder.userId);

      const itemsList = updatedOrder.items.map(item => `${item.name} | Qty: ${item.quantity} | Price: ${item.price}`).join('\n');

      let message = `
      Order ID: ${updatedOrder._id}
      status: ${status}
      
      Products:
      ${itemsList}
      
      Thank you for shopping with lenskart
      `;
      
      await sendEmail(
        "jomonjames118@gmail.com",
        "Order Status Update",
        `${message}`
      );

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};

module.exports = {
  placeOrder,
  updateOrderStatus,
  getAllOrders,
  getUserOrders,
  createCheckoutSession,
};