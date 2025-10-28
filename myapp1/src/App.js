import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  
import Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Product from './Product';

function App() {
  return (
    <Router>
      <Header /> {/* Navbar har page par visible hoga */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
