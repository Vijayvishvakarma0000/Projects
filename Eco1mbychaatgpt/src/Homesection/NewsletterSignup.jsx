import React from 'react';

function NewsletterSignup() {
  return (
    <div style={{
      padding: '60px 20px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '32px',
        marginBottom: '10px',
        color: '#222'
      }}>Join Our Newsletter</h2>
      <p style={{
        fontSize: '16px',
        color: '#666',
        marginBottom: '30px'
      }}>
        Subscribe to get updates on new products and exclusive offers.
      </p>

      <form style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: '12px 20px',
            width: '300px',
            maxWidth: '90%',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '15px'
          }}
        />
        <button type="submit" style={{
          padding: '12px 25px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          cursor: 'pointer',
          transition: '0.3s ease'
        }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#444'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#000'}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsletterSignup;
