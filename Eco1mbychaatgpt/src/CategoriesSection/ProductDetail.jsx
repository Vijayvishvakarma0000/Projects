// ProductDetail.jsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { allProducts } from './Data';
import { CartContext } from './CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);

  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '300px', height: 'auto', borderRadius: '10px' }}
      />
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> This is a sample product description.</p>

      <button
        onClick={() => addToCart(product)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
