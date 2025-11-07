import React, { useState, useEffect } from 'react';

const categories = [
  {
    title: 'Electronics',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Fashion',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1581093450023-e069e7465fae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Toys',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Grocery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Sports',
    image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  // Adding more categories to make it 4x4 (16 items total)
  {
    title: 'Mobile Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Kitchenware',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Health',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Automotive',
    image: 'https://images.unsplash.com/photo-1494976388901-7509ad593b91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
  {
    title: 'Pet Supplies',
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
  },
];

const DealsCategories = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const fallbackImage = 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80';

  useEffect(() => {
    // Preload images
    categories.forEach((cat, index) => {
      const img = new Image();
      img.src = cat.image;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
      };
      img.onerror = () => {
        setLoadedImages(prev => ({ ...prev, [index]: false }));
      };
    });
  }, []);

  return (
    <div style={{ 
      padding: '50px 20px', 
      backgroundColor: '#f9f9f9',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        fontSize: '2rem',
        color: '#333',
        fontWeight: '600'
      }}>
        🛍️ Explore Deals by Category
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // Fixed 4 columns
          gap: '20px',
        }}
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ 
              width: '100%', 
              height: '180px',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: loadedImages[index] === undefined ? '#f0f0f0' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {loadedImages[index] === undefined ? (
                <div style={{ color: '#999' }}>Loading...</div>
              ) : (
                <img
                  src={loadedImages[index] ? cat.image : fallbackImage}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              )}
            </div>
            <div style={{ 
              padding: '15px', 
              textAlign: 'center',
              borderTop: '1px solid #f0f0f0'
            }}>
              <h4 style={{ 
                margin: 0,
                fontSize: '1.1rem',
                color: '#444'
              }}>
                {cat.title}
              </h4>
              <button
                style={{
                  marginTop: '12px',
                  padding: '6px 16px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ff5252';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff6b6b';
                }}
              >
                View Deals
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsCategories;