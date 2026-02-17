import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '../../utils/helpers';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const isLowStock = item.quantity > item.stock;
  const totalPrice = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-info">
          {item.category && <span className="cart-item-category">{item.category}</span>}
          {item.brand && <span className="cart-item-brand">{item.brand}</span>}
        </p>
        <p className="cart-item-price">{formatCurrency(item.price)} each</p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          <FiMinus />
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isLowStock}
          aria-label="Increase quantity"
        >
          <FiPlus />
        </button>
      </div>

      <div className="cart-item-total">
        <p className="total-price">{formatCurrency(totalPrice)}</p>
        {isLowStock && (
          <p className="stock-warning">
            Only {item.stock} in stock
          </p>
        )}
      </div>

      <button
        className="cart-item-remove"
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

export default CartItem;
