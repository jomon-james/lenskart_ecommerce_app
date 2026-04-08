import { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  

  useEffect(() => {
  if (userId) {
    fetchCart();
  }
    }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      fetchCart(); 
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    try {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    const cartItems = res.data.items;

    if (!cartItems || cartItems.length === 0) {
      alert("cart is empty");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(cart));
    localStorage.setItem("checkoutSource","cart");

    navigate("/checkout");
    }
    catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map(item => (
          <div key={item.productId} className="cart-item">
            <img 
              src={`http://localhost:5000/uploads/${item.image}`} 
              alt={item.name}  
              width="100" 
            />

            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <p>Quantity: {item.qty}</p>

              <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>
      <div>
        <button className="checkout-btn" onClick={handleCheckout}>checkout </button>
      </div>
    </div>
  );
}

export default Cart;