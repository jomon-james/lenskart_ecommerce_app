import Carousel from "./Carousel";
import "./Home.css";

function Home() {
    return (
        <>
        <Carousel />

        <div className="banner-container">
            <div className="banner-large">
                <img src="/images/do-more-be-more-070126.webp" alt="Large Banner" />
            </div>

            <div className="small-banners">
                <div className="banner">
                    <img src="/images/22-1002.webp" alt="Small Banner 1" />
                </div>

                <div className="banner">
                    <img src="/images/Frame_2147237259-1002.webp" alt="Small Banner 2" />
                </div>
            </div>

        </div>

        </>
    );
}

export default Home;