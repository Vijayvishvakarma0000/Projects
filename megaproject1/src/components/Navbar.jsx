import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/laptop_dekho_logo-removebg-preview.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img
          // src={Logo}
          src={Logo}
          alt="Laptop Logo"
          
         
        />
        <h1>Laptopदेखो</h1>
      </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/wishlist">Whishlist</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><Link to="/mycart">Mycart</Link></li>
        <li><Link to="/profile">My Pofile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;