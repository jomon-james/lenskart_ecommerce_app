import { useEffect, useState } from "react";
import axios from "axios";
import "./Checkout.css";
import { loadStripe } from "@stripe/stripe-js";


function Checkout() {

    const [product, setProduct] = useState([]);
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        addressLine: "",
        city: "",
        pincode: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {

        const source = localStorage.getItem("checkoutSource");
        
        if (source === "buyNow"){
        const buyNow = JSON.parse(localStorage.getItem("buyNow"));
        if (buyNow) setProduct([buyNow]);
        }

        if (source === "cart"){
        const cartItems = JSON.parse(localStorage.getItem("checkoutItems"));
        if (cartItems) setProduct(cartItems);
        }
    }, []);

    if (!product) return <h2>No product selected</h2>;

    const total = product.reduce((acc, item) => {
        return acc + item.price * item.qty;
    },0);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
    if (!address.name || !address.phone || !address.addressLine) {
        alert("please fill all the required fields");
        return;
    }

    if (!paymentMethod) {
        alert("please select a payment method");
        return;
    }

    try {
        const user = JSON.parse(localStorage.getItem("user"));

        
        const formattedItems = product.map(item => ({
            productId: item.productId || item._id,
            name: item.name,
            price: item.price,
            quantity: item.qty, 
            image: item.image
        }));


        const paymentMap = {
            cod: "COD",
            debit: "DEBIT_CARD",
            credit: "CREDIT_CARD"
        };

        
        const orderData = {
            userId: user.id,
            items: formattedItems,
            address: {
                fullName: address.name,
                phoneNumber: address.phone,
                addressLine: address.addressLine,
                city: address.city,
                pincode: address.pincode
            },
            paymentMethod: paymentMap[paymentMethod], 
            totalAmount: total
        };

                
        if (paymentMethod === "cod") {

            await axios.post(
            "https://lenskart-ecommerce-app.onrender.com/api/orders/place-order",
            orderData
        );
            alert("order placed successfully");

        localStorage.removeItem("buyNow");
        localStorage.removeItem("checkoutItems");
        localStorage.removeItem("checkoutSource");
        localStorage.removeItem("cart");

        } else {
            localStorage.setItem("pendingOrder", JSON.stringify(orderData));
            sessionStorage.setItem("pendingOrderBackup",JSON.stringify(orderData));
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            const stripe = await loadStripe("pk_test_51THMTaJubzL9s4vqRhS7GY1y7VzPX0p7bmgZtnOZJaWxhiRiDOOgrSTK3Ek80MPqBMZJ4nzTla4DhF1O67VGnEPE00Q9CJm1Eq");
            
            const response = await axios.post("https://lenskart-ecommerce-app.onrender.com/api/orders/create-checkout-session",
                {
                    items: formattedItems

                }
            );
            const session = response.data;
            window.location.href = session.url;
        }

    } catch (error) {
        console.error(error);
        alert("Order failed");
    }
};

    return (
        <div className="checkout-container">
            <div className="checkout-left">
                <h2>Order Summary</h2>

                {product.map((item, index) => (
                <div className="checkout-product" key={index}>
                    <img src={`https://lenskart-ecommerce-app.onrender.com/uploads/${item.image}`} />
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        <p>Qty: {item.qty}</p>
                    </div>

                </div>
               ))}
                <h3 className="total">Total: {total}</h3>

            </div>

            <div className="checkout-right">
                <h2>Delivery Address</h2>

                <input type="text" name="name" placeholder="full name" onChange={handleChange}/>
                <input type="text" name="phone" placeholder="phone number" onChange={handleChange}/>
                <textarea type="text" name="addressLine" placeholder="address" onChange={handleChange}/>
                <input type="text" name="city" placeholder="city" onChange={handleChange}/>
                <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange}/>

            
            <div className="payment-section">
                <h2>Payment Method</h2>

                <label>
                    <input type="radio" name="payment" value="debit" onChange={(e) => setPaymentMethod(e.target.value)} />Debit Card
                </label>
                
                <label>
                    <input type="radio" name="payment" value="credit" onChange={(e) => setPaymentMethod(e.target.value)} />Credit Card
                </label>

                <label>
                    <input type="radio" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />Cash on Delivery
                </label>

                <button onClick={handlePlaceOrder}>{paymentMethod === "cod" ? "Place Order" : "Pay Now"}</button>

            </div>

            </div>

        </div>
    );
}

export default Checkout;