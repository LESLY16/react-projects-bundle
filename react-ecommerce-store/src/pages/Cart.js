import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { selectCartItems } from '../store/slices/cartSlice';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingBag />
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn-shop-now">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <h1 className="cart-title">
            Shopping Cart
            <span className="item-count">({cartItems.length} items)</span>
          </h1>
          <button 
            className="continue-shopping"
            onClick={() => navigate('/products')}
          >
            <FiArrowLeft /> Continue Shopping
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Product</span>
              <span className="hide-mobile">Price</span>
              <span>Quantity</span>
              <span className="hide-mobile">Total</span>
              <span></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Mobile: Show button to view summary */}
            <div className="mobile-summary-trigger">
              <button 
                className="btn-view-summary"
                onClick={() => {
                  document.querySelector('.cart-summary-section')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                View Order Summary
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-section">
            <CartSummary />
            
            {/* Additional Info */}
            <div className="cart-info">
              <div className="info-item">
                <span className="info-icon">✓</span>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">↻</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🔒</span>
                <div>
                  <strong>Secure Payment</strong>
                  <p>Your data is protected</p>
                </div>
              </div>
            </div>

            <div className="accepted-payments">
              <p>We accept:</p>
              <div className="payment-methods">
                <span className="payment-icon">💳</span>
                <span className="payment-icon">🏦</span>
                <span className="payment-icon">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Link - Desktop */}
        <div className="cart-footer">
          <Link to="/products" className="continue-link">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
