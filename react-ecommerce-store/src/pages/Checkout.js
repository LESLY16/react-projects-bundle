import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaTruck, FaCreditCard, FaCheckCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { selectCartItems, selectCartSubtotal, clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/orderSlice';
import { selectCurrentUser } from '../store/slices/userSlice';
import './Checkout.css';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Shipping', icon: <FaTruck /> },
    { number: 2, title: 'Payment', icon: <FaCreditCard /> },
    { number: 3, title: 'Review', icon: <FaCheckCircle /> }
  ];

  return (
    <div className="checkout-steps">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-info">
              <span className="step-number">Step {step.number}</span>
              <span className="step-title">{step.title}</span>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`step-connector ${currentStep > step.number ? 'active' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const ShippingForm = ({ formData, onChange }) => {
  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 5.99 },
    { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 12.99 },
    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 24.99 }
  ];

  return (
    <div className="shipping-form">
      <h3>Shipping Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="John"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="Doe"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="john.doe@example.com"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="1234567890"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="123 Main St"
          required
        />
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="New York"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            placeholder="NY"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">ZIP Code *</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            placeholder="10001"
            required
          />
        </div>
      </div>

      <h3 className="shipping-method-title">Shipping Method</h3>
      <div className="shipping-methods">
        {shippingMethods.map(method => (
          <label key={method.id} className={`shipping-method ${formData.shippingMethod === method.id ? 'selected' : ''}`}>
            <input
              type="radio"
              name="shippingMethod"
              value={method.id}
              checked={formData.shippingMethod === method.id}
              onChange={onChange}
            />
            <div className="method-info">
              <div className="method-header">
                <span className="method-name">{method.name}</span>
                <span className="method-price">${method.price.toFixed(2)}</span>
              </div>
              <span className="method-time">{method.time}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

const PaymentForm = ({ formData, onChange }) => {
  return (
    <div className="payment-form">
      <h3>Payment Information</h3>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number *</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={onChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardName">Cardholder Name *</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={onChange}
          placeholder="John Doe"
          required
        />
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date *</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={onChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV *</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={onChange}
            placeholder="123"
            maxLength="4"
            required
          />
        </div>
      </div>
      <div className="payment-note">
        <FaCreditCard />
        <p>Your payment information is secure and encrypted.</p>
      </div>
    </div>
  );
};

const OrderReview = ({ formData, cartItems, subtotal, shippingCost, tax, total }) => {
  return (
    <div className="order-review">
      <div className="review-section">
        <h3>Order Items</h3>
        <div className="review-items">
          {cartItems.map(item => (
            <div key={item.id} className="review-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="review-section">
        <h3>Shipping Address</h3>
        <div className="review-info">
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          <p>{formData.phone}</p>
          <p>{formData.email}</p>
        </div>
      </div>

      <div className="review-section">
        <h3>Payment Method</h3>
        <div className="review-info">
          <p>Card ending in {formData.cardNumber.slice(-4)}</p>
          <p>{formData.cardName}</p>
        </div>
      </div>

      <div className="review-section">
        <h3>Order Summary</h3>
        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const currentUser = useSelector(selectCurrentUser);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    shippingMethod: 'standard',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99
  };

  const shippingCost = shippingCosts[formData.shippingMethod];
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (currentStep === 1) {
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        toast.error('Please fill in all shipping information');
        return false;
      }
    } else if (currentStep === 2) {
      const requiredFields = ['cardNumber', 'cardName', 'expiryDate', 'cvv'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        toast.error('Please fill in all payment information');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = () => {
    const orderData = {
      userId: currentUser.id,
      items: cartItems,
      shipping: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        method: formData.shippingMethod
      },
      payment: {
        cardNumber: formData.cardNumber.slice(-4),
        cardName: formData.cardName
      },
      subtotal,
      shippingCost,
      tax,
      total
    };

    dispatch(createOrder(orderData));
    dispatch(clearCart());
    toast.success('Order placed successfully!');
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to checkout</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        <CheckoutSteps currentStep={currentStep} />

        <div className="checkout-content">
          <div className="checkout-form">
            {currentStep === 1 && <ShippingForm formData={formData} onChange={handleChange} />}
            {currentStep === 2 && <PaymentForm formData={formData} onChange={handleChange} />}
            {currentStep === 3 && (
              <OrderReview
                formData={formData}
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                total={total}
              />
            )}

            <div className="checkout-actions">
              {currentStep > 1 && (
                <button onClick={handleBack} className="btn-secondary">
                  <FaArrowLeft /> Back
                </button>
              )}
              {currentStep < 3 ? (
                <button onClick={handleNext} className="btn-primary">
                  Continue <FaArrowRight />
                </button>
              ) : (
                <button onClick={handlePlaceOrder} className="btn-primary">
                  Place Order
                </button>
              )}
            </div>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="summary-item-info">
                      <p>{item.name}</p>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
