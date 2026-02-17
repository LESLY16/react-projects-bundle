import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { selectCartItemCount } from '../../store/slices/cartSlice';
import { selectWishlistItems } from '../../store/slices/wishlistSlice';
import { selectCurrentUser, selectIsAuthenticated, logout } from '../../store/slices/userSlice';
import { toggleCart } from '../../store/slices/cartSlice';
import MiniCart from './MiniCart';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartItemCount = useSelector(selectCartItemCount);
  const wishlistItems = useSelector(selectWishlistItems);
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-content">
              {/* Logo */}
              <Link to="/" className="logo" onClick={closeMobileMenu}>
                <span className="logo-icon">🛍️</span>
                <span className="logo-text">ShopHub</span>
              </Link>

              {/* Search Bar */}
              <form className="search-bar" onSubmit={handleSearch}>
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </form>

              {/* Icons */}
              <div className="header-icons">
                {/* Wishlist */}
                <Link to="/wishlist" className="header-icon" title="Wishlist">
                  <FiHeart />
                  {wishlistItems.length > 0 && (
                    <span className="icon-badge">{wishlistItems.length}</span>
                  )}
                </Link>

                {/* Cart */}
                <button 
                  className="header-icon cart-icon" 
                  onClick={() => dispatch(toggleCart())}
                  title="Shopping Cart"
                >
                  <FiShoppingCart />
                  {cartItemCount > 0 && (
                    <span className="icon-badge">{cartItemCount}</span>
                  )}
                </button>

                {/* User */}
                <div className="user-menu-wrapper">
                  <button
                    className="header-icon"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    title={isAuthenticated ? `${currentUser?.firstName} ${currentUser?.lastName}` : 'Login'}
                  >
                    <FiUser />
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-dropdown">
                      {isAuthenticated ? (
                        <>
                          <div className="user-info">
                            <p className="user-name">{currentUser?.firstName} {currentUser?.lastName}</p>
                            <p className="user-email">{currentUser?.email}</p>
                          </div>
                          <Link 
                            to="/profile" 
                            className="dropdown-item"
                            onClick={() => setShowUserMenu(false)}
                          >
                            My Profile
                          </Link>
                          <Link 
                            to="/orders" 
                            className="dropdown-item"
                            onClick={() => setShowUserMenu(false)}
                          >
                            My Orders
                          </Link>
                          {currentUser?.role === 'admin' && (
                            <Link 
                              to="/admin" 
                              className="dropdown-item"
                              onClick={() => setShowUserMenu(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button 
                            className="dropdown-item logout-btn"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link 
                            to="/login" 
                            className="dropdown-item"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Login
                          </Link>
                          <Link 
                            to="/register" 
                            className="dropdown-item"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                  className="mobile-menu-toggle"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="container">
            <ul className="nav-links">
              <li>
                <Link to="/" onClick={closeMobileMenu}>Home</Link>
              </li>
              <li>
                <Link to="/products" onClick={closeMobileMenu}>Products</Link>
              </li>
              <li>
                <Link to="/categories" onClick={closeMobileMenu}>Categories</Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
              </li>
            </ul>

            {/* Mobile Search */}
            <form className="mobile-search" onSubmit={handleSearch}>
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>

      {/* MiniCart */}
      <MiniCart />

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Header;
