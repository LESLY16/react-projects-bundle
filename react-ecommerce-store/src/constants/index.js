// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Product Categories
export const CATEGORIES = {
  ELECTRONICS: 'Electronics',
  CLOTHING: 'Clothing',
  BOOKS: 'Books',
  HOME: 'Home & Kitchen',
  SPORTS: 'Sports & Outdoors',
  BEAUTY: 'Beauty & Personal Care',
  TOYS: 'Toys & Games',
  AUTOMOTIVE: 'Automotive'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  RECENTLY_VIEWED: 'recently_viewed'
};

// Shipping Methods
export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: '1 business day' }
];

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'card' },
  { id: 'paypal', name: 'PayPal', icon: 'paypal' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'cash' }
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
];

// Price Ranges
export const PRICE_RANGES = [
  { id: 'under-25', label: 'Under $25', min: 0, max: 25 },
  { id: '25-50', label: '$25 to $50', min: 25, max: 50 },
  { id: '50-100', label: '$50 to $100', min: 50, max: 100 },
  { id: '100-200', label: '$100 to $200', min: 100, max: 200 },
  { id: 'over-200', label: 'Over $200', min: 200, max: Infinity }
];

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280
};

// Tax Rate
export const TAX_RATE = 0.08; // 8%
