// ProductList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {products.map((product) => (
        <div key={product.id} style={{
          border: '1px solid #ddd',
          padding: '16px',
          width: '200px',
          borderRadius: '10px'
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <h4>{product.title}</h4>
          <p>Category: {product.category}</p>
          <button
            onClick={() => handleView(product.id)}
            style={{
              marginTop: '10px',
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
