import React from 'react';

const featuredProducts = [
  {
  name: "Smart Watch",
  price: "₹3,999",
  img: "https://images.pexels.com/photos/5081928/pexels-photo-5081928.jpeg?auto=compress&cs=tinysrgb&w=800",
}
,
  {
    name: "Leather Jacket",
    price: "₹5,499",
    img: "https://images.pexels.com/photos/6311398/pexels-photo-6311398.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Wireless Earbuds",
    price: "₹1,999",
    img: "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Nike Sneakers",
    price: "₹4,299",
    img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function FeaturedProducts() {
  return (
    <div style={{ padding: "40px 20px", background: "#f9f9f9" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "30px",
        marginBottom: "30px",
        fontWeight: "bold"
      }}>
        🔥 Deals of the Day
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {featuredProducts.map((product, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <h3 style={{ margin: "15px 0 5px", fontSize: "20px" }}>{product.name}</h3>
            <p style={{ color: "#d32f2f", fontWeight: "bold", fontSize: "18px" }}>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
