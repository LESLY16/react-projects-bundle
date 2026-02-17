import React from 'react';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  rows = 4,
  ...rest
}) => {
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isTextarea = type === 'textarea';

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      {isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`input-field input-textarea ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
          {...rest}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`input-field ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
          {...rest}
        />
      )}
      
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
