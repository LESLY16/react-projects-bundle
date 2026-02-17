import React from 'react';
import { FiCheck } from 'react-icons/fi';
import './CheckoutSteps.css';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Shipping', label: 'Shipping Address' },
    { number: 2, title: 'Payment', label: 'Payment Method' },
    { number: 3, title: 'Review', label: 'Review Order' }
  ];

  return (
    <div className="checkout-steps">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div
            className={`checkout-step ${
              currentStep === step.number ? 'active' : ''
            } ${currentStep > step.number ? 'completed' : ''}`}
          >
            <div className="step-indicator">
              {currentStep > step.number ? (
                <FiCheck className="step-check" />
              ) : (
                <span className="step-number">{step.number}</span>
              )}
            </div>
            <div className="step-content">
              <p className="step-title">{step.title}</p>
              <p className="step-label">{step.label}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`step-connector ${
                currentStep > step.number ? 'completed' : ''
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
