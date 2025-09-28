import "./Home.css";
import { data } from "../utils/Data.js";
import { Link } from "react-router-dom";
import Rating from "../components/Rating.jsx";
function Home() {
  // Dummy icons (replace with your actual icons or SVGs)
  const ArrowRight = () => <span>→</span>;
  const Shield = () => <span>🛡</span>;
  const Star = () => <span>⭐</span>;
  const Truck = () => <span>🚚</span>;
  const HeadphonesIcon = () => <span>🎧</span>;



  const featuredProducts = [
    { id: 1, name: "HP EliteBook", price: "₹45,000" },
    { id: 2, name: "Dell Inspiron", price: "₹55,000" },
    { id: 3, name: "Lenovo Legion", price: "₹75,000" },
    { id: 4, name: "MacBook Air", price: "₹85,000" },
  ];

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <h1 className="hero-title">
                LAPTOP देखो
                <span className="hero-subtitle">Asli Specs, Asli Deals!</span>
              </h1>
              <p className="hero-description">
                India's most trusted marketplace for new and certified
                refurbished laptops. Find your perfect laptop with genuine
                specifications and competitive prices.
              </p>
              <div className="hero-buttons">
                <a href="/search" className="btn-primary">
                  <span>Browse Laptops</span> <ArrowRight />
                </a>
                <a href="/seller/onboarding" className="btn-outline">
                  Become a Seller
                </a>
              </div>
            </div>
            <div className="hero-image-container">
              <img
                src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
                alt="Laptops"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container trust-grid">
          <div className="trust-card">
            <div className="trust-icon blue-bg">
              <Shield />
            </div>
            <h3>Verified Quality</h3>
            <p>All products verified for authenticity and quality</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon green-bg">
              <Star />
            </div>
            <h3>Trusted Sellers</h3>
            <p>KYC verified sellers with ratings and reviews</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon purple-bg">
              <Truck />
            </div>
            <h3>Fast Delivery</h3>
            <p>Quick and secure delivery across India</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon orange-bg">
              <HeadphonesIcon />
            </div>
            <h3>24/7 Support</h3>
            <p>Dedicated customer support for all queries</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container text-center">
          <h2>Shop by Category</h2>
          <p>
            Find the perfect laptop for your needs, whether it's gaming,
            business, or everyday use
          </p>
          <div className="category-grid">
            {data?.map((category) => {
              return (<Link
                key={category?.categoryId}
                to={`/laptop-detail/category/${category?.categoryName}/${category?.categoryId}`}
                className="category-card"
              >
                <div className="category-icon"><img src={category?.categoryImage} alt="img"/></div>
                <h3>{category?.categoryName}</h3>
              </Link>)
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <div>
              <h2>Featured Laptops</h2>
              <p>Hand-picked laptops with the best value for money</p>
            </div>
            <a href="/search" className="view-all-link">
              <span>View All</span> <ArrowRight />
            </a>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to Sell Your Laptop?</h2>
          <p>
            Join thousands of sellers on LAPTOP देखो and reach millions of
            buyers across India
          </p>
          <div className="cta-buttons">
            <a href="/seller/onboarding" className="btn-light">
              Start Selling Today
            </a>
            <a href="tel:+919876543210" className="btn-outline-light">
              Call Us: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
      <Rating/>
    </div>
  );
}

export default Home;