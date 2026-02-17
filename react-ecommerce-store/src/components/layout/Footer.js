import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <h3 className="footer-title">
                <span className="footer-logo-icon">🛍️</span>
                ShopHub
              </h3>
              <p className="footer-description">
                Your one-stop destination for quality products at great prices. 
                Shop with confidence and enjoy a seamless shopping experience.
              </p>
              <div className="social-links">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-link"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="social-link"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-link"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-link"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="social-link"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-section-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h4 className="footer-section-title">Customer Service</h4>
              <ul className="footer-links">
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/shipping">Shipping Info</Link></li>
                <li><Link to="/returns">Returns & Exchanges</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h4 className="footer-section-title">Newsletter</h4>
              <p className="newsletter-text">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </form>
              <div className="payment-methods">
                <p className="payment-text">We Accept:</p>
                <div className="payment-icons">
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">🏦</span>
                  <span className="payment-icon">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} ShopHub. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy</Link>
              <span className="separator">|</span>
              <Link to="/terms">Terms</Link>
              <span className="separator">|</span>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
