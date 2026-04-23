const Product = require("../models/Products");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find({ paymentStatus: "Paid" })
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

    const salesData = Object.keys(salesMap).sort((a, b) => new Date(a) - new Date(b)).map(date => ({
      date,
      revenue: salesMap[date],
    }));

    const totalGST = orders.reduce((acc, order) => acc + (order.gstAmount || 0), 0);
    const cgst = totalGST / 2;
    const sgst = totalGST / 2;

    const productMap = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productMap[item.name]) {
          productMap[item.name] = 0;
        }
        productMap[item.name] += item.price * item.quantity;
        });
      });

      const productData = Object.keys(productMap).map(name => ({
        name,
        value: productMap[name],
      }));

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      totalSales,
      salesData,
      productData,
      totalGST,
      cgst,
      sgst

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

module.exports = { getDashboardStats };