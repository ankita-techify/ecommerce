import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        // Show success feedback (you could add a toast notification here)
        console.log('Item added to cart successfully');
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCheckout = (items) => {
    setCartItems(items);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="App">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main>
        <ProductList onAddToCart={addToCart} />
      </main>
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}

export default App;