import { useSelector, useDispatch } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  selectCartItems,
  selectCartItemCount,
  selectCartSubtotal
} from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const subtotal = useSelector(selectCartSubtotal);

  const addItem = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info('Item removed from cart', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const clearAllItems = () => {
    dispatch(clearCart());
    toast.info('Cart cleared', {
      position: 'bottom-right',
      autoClose: 2000
    });
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return {
    cartItems,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateItemQuantity,
    clearAllItems,
    getItemQuantity,
    isInCart
  };
};
