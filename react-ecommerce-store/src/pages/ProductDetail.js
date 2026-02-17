import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiChevronRight, FiHeart, FiShare2, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ProductGallery from '../components/product/ProductGallery';
import ProductCard from '../components/product/ProductCard';
import Rating from '../components/common/Rating';
import { setSelectedProduct, addToRecentlyViewed } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { formatCurrency } from '../utils/helpers';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allProducts, reviews: allReviews } = useSelector(state => state.products);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const product = allProducts.find(p => p.id === parseInt(id));
  const productReviews = allReviews.filter(r => r.productId === parseInt(id));
  const relatedProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  useEffect(() => {
    if (product) {
      dispatch(setSelectedProduct(product));
      dispatch(addToRecentlyViewed(product));
    }
  }, [product, dispatch]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const getRatingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(review => {
      breakdown[review.rating]++;
    });
    return breakdown;
  };

  const ratingBreakdown = getRatingBreakdown();

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <FiChevronRight />
          <Link to="/products">Products</Link>
          <FiChevronRight />
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <FiChevronRight />
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Main Section */}
      <div className="container">
        <div className="product-main">
          {/* Gallery */}
          <div className="product-gallery-section">
            <ProductGallery images={product.images || [product.image]} />
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            
            <div className="product-meta">
              <div className="rating-section">
                <Rating value={product.rating} />
                <span className="rating-text">{product.rating}</span>
                <span className="review-count">({product.reviewCount} reviews)</span>
              </div>
              {product.brand && <span className="product-brand">Brand: {product.brand}</span>}
            </div>

            <div className="product-price">
              {formatCurrency(product.price)}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button
                className={`btn-wishlist ${isInWishlist ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                <FiHeart />
              </button>
              <button className="btn-share" onClick={handleShare}>
                <FiShare2 />
              </button>
            </div>

            {/* Product Specs */}
            {product.tags && product.tags.length > 0 && (
              <div className="product-tags">
                <strong>Tags:</strong>
                {product.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${selectedTab === 'description' ? 'active' : ''}`}
              onClick={() => setSelectedTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${selectedTab === 'specs' ? 'active' : ''}`}
              onClick={() => setSelectedTab('specs')}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${selectedTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setSelectedTab('reviews')}
            >
              Reviews ({productReviews.length})
            </button>
          </div>

          <div className="tabs-content">
            {selectedTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <ul>
                  <li>High quality materials</li>
                  <li>Expert craftsmanship</li>
                  <li>Satisfaction guaranteed</li>
                </ul>
              </div>
            )}

            {selectedTab === 'specs' && (
              <div className="tab-panel">
                <h3>Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td>Brand</td>
                      <td>{product.brand}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>{product.category}</td>
                    </tr>
                    {product.subcategory && (
                      <tr>
                        <td>Subcategory</td>
                        <td>{product.subcategory}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Stock</td>
                      <td>{product.stock} units</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="rating-score">
                      <span className="score">{product.rating}</span>
                      <Rating value={product.rating} />
                      <p>{product.reviewCount} reviews</p>
                    </div>
                    <div className="rating-breakdown">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = ratingBreakdown[star];
                        const percentage = productReviews.length > 0 
                          ? (count / productReviews.length) * 100 
                          : 0;
                        return (
                          <div key={star} className="rating-bar">
                            <span>{star} ★</span>
                            <div className="bar">
                              <div 
                                className="bar-fill" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="reviews-list">
                  {productReviews.length > 0 ? (
                    productReviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <strong>{review.userName}</strong>
                            <Rating value={review.rating} size="small" />
                          </div>
                          <span className="review-date">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
