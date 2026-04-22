const Product = require("../models/Products");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find({ paymentStatus: "Paid" });

    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    const totalSales = orders.length;

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      totalSales,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

module.exports = { getDashboardStats };