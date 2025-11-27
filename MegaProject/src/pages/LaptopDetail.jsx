
import React from "react";
import { useLocation } from "react-router-dom";
import "./LaptopDetails.css";


function LaptopDetail() {
  const { state } = useLocation();
  const { laptop } = state || {}; // yaha laptop wahi object hai jo aapne bheja tha

  if (!laptop) {
    return <p>No category selected!</p>;
  }

  return (
    <div className="laptop-detail-container">
      {/* Category Header */}
      <div className="laptop-header">
        <img
          src={laptop.categoryImage}
          alt={laptop.categoryName}
          className="laptop-image"
        />
        <div>
          <h1>{laptop.categoryName}</h1>
          <p>{laptop.categoryDescription}</p>
        </div>
      </div>

      {/* All Products */}
      <h2>All Products</h2>
      <div className="product-grid">
        {laptop.products.map((prod) => (
          <div key={prod.productId} className="product-card">
            <img src={prod.productImage} alt={prod.productName} />
            <h3>{prod.productName}</h3>
            <p>₹{prod.price}</p>
            <p>⭐ {prod.productRating}</p>
            <p> {prod.productDescription }</p>
          </div>
        ))}
      </div>

      {/* Top Trending */}
      <h2>🔥 Top Trending</h2>
      <div className="product-row">
        {laptop.topTrendingProducts.map((prod) => (
          <div key={prod.productId} className="product-card">
            <img src={prod.productImage} alt={prod.productName} />
            <h3>{prod.productName}</h3>
            <p>₹{prod.price}</p>
            <p>⭐ {prod.productRating}</p>
          </div>
        ))}
      </div>

      {/* Latest */}
      <h2>🆕 Latest</h2>
      <div className="product-row">
        {laptop.latestProducts.map((prod) => (
          <div key={prod.productId} className="product-card">
            <img src={prod.productImage} alt={prod.productName} />
            <h3>{prod.productName}</h3>
            <p>₹{prod.price}</p>
            <p>⭐ {prod.productRating}</p>
          </div>
        ))}
      </div>

      {/* Most Selling */}
      <h2>💰 Most Selling</h2>
      <div className="product-row">
        {laptop.mostSellingProducts.map((prod) => (
          <div key={prod.productId} className="product-card">
            <img src={prod.productImage} alt={prod.productName} />
            <h3>{prod.productName}</h3>
            <p>₹{prod.price}</p>
            <p>⭐ {prod.productRating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LaptopDetail;
