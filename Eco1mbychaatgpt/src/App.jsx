import React from 'react'
import { Routes, Route } from 'react-router-dom';  // Router hata diya

import Header from './Components/Header';
import Home from './Pages/Home'; 
import Categories from './Pages/Categories';
import Contact from './Pages/Contact';
import Deals from './Pages/Deals';
import Footer from './Components/Footer';
import ProductDetail from './CategoriesSection/ProductDetail';
import Cart from './CategoriesSection/Cart';
import Checkout from './CategoriesSection/Checkout';

function App() {
  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/deals" element={<Deals/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

         
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
