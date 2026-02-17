import React from 'react';
import './Rating.css';

const Rating = ({
  rating = 0,
  maxRating = 5,
  size = 'medium',
  showNumber = true,
  reviewCount,
  className = ''
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`rating-container ${className}`}>
      <div className={`rating-stars rating-${size}`}>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="star star-full">★</span>
        ))}
        
        {hasHalfStar && (
          <span className="star star-half">
            <span className="star-half-fill">★</span>
            <span className="star-half-empty">★</span>
          </span>
        )}
        
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="star star-empty">★</span>
        ))}
      </div>
      
      {showNumber && (
        <span className="rating-number">
          {rating.toFixed(1)}
        </span>
      )}
      
      {reviewCount !== undefined && (
        <span className="rating-count">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default Rating;
