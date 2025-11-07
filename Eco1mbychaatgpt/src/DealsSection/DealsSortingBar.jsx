import React, { useState } from 'react';

const DealsSortingBar = ({ onSortChange }) => {
  const [activeSort, setActiveSort] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [discountFilter, setDiscountFilter] = useState(0);

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular', emoji: '🔥' },
    { value: 'discount', label: 'Best Discount', emoji: '💸' },
    { value: 'rating', label: 'Top Rated', emoji: '⭐' },
    { value: 'newest', label: 'New Arrivals', emoji: '🆕' },
    { value: 'price-low', label: 'Price: Low to High', emoji: '⬆️' },
    { value: 'price-high', label: 'Price: High to Low', emoji: '⬇️' },
  ];

  const discountFilters = [
    { value: 0, label: 'All Deals', color: '#6b7280' },
    { value: 20, label: '20%+ Off', color: '#3b82f6' },
    { value: 50, label: '50%+ Off', color: '#ef4444' },
    { value: 70, label: '70%+ Off', color: '#10b981' },
  ];

  const handleSortChange = (sortType) => {
    setActiveSort(sortType);
    onSortChange(sortType);
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value) || 0;
    setPriceRange(newPriceRange);
    onSortChange({ priceRange: newPriceRange });
  };

  const handleDiscountFilter = (discount) => {
    setDiscountFilter(discount);
    onSortChange({ discount });
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      marginBottom: '30px',
      border: '1px solid rgba(0,0,0,0.05)',
    }}>
      {/* Main sorting row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          border: '1px solid #e2e8f0'
        }}>
          <span style={{ 
            fontWeight: '600', 
            color: '#475569',
            fontSize: '15px'
          }}>Sort by:</span>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px',
          flex: 1,
          minWidth: '300px'
        }}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: activeSort === option.value ? '#4f46e5' : '#f1f5f9',
                color: activeSort === option.value ? 'white' : '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                fontWeight: '500',
                fontSize: '14px',
                boxShadow: activeSort === option.value ? '0 2px 10px rgba(79, 70, 229, 0.3)' : 'none',
                transform: activeSort === option.value ? 'translateY(-1px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeSort !== option.value) {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSort !== option.value) {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.transform = 'none';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{option.emoji}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'center',
      }}>
        {/* Price range filter */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          padding: '10px 16px',
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          flex: 1,
          minWidth: '250px'
        }}>
          <span style={{ 
            fontWeight: '600', 
            color: '#475569',
            fontSize: '15px',
            whiteSpace: 'nowrap'
          }}>Price Range:</span>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            width: '100%'
          }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                fontSize: '14px'
              }}>₹</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                style={{
                  width: '100%',
                  padding: '8px 8px 8px 28px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4f46e5';
                  e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <span style={{ color: '#64748b' }}>to</span>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                fontSize: '14px'
              }}>₹</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                style={{
                  width: '100%',
                  padding: '8px 8px 8px 28px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4f46e5';
                  e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Discount filters */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          padding: '10px 16px',
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          flex: 1,
          minWidth: '250px'
        }}>
          <span style={{ 
            fontWeight: '600', 
            color: '#475569',
            fontSize: '15px',
            whiteSpace: 'nowrap'
          }}>Discount:</span>
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            flexWrap: 'wrap',
            width: '100%'
          }}>
            {discountFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleDiscountFilter(filter.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: discountFilter === filter.value ? filter.color : '#e2e8f0',
                  color: discountFilter === filter.value ? 'white' : '#334155',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  flex: 1,
                  minWidth: '70px',
                  textAlign: 'center',
                  boxShadow: discountFilter === filter.value ? `0 2px 8px ${filter.color}40` : 'none',
                  transform: discountFilter === filter.value ? 'translateY(-1px)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (discountFilter !== filter.value) {
                    e.currentTarget.style.backgroundColor = '#d1d5db';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (discountFilter !== filter.value) {
                    e.currentTarget.style.backgroundColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsSortingBar;