import React from 'react';

function AboutPreview() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      backgroundColor: '#fff',
    }}>
      {/* Left Side - Image */}
      <div style={{
        flex: '1 1 400px',
        textAlign: 'center',
        padding: '20px'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
          alt="About Us"
          style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Right Side - Text Content */}
      <div style={{
        flex: '1 1 400px',
        padding: '20px'
      }}>
        <h2 style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: '#222'
        }}>Who We Are</h2>
        <p style={{
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#555'
        }}>
          We are a team of passionate individuals committed to delivering the best shopping experience.
          Our e-commerce platform offers high-quality fashion, electronics, accessories and more — all at
          unbeatable prices. We believe in quality, trust, and customer satisfaction.
        </p>

        <button style={{
          marginTop: '30px',
          padding: '12px 30px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          cursor: 'pointer',
          transition: '0.3s'
        }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#444'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#000'}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default AboutPreview;
