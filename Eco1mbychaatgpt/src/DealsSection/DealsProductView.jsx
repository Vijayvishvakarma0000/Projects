import React, { useState } from 'react';

const DealsProductView = ({ products }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState([]);

  const displayProducts = products || [
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1585386959984-a4155224f3c4",
      price: 2999,
      discount: 20,
      rating: 4.5,
      reviews: 120,
      description: "High quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Watch",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7",
      price: 4999,
      discount: 15,
      rating: 4.2,
      reviews: 89,
      description: "Fitness tracker with OLED display"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1585386959984-6a059ba7d5a5",
      price: 1999,
      discount: 25,
      rating: 4.3,
      reviews: 152,
      description: "Portable Bluetooth speaker with rich bass and clear sound"
    },
    {
      id: 4,
      name: "DSLR Camera",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
      price: 45000,
      discount: 10,
      rating: 4.6,
      reviews: 98,
      description: "Professional DSLR camera with 24MP lens and full HD recording"
    }
  ];

  const toggleWishlist = (id) => {
    setWishlist(wishlist.includes(id) 
      ? wishlist.filter(item => item !== id)
      : [...wishlist, id]
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button 
          onClick={() => setViewMode('grid')}
          style={{ 
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: viewMode === 'grid' ? '#4f46e5' : '#e2e8f0',
            color: viewMode === 'grid' ? 'white' : '#334155',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Grid View
        </button>
        <button 
          onClick={() => setViewMode('list')}
          style={{ 
            padding: '8px 16px',
            backgroundColor: viewMode === 'list' ? '#4f46e5' : '#e2e8f0',
            color: viewMode === 'list' ? 'white' : '#334155',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          List View
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {displayProducts.map(product => (
            <div key={product.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300';
                    e.target.alt = 'Image not available';
                  }}
                  style={{ 
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {product.discount > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ color: '#f59e0b', marginRight: '5px' }}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.ceil(product.rating))}
                  </div>
                  <span style={{ color: '#64748b', fontSize: '14px' }}>
                    ({product.reviews})
                  </span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    color: '#1e293b'
                  }}>
                    ₹{(product.price * (100 - product.discount) / 100).toFixed(0)}
                  </span>
                  {product.discount > 0 && (
                    <span style={{ 
                      textDecoration: 'line-through', 
                      color: '#64748b',
                      marginLeft: '8px',
                      fontSize: '14px'
                    }}>
                      ₹{product.price}
                    </span>
                  )}
                </div>
                <button style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {displayProducts.map(product => (
            <div key={product.id} style={{ 
              display: 'flex',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ width: '200px', flexShrink: 0 }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300';
                    e.target.alt = 'Image not available';
                  }}
                  style={{ 
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ padding: '20px', flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ color: '#f59e0b', marginRight: '5px' }}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.ceil(product.rating))}
                  </div>
                  <span style={{ color: '#64748b', fontSize: '14px' }}>
                    ({product.reviews} reviews)
                  </span>
                </div>
                <p style={{ 
                  color: '#64748b',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {product.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ 
                      fontSize: '20px', 
                      fontWeight: 'bold',
                      color: '#1e293b'
                    }}>
                      ₹{(product.price * (100 - product.discount) / 100).toFixed(0)}
                    </span>
                    {product.discount > 0 && (
                      <span style={{ 
                        textDecoration: 'line-through', 
                        color: '#64748b',
                        marginLeft: '10px',
                        fontSize: '16px'
                      }}>
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DealsProductView;
