import React from "react";
import "./NewArrivals.css";

function NewArrivals() {
    return (
        <div className="new-arrivals-page">
            <div className="top-bar1">
            Eyewear / All Products / Eyeglasses / Collections / All New Arrivals Eyeglasses
            </div>
            
            <div className="banner">
                <img src="/images/newarrivals.jpg" alt="new arrivals" />
            </div>

            <div className="top-controls">
                <div>
                    <p className="arrival-text">ALL NEW ARRIVALS EYEGLASSES</p>
                </div>
            </div>

            <div className="main-content">
                <div className="filters">
                    <h3>FRAME TYPE</h3>
                    <div className="filters-buttons">
                    <button>Full Rim</button>
                    <button>Rimless</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NewArrivals;