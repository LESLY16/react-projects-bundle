import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';
import './ProductGallery.css';

const ProductGallery = ({ images = [], productName = 'Product' }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedImageIndex(0);
    setIsZoomed(false);
  }, [images]);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="product-gallery">
        <div className="gallery-main-image no-image">
          <div className="no-image-placeholder">
            <FaSearchPlus />
            <span>No image available</span>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];

  return (
    <div className="product-gallery" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Image */}
      <div className="gallery-main-container">
        <div 
          className={`gallery-main-image ${isZoomed ? 'zoomed' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src={currentImage} 
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            } : {}}
          />
          
          {!isZoomed && (
            <div className="zoom-hint">
              <FaSearchPlus />
              <span>Hover to zoom</span>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              className="gallery-nav gallery-nav-prev"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="gallery-nav gallery-nav-next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="image-counter">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`gallery-thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt={`${productName} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
