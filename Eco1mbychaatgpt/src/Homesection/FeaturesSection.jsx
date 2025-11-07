import React from 'react';

function FeaturesSection() {
  const features = [
    {
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders above ₹999.",
      image: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
    },
    {
      title: "24/7 Support",
      description: "Our support team is available anytime you need help.",
      image: "https://cdn-icons-png.flaticon.com/512/597/597177.png",
    },
    {
      title: "Secure Payment",
      description: "All transactions are encrypted and secure.",
      image: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
    },
    {
      title: "Easy Returns",
      description: "Hassle-free returns within 7 days.",
      image: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
    },
  ];

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fdfdfd' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '32px',
        marginBottom: '40px',
        color: '#222',
        letterSpacing: '1px'
      }}>
        Why Shop With Us?
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px'
      }}>
        {features.map((item, index) => (
          <div key={index} style={{
            width: '250px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '30px 20px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={item.image} alt={item.title} style={{
              width: '60px',
              height: '60px',
              marginBottom: '20px'
            }} />
            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#111' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;
