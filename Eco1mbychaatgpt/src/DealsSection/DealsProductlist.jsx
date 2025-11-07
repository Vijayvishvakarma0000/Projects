import React, { useState } from 'react';

const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    icon: "🎧",
    color: "#4f46e5",
    price: 2999,
  },
  {
    id: 2,
    name: "Smart Watch",
    icon: "⌚",
    color: "#10b981",
    price: 4999,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    icon: "🔊",
    color: "#ef4444",
    price: 1999,
  },
  {
    id: 4,
    name: "Gaming Mouse",
    icon: "🖱️",
    color: "#7973db",
    price: 1599,
  },
  {
    id: 5,
    name: "Laptop Stand",
    icon: "💻",
    color: "#f59e0b",
    price: 899,
  },
  {
    id: 6,
    name: "Wireless Charger",
    icon: "🔌",
    color: "#0691d9",
    price: 1299,
  },
  {
    id: 7,
    name: "USB-C Hub",
    icon: "🔗",
    color: "#6336fb",
    price: 1999,
  },
  {
    id: 8,
    name: "Portable SSD",
    icon: "💾",
    color: "#145a32",
    price: 3999,
  },
];

function DealsProductlist() {
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Deals Product List</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {visibleProducts.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            backgroundColor: 'white'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
          >
            {/* Product Icon Container */}
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 15px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${product.color}, ${product.color}dd)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              boxShadow: `0 4px 15px ${product.color}40`
            }}>
              {product.icon}
            </div>
            
            <h4 style={{ 
              margin: '15px 0 10px', 
              fontSize: '18px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {product.name}
            </h4>
            
            <p style={{ 
              fontWeight: 'bold', 
              color: product.color, 
              fontSize: '20px', 
              margin: '10px 0',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              ₹{product.price.toLocaleString()}
            </p>
            
            {/* Add to Cart Button */}
            <button style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: product.color,
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = product.color + 'dd';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = product.color;
              e.target.style.transform = 'scale(1)';
            }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {visibleCount < allProducts.length && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={loadMore}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(79, 70, 229, 0.4)';
            }}
          >
            Load More ({allProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

export default DealsProductlist;