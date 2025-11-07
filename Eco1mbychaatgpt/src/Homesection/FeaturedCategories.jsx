import React from "react";

function FeaturedCategories() {
  const containerStyle = {
    padding: "60px 40px",
    backgroundColor: "#ffffff",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "36px",
    marginBottom: "40px",
    fontWeight: "bold",
    color: "#333",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "30px",
    justifyContent: "center",
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s",
    cursor: "pointer",
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const titleStyle = {
    padding: "15px 10px",
    fontSize: "20px",
    fontWeight: "600",
    backgroundColor: "#f9f9f9",
    color: "#444",
  };

  const categories = [
    {
      name: "Men's Fashion",
      img: "https://images.pexels.com/photos/532588/pexels-photo-532588.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Women's Fashion",
      img: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Kids Wear",
      img: "https://images.pexels.com/photos/3661358/pexels-photo-3661358.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Accessories",
      img: "https://images.pexels.com/photos/1813504/pexels-photo-1813504.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Shoes",
      img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
  name: "Beauty & Skin",
  img: "https://images.pexels.com/photos/4264047/pexels-photo-4264047.jpeg?auto=compress&cs=tinysrgb&w=800",
}
,
    {
      name: "Electronics",
      img: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Home Decor",
      img: "https://images.pexels.com/photos/271800/pexels-photo-271800.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🎯 Featured Categories</h2>
      <div style={gridStyle}>
        {categories.map((item, index) => (
          <div key={index} style={cardStyle}>
            <img src={item.img} alt={item.name} style={imgStyle} />
            <div style={titleStyle}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCategories;
