import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";

function ProductDetails() {

    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();
    const [qty, setQty] = useState(1);

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => { if (id) fetchProduct(); }, [id]);

    const fetchProduct = async () => {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
    };

    if (!product) return <h2>Loading...</h2>;

    const handleAddToCart = async () => {
        try {
            await axios.post("http://localhost:5000/api/cart/add", {
                userId,
                product,
                qty
            });

            alert("Product added to cart");
        } catch (error) {
            console.log(error);
        }
    };


    const handleBuyNow = () => {
        const buyNowData = { ...product, qty };
        localStorage.setItem("buyNow", JSON.stringify(buyNowData));
        localStorage.setItem("checkoutSource","buyNow")
        navigate("/checkout");
    };

    return (
        <div className="product-details-container">
            <div className="product-left">
                <img src={`http://localhost:5000/uploads/${product.image}`} />
            </div>
            <div className="product-right">
                <h2 className="product-title">{product.name}</h2>
                <p className="product-price">{product.price}</p>
                <p className="product-category">Category:<span> {product.category}</span></p>
                <p className="product-description">{product.description}</p>

                <div className="qty-wrapper">
                    <p className="qty-label">Quantity</p>

                    <div className="qty-box">
                        <button  className="qty-btn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
                        <span>{qty}</span>
                        <button  className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                    </div>
                </div>

                <button
                    className="add-cart-btn"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </button>

                <button className="buy-now-btn" onClick={handleBuyNow}>
                    Buy Now
                </button>

            </div>
        </div>
    );
}

export default ProductDetails;