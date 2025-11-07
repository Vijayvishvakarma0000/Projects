import React from 'react';

const HeroBanner = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)', // Deals ya sale related image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        borderRadius: '10px',
        marginBottom: '30px',
        position: 'relative',
      }}
    >
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '40px',
        borderRadius: '10px',
        maxWidth: '700px',
        margin: 'auto',
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          🔥 Hot Deals This Week! 🔥
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Up to <strong>50% OFF</strong> on selected items. Don't miss out!
        </p>
        <button
          style={{
            padding: '15px 40px',
            fontSize: '1rem',
            backgroundColor: '#ff4c3b',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(255, 76, 59, 0.5)'
          }}
          onClick={() => window.location.href = '/deals'} // Ya kisi deals page ka URL
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
