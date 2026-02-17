import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTruck, FiRefreshCw, FiHeadphones, FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import './Home.css';

const Home = () => {
  const { allProducts, categories } = useSelector(state => state.products);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredProducts = allProducts.filter(product => product.featured).slice(0, 8);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: <FiTruck />,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: <FiRefreshCw />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <FiHeadphones />,
      title: '24/7 Support',
      description: 'Dedicated support team'
    },
    {
      icon: <FiShoppingCart />,
      title: 'Secure Shopping',
      description: 'Safe payment methods'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Amazing Products
            </h1>
            <p className="hero-subtitle">
              Shop the latest trends in electronics, fashion, and more. Quality products at unbeatable prices.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/products?featured=true" className="btn btn-secondary">
                Featured Products
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800" 
              alt="Shopping" 
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.slice(0, 6).map(category => (
              <Link 
                to={`/products?category=${category.slug}`} 
                key={category.id}
                className="category-card"
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="view-all-link">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-subtitle">
              Subscribe to our newsletter for exclusive deals and latest updates
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="newsletter-success">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
