import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTh, FaList } from 'react-icons/fa';
import { setViewMode } from '../../store/slices/productSlice';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, loading, onQuickView }) => {
  const dispatch = useDispatch();
  const viewMode = useSelector(state => state.products.viewMode);

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  if (loading) {
    return <LoadingSkeleton viewMode={viewMode} />;
  }

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="product-list-container">
      {/* View Toggle */}
      <div className="product-list-header">
        <div className="results-count">
          {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </div>
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
            title="Grid View"
          >
            <FaTh />
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('list')}
            title="List View"
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Product Grid/List */}
      <div className={`product-list product-${viewMode}`}>
        {products.map(product => (
          viewMode === 'grid' ? (
            <ProductCard 
              key={product.id} 
              product={product}
              onQuickView={onQuickView}
            />
          ) : (
            <ProductListItem 
              key={product.id} 
              product={product}
              onQuickView={onQuickView}
            />
          )
        ))}
      </div>
    </div>
  );
};

// List View Item Component
const ProductListItem = ({ product, onQuickView }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const { FaHeart, FaRegHeart, FaShoppingCart, FaEye } = require('react-icons/fa');
  const { addToCart } = require('../../store/slices/cartSlice');
  const { toggleWishlist } = require('../../store/slices/wishlistSlice');
  const Rating = require('../common/Rating').default;
  const Badge = require('../common/Badge').default;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const isOutOfStock = product.stock === 0;
  const isOnSale = product.salePrice && product.salePrice < product.price;
  const discountPercent = isOnSale 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className={`product-list-item ${isOutOfStock ? 'out-of-stock' : ''}`}>
      {/* Image */}
      <div className="product-list-item-image">
        <img 
          src={product.image || product.images?.[0]} 
          alt={product.name}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="product-list-item-badges">
          {isOutOfStock && (
            <Badge variant="danger">Out of Stock</Badge>
          )}
          {!isOutOfStock && isOnSale && (
            <Badge variant="success">{discountPercent}% OFF</Badge>
          )}
          {!isOutOfStock && product.featured && !isOnSale && (
            <Badge variant="primary">Featured</Badge>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="product-list-item-details">
        <div className="product-list-item-header">
          <h3 className="product-list-item-name">{product.name}</h3>
          <Rating 
            rating={product.rating} 
            reviewCount={product.reviewCount}
            size="small"
          />
        </div>

        <p className="product-list-item-description">
          {product.description}
        </p>

        <div className="product-list-item-meta">
          <span className="product-category">{product.category}</span>
          {product.brand && (
            <>
              <span className="separator">•</span>
              <span className="product-brand">{product.brand}</span>
            </>
          )}
          <span className="separator">•</span>
          <span className={`product-stock ${isOutOfStock ? 'out' : 'in'}`}>
            {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="product-list-item-actions">
        <div className="product-list-item-price">
          {isOnSale ? (
            <>
              <span className="price-sale">${product.salePrice.toFixed(2)}</span>
              <span className="price-original">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price-current">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="product-list-item-buttons">
          <button
            className="quick-view-btn"
            onClick={() => onQuickView && onQuickView(product)}
            title="Quick View"
          >
            <FaEye />
          </button>
          <button
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const LoadingSkeleton = ({ viewMode }) => {
  const skeletonCount = viewMode === 'grid' ? 8 : 4;

  return (
    <div className={`product-list-skeleton product-${viewMode}`}>
      {[...Array(skeletonCount)].map((_, index) => (
        <div key={index} className={`skeleton-card ${viewMode}`}>
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-rating"></div>
            <div className="skeleton-line skeleton-price"></div>
            {viewMode === 'list' && (
              <>
                <div className="skeleton-line skeleton-description"></div>
                <div className="skeleton-line skeleton-description short"></div>
              </>
            )}
            <div className="skeleton-buttons"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="product-list-empty">
      <div className="empty-icon">📦</div>
      <h3>No Products Found</h3>
      <p>We couldn't find any products matching your criteria.</p>
      <p>Try adjusting your filters or search terms.</p>
    </div>
  );
};

export default ProductList;
