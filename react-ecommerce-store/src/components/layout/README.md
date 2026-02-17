# Layout Components

This directory contains the main layout components for the e-commerce store.

## Components

### Header.js
Main navigation header with:
- Logo and branding
- Search bar for product search
- Navigation links (Home, Products, Categories, Contact)
- Cart icon with item count badge
- Wishlist icon with item count
- User profile/login dropdown menu
- Mobile responsive hamburger menu
- Fully integrated with Redux store

**Icons used**: FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX

### Footer.js
Footer component with:
- Company information and logo
- Quick links (About, Contact, Products, Categories, Blog)
- Customer service links (FAQs, Shipping, Returns, Privacy Policy, Terms)
- Social media links (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- Newsletter subscription form
- Payment methods display
- Copyright notice

**Icons used**: FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube

### MiniCart.js
Dropdown cart component showing:
- Cart items with thumbnails
- Quantity controls (+/-)
- Remove button for each item
- Item prices and totals
- Subtotal calculation
- View Cart and Checkout buttons
- Empty cart state with "Continue Shopping" link
- Smooth slide-in animation
- Click outside to close functionality

**Icons used**: FiX, FiShoppingCart, FiTrash2

## Usage Example

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Header, Footer } from './components/layout';
import store from './store/store';
import 'react-toastify/dist/ReactToastify.css';

// Your page components
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
```

## Redux Integration

These components use the following Redux slices:
- **cartSlice**: For cart management (items, count, subtotal, open/close state)
- **wishlistSlice**: For wishlist management (items, count)
- **userSlice**: For user authentication and profile

### Redux Actions Used

**Cart Actions:**
- `toggleCart()` - Toggle mini cart visibility
- `closeCart()` - Close mini cart
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity({ productId, quantity })` - Update item quantity

**User Actions:**
- `logout()` - Logout user

### Redux Selectors Used

**Cart Selectors:**
- `selectCartItems` - Get all cart items
- `selectCartItemCount` - Get total item count
- `selectCartSubtotal` - Get cart subtotal
- `selectCartIsOpen` - Get cart open state

**Wishlist Selectors:**
- `selectWishlistItems` - Get all wishlist items

**User Selectors:**
- `selectCurrentUser` - Get current logged-in user
- `selectIsAuthenticated` - Check if user is authenticated

## Styling

Each component has its own CSS file with:
- Mobile-first responsive design
- Smooth animations and transitions
- Professional color scheme (primary: #2563eb)
- Dark mode compatible footer
- Accessible focus states
- Hover effects
- Media queries for tablet and mobile devices

### Breakpoints
- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px
- Small Mobile: < 480px

## Features

### Header Features
- Sticky positioning
- Search functionality with form submission
- User dropdown menu with profile options
- Mobile hamburger menu with overlay
- Cart and wishlist badges showing item counts
- Logo click navigates to home
- Smooth transitions and animations

### Footer Features
- Newsletter subscription with toast notification
- Social media links (opens in new tab)
- Multi-column responsive layout
- Payment method icons
- Copyright with current year
- Quick access links

### MiniCart Features
- Slide-in animation from right
- Click outside to close
- Overlay background
- Scrollable items list
- Quantity increment/decrement
- Remove item confirmation
- Real-time subtotal calculation
- Empty state handling
- Mobile responsive (full width on small screens)

## Dependencies

Required packages (already installed):
- react-router-dom (v7.13.0)
- react-redux (v9.2.0)
- @reduxjs/toolkit (v2.11.2)
- react-icons (v5.5.0)
- react-toastify (v11.0.5)

## Notes

- All navigation uses React Router's `Link` component
- Components prevent memory leaks with proper cleanup in useEffect
- Mobile menu locks body scroll when open
- MiniCart prevents body scroll when open
- All icons are from react-icons library
- Components are fully accessible with ARIA labels
- Newsletter form shows toast notifications on submit
