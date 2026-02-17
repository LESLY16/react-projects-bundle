import { createSlice } from '@reduxjs/toolkit';
import { products as mockProducts } from '../../data/products';
import { categories as mockCategories } from '../../data/categories';
import { reviews as mockReviews } from '../../data/reviews';
import { sortProducts, filterProducts } from '../../utils/helpers';

const initialState = {
  allProducts: mockProducts,
  products: mockProducts,
  categories: mockCategories,
  selectedProduct: null,
  reviews: mockReviews,
  loading: false,
  error: null,
  filters: {
    category: [],
    priceRange: null,
    minRating: null,
    brand: [],
    search: ''
  },
  sortBy: 'popular',
  viewMode: 'grid', // grid or list
  recentlyViewed: []
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      let filtered = filterProducts(state.allProducts, state.filters);
      // Apply sorting
      state.products = sortProducts(filtered, state.sortBy);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.products = sortProducts(state.products, action.payload);
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.products = sortProducts(state.allProducts, state.sortBy);
    },
    searchProducts: (state, action) => {
      state.filters.search = action.payload;
      let filtered = filterProducts(state.allProducts, state.filters);
      state.products = sortProducts(filtered, state.sortBy);
    },
    addToRecentlyViewed: (state, action) => {
      const product = action.payload;
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(p => p.id !== product.id);
      // Add to beginning
      state.recentlyViewed.unshift(product);
      // Keep only last 10
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed.pop();
      }
    },
    addProduct: (state, action) => {
      state.allProducts.push(action.payload);
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.allProducts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.allProducts[index] = action.payload;
      }
      const productIndex = state.products.findIndex(p => p.id === action.payload.id);
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.allProducts = state.allProducts.filter(p => p.id !== action.payload);
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
      // Update product rating
      const productReviews = state.reviews.filter(r => r.productId === action.payload.productId);
      const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      const product = state.allProducts.find(p => p.id === action.payload.productId);
      if (product) {
        product.rating = avgRating;
        product.reviewCount = productReviews.length;
      }
    }
  }
});

export const {
  setProducts,
  setSelectedProduct,
  setFilters,
  setSortBy,
  setViewMode,
  clearFilters,
  searchProducts,
  addToRecentlyViewed,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview
} = productSlice.actions;

export default productSlice.reducer;
