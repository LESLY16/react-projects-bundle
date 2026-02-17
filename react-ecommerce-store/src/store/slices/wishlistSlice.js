import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';
import { STORAGE_KEYS } from '../../constants';

const initialState = {
  items: getFromLocalStorage(STORAGE_KEYS.WISHLIST, [])
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find(item => item.id === product.id);
      
      if (!exists) {
        state.items.push(product);
        setToLocalStorage(STORAGE_KEYS.WISHLIST, state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      setToLocalStorage(STORAGE_KEYS.WISHLIST, state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      setToLocalStorage(STORAGE_KEYS.WISHLIST, []);
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find(item => item.id === product.id);
      
      if (exists) {
        state.items = state.items.filter(item => item.id !== product.id);
      } else {
        state.items.push(product);
      }
      
      setToLocalStorage(STORAGE_KEYS.WISHLIST, state.items);
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (state, productId) => 
  state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;
