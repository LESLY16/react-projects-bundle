import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import './Register.css';

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-image-section">
          <div className="register-overlay">
            <h1>Join Our Community!</h1>
            <p>Create an account and unlock exclusive benefits</p>
            <div className="register-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">✨</span>
                <div className="benefit-text">
                  <h3>Exclusive Deals</h3>
                  <p>Access member-only discounts</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🚚</span>
                <div className="benefit-text">
                  <h3>Fast Shipping</h3>
                  <p>Get your orders delivered quickly</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎁</span>
                <div className="benefit-text">
                  <h3>Rewards Program</h3>
                  <p>Earn points with every purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="register-form-section">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
