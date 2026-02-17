import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ProductCard,
  ProductList,
  ProductGallery,
  ProductFilters
} from '../components/product';
import Modal from '../components/common/Modal';
import './ProductShowcase.css';

/**
 * Example page demonstrating all product components
 * This shows how to use ProductCard, ProductList, ProductGallery, and ProductFilters
 */
const ProductShowcase = () => {
  const products = useSelector(state => state.products.products);
  const allProducts = useSelector(state => state.products.allProducts);
  const loading = useSelector(state => state.products.loading);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get a sample product for gallery demo
  const sampleProduct = allProducts[0] || {};

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div className="product-showcase">
      {/* Section 1: Individual Product Card Demo */}
      <section className="showcase-section">
        <h2>ProductCard Component</h2>
        <p>Individual product card with all features</p>
        <div className="card-demo">
          {allProducts.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      </section>

      {/* Section 2: Product Gallery Demo */}
      <section className="showcase-section">
        <h2>ProductGallery Component</h2>
        <p>Image gallery with thumbnails and zoom functionality</p>
        <div className="gallery-demo">
          <ProductGallery 
            images={sampleProduct.images || []}
            productName={sampleProduct.name}
          />
        </div>
      </section>

      {/* Section 3: Product List with Filters */}
      <section className="showcase-section full-width">
        <h2>ProductList with ProductFilters</h2>
        <p>Complete product listing with filtering and view modes</p>
        
        <div className="products-layout">
          {/* Desktop Filters Sidebar */}
          <aside className="filters-sidebar desktop-only">
            <ProductFilters />
          </aside>

          {/* Mobile Filters Button */}
          <div className="mobile-filters-trigger">
            <button 
              className="btn-filters"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </button>
          </div>

          {/* Product List */}
          <main className="products-main">
            <ProductList 
              products={products}
              loading={loading}
              onQuickView={handleQuickView}
            />
          </main>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <Modal
          isOpen={true}
          onClose={handleCloseQuickView}
          title={quickViewProduct.name}
          size="large"
        >
          <div className="quick-view-content">
            <div className="quick-view-gallery">
              <ProductGallery 
                images={quickViewProduct.images || [quickViewProduct.image]}
                productName={quickViewProduct.name}
              />
            </div>
            <div className="quick-view-details">
              <h3>{quickViewProduct.name}</h3>
              <p className="quick-view-price">
                ${quickViewProduct.price.toFixed(2)}
              </p>
              <p className="quick-view-description">
                {quickViewProduct.description}
              </p>
              <div className="quick-view-meta">
                <span><strong>Brand:</strong> {quickViewProduct.brand}</span>
                <span><strong>Category:</strong> {quickViewProduct.category}</span>
                <span><strong>Stock:</strong> {quickViewProduct.stock} available</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Mobile Filters Modal */}
      {showFilters && (
        <Modal
          isOpen={true}
          onClose={() => setShowFilters(false)}
          title="Filters"
          size="full"
        >
          <ProductFilters isMobile={true} />
        </Modal>
      )}
    </div>
  );
};

export default ProductShowcase;
