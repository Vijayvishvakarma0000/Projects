// src/pages/Checkout.jsx
import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Checkout = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '30px' }}>
      <h2>🛒 Order Summary</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
              <h4>{item.title}</h4>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => removeFromCart(item.id)} style={{ color: 'red' }}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button style={{
            padding: '10px 20px',
            backgroundColor: 'orange',
            border: 'none',
            color: 'white',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer'
          }}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
