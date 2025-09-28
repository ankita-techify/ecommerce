import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        // If API fails, use fallback data
        console.log('API not available, using fallback data');
        setProducts([
          { id: 1, name: 'Laptop', price: 999.99, image: '/api/placeholder/300/200' },
          { id: 2, name: 'Smartphone', price: 699.99, image: '/api/placeholder/300/200' },
          { id: 3, name: 'Headphones', price: 199.99, image: '/api/placeholder/300/200' },
          { id: 4, name: 'Keyboard', price: 99.99, image: '/api/placeholder/300/200' },
          { id: 5, name: 'Mouse', price: 49.99, image: '/api/placeholder/300/200' },
          { id: 6, name: 'Monitor', price: 299.99, image: '/api/placeholder/300/200' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use fallback data on error
      setProducts([
        { id: 1, name: 'Laptop', price: 999.99, image: '/api/placeholder/300/200' },
        { id: 2, name: 'Smartphone', price: 699.99, image: '/api/placeholder/300/200' },
        { id: 3, name: 'Headphones', price: 199.99, image: '/api/placeholder/300/200' },
        { id: 4, name: 'Keyboard', price: 99.99, image: '/api/placeholder/300/200' },
        { id: 5, name: 'Mouse', price: 49.99, image: '/api/placeholder/300/200' },
        { id: 6, name: 'Monitor', price: 299.99, image: '/api/placeholder/300/200' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;