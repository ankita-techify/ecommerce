const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with fitness tracking",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Portable Charger",
    price: 29.99,
    description: "10000mAh portable battery pack for all devices",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 39.99,
    description: "Ergonomic wireless mouse with precision tracking",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 49.99,
    description: "Multi-port USB-C hub with 4K HDMI output",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 89.99,
    description: "Portable Bluetooth speaker with rich bass",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop"
  }
];

// In-memory cart storage (in production, use a database)
let cart = [];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running!' });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get cart items
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  // Find the product
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      product,
      quantity
    });
  }
  
  res.json({ message: 'Item added to cart', cart });
});

// Remove item from cart
app.delete('/api/cart/remove/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }
  
  cart.splice(itemIndex, 1);
  res.json({ message: 'Item removed from cart', cart });
});

// Update item quantity in cart
app.put('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  
  const item = cart.find(item => item.productId === productId);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    const itemIndex = cart.findIndex(item => item.productId === productId);
    cart.splice(itemIndex, 1);
  } else {
    item.quantity = quantity;
  }
  
  res.json({ message: 'Cart updated', cart });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});