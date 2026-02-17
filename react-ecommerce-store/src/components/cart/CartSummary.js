import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartSubtotal, selectCartItems } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { FiTag } from 'react-icons/fi';
import './CartSummary.css';

const CartSummary = () => {
  const navigate = useNavigate();
  const subtotal = useSelector(selectCartSubtotal);
  const cartItems = useSelector(selectCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const TAX_RATE = 0.08;
  const FREE_SHIPPING_THRESHOLD = 50;

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + tax + shippingCost;

  const handlePromoApply = () => {
    const validCodes = ['SAVE10', 'WELCOME10', 'FIRST10'];
    
    if (validCodes.includes(promoCode.toUpperCase())) {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-summary">
      <h2 className="cart-summary-title">Order Summary</h2>

      <div className="cart-summary-section">
        <div className="summary-row">
          <span>Subtotal ({cartItems.length} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {promoApplied && (
          <div className="summary-row discount">
            <span>Discount (10%)</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>Tax (8%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span className={shippingCost === 0 ? 'free-shipping' : ''}>
            {shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}
          </span>
        </div>

        {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
          <p className="shipping-info">
            Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
          </p>
        )}
      </div>

      <div className="cart-summary-section promo-section">
        <div className="promo-input-wrapper">
          <FiTag className="promo-icon" />
          <input
            type="text"
            className="promo-input"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
          />
          <button
            className="promo-btn"
            onClick={handlePromoApply}
            disabled={promoApplied || !promoCode}
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
        {promoError && <p className="promo-error">{promoError}</p>}
        {promoApplied && <p className="promo-success">Promo code applied successfully!</p>}
      </div>

      <div className="cart-summary-total">
        <span>Total</span>
        <span className="total-amount">{formatCurrency(total)}</span>
      </div>

      <button
        className="checkout-btn"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </button>

      <div className="secure-checkout">
        <p>🔒 Secure Checkout</p>
        <p className="secure-text">Your information is protected</p>
      </div>
    </div>
  );
};

export default CartSummary;
