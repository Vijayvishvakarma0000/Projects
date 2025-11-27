import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "../utils/Data";

// Custom Next Arrow
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        display: "block",
        background: "#333",
        color: "#fff",
        borderRadius: "50%",
        padding: "10px",
        position: "absolute",
        right: "-30px",
        top: "40%",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      ➡
    </div>
  );
}

// Custom Prev Arrow
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        display: "block",
        background: "#333",
        color: "#fff",
        borderRadius: "50%",
        padding: "10px",
        position: "absolute",
        left: "-30px",
        top: "40%",
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      ⬅
    </div>
  );
}

function InfiniteSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // saare products ek array me laa rahe hain
  const allProducts = data.flatMap((category) => category.products);

  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        padding: "30px 0",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {allProducts.map((product, index) => (
          <div key={index} style={{ padding: "10px" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                padding: "20px",
                textAlign: "center",
                height: "200px", // ✅ fixed height for uniform cards
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.3s ease",
              }}
              className="slide-box"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                style={{
                  maxWidth: "120px", // ✅ images resize automatically
                  maxHeight: "100px",
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {product.productName}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default InfiniteSlider;
