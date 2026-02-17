import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartItemCount } from '../../store/slices/cartSlice';
import { CartItem, CartSummary } from '../../components/cart';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <h1>Your cart is empty</h1>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate('/products')} className="shop-now-btn">
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="cart-item-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            
            <button 
              onClick={() => navigate('/products')} 
              className="continue-shopping-btn"
            >
              ← Continue Shopping
            </button>
          </div>

          <aside className="cart-summary-section">
            <CartSummary />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
