import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function EyeGlasses() {

    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;



    // FETCH PRODUCTS
    useEffect(() => {

        axios
        .get("https://lenskart-ecommerce-app.onrender.com/api/products?category=eyeglasses")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));

    }, []);




    // FETCH WISHLIST
    useEffect(() => {

        if(user){

            axios
            .get(`https://lenskart-ecommerce-app.onrender.com/api/wishlist/${userId}`)
            .then((res) => {

                setWishlist(
                    res.data.map(item => item._id)
                );

            })
            .catch((err) => console.log(err));
        }

    }, []);





    // ADD / REMOVE WISHLIST
    const toggleWishlist = async (productId) => {

        if(!user){
            alert("Please login first");
            return;
        }

        try {

            const isWishlisted = wishlist.includes(productId);

            // REMOVE
            if(isWishlisted){

                await axios.post(
                    "https://lenskart-ecommerce-app.onrender.com/api/wishlist/remove",
                    {
                        userId,
                        productId,
                    }
                );

                setWishlist(
                    wishlist.filter(id => id !== productId)
                );

            } 
            
            
            // ADD
            else {

                await axios.post(
                    "https://lenskart-ecommerce-app.onrender.com/api/wishlist/add",
                    {
                       userId,
                        productId,
                    }
                );

                setWishlist([
                    ...wishlist,
                    productId
                ]);
            }

        } catch(error){

            console.log(error);
        }
    };






    return (
    <>
    
        <div className="products-container">

            {products.map((item) => (  

                <div className="product-wrapper" key={item._id}>

                    <Link
                        to={`/product/${item._id}`}
                        className="product-link"
                    >

                        <div className="product-card">

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <h3>{item.name}</h3>

                            <p>₹{item.price}</p>

                        </div>

                    </Link>


                    {/* WISHLIST ICON */}
                    <div
                        className="wishlist-icon"
                        onClick={() => toggleWishlist(item._id)}
                    >

                        {
                            wishlist.includes(item._id)
                            ? <FaHeart />
                            : <FaRegHeart />
                        }

                    </div>

                </div>
            ))}

        </div>

    </>
    );
}

export default EyeGlasses;