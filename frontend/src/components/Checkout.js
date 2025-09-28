import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ isOpen, onClose, cartItems, totalPrice }) => {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Card number validation (simple 16-digit check)
  const validateCardNumber = (cardNumber) => {
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleanCardNumber);
  };

  // CVV validation
  const validateCVV = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length <= 19) { // 16 digits + 3 spaces
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number must be exactly 16 digits';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'CVV must be exactly 3 digits';
    }

    if (!formData.nameOnCard) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    if (!formData.billingAddress) {
      newErrors.billingAddress = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Order placed successfully! Total: $${totalPrice}`);
      onClose();
      
      // Reset form
      setFormData({
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        billingAddress: ''
      });
    } catch (error) {
      alert('Order failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-overlay">
      <div className="checkout">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="back-btn" onClick={onClose}>Back to Shopping</button>
        </div>

        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            
            {/* Contact Information */}
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Invalid email"
                />
                {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
              </div>
            </div>

            {/* Payment Information */}
            <div className="form-section">
              <h3>Payment Information</h3>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234 5"
                />
                {errors.cardNumber && <span className="error-message">Card number must be exactly 16 digits</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={errors.expiryDate ? 'error' : ''}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && <span className="error-message">Expiry date is required</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={errors.cvv ? 'error' : ''}
                    placeholder="123"
                    maxLength="3"
                  />
                  {errors.cvv && <span className="error-message">CVV is required</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="nameOnCard">Name on Card *</label>
                <input
                  type="text"
                  id="nameOnCard"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  className={errors.nameOnCard ? 'error' : ''}
                  placeholder="Enter name as it appears on card"
                />
                {errors.nameOnCard && <span className="error-message">Name on card is required</span>}
              </div>
            </div>

            {/* Billing Address */}
            <div className="form-section">
              <h3>Billing Address</h3>
              <div className="form-group">
                <label htmlFor="billingAddress">Address *</label>
                <textarea
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  className={errors.billingAddress ? 'error' : ''}
                  placeholder="Enter your billing address"
                  rows="3"
                />
                {errors.billingAddress && <span className="error-message">Address is required</span>}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              {cartItems.map(item => (
                <div key={item.productId} className="order-item">
                  <span>{item.product.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="order-total">
                <strong>Total: ${totalPrice}</strong>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Place Order - $${totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;