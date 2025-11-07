// components/CategoriesSection/SidebarFilters.jsx

import React from 'react';

const SidebarFilters = ({ onCategorySelect }) => {
  const categories = ['all', 'men', 'women', 'kids', 'electronics'];

  return (
    <div style={{ padding: '20px', width: '200px', borderRight: '1px solid #ddd' }}>
      <h3>Categories</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categories.map((cat) => (
          <li key={cat} style={{ margin: '8px 0' }}>
            <button
              onClick={() => onCategorySelect(cat)}
              style={{
                background: '#f0f0f0',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left'
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarFilters;
