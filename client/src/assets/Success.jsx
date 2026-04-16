import { useEffect, useRef } from "react";
import axios from "axios";

function Success() {
     const hasSaved = useRef(false);
    useEffect(() => {
         if (hasSaved.current) return;
         hasSaved.current = true;

    const saveOrder = async () => {
      try {
        const localData = localStorage.getItem("pendingOrder");
        const sessionData = sessionStorage.getItem("pendingOrderBackup");

        const orderData = localData ? JSON.parse(localData) : sessionData ? JSON.parse(sessionData) : null;
        console.log("Saving order:", orderData);

        if (!orderData) {
          alert("No pending order found");
          return;
        }
        


        await axios.post(
          "https://lenskart-ecommerce-app.onrender.com/api/orders/place-order",
          orderData
        );
        localStorage.removeItem("pendingOrder");
        sessionStorage.removeItem("pendingOrderBackup");

        alert("Payment successful & Order placed!");

      } catch (error) {
        console.error(error);
        alert("Order saving failed");
      }
    };
      setTimeout(() => {
            saveOrder();
          }, 1000);
  }, []);

  return (
    <div style={{ padding: "60px", textAlign: "center",}}>
      <h1>Payment Successful</h1>
      <p>Your order has been placed successfully</p>
    </div>
  );
}

export default Success;