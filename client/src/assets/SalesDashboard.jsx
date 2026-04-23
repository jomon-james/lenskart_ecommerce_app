import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

function SalesDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalSales: 0,
    salesData: [],
    productData: [],
    totalGST: 0,
    cgst: 0,
    sgst: 0
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#33AA99", "#FF6633", "#66FF33", "#3366FF", "#FF33CC"];

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

        <div style={cardStyle}>
          <h3>GST Collected</h3>
          <p>Rs. {stats.totalGST.toFixed(2)}</p>
        </div>

        <div style={cardStyle}>
          <h3>CGST</h3>
          <p>Rs. {stats.cgst.toFixed(2)}</p>
        </div>

        <div style={cardStyle}>
          <h3>SGST</h3>
          <p>Rs. {stats.sgst.toFixed(2)}</p>
        </div>

      </div>
      <h3 style={{ marginTop: "40px" }}>Revenue Over Time</h3>
      <div style={{ width: "100%", height: "300px", marginTop: "20px" }}>
        <ResponsiveContainer>
          <LineChart data={stats.salesData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3 style={{ marginTop: "40px" }}>Revenue by Product</h3>
      <div style={{ width: "100%", height: "300px", marginTop: "20px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={stats.productData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {stats.productData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
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