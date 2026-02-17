# React E-commerce Store Pages

This document describes all the main pages created for the React E-commerce store application.

## Pages Overview

### 1. Home Page (`Home.js`)

**Location:** `src/pages/Home.js`

**Features:**
- **Hero Section**: Eye-catching gradient banner with call-to-action buttons
  - "Shop Now" button links to products page
  - "Featured Products" button filters featured items
  - Responsive image and text layout

- **Categories Grid**: 6 category cards with images and descriptions
  - Links to filtered product listings
  - Hover effects for better UX
  - Responsive grid layout (3 columns → 2 → 1)

- **Featured Products**: Grid showcasing featured products
  - Uses ProductCard component
  - 8 products displayed
  - Link to view all products

- **Benefits Section**: 4 benefit cards highlighting store features
  - Free shipping on orders over $50
  - Easy 30-day returns
  - 24/7 customer support
  - Secure shopping guarantee

- **Newsletter Subscription**: Email collection form
  - Email validation
  - Success message on submission
  - Centered, attractive design

**Redux Integration:**
- Reads products and categories from Redux store
- No mutations, purely presentational

**Responsive Design:**
- Mobile-first approach
- Breakpoints: 480px, 768px, 968px
- Stacks content vertically on small screens

---

### 2. Products Page (`Products.js`)

**Location:** `src/pages/Products.js`

**Features:**
- **Breadcrumb Navigation**: Shows current location in site hierarchy
  - Home → Products → [Category]
  - Links are clickable

- **Filters Sidebar**: ProductFilters component
  - Desktop: Fixed sidebar on left
  - Mobile: Slide-out drawer
  - Filter by category, price, rating, brand

- **Toolbar**:
  - Filter toggle button (mobile only)
  - Products count display
  - Sort dropdown (popular, price, rating, newest)
  - View toggle (grid/list)

- **Product Display**: ProductList component
  - Grid view: 4 columns responsive
  - List view: Single column with more details
  - Displays current page items

- **Pagination**:
  - 12 items per page
  - Smart page number display with ellipsis
  - Previous/Next buttons
  - Scrolls to top on page change

- **No Results State**: Empty state with helpful message

**Redux Integration:**
- Reads products, filters, sorting, view mode from store
- Dispatches actions for filters, sorting, view mode changes
- Handles URL parameters for category filtering

**Responsive Design:**
- Sidebar becomes drawer on tablets/mobile
- Toolbar stacks on mobile
- Grid adapts from 4 → 3 → 2 → 1 columns

---

### 3. Product Detail Page (`ProductDetail.js`)

**Location:** `src/pages/ProductDetail.js`

**Features:**
- **Breadcrumb**: Home → Products → Category → Product Name

- **Product Gallery**: ProductGallery component
  - Multiple product images
  - Thumbnail navigation
  - Zoom on hover

- **Product Information**:
  - Product name and brand
  - Star rating with review count
  - Price display
  - Stock availability indicator
  - Product description
  - Product tags

- **Quantity Selector**: 
  - Plus/minus buttons
  - Min: 1, Max: stock quantity
  - Disabled when out of stock

- **Action Buttons**:
  - Add to Cart (disabled if out of stock)
  - Add to Wishlist (toggles heart icon)
  - Share button (Web Share API or copy link)

- **Tabbed Content**:
  - **Description Tab**: Detailed product info
  - **Specifications Tab**: Product specs table
  - **Reviews Tab**: 
    - Rating overview with score
    - Rating breakdown (5-star to 1-star bars)
    - Individual review cards with user info, date, comment
    - "No reviews" state

- **Related Products**: 4 products from same category

**Redux Integration:**
- Reads product data, reviews, wishlist items
- Dispatches addToCart, toggleWishlist
- Tracks recently viewed products

**Features:**
- Toast notifications for cart/wishlist actions
- Dynamic product not found page
- Responsive tabs and layout

**Responsive Design:**
- Two-column layout → single column on tablets
- Tabs become scrollable on mobile
- Gallery and info stack vertically

---

### 4. Cart Page (`Cart.js`)

**Location:** `src/pages/Cart.js`

**Features:**
- **Empty Cart State**: 
  - Large shopping bag icon
  - "Your Cart is Empty" message
  - "Start Shopping" button

- **Cart Header**:
  - Page title with item count
  - "Continue Shopping" button (desktop)

- **Cart Items Section**:
  - CartItem component for each product
  - Shows: image, name, brand, category, price
  - Quantity controls (increase/decrease/remove)
  - Stock warning if quantity exceeds availability
  - Desktop: Table-like header with columns
  - Mobile: Cards without header

- **Cart Summary**: CartSummary component
  - Subtotal calculation
  - Promo code input (accepts: SAVE10, WELCOME10, FIRST10)
  - Tax calculation (8%)
  - Shipping cost (free over $50)
  - Total amount
  - "Proceed to Checkout" button
  - Secure checkout badge

- **Additional Info Cards**:
  - Free shipping details
  - Easy returns policy
  - Secure payment info
  - Accepted payment methods

- **Mobile Summary Trigger**: Button to scroll to summary

**Redux Integration:**
- Reads cart items from Redux store
- Calculates subtotal, tax, shipping, total
- All cart operations handled by CartItem/CartSummary

**Responsive Design:**
- Two-column → single column on tablets
- Summary appears below items on mobile
- Header hides on mobile (uses cards instead)
- "Continue Shopping" link at bottom (desktop only)

---

## Common Features Across All Pages

### Redux Integration
All pages are connected to Redux store and use:
- `useSelector` to read state
- `useDispatch` to dispatch actions
- Proper state management for cart, wishlist, products, filters

### React Router
- All pages use React Router for navigation
- Dynamic routing for product details (`/product/:id`)
- Query parameters for filtering (`/products?category=electronics`)
- Link components for navigation
- Programmatic navigation with useNavigate

### Responsive Design
- Mobile-first CSS approach
- Breakpoints: 480px, 768px, 968px, 1024px
- Flexbox and CSS Grid layouts
- Touch-friendly buttons on mobile
- Optimized images with lazy loading

### Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Alt text for images
- Focus states for interactive elements

### Performance
- Lazy loading for images
- Efficient Redux state updates
- Pagination to limit rendered items
- Debounced search (if implemented)
- Code splitting potential

---

## File Structure

```
src/pages/
├── Home.js              # Home page component
├── Home.css             # Home page styles
├── Products.js          # Products listing page
├── Products.css         # Products page styles
├── ProductDetail.js     # Product detail page
├── ProductDetail.css    # Product detail styles
├── Cart.js              # Shopping cart page
├── Cart.css             # Cart page styles
├── ProductShowcase.js   # Existing showcase page
├── ProductShowcase.css  # Showcase styles
└── index.js             # Export all pages
```

---

## Dependencies Used

- **React Router Dom**: Navigation and routing
- **React Redux**: State management
- **React Icons**: Icon library (Fi* icons)
- **React Toastify**: Toast notifications
- **Formik & Yup**: Form handling (future use)

---

## Usage

Import pages in your App.js:

```javascript
import { Home, Products, ProductDetail, Cart } from './pages';

// In your routes:
<Route path="/" element={<Home />} />
<Route path="/products" element={<Products />} />
<Route path="/product/:id" element={<ProductDetail />} />
<Route path="/cart" element={<Cart />} />
```

---

## Testing

All pages are tested to ensure:
- Proper rendering without errors
- Redux integration works correctly
- Responsive design on all screen sizes
- Navigation links function properly
- User interactions work as expected

Run tests with: `npm test`

---

## Future Enhancements

- Add authentication pages (Login, Register, Profile)
- Checkout and payment pages
- Order history page
- Wishlist page
- Search results page
- Admin dashboard pages
- Product comparison page
- User reviews submission

---

## Styling Guidelines

All pages follow consistent styling:
- **Primary Color**: #667eea (purple-blue)
- **Text Colors**: #1a202c (dark), #4a5568 (medium), #718096 (light)
- **Background**: #f8f9fa (light gray)
- **Spacing**: 8px base unit (multiples of 8)
- **Border Radius**: 8px, 12px for cards
- **Shadows**: Subtle shadows for depth
- **Transitions**: 0.3s ease for smooth interactions

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

This completes the documentation for all created pages in the React E-commerce Store.
