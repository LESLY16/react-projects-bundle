import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaHeart, FaShoppingCart, FaTrash, FaStar } from 'react-icons/fa';
import { selectWishlistItems, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import './Wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Item removed from wishlist');
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product.id));
    toast.success('Item moved to cart!');
  };

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="empty-icon">
          <FaHeart />
        </div>
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite items to your wishlist and shop them later!</p>
        <Link to="/products" className="btn-primary">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>
            <FaHeart className="heart-icon" />
            My Wishlist
          </h1>
          <p className="wishlist-count">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-card">
              <div className="wishlist-card-image">
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>
                {item.discount && (
                  <span className="discount-badge">-{item.discount}%</span>
                )}
                {item.stock === 0 && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
              </div>

              <div className="wishlist-card-content">
                <div className="product-category">{item.category}</div>
                <Link to={`/products/${item.id}`} className="product-title">
                  <h3>{item.name}</h3>
                </Link>
                
                {item.rating && (
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={index < Math.floor(item.rating) ? 'star filled' : 'star'}
                        />
                      ))}
                    </div>
                    <span className="rating-count">({item.reviews || 0})</span>
                  </div>
                )}

                <div className="product-price">
                  {item.discount ? (
                    <>
                      <span className="current-price">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                      <span className="original-price">${item.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="current-price">${item.price.toFixed(2)}</span>
                  )}
                </div>

                {item.stock > 0 && item.stock <= 10 && (
                  <div className="low-stock-warning">
                    Only {item.stock} left in stock!
                  </div>
                )}

                <div className="wishlist-card-actions">
                  <button
                    className="btn-move-to-cart"
                    onClick={() => handleMoveToCart(item)}
                    disabled={item.stock === 0}
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-footer">
          <p>Continue shopping to add more items to your wishlist</p>
          <Link to="/products" className="btn-continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
