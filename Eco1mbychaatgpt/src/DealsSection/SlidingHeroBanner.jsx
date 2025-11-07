import React, { useState, useEffect } from 'react';

const images = [
  
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80',
   'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
];

const SlidingHeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: '400px',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
        marginBottom: '30px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '700px',
        }}
      >
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
            boxShadow: '0 4px 10px rgba(255, 76, 59, 0.5)',
          }}
          onClick={() => window.location.href = '/deals'}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default SlidingHeroBanner;
