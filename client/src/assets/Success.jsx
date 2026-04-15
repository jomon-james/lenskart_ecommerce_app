import { useEffect, useRef } from "react";
import axios from "axios";

function Success() {
     const hasSaved = useRef(false);
    useEffect(() => {
         if (hasSaved.current) return;
         hasSaved.current = true;

    const saveOrder = async () => {
      try {
        const orderData = JSON.parse(localStorage.getItem("pendingOrder"));
        console.log("Saving order:", orderData);

        if (!orderData) return;
        await axios.post(
          "https://lenskart-ecommerce-app.onrender.com/api/orders/place-order",
          orderData
        );
        localStorage.removeItem("pendingOrder");

        alert("Payment successful & Order placed!");

      } catch (error) {
        console.error(error);
        alert("Order saving failed");
      }
    };

    saveOrder();
  }, []);

  return (
    <div style={{ padding: "60px", textAlign: "center",}}>
      <h1>Payment Successful</h1>
      <p>Your order has been placed successfully</p>
    </div>
  );
}

export default Success;