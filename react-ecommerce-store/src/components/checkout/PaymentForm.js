import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { paymentSchema } from '../../utils/validationSchemas';
import * as Yup from 'yup';
import { FiCreditCard, FiDollarSign } from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';
import './PaymentForm.css';

const PaymentForm = ({ initialValues, onSubmit, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState(initialValues?.paymentMethod || 'card');

  const defaultValues = {
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    ...initialValues
  };

  const getValidationSchema = () => {
    if (paymentMethod === 'card') {
      return paymentSchema;
    }
    return Yup.object().shape({
      paymentMethod: Yup.string().required('Payment method is required')
    });
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 16);
    const formatted = limited.match(/.{1,4}/g)?.join(' ') || limited;
    return formatted;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="payment-form-container">
      <h2 className="form-title">Payment Method</h2>
      <p className="form-subtitle">Select and enter your payment details</p>

      <Formik
        initialValues={defaultValues}
        validationSchema={getValidationSchema()}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched, isSubmitting, isValid, setFieldValue, values }) => (
          <Form className="payment-form">
            <div className="payment-methods">
              <label
                className={`payment-method-option ${
                  paymentMethod === 'card' ? 'active' : ''
                }`}
              >
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  onChange={(e) => {
                    setFieldValue('paymentMethod', e.target.value);
                    setPaymentMethod(e.target.value);
                  }}
                  className="radio-input"
                />
                <div className="method-content">
                  <FiCreditCard className="method-icon" />
                  <span className="method-name">Credit/Debit Card</span>
                </div>
              </label>

              <label
                className={`payment-method-option ${
                  paymentMethod === 'paypal' ? 'active' : ''
                }`}
              >
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  onChange={(e) => {
                    setFieldValue('paymentMethod', e.target.value);
                    setPaymentMethod(e.target.value);
                  }}
                  className="radio-input"
                />
                <div className="method-content">
                  <FaPaypal className="method-icon" />
                  <span className="method-name">PayPal</span>
                </div>
              </label>

              <label
                className={`payment-method-option ${
                  paymentMethod === 'cod' ? 'active' : ''
                }`}
              >
                <Field
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  onChange={(e) => {
                    setFieldValue('paymentMethod', e.target.value);
                    setPaymentMethod(e.target.value);
                  }}
                  className="radio-input"
                />
                <div className="method-content">
                  <FiDollarSign className="method-icon" />
                  <span className="method-name">Cash on Delivery</span>
                </div>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number <span className="required">*</span>
                  </label>
                  <Field name="cardNumber">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="cardNumber"
                        className={`form-input ${
                          errors.cardNumber && touched.cardNumber ? 'error' : ''
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          setFieldValue('cardNumber', formatted);
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="cardNumber"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardName" className="form-label">
                    Cardholder Name <span className="required">*</span>
                  </label>
                  <Field
                    type="text"
                    id="cardName"
                    name="cardName"
                    className={`form-input ${
                      errors.cardName && touched.cardName ? 'error' : ''
                    }`}
                    placeholder="John Doe"
                  />
                  <ErrorMessage
                    name="cardName"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate" className="form-label">
                      Expiry Date <span className="required">*</span>
                    </label>
                    <Field name="expiryDate">
                      {({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="expiryDate"
                          className={`form-input ${
                            errors.expiryDate && touched.expiryDate ? 'error' : ''
                          }`}
                          placeholder="MM/YY"
                          maxLength="5"
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            setFieldValue('expiryDate', formatted);
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="expiryDate"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvv" className="form-label">
                      CVV <span className="required">*</span>
                    </label>
                    <Field
                      type="text"
                      id="cvv"
                      name="cvv"
                      className={`form-input ${
                        errors.cvv && touched.cvv ? 'error' : ''
                      }`}
                      placeholder="123"
                      maxLength="4"
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="card-security">
                  <p>🔒 Your card details are encrypted and secure</p>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="payment-info">
                <p>You will be redirected to PayPal to complete your payment securely.</p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="payment-info">
                <p>Pay with cash when your order is delivered. Please have exact change ready.</p>
              </div>
            )}

            <div className="form-actions">
              {onBack && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onBack}
                >
                  Back to Shipping
                </button>
              )}
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting || (paymentMethod === 'card' && !isValid)}
              >
                {isSubmitting ? 'Processing...' : 'Review Order'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
