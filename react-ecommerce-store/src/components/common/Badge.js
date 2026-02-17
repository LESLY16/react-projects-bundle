import React from 'react';
import './Badge.css';

const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  className = ''
}) => {
  const badgeClasses = `badge badge-${variant} badge-${size} ${rounded ? 'badge-rounded' : ''} ${className}`;

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;
