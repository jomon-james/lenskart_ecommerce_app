import { useEffect, useState } from "react";
import axios from "axios";

function SalesDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalSales: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://lenskart-ecommerce-app.onrender.com/api/admin/stats"
      );
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sales Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={cardStyle}>
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>Rs. {stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div style={cardStyle}>
          <h3>Sales Done</h3>
          <p>{stats.totalSales}</p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  width: "200px",
  textAlign: "center",
  background: "#f9f9f9",
};

export default SalesDashboard;