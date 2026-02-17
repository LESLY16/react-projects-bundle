# Cart and Checkout Components

Professional React cart and checkout components with Redux integration, Formik/Yup validation, and responsive design.

## Components Overview

### Cart Components (`src/components/cart/`)

#### CartItem
Displays individual cart items with:
- Product image thumbnail
- Product name, category, and brand
- Price per item
- Quantity selector with increment/decrement buttons
- Total price calculation
- Stock warning when quantity exceeds available stock
- Remove item button

**Props:**
- `item` (object): Cart item with properties: `id`, `name`, `image`, `price`, `quantity`, `stock`, `category`, `brand`

**Redux Actions:**
- `updateQuantity`: Update item quantity
- `removeFromCart`: Remove item from cart

#### CartSummary
Order summary sidebar with:
- Subtotal calculation
- Tax calculation (8%)
- Shipping cost (free shipping over $50)
- Promo code input and validation
- Total price calculation
- Proceed to checkout button
- Secure checkout indicator

**Redux Selectors:**
- `selectCartSubtotal`: Get cart subtotal
- `selectCartItems`: Get all cart items

**Features:**
- Valid promo codes: `SAVE10`, `WELCOME10`, `FIRST10` (10% discount)
- Free shipping threshold: $50
- Sticky positioning on desktop

### Checkout Components (`src/components/checkout/`)

#### CheckoutSteps
Visual progress stepper showing:
- Step 1: Shipping Address
- Step 2: Payment Method
- Step 3: Review Order

**Props:**
- `currentStep` (number): Current step (1-3)

**Features:**
- Active step highlighting
- Completed step indicators with checkmarks
- Progress connectors between steps
- Responsive design with simplified mobile view

#### ShippingForm
Shipping address form with:
- First name and last name
- Street address
- City, state, and zip code
- Phone number
- Save address checkbox
- Form validation using Formik and Yup

**Props:**
- `initialValues` (object): Pre-filled form values (optional)
- `onSubmit` (function): Form submission handler
- `onBack` (function): Back button handler (optional)

**Validation Schema:**
Uses `shippingAddressSchema` from `utils/validationSchemas`:
- First/Last name: Min 2 characters
- Street: Min 5 characters
- City: Min 2 characters
- State: Exactly 2 characters
- Zip code: Exactly 5 digits
- Phone: Exactly 10 digits

#### PaymentForm
Payment method selection and card details form with:
- Payment method selection (Card/PayPal/Cash on Delivery)
- Card number input with formatting
- Cardholder name
- Expiry date input (MM/YY format)
- CVV input
- Form validation using Formik and Yup

**Props:**
- `initialValues` (object): Pre-filled form values (optional)
- `onSubmit` (function): Form submission handler
- `onBack` (function): Back button handler (optional)

**Payment Methods:**
- **Credit/Debit Card**: Full form validation required
- **PayPal**: Redirects to PayPal (no additional validation)
- **Cash on Delivery**: No additional validation required

**Validation Schema:**
Uses `paymentSchema` from `utils/validationSchemas` (for card payments):
- Card number: Exactly 16 digits
- Cardholder name: Min 3 characters
- Expiry date: MM/YY format
- CVV: 3-4 digits

**Features:**
- Card number auto-formatting
- Expiry date auto-formatting (MM/YY)
- Dynamic validation based on payment method
- Secure payment indicator

## Usage Examples

### Cart Page

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { CartItem, CartSummary } from '../components/cart';
import { selectCartItems } from '../store/slices/cartSlice';

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))
        )}
      </div>
      <aside className="cart-sidebar">
        <CartSummary />
      </aside>
    </div>
  );
};

export default CartPage;
```

### Checkout Page

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps, ShippingForm, PaymentForm } from '../components/checkout';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  const handleShippingSubmit = (values) => {
    setShippingData(values);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (values) => {
    setPaymentData(values);
    setCurrentStep(3);
    // Proceed to review page or place order
  };

  return (
    <div className="checkout-page">
      <CheckoutSteps currentStep={currentStep} />
      
      {currentStep === 1 && (
        <ShippingForm
          initialValues={shippingData}
          onSubmit={handleShippingSubmit}
          onBack={() => navigate('/cart')}
        />
      )}
      
      {currentStep === 2 && (
        <PaymentForm
          initialValues={paymentData}
          onSubmit={handlePaymentSubmit}
          onBack={() => setCurrentStep(1)}
        />
      )}
      
      {currentStep === 3 && (
        <div>Review and place order</div>
      )}
    </div>
  );
};

export default CheckoutPage;
```

## Styling

All components come with pre-built CSS files featuring:
- Professional, modern design
- Responsive layouts (mobile, tablet, desktop)
- Smooth transitions and hover effects
- Accessible color contrasts
- Form validation error states
- Loading and disabled states

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Redux Integration

### Required Redux Store Setup

The components use the following Redux slices:

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // ... other reducers
  }
});
```

### Cart Slice Actions

The components dispatch the following actions:
- `updateQuantity({ productId, quantity })`: Update item quantity
- `removeFromCart(productId)`: Remove item from cart
- `clearCart()`: Clear all cart items

### Cart Slice Selectors

The components use the following selectors:
- `selectCartItems(state)`: Get all cart items
- `selectCartItemCount(state)`: Get total item count
- `selectCartSubtotal(state)`: Get cart subtotal
- `selectCartIsOpen(state)`: Get cart open state

## Validation

### Formik and Yup Integration

Forms use Formik for form state management and Yup for validation schemas.

Import validation schemas from:
```javascript
import { 
  shippingAddressSchema, 
  paymentSchema 
} from '../utils/validationSchemas';
```

### Error Handling

- Real-time validation on field blur
- Error messages displayed below each field
- Submit button disabled when form is invalid
- Visual error indicators (red borders)

## Features

### Cart Features
- ✅ Add/remove items
- ✅ Update quantities with +/- buttons
- ✅ Stock availability warnings
- ✅ Real-time price calculations
- ✅ Promo code support
- ✅ Free shipping threshold
- ✅ Tax calculation (8%)
- ✅ Responsive design

### Checkout Features
- ✅ Multi-step checkout process
- ✅ Visual progress indicator
- ✅ Form validation with error messages
- ✅ Multiple payment methods
- ✅ Card number formatting
- ✅ Expiry date formatting
- ✅ Save address option
- ✅ Back navigation between steps
- ✅ Responsive forms

## Accessibility

- Semantic HTML elements
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Screen reader friendly error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 19.x
- Redux Toolkit 2.x
- React Redux 9.x
- Formik 2.x
- Yup 1.x
- React Icons 5.x
- React Router DOM 7.x

## License

MIT
