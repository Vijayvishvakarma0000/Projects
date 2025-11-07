import React, { useState } from 'react';

const DealSection = () => {
  const [featuredVisible, setFeaturedVisible] = useState(4);
  const [bestVisible, setBestVisible] = useState(4);

  const featuredDeals = [
    {
      id: 1,
      name: 'Combo Pack 1',
      price: 499,
      color: '#FF6B6B',
      icon: '📦',
      image: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=Combo+1' // Placeholder image URL
    },
    {
      id: 2,
      name: 'Combo Pack 2',
      price: 599,
      color: '#4ECDC4',
      icon: '🎁',
      image: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=Combo+2' // Placeholder image URL
    },
    {
      id: 3,
      name: 'T-Shirt',
      price: 299,
      color: '#45B7D1',
      icon: '👕',
      image: 'https://via.placeholder.com/150/45B7D1/FFFFFF?text=T-Shirt' // Placeholder image URL
    },
    {
      id: 4,
      name: 'Jeans',
      price: 999,
      color: '#96CEB4',
      icon: '👖',
      image: 'https://via.placeholder.com/150/96CEB4/FFFFFF?text=Jeans' // Placeholder image URL
    },
    {
      id: 5,
      name: 'Shorts',
      price: 399,
      color: '#FFEAA7',
      icon: '🩳',
      image: 'https://via.placeholder.com/150/FFEAA7/FFFFFF?text=Shorts' // Placeholder image URL
    },
  ];

  const bestDeals = [
    {
      id: 6,
      name: 'Winter Jacket',
      price: 1499,
      color: '#E17055',
      icon: '🧥',
      image: 'https://via.placeholder.com/150/E17055/FFFFFF?text=Jacket' // Placeholder image URL
    },
    {
      id: 7,
      name: 'Sneakers',
      price: 999,
      color: '#74B9FF',
      icon: '👟',
      image: 'https://via.placeholder.com/150/74B9FF/FFFFFF?text=Sneakers' // Placeholder image URL
    },
    {
      id: 8,
      name: 'Backpack',
      price: 799,
      color: '#A29BFE',
      icon: '🎒',
      image: 'https://via.placeholder.com/150/A29BFE/FFFFFF?text=Backpack' // Placeholder image URL
    },
    {
      id: 9,
      name: 'Cap',
      price: 199,
      color: '#FD79A8',
      icon: '🧢',
      image: 'https://via.placeholder.com/150/FD79A8/FFFFFF?text=Cap' // Placeholder image URL
    },
    {
      id: 10,
      name: 'Smartwatch',
      price: 1999,
      color: '#6C5CE7',
      icon: '⌚',
      image: 'https://via.placeholder.com/150/6C5CE7/FFFFFF?text=Watch' // Placeholder image URL
    },
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>

      {/* Featured Deals */}
      <h2 style={{
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
        fontWeight: 'bold'
      }}>
        🔥 Featured Deals
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px',
        justifyContent: 'flex-start'
      }}>
        {featuredDeals.slice(0, featuredVisible).map((item) => (
          <div
            key={item.id}
            style={{
              width: '220px',
              padding: '20px',
              border: '2px solid #e0e0e0',
              borderRadius: '15px',
              textAlign: 'center',
              backgroundColor: 'white',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: hoveredCard === item.id ? '0 15px 35px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.1)',
              transform: hoveredCard === item.id ? 'translateY(-10px)' : 'translateY(0)',
              borderColor: hoveredCard === item.id ? '#3498db' : '#e0e0e0'
            }}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Product Image Box */}
            <div style={{
              width: '100%',
              height: '160px',
              borderRadius: '12px',
              marginBottom: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.2)',
              transform: hoveredCard === item.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Product Details */}
            <h4 style={{
              margin: '15px 0 10px 0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {item.name}
            </h4>

            <p style={{
              fontSize: '22px',
              color: '#e74c3c',
              fontWeight: 'bold',
              margin: '10px 0'
            }}>
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>

      {featuredVisible < featuredDeals.length && (
        <button
          style={{
            marginTop: '30px',
            padding: '15px 30px',
            cursor: 'pointer',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
          onClick={() => setFeaturedVisible(prev => prev + 4)}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#2980b9';
            e.target.style.transform = 'translateY(-3px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#3498db';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Load More Featured Deals
        </button>
      )}

      {/* Best Deals */}
      <h2 style={{
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
        fontWeight: 'bold',
        marginTop: '50px'
      }}>
        ⭐ Best Deals
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px',
        justifyContent: 'flex-start'
      }}>
        {bestDeals.slice(0, bestVisible).map((item) => (
          <div
            key={item.id}
            style={{
              width: '220px',
              padding: '20px',
              border: '2px solid #e0e0e0',
              borderRadius: '15px',
              textAlign: 'center',
              backgroundColor: 'white',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: hoveredCard === item.id ? '0 15px 35px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.1)',
              transform: hoveredCard === item.id ? 'translateY(-10px)' : 'translateY(0)',
              borderColor: hoveredCard === item.id ? '#3498db' : '#e0e0e0'
            }}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Product Image Box */}
            <div style={{
              width: '100%',
              height: '160px',
              borderRadius: '12px',
              marginBottom: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.2)',
              transform: hoveredCard === item.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Product Details */}
            <h4 style={{
              margin: '15px 0 10px 0',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {item.name}
            </h4>

            <p style={{
              fontSize: '22px',
              color: '#e74c3c',
              fontWeight: 'bold',
              margin: '10px 0'
            }}>
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>

      {bestVisible < bestDeals.length && (
        <button
          style={{
            marginTop: '30px',
            padding: '15px 30px',
            cursor: 'pointer',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
          onClick={() => setBestVisible(prev => prev + 4)}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#2980b9';
            e.target.style.transform = 'translateY(-3px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#3498db';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Load More Best Deals
        </button>
      )}
    </div>
  );
};

export default DealSection;