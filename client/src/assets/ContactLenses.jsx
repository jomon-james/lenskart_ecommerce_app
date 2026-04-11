import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";


function ContactLenses() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("https://lenskart-ecommerce-app.onrender.com/products?category=contact-lenses")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    },[]);

    return (
        <>
        <div className="products-container">
            {products.map((item) => (  
            <Link to={`/product/${item._id}`} key={item._id} className="product-link">
            <div className="product-card">
                <img src={`https://lenskart-ecommerce-app.onrender.com/uploads/${item.image}`} alt={"item.name"} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                
            </div>
            </Link>
            ))}
        </div>
        </>
    );
}

export default ContactLenses;