import React, { useState, useEffect } from 'react';
import './Cart.css';

function Cart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        console.error('Failed to fetch cart items');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        fetchCartItems(); // Refresh cart
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="cart-content">
          {loading ? (
            <div className="loading">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.product.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.product.name}</h4>
                      <p>${item.product.price} × {item.quantity}</p>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="total">
                  <strong>Total: ${getTotalPrice()}</strong>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;