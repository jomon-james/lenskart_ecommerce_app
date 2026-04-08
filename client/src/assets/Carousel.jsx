import { useState } from "react";
import "./Carousel.css";

const slides = [
    "/images/Carousel_Img1.webp",
    "/images/Carousel_Img2.webp",
    "/images/Carousel_Img3.webp",
    "/images/Carousel_Img4.jpg",
    "/images/Carousel_Img5.webp",
    "/images/Carousel_Img6.jpg",
    "/images/Carousel_Img7.webp",
    "/images/Carousel_Img8.webp",
    "/images/Carousel_Img9.jpg",
    "/images/Carousel_Img10.webp",
];

function Carousel() {
    const [current, setCurrent] = useState(0);

    const nextslide = () => {
        if (current === slides.length - 1) {
            setCurrent(0);
        } else {
            setCurrent(current + 1);
        }
    };

    const prevslide = () => {
        if (current === 0) {
            setCurrent(slides.length - 1);
        } else {
            setCurrent(current - 1);
        }
};
return (
    <div className="carousel">
        <button className="prev" onClick={prevslide}>&#10094;</button>
        <img src={slides[current]} alt="Carousel Slide" className="slide"/>
        <button className="next" onClick={nextslide}>&#10095;</button>
    </div>
);

}

export default Carousel;