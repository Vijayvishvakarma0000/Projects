import { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar({ cartData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">Logo</NavLink>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/mycart" className={({ isActive }) => isActive ? "active" : ""}>
              MyCart {cartData.length > 0 ? (cartData.length) : ""}
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
              Profile
            </NavLink>
          </li>

        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
