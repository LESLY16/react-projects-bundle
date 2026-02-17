import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { FiGrid, FiList, FiChevronRight } from 'react-icons/fi';
import ProductFilters from '../components/product/ProductFilters';
import ProductList from '../components/product/ProductList';
import { setSortBy, setViewMode, setFilters } from '../store/slices/productSlice';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, sortBy, viewMode, filters } = useSelector(state => state.products);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    if (category) {
      dispatch(setFilters({ category: [category] }));
    }
    if (featured) {
      // Filter featured products
    }
  }, [searchParams, dispatch]);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
    setCurrentPage(1);
  };

  const handleViewToggle = (mode) => {
    dispatch(setViewMode(mode));
  };

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="products-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <FiChevronRight />
          <span>Products</span>
          {filters.category.length > 0 && (
            <>
              <FiChevronRight />
              <span>{filters.category[0]}</span>
            </>
          )}
        </div>
      </div>

      <div className="products-container">
        {/* Sidebar Filters - Desktop */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h2>Filters</h2>
            <button 
              className="close-filters"
              onClick={() => setShowFilters(false)}
            >
              ×
            </button>
          </div>
          <ProductFilters />
        </aside>

        {/* Main Content */}
        <div className="products-main">
          {/* Toolbar */}
          <div className="products-toolbar">
            <div className="toolbar-left">
              <button 
                className="filter-toggle-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </button>
              <p className="products-count">
                Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
              </p>
            </div>

            <div className="toolbar-right">
              {/* Sort Dropdown */}
              <div className="sort-dropdown">
                <label htmlFor="sort">Sort by:</label>
                <select 
                  id="sort"
                  value={sortBy} 
                  onChange={handleSortChange}
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => handleViewToggle('grid')}
                  aria-label="Grid view"
                >
                  <FiGrid />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => handleViewToggle('list')}
                  aria-label="List view"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Products List */}
          {currentProducts.length > 0 ? (
            <>
              <ProductList products={currentProducts} viewMode={viewMode} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <div className="pagination-numbers">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h2>No Products Found</h2>
              <p>We couldn't find any products matching your filters.</p>
              <Link to="/products" className="btn-primary">
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div 
          className="filters-overlay"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Products;
