import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Wishlist.css";
import { Link } from "react-router-dom";


function Wishlist() {

    const [wishlistItems, setWishlistItems] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;




    
    useEffect(() => {

        if(userId){

            axios
            .get(`https://lenskart-ecommerce-app.onrender.com/api/wishlist/${userId}`)
            .then((res) => {

                setWishlistItems(res.data);

            })
            .catch((err) => console.log(err));
        }

    }, []);





    
    const removeWishlist = async (productId) => {

        try {

            await axios.post(
                "https://lenskart-ecommerce-app.onrender.com/api/wishlist/remove",
                {
                    userId,
                    productId,
                }
            );

            setWishlistItems(
                wishlistItems.filter(
                    item => item._id !== productId
                )
            );

        } catch(error){

            console.log(error);
        }
    };






    return (

        <div className="wishlist-container">
            

            <h2>My Wishlist</h2>

            <div className="wishlist-grid">

                {
                    wishlistItems.map((item) => (

                        <div
                            className="wishlist-card"
                            key={item._id}
                        >

                            <Link
                                to={`/product/${item._id}`}
                                className="wishlist-link"
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <h3>{item.name}</h3>

                                <p>₹{item.price}</p>

                            </Link>


                            <button
                                onClick={() => removeWishlist(item._id)}
                            >
                                Remove
                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Wishlist;