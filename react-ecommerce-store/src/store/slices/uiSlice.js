import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  notification: null,
  modal: {
    isOpen: false,
    type: null,
    data: null
  },
  quickView: {
    isOpen: false,
    product: null
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = {
        id: Date.now(),
        ...action.payload
      };
    },
    hideNotification: (state) => {
      state.notification = null;
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null
      };
    },
    openQuickView: (state, action) => {
      state.quickView = {
        isOpen: true,
        product: action.payload
      };
    },
    closeQuickView: (state) => {
      state.quickView = {
        isOpen: false,
        product: null
      };
    }
  }
});

export const {
  setLoading,
  showNotification,
  hideNotification,
  openModal,
  closeModal,
  openQuickView,
  closeQuickView
} = uiSlice.actions;

export default uiSlice.reducer;
