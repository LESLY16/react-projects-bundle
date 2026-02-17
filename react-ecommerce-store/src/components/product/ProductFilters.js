import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaTimes,
  FaStar
} from 'react-icons/fa';
import { setFilters, clearFilters } from '../../store/slices/productSlice';
import { PRICE_RANGES } from '../../constants';
import './ProductFilters.css';

const ProductFilters = ({ isMobile }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters);
  const categories = useSelector(state => state.products.categories);
  const allProducts = useSelector(state => state.products.allProducts);

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true
  });

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Extract unique brands from products
  const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))].sort();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryName) => {
    const newCategories = localFilters.category.includes(categoryName)
      ? localFilters.category.filter(c => c !== categoryName)
      : [...localFilters.category, categoryName];

    const newFilters = { ...localFilters, category: newCategories };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handlePriceRangeChange = (range) => {
    const newFilters = {
      ...localFilters,
      priceRange: localFilters.priceRange?.id === range.id ? null : range
    };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handleBrandChange = (brand) => {
    const newBrands = localFilters.brand.includes(brand)
      ? localFilters.brand.filter(b => b !== brand)
      : [...localFilters.brand, brand];

    const newFilters = { ...localFilters, brand: newBrands };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handleRatingChange = (rating) => {
    const newFilters = {
      ...localFilters,
      minRating: localFilters.minRating === rating ? null : rating
    };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = 
    filters.category.length > 0 ||
    filters.priceRange !== null ||
    filters.brand.length > 0 ||
    filters.minRating !== null;

  const getActiveFilterCount = () => {
    let count = 0;
    count += filters.category.length;
    count += filters.priceRange ? 1 : 0;
    count += filters.brand.length;
    count += filters.minRating ? 1 : 0;
    return count;
  };

  return (
    <div className={`product-filters ${isMobile ? 'mobile' : ''}`}>
      {/* Header */}
      <div className="filters-header">
        <h3 className="filters-title">Filters</h3>
        {hasActiveFilters && (
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            <FaTimes />
            <span>Clear ({getActiveFilterCount()})</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('category')}
        >
          <span className="filter-section-title">Category</span>
          {expandedSections.category ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {expandedSections.category && (
          <div className="filter-section-content">
            {categories.map(category => (
              <label key={category.id} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={localFilters.category.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <span className="checkbox-label">
                  {category.name}
                  <span className="filter-count">
                    ({allProducts.filter(p => p.category === category.name).length})
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('price')}
        >
          <span className="filter-section-title">Price Range</span>
          {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {expandedSections.price && (
          <div className="filter-section-content">
            {PRICE_RANGES.map(range => {
              const count = allProducts.filter(p => 
                p.price >= range.min && p.price < range.max
              ).length;

              return (
                <label key={range.id} className="filter-radio">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={localFilters.priceRange?.id === range.id}
                    onChange={() => handlePriceRangeChange(range)}
                  />
                  <span className="radio-label">
                    {range.label}
                    <span className="filter-count">({count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="filter-section">
          <button
            className="filter-section-header"
            onClick={() => toggleSection('brand')}
          >
            <span className="filter-section-title">Brand</span>
            {expandedSections.brand ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {expandedSections.brand && (
            <div className="filter-section-content">
              {brands.map(brand => {
                const count = allProducts.filter(p => p.brand === brand).length;

                return (
                  <label key={brand} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={localFilters.brand.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span className="checkbox-label">
                      {brand}
                      <span className="filter-count">({count})</span>
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Rating Filter */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('rating')}
        >
          <span className="filter-section-title">Minimum Rating</span>
          {expandedSections.rating ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {expandedSections.rating && (
          <div className="filter-section-content">
            {[4, 3, 2, 1].map(rating => {
              const count = allProducts.filter(p => p.rating >= rating).length;

              return (
                <label key={rating} className="filter-rating">
                  <input
                    type="radio"
                    name="rating"
                    checked={localFilters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                  />
                  <span className="rating-label">
                    <div className="rating-stars">
                      {[...Array(rating)].map((_, i) => (
                        <FaStar key={i} className="star-filled" />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <FaStar key={i} className="star-empty" />
                      ))}
                    </div>
                    <span className="rating-text">& Up</span>
                    <span className="filter-count">({count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
