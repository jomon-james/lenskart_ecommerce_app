import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("https://lenskart-ecommerce-app.onrender.com/api/orders/all");
    setOrders(res.data);

   
    const initialStatus = {};
    res.data.forEach(order => {
      initialStatus[order._id] = order.status;
    });
    setStatusMap(initialStatus);
  };

  
  const handleStatusChange = (orderId, value) => {
    setStatusMap({
      ...statusMap,
      [orderId]: value
    });
  };

  
  const saveStatus = async (orderId) => {
    const status = statusMap[orderId];

    await axios.put(
      `https://lenskart-ecommerce-app.onrender.com/api/orders/update-status/${orderId}`,
      { status }
    );

    alert("Status updated");
    fetchOrders(); 
  };

  return (
    <div className="admin-orders-container">
  <h2 className="admin-orders-title">Manage Orders</h2>

  {orders.map((order) => (
    <div className="order-card" key={order._id}>
      
      <div className="order-info">
        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Total:</b> ₹{order.totalAmount}</p>

        <p>
          <b>Status:</b>{" "}
          <span className={`status ${order.status}`}>
            {order.status}
          </span>
        </p>
      </div>

      <div className="status-section">
        <select
          value={statusMap[order._id] || order.status}
          onChange={(e) =>
            handleStatusChange(order._id, e.target.value)
          }
        >
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <button
          className="save-btn"
          onClick={() => saveStatus(order._id)}
        >
          Save
        </button>
      </div>

      <div className="items-section">
        <h4>Items</h4>
        {order.items.map((item, i) => (
          <p key={i}>
            {item.name} x {item.quantity}
          </p>
        ))}
      </div>

    </div>
  ))}
</div>
  );
}

export default AdminOrders;