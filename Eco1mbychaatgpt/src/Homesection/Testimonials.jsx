import React from 'react';

function Testimonials() {
  const reviews = [
    {
      name: "Ananya Sharma",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      feedback: "Absolutely loved the products! Great quality and fast delivery.",
    },
    {
      name: "Rajeev Mehta",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      feedback: "Very satisfied with the service. Will surely shop again!",
    },
    {
      name: "Priya Singh",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      feedback: "User-friendly website and premium product range. Loved it!",
    },
  ];

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '60px 20px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', color: '#222' }}>
        What Our Customers Say
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px'
      }}>
        {reviews.map((review, index) => (
          <div key={index} style={{
            width: '300px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '30px 20px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img src={review.image} alt={review.name} style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              marginBottom: '20px',
              border: '3px solid #ccc',
              objectFit: 'cover'
            }} />
            <h3 style={{ marginBottom: '10px', color: '#111' }}>{review.name}</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
