import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo  */}
            <div className="logo">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
                    alt="Laptop Logo"
                />
                <h1>Laptop_DEKHO</h1>
            </div>

             {/* Hamburger for mobile */}
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/products">Whishlist</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/products">Mycart</Link></li>
        </ul>
    </nav >
  );
}

export default Navbar;