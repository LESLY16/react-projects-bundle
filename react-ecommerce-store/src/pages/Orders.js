import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBox, FaClock, FaCheckCircle, FaTruck, FaTimes, FaEye } from 'react-icons/fa';
import { selectCurrentUser } from '../store/slices/userSlice';
import './Orders.css';

const Orders = () => {
  const currentUser = useSelector(selectCurrentUser);
  const orders = useSelector(state => 
    state.orders.orders.filter(order => order.userId === currentUser?.id)
  );
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'processing':
        return <FaBox className="status-icon processing" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <FaTimes className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge ${status}`;
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const OrderDetails = ({ order, onClose }) => (
    <div className="order-details-modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <div className="order-detail-section">
            <h3>Order Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Order Number:</span>
                <span className="detail-value">{order.orderNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={getStatusClass(order.status)}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {order.shipping && (
            <div className="order-detail-section">
              <h3>Shipping Information</h3>
              <div className="shipping-info">
                <p><strong>{order.shipping.firstName} {order.shipping.lastName}</strong></p>
                <p>{order.shipping.address}</p>
                <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                <p>Phone: {order.shipping.phone}</p>
                <p>Email: {order.shipping.email}</p>
              </div>
            </div>
          )}

          <div className="order-detail-section">
            <h3>Order Items</h3>
            <div className="order-items-list">
              {order.items.map(item => (
                <div key={item.id} className="order-item-detail">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-detail-section">
            <h3>Order Summary</h3>
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.shippingCost && (
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
              )}
              {order.tax && (
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="empty-icon">📦</div>
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
        <Link to="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <div className="order-filters">
            <button 
              className={filterStatus === 'all' ? 'active' : ''} 
              onClick={() => setFilterStatus('all')}
            >
              All Orders
            </button>
            <button 
              className={filterStatus === 'pending' ? 'active' : ''} 
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </button>
            <button 
              className={filterStatus === 'processing' ? 'active' : ''} 
              onClick={() => setFilterStatus('processing')}
            >
              Processing
            </button>
            <button 
              className={filterStatus === 'shipped' ? 'active' : ''} 
              onClick={() => setFilterStatus('shipped')}
            >
              Shipped
            </button>
            <button 
              className={filterStatus === 'delivered' ? 'active' : ''} 
              onClick={() => setFilterStatus('delivered')}
            >
              Delivered
            </button>
          </div>
        </div>

        <div className="orders-list">
          {sortedOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-info">
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="order-date">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="order-status">
                  <span className={getStatusClass(order.status)}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={`${order.id}-${item.id}`} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary-section">
                  <div className="order-total">
                    <span>Total Amount:</span>
                    <span className="total-amount">${order.total.toFixed(2)}</span>
                  </div>
                  <button 
                    className="btn-view-details"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <FaEye /> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <OrderDetails 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
