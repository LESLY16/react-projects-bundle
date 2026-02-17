import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps, ShippingForm, PaymentForm } from '../../components/checkout';
import { selectCartItems, selectCartSubtotal, clearCart } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingSubmit = (values) => {
    setShippingData(values);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (values) => {
    setPaymentData(values);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    try {
      // Simulate order placement
      const orderData = {
        items: cartItems,
        shipping: shippingData,
        payment: {
          method: paymentData.paymentMethod,
        },
        subtotal,
        tax: subtotal * 0.08,
        total: subtotal * 1.08,
      };

      console.log('Order placed:', orderData);
      
      dispatch(clearCart());
      navigate('/order-success');
    } catch (error) {
      console.error('Order error:', error);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        
        <CheckoutSteps currentStep={currentStep} />

        <div className="checkout-content">
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
            <div className="review-section">
              <h2>Review Your Order</h2>

              <div className="review-card">
                <h3>Shipping Address</h3>
                <p>{shippingData.firstName} {shippingData.lastName}</p>
                <p>{shippingData.street}</p>
                <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                <p>Phone: {shippingData.phone}</p>
                <button onClick={() => setCurrentStep(1)} className="edit-btn">
                  Edit
                </button>
              </div>

              <div className="review-card">
                <h3>Payment Method</h3>
                <p>
                  {paymentData.paymentMethod === 'card' && 'Credit/Debit Card'}
                  {paymentData.paymentMethod === 'paypal' && 'PayPal'}
                  {paymentData.paymentMethod === 'cod' && 'Cash on Delivery'}
                </p>
                {paymentData.paymentMethod === 'card' && (
                  <p>Card ending in {paymentData.cardNumber.slice(-4)}</p>
                )}
                <button onClick={() => setCurrentStep(2)} className="edit-btn">
                  Edit
                </button>
              </div>

              <div className="review-card">
                <h3>Order Summary</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="review-item">
                    <img src={item.image} alt={item.name} />
                    <div className="review-item-details">
                      <p className="review-item-name">{item.name}</p>
                      <p className="review-item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="review-item-price">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
                <div className="review-total">
                  <span>Total:</span>
                  <span className="total-amount">
                    {formatCurrency(subtotal * 1.08)}
                  </span>
                </div>
              </div>

              <div className="review-actions">
                <button onClick={() => setCurrentStep(2)} className="btn-secondary">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="btn-primary">
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
