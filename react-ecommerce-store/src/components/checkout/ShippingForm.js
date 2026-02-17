import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { shippingAddressSchema } from '../../utils/validationSchemas';
import './ShippingForm.css';

const ShippingForm = ({ initialValues, onSubmit, onBack }) => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    saveAddress: false,
    ...initialValues
  };

  return (
    <div className="shipping-form-container">
      <h2 className="form-title">Shipping Address</h2>
      <p className="form-subtitle">Enter your shipping details</p>

      <Formik
        initialValues={defaultValues}
        validationSchema={shippingAddressSchema}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <Form className="shipping-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-input ${
                    errors.firstName && touched.firstName ? 'error' : ''
                  }`}
                  placeholder="John"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`form-input ${
                    errors.lastName && touched.lastName ? 'error' : ''
                  }`}
                  placeholder="Doe"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="street" className="form-label">
                Street Address <span className="required">*</span>
              </label>
              <Field
                type="text"
                id="street"
                name="street"
                className={`form-input ${
                  errors.street && touched.street ? 'error' : ''
                }`}
                placeholder="123 Main St, Apt 4B"
              />
              <ErrorMessage
                name="street"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City <span className="required">*</span>
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  className={`form-input ${
                    errors.city && touched.city ? 'error' : ''
                  }`}
                  placeholder="New York"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state" className="form-label">
                  State <span className="required">*</span>
                </label>
                <Field
                  type="text"
                  id="state"
                  name="state"
                  className={`form-input ${
                    errors.state && touched.state ? 'error' : ''
                  }`}
                  placeholder="NY"
                  maxLength="2"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode" className="form-label">
                  Zip Code <span className="required">*</span>
                </label>
                <Field
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className={`form-input ${
                    errors.zipCode && touched.zipCode ? 'error' : ''
                  }`}
                  placeholder="10001"
                  maxLength="5"
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${
                  errors.phone && touched.phone ? 'error' : ''
                }`}
                placeholder="1234567890"
                maxLength="10"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <Field type="checkbox" name="saveAddress" className="checkbox-input" />
                <span>Save this address for future orders</span>
              </label>
            </div>

            <div className="form-actions">
              {onBack && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onBack}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Processing...' : 'Continue to Payment'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ShippingForm;
