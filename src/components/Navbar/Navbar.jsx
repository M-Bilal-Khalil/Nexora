import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css"

export default function Navbar() {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="brand-highlight">Aureo Store</span>
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? "bar bar1 active" : "bar bar1"}></span>
        <span className={menuOpen ? "bar bar2 active" : "bar bar2"}></span>
        <span className={menuOpen ? "bar bar3 active" : "bar bar3"}></span>
      </button>

      {/* Center Nav Links */}
      <div className={`nav-center ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>

      {/* Cart Icon */}
      <div className="nav-right">
        <Link to="/cart" className="cart-link">
          🛒
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
