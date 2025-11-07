import React from 'react';

const newArrivals = [
  // Row 1
  {
    name: "Premium Hoodie",
    price: "₹2,499",
    img: "https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Designer Handbag",
    price: "₹5,999",
    img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Trendy Sunglasses",
    price: "₹1,799",
    img: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Stylish Jacket",
    price: "₹3,499",
    img: "https://images.pexels.com/photos/6311613/pexels-photo-6311613.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Modern Sneakers",
    price: "₹3,999",
    img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  // Row 2
  {
    name: "Luxury Perfume",
    price: "₹4,299",
    img: "https://images.pexels.com/photos/9659890/pexels-photo-9659890.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Smart Watch",
    price: "₹6,999",
    img: "https://images.pexels.com/photos/2773946/pexels-photo-2773946.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
   {
    name: "Denim Jeans",
    price: "₹2,299",
    img: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Leather Boots",
    price: "₹4,799",
    img: "https://images.pexels.com/photos/532588/pexels-photo-532588.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Classic Hat",
    price: "₹1,299",
    img: "https://images.pexels.com/photos/302628/pexels-photo-302628.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function NewArrivals() {
  return (
    <div style={{ padding: "50px 20px", backgroundColor: "#f4f4f4" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "36px",
        marginBottom: "30px",
        color: "#333",
        textTransform: "uppercase",
        letterSpacing: "1px"
      }}>
        New Arrivals / Trending Products
      </h2>

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "30px"
      }}>
        {newArrivals.map((item, index) => (
          <div key={index} style={{
            width: "250px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            cursor: "pointer",
            overflow: "hidden"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <img src={item.img} alt={item.name} style={{
              width: "100%",
              height: "250px",
              objectFit: "cover"
            }} />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#111" }}>{item.name}</h3>
              <p style={{ fontWeight: "bold", color: "#e91e63" }}>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
