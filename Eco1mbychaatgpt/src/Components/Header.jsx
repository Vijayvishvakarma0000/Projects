import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#222',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          ShopLogo
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '20px',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link
              to="/"
              style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
              onMouseOver={e => (e.target.style.color = '#f39c12')}
              onMouseOut={e => (e.target.style.color = '#fff')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
              onMouseOver={e => (e.target.style.color = '#f39c12')}
              onMouseOut={e => (e.target.style.color = '#fff')}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/deals"
              style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
              onMouseOver={e => (e.target.style.color = '#f39c12')}
              onMouseOut={e => (e.target.style.color = '#fff')}
            >
              Deals
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
              onMouseOver={e => (e.target.style.color = '#f39c12')}
              onMouseOut={e => (e.target.style.color = '#fff')}
            >
              Contact
            </Link>
          </li>

          

            <li>
            <Link
              to="/checkout"
              style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
              onMouseOver={e => (e.target.style.color = '#f39c12')}
              onMouseOut={e => (e.target.style.color = '#fff')}
            >
              Checkout
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search + Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <input
          type="text"
          placeholder="Search products..."
          style={{
            padding: '5px 10px',
            borderRadius: '15px',
            border: 'none',
            outline: 'none',
            width: '180px',
          }}
        />
        <div style={{ cursor: 'pointer', fontSize: '18px' }} title="User Account">
          👤
        </div>
      <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div style={{ cursor: 'pointer', fontSize: '18px', position: 'relative' }} title="Cart">
    🛒
    <span
      style={{
        position: 'absolute',
        top: '-5px',
        right: '-10px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '12px',
      }}
    >
      3
    </span>
  </div>
</Link>
      </div>
    </header>
  );
}

export default Header;
