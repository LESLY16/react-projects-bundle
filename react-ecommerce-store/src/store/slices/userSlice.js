import { createSlice } from '@reduxjs/toolkit';
import { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage } from '../../utils/helpers';
import { STORAGE_KEYS } from '../../constants';
import { users as mockUsers } from '../../data/users';

const initialState = {
  currentUser: getFromLocalStorage(STORAGE_KEYS.USER, null),
  isAuthenticated: !!getFromLocalStorage(STORAGE_KEYS.USER, null),
  token: getFromLocalStorage(STORAGE_KEYS.AUTH_TOKEN, null),
  users: mockUsers,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.error = null;
      setToLocalStorage(STORAGE_KEYS.USER, action.payload.user);
      setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      removeFromLocalStorage(STORAGE_KEYS.USER);
      removeFromLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
      removeFromLocalStorage(STORAGE_KEYS.CART);
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.error = null;
      state.users.push(action.payload.user);
      setToLocalStorage(STORAGE_KEYS.USER, action.payload.user);
      setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      setToLocalStorage(STORAGE_KEYS.USER, state.currentUser);
      
      const userIndex = state.users.findIndex(u => u.id === state.currentUser.id);
      if (userIndex !== -1) {
        state.users[userIndex] = state.currentUser;
      }
    },
    addAddress: (state, action) => {
      if (!state.currentUser.addresses) {
        state.currentUser.addresses = [];
      }
      state.currentUser.addresses.push(action.payload);
      setToLocalStorage(STORAGE_KEYS.USER, state.currentUser);
    },
    updateAddress: (state, action) => {
      const addressIndex = state.currentUser.addresses.findIndex(
        a => a.id === action.payload.id
      );
      if (addressIndex !== -1) {
        state.currentUser.addresses[addressIndex] = action.payload;
        setToLocalStorage(STORAGE_KEYS.USER, state.currentUser);
      }
    },
    deleteAddress: (state, action) => {
      state.currentUser.addresses = state.currentUser.addresses.filter(
        a => a.id !== action.payload
      );
      setToLocalStorage(STORAGE_KEYS.USER, state.currentUser);
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
  registerFailure,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  clearError
} = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsAdmin = (state) => 
  state.user.isAuthenticated && state.user.currentUser?.role === 'admin';

export default userSlice.reducer;
