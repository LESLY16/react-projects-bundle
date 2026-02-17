import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validationSchemas';
import './RegisterForm.css';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!values.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      setSubmitting(false);
      return;
    }

    try {
      const result = await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password
      });
      
      if (result.success) {
        toast.success('Registration successful! Welcome aboard!');
        setTimeout(() => navigate('/'), 500);
      } else {
        toast.error(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-card">
        <div className="register-form-header">
          <h2>Create Account</h2>
          <p>Join us and start shopping today</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      className={errors.firstName && touched.firstName ? 'input-error' : ''}
                    />
                  </div>
                  <ErrorMessage name="firstName" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      className={errors.lastName && touched.lastName ? 'input-error' : ''}
                    />
                  </div>
                  <ErrorMessage name="lastName" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={errors.email && touched.email ? 'input-error' : ''}
                  />
                </div>
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-wrapper">
                  <FaPhone className="input-icon" />
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="1234567890"
                    className={errors.phone && touched.phone ? 'input-error' : ''}
                  />
                </div>
                <ErrorMessage name="phone" component="div" className="error-message" />
                <span className="field-hint">Enter 10 digit phone number without spaces</span>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    className={errors.password && touched.password ? 'input-error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>

              <div className="password-requirements">
                <p className="requirements-title">Password must contain:</p>
                <ul className="requirements-list">
                  <li className={values.password.length >= 8 ? 'valid' : ''}>
                    At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(values.password) ? 'valid' : ''}>
                    One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(values.password) ? 'valid' : ''}>
                    One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(values.password) ? 'valid' : ''}>
                    One number
                  </li>
                </ul>
              </div>

              <div className="terms-group">
                <label className="checkbox-label">
                  <Field type="checkbox" name="termsAccepted" />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="terms-link" target="_blank">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="terms-link" target="_blank">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="form-footer">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="login-link">
                    Sign in
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
