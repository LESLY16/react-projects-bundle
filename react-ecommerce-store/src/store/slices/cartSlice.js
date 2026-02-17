import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';
import { STORAGE_KEYS } from '../../constants';

const initialState = {
  items: getFromLocalStorage(STORAGE_KEYS.CART, []),
  isOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity
        });
      }
      
      setToLocalStorage(STORAGE_KEYS.CART, state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      setToLocalStorage(STORAGE_KEYS.CART, state.items);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        item.quantity = Math.max(1, quantity);
        setToLocalStorage(STORAGE_KEYS.CART, state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      setToLocalStorage(STORAGE_KEYS.CART, []);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartIsOpen = (state) => state.cart.isOpen;

export default cartSlice.reducer;
