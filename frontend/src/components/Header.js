import React from 'react';
import './Header.css';

function Header({ onCartClick }) {
  return (
    <header className="header">
      <h1 className="logo">E-Commerce Store</h1>
      <nav className="nav">
        <button className="cart-button" onClick={onCartClick}>
          🛒 Cart
        </button>
      </nav>
    </header>
  );
}

export default Header;