import React from 'react';
import './Card.css';

const Card = ({
  children,
  header,
  footer,
  className = '',
  hoverable = false,
  onClick,
  ...rest
}) => {
  const cardClasses = `card ${hoverable ? 'card-hoverable' : ''} ${onClick ? 'card-clickable' : ''} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick} {...rest}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
