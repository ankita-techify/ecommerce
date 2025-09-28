import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';

import Header from './components/Header';

import ProductList from './components/ProductList';import Header from './components/Header';import Header from './components/Header';

import Cart from './components/Cart';

import './App.css';import ProductList from './components/ProductList';import ProductList from './components/ProductList';



function App() {import Cart from './components/Cart';import Cart from './components/Cart';

  const [isCartOpen, setIsCartOpen] = useState(false);

import './App.css';import Checkout from './components/Checkout';

  const addToCart = async (productId) => {

    try {import './App.css';

      const response = await fetch('http://localhost:5000/api/cart/add', {

        method: 'POST',function App() {

        headers: {

          'Content-Type': 'application/json',  const [isCartOpen, setIsCartOpen] = useState(false);function App() {

        },

        body: JSON.stringify({ productId, quantity: 1 }),  const [isCartOpen, setIsCartOpen] = useState(false);

      });

  const addToCart = async (productId) => {  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

      if (response.ok) {

        console.log('Item added to cart successfully');    try {  const [cartItems, setCartItems] = useState([]);

        // You could add a toast notification here

      } else {      const response = await fetch('http://localhost:5000/api/cart/add', {

        console.error('Failed to add item to cart');

      }        method: 'POST',  const addToCart = async (productId) => {

    } catch (error) {

      console.error('Error adding to cart:', error);        headers: {    try {

    }

  };          'Content-Type': 'application/json',      const response = await fetch('http://localhost:5000/api/cart/add', {



  return (        },        method: 'POST',

    <div className="App">

      <Header onCartClick={() => setIsCartOpen(true)} />        body: JSON.stringify({ productId, quantity: 1 }),        headers: {

      <main>

        <ProductList onAddToCart={addToCart} />      });          'Content-Type': 'application/json',

      </main>

      <Cart         },

        isOpen={isCartOpen} 

        onClose={() => setIsCartOpen(false)}      if (response.ok) {        body: JSON.stringify({ productId, quantity: 1 }),

      />

    </div>        console.log('Item added to cart successfully');      });

  );

}        // You could add a toast notification here



export default App;      } else {      if (response.ok) {

        console.error('Failed to add item to cart');        // Show success feedback (you could add a toast notification here)

      }        console.log('Item added to cart successfully');

    } catch (error) {      } else {

      console.error('Error adding to cart:', error);        console.error('Failed to add item to cart');

    }      }

  };    } catch (error) {

      console.error('Error adding to cart:', error);

  return (    }

    <div className="App">  };

      <Header onCartClick={() => setIsCartOpen(true)} />

      <main>  const handleCheckout = (items) => {

        <ProductList onAddToCart={addToCart} />    setCartItems(items);

      </main>    setIsCartOpen(false);

      <Cart     setIsCheckoutOpen(true);

        isOpen={isCartOpen}   };

        onClose={() => setIsCartOpen(false)}

      />  const getTotalPrice = () => {

    </div>    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);

  );  };

}

  return (

export default App;    <div className="App">
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
