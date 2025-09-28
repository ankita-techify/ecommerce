import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onCartClick }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
    // Set up periodic refresh of cart count
    const interval = setInterval(fetchCartCount, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      if (response.ok) {
        const cartItems = await response.json();
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(totalItems);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🛒 E-Commerce Store</h1>
        <button className="cart-button" onClick={() => {
          onCartClick();
          fetchCartCount(); // Refresh count when cart is opened
        }}>
          <span className="cart-icon">🛒</span>
          Cart
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;