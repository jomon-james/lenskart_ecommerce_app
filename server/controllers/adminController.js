const Product = require("../models/Products");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = (await Order.find({ paymentStatus: "Paid" }))
      .sort({ createdAt: 1 });

    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    const totalSales = orders.length;

    const salesMap = {};
    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!salesMap[date]) {
        salesMap[date] = 0;
      }
      salesMap[date] += order.totalAmount;
    });

    const salesData = Object.keys(salesMap).map(date => ({
      date,
      revenue: salesMap[date],
    }));

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      totalSales,
      salesData,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

module.exports = { getDashboardStats };