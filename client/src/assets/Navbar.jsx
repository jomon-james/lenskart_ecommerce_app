import React from 'react';
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        alert("Logout Successful");
        navigate("/login");
    }

    const [search, setSearch] = useState("");

    return (
        <>
        <div className="top-bar">
        FREE SHIPPING | 1 YEAR WARRANTY
        <span className="right">TOLL FREE NUMBER - 9722-2210(9:30 AM - 9:30 PM)</span>
    </div>
    
    <nav className="navbar">
        <div className="left-section">
        <div className="logo">
            <Link to="/home">
            <img src="./images/main_logo.svg" alt="Lenskart logo"/> 
            </Link>
        </div>

        <div className="phone">
            <img src="./images/NUMBER_SG.svg" alt="Phone number"/>
        </div>
        </div>

        <div className="search-box">
            <input
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim() !== "") {
                navigate(`/search?q=${search}`);
                }
            }}
            />
        </div>

        <div className="nav-links">
            <Link to="/my-orders">Track Order</Link>
            <Link to="/login" onClick={handleLogout}>Logout</Link>
            <Link to="#"><img src="./images/love.png" alt="Wishlist icon" className="icon"/> Wishlist</Link>
            <Link to="/cart"><img src="./images/shopping-bag.png" alt="cart icon" className="icon"/>Cart</Link>
        </div>
    </nav>

    <div className="menu">
        <Link to="/eyeglasses">EYEGLASSES</Link>
        <Link to="/sunglasses">SUNGLASSES</Link>
        <Link to="/contact-lenses">CONTACTS</Link>
        <Link to="/accessories">ACCESSORIES</Link>
    </div>
        
     </>
    );

}

export default Navbar;