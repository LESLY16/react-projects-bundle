import { createSlice } from '@reduxjs/toolkit';
import { orders as mockOrders } from '../../data/orders';

const initialState = {
  orders: mockOrders,
  currentOrder: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: state.orders.length + 1,
        orderNumber: `ORD-2024-${String(state.orders.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      state.orders.push(newOrder);
      state.currentOrder = newOrder;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    getUserOrders: (state, action) => {
      return state.orders.filter(order => order.userId === action.payload);
    }
  }
});

export const {
  createOrder,
  updateOrderStatus,
  setCurrentOrder,
  clearCurrentOrder,
  getUserOrders
} = orderSlice.actions;

// Selectors
export const selectUserOrders = (state, userId) => 
  state.orders.orders.filter(order => order.userId === userId);
export const selectCurrentOrder = (state) => state.orders.currentOrder;

export default orderSlice.reducer;
