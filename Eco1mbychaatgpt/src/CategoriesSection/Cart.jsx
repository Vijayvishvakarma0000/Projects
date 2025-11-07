import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: '20px' }}>
          <h3>{item.title}</h3>
          <img src={item.image} alt={item.title} width="150" />
          <br />
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
