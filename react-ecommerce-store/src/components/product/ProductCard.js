import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { setSelectedProduct } from '../../store/slices/productSlice';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import './ProductCard.css';

const ProductCard = ({ product, onQuickView }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    dispatch(setSelectedProduct(product));
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const truncateName = (name, maxLength = 50) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  const isOutOfStock = product.stock === 0;
  const isOnSale = product.salePrice && product.salePrice < product.price;
  const discountPercent = isOnSale 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      {/* Badges */}
      <div className="product-card-badges">
        {isOutOfStock && (
          <Badge variant="danger" className="badge-out-of-stock">
            Out of Stock
          </Badge>
        )}
        {!isOutOfStock && isOnSale && (
          <Badge variant="success" className="badge-sale">
            {discountPercent}% OFF
          </Badge>
        )}
        {!isOutOfStock && product.featured && !isOnSale && (
          <Badge variant="primary" className="badge-featured">
            Featured
          </Badge>
        )}
      </div>

      {/* Image */}
      <div className="product-card-image">
        <img 
          src={product.image || product.images?.[0]} 
          alt={product.name}
          loading="lazy"
        />
        
        {/* Hover Actions */}
        <div className="product-card-actions">
          <button 
            className="action-button quick-view-btn"
            onClick={handleQuickView}
            title="Quick View"
          >
            <FaEye />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="product-card-details">
        {/* Rating */}
        <Rating 
          rating={product.rating} 
          reviewCount={product.reviewCount}
          size="small"
          showNumber={false}
        />

        {/* Name */}
        <h3 className="product-card-name" title={product.name}>
          {truncateName(product.name)}
        </h3>

        {/* Price */}
        <div className="product-card-price">
          {isOnSale ? (
            <>
              <span className="price-sale">${product.salePrice.toFixed(2)}</span>
              <span className="price-original">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price-current">${product.price.toFixed(2)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="product-card-footer">
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
            <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
