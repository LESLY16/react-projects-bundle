import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiX, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartIsOpen,
  closeCart,
  removeFromCart,
  updateQuantity
} from '../../store/slices/cartSlice';
import './MiniCart.css';

const MiniCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const isOpen = useSelector(selectCartIsOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon && !cartIcon.contains(event.target)) {
          dispatch(closeCart());
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, dispatch]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleViewCart = () => {
    dispatch(closeCart());
    navigate('/cart');
  };

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="mini-cart-overlay" onClick={() => dispatch(closeCart())} />
      
      {/* Mini Cart */}
      <div className={`mini-cart ${isOpen ? 'open' : ''}`} ref={cartRef}>
        {/* Header */}
        <div className="mini-cart-header">
          <h3 className="mini-cart-title">
            <FiShoppingCart />
            Shopping Cart ({cartItems.length})
          </h3>
          <button 
            className="close-button"
            onClick={() => dispatch(closeCart())}
            aria-label="Close cart"
          >
            <FiX />
          </button>
        </div>

        {/* Cart Items */}
        <div className="mini-cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <FiShoppingCart className="empty-cart-icon" />
              <p className="empty-cart-text">Your cart is empty</p>
              <Link 
                to="/products" 
                className="continue-shopping-link"
                onClick={() => dispatch(closeCart())}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <Link 
                    to={`/products/${item.id}`} 
                    className="item-image-link"
                    onClick={() => dispatch(closeCart())}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="item-image"
                    />
                  </Link>
                  
                  <div className="item-details">
                    <Link 
                      to={`/products/${item.id}`}
                      className="item-name"
                      onClick={() => dispatch(closeCart())}
                    >
                      {item.name}
                    </Link>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    
                    <div className="item-quantity">
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-actions">
                    <p className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="mini-cart-footer">
            <div className="subtotal">
              <span className="subtotal-label">Subtotal:</span>
              <span className="subtotal-amount">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button 
                className="view-cart-button"
                onClick={handleViewCart}
              >
                View Cart
              </button>
              <button 
                className="checkout-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            
            <p className="shipping-note">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCart;
