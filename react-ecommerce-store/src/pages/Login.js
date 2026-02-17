import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-image-section">
          <div className="login-overlay">
            <h1>Welcome Back!</h1>
            <p>Sign in to access your account and continue your shopping journey</p>
            <div className="login-features">
              <div className="feature-item">
                <span className="feature-icon">🛍️</span>
                <span>Easy Shopping</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <span>Track Orders</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">❤️</span>
                <span>Save Favorites</span>
              </div>
            </div>
          </div>
        </div>
        <div className="login-form-section">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
