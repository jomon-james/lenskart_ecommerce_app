import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.get(
      `https://lenskart-ecommerce-app.onrender.com/api/orders/user/${user.id}`
    );

    setOrders(res.data);
  };

  return (
    <div className="myorders-container">
  <h2 className="myorders-title">My Orders</h2>

  {orders.map((order) => (
    <div className="myorder-card" key={order._id}>
      
      <div className="order-info">
        <p>
          <b>Status:</b>{" "}
          <span className={`status ${order.status}`}>
            {order.status}
          </span>
        </p>

        <p><b>Total:</b> ₹{order.totalAmount}</p>
        <p><b>Payment:</b> {order.paymentMethod}</p>
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

export default MyOrders;