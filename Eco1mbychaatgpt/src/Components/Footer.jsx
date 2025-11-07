import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#222',
      color: '#ccc',
      padding: '40px 20px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: '30px',
      fontSize: '14px',
    }}>
      
      {/* About */}
      <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>About Us</h3>
        <p>
          We provide the best products with amazing customer service.
          Shop with confidence and enjoy our exclusive offers.
        </p>
      </div>
      
      {/* Quick Links */}
      <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>Quick Links</h3>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
          <li><a href="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</a></li>
          <li><a href="/products" style={{ color: '#ccc', textDecoration: 'none' }}>Products</a></li>
          <li><a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About</a></li>
          <li><a href="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>Contact Us</h3>
        <p>Email: support@shop.com</p>
        <p>Phone: +91 12345 67890</p>
        <p>Address: 123 Market Street, City, Country</p>
      </div>

      {/* Social Media */}
      <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
        <h3 style={{ color: '#fff', marginBottom: '15px' }}>Follow Us</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{color: '#ccc', fontSize: '20px'}}>📘</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{color: '#ccc', fontSize: '20px'}}>🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{color: '#ccc', fontSize: '20px'}}>📸</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{color: '#ccc', fontSize: '20px'}}>💼</a>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ flexBasis: '100%', textAlign: 'center', marginTop: '30px', color: '#777' }}>
        &copy; {new Date().getFullYear()} YourShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
