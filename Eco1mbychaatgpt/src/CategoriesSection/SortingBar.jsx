import React from 'react';

const SortingBar = ({ onSortChange }) => {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd'
    }}>
      <h3 style={{ margin: 0 }}>Sort Products</h3>

      <select onChange={handleChange} style={{
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
        <option value="">Default</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="nameAZ">Name: A to Z</option>
        <option value="nameZA">Name: Z to A</option>
      </select>
    </div>
  );
};

export default SortingBar;
