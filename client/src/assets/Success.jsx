import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Success() {
      const location = useLocation();
     
    useEffect(() => {
      
    const saveOrder = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("session_id");
        console.log("Session ID:", sessionId);

        if (!sessionId) {
          alert("No session ID found");
          return;
        }
        const res = await axios.post("https://lenskart-ecommerce-app.onrender.com/api/orders/confirm-order", { sessionId });
        console.log("Order confirmation response:", res.data);

       alert("Payment successful & Order placed!");

      } catch (error) {
        console.error(error);
        alert("Order saving failed");
      }
    };
    saveOrder();
  }, [location]);

  return (
    <div style={{ padding: "60px", textAlign: "center",}}>
      <h1>Payment Successful</h1>
      <p>Your order has been placed successfully</p>
    </div>
  );
}

export default Success;