# Product Components

Professional and responsive React product components for e-commerce with Redux integration.

## Components Created

### 1. ProductCard
Displays individual product information in a card format.

**Features:**
- Product image with hover effects
- Product name (truncated if too long)
- Star rating with review count
- Price display (with sale price support)
- Quick view button on hover
- Add to cart button
- Wishlist heart icon button
- Out of stock badge
- Featured/sale badges
- Responsive design

**Props:**
- `product` (object): Product data
- `onQuickView` (function): Callback for quick view action

### 2. ProductList
Displays multiple products in grid or list view.

**Features:**
- Grid/list view toggle
- Responsive grid (4 columns desktop, 3 tablet, 2 mobile, 1 small mobile)
- List view with more details
- Loading skeleton state
- Empty state for no products
- Connected to Redux for view mode

**Props:**
- `products` (array): Array of products
- `loading` (boolean): Loading state
- `onQuickView` (function): Callback for quick view action

### 3. ProductGallery
Image gallery component for product detail pages.

**Features:**
- Main large image display
- Thumbnail images below
- Click thumbnail to change main image
- Image zoom on hover (desktop only)
- Navigation arrows
- Keyboard navigation support
- Image counter

**Props:**
- `images` (array): Array of image URLs
- `productName` (string): Product name for alt text

### 4. ProductFilters
Filter sidebar for product listing pages.

**Features:**
- Category checkboxes
- Price range options
- Brand checkboxes
- Minimum rating filter with star display
- Clear filters button with count
- Mobile-friendly collapsible accordion
- Connected to Redux for filters state
- Shows product count for each filter option

**Props:**
- `isMobile` (boolean): Whether to render in mobile mode

## Usage Example

```jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ProductCard,
  ProductList,
  ProductGallery,
  ProductFilters
} from './components/product';

// Example: Product Listing Page
function ProductsPage() {
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="products-page">
      <aside className="filters-sidebar">
        <ProductFilters />
      </aside>
      
      <main className="products-main">
        <ProductList 
          products={products} 
          loading={loading}
          onQuickView={setQuickViewProduct}
        />
      </main>
    </div>
  );
}

// Example: Single Product Card
function FeaturedProduct({ product }) {
  return (
    <ProductCard 
      product={product}
      onQuickView={(product) => console.log('Quick view:', product)}
    />
  );
}

// Example: Product Detail Page
function ProductDetailPage() {
  const product = useSelector(state => state.products.selectedProduct);

  return (
    <div className="product-detail">
      <div className="product-gallery-section">
        <ProductGallery 
          images={product.images} 
          productName={product.name}
        />
      </div>
      {/* Other product details */}
    </div>
  );
}
```

## Redux State Structure

The components expect the following Redux state structure:

```javascript
{
  products: {
    products: [...],        // Filtered products
    allProducts: [...],     // All products
    categories: [...],      // Available categories
    loading: false,
    viewMode: 'grid',       // 'grid' or 'list'
    filters: {
      category: [],
      priceRange: null,
      brand: [],
      minRating: null,
      search: ''
    }
  },
  cart: {
    items: [],
    isOpen: false
  },
  wishlist: {
    items: []
  }
}
```

## Required Redux Actions

- `setFilters(filters)` - Update product filters
- `clearFilters()` - Clear all filters
- `setViewMode(mode)` - Set grid or list view
- `setSelectedProduct(product)` - Set current product
- `addToCart({ product, quantity })` - Add product to cart
- `toggleWishlist(product)` - Toggle product in wishlist

## Styling

All components come with their own CSS files:
- `ProductCard.css`
- `ProductList.css`
- `ProductGallery.css`
- `ProductFilters.css`

The styles are responsive and follow modern design patterns with:
- Smooth transitions and animations
- Hover effects
- Focus states for accessibility
- Mobile-optimized layouts
- Professional color scheme using Bootstrap-like colors

## Dependencies

The components use:
- `react-redux` - For state management
- `react-icons` - For icon components (FaHeart, FaShoppingCart, FaEye, etc.)
- Redux Toolkit slices (cartSlice, wishlistSlice, productSlice)

## Responsive Breakpoints

- Small Mobile: < 480px (1 column)
- Mobile: 480px - 768px (2 columns)
- Tablet: 768px - 1024px (3 columns)
- Desktop: > 1024px (4 columns)

## Accessibility

All components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus visible states
- Screen reader friendly elements
- Alt text for images

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with appropriate polyfills)
