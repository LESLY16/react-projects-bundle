import React from 'react';
import './Loading.css';

const Loading = ({
  size = 'medium',
  fullScreen = false,
  text = '',
  className = ''
}) => {
  const sizeClass = `spinner-${size}`;
  
  if (fullScreen) {
    return (
      <div className={`loading-fullscreen ${className}`}>
        <div className={`spinner ${sizeClass}`}></div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    );
  }

  return (
    <div className={`loading-container ${className}`}>
      <div className={`spinner ${sizeClass}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
