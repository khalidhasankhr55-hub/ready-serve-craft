import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderCard.css';

// Types
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  kitchen: string;
  status: 'pending' | 'preparing' | 'ready';
}

export interface DeliveryDetails {
  customerName: string;
  phone: string;
  address?: string;
  tableNumber?: string;
  estimatedTime: string;
}

export interface OrderData {
  orderId: string;
  orderTime: string;
  orderType: 'delivery' | 'dinein' | 'collection';
  currentStep: number; // 0: New, 1: Preparing, 2: Ready, 3: Complete
  items: OrderItem[];
  deliveryDetails: DeliveryDetails;
  specialInstructions?: string;
}

interface OrderCardProps {
  order: OrderData;
  onComplete?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onComplete, onCancel }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const steps = ['New', 'Preparing', 'Ready', 'Complete'];

  const getOrderTypeLabel = (type: string) => {
    switch (type) {
      case 'delivery': return '🚗 Delivery';
      case 'dinein': return '🍽️ Dine In';
      case 'collection': return '📦 Collection';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      default: return status;
    }
  };

  return (
    <div className="order-card">
      {/* Header */}
      <div className="order-card-header">
        <div>
          <div className="order-id">#{order.orderId}</div>
          <div className="order-time">{order.orderTime}</div>
        </div>
        <span className={`order-type-badge ${order.orderType}`}>
          {getOrderTypeLabel(order.orderType)}
        </span>
      </div>

      {/* Body */}
      <div className="order-card-body">
        {/* Progress Tracker */}
        <div className="progress-tracker">
          {steps.map((step, index) => (
            <div key={step} className="progress-step">
              <div
                className={`step-circle ${
                  index < order.currentStep
                    ? 'completed'
                    : index === order.currentStep
                    ? 'active'
                    : ''
                }`}
              >
                {index < order.currentStep ? '✓' : index + 1}
              </div>
              <span
                className={`step-label ${
                  index === order.currentStep ? 'active' : ''
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Order Items */}
        <div className="section-title">Order Items</div>
        <ul className="order-items-list">
          {order.items.map((item) => (
            <li key={item.id} className="order-item">
              <div className="item-info">
                <span className="item-quantity">{item.quantity}x</span>
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-kitchen">{item.kitchen}</div>
                </div>
              </div>
              <span className={`item-status ${item.status}`}>
                {getStatusLabel(item.status)}
              </span>
            </li>
          ))}
        </ul>

        {/* Delivery/Pickup Details */}
        <div className="section-title">
          {order.orderType === 'dinein'
            ? 'Table Details'
            : order.orderType === 'collection'
            ? 'Pickup Details'
            : 'Delivery Details'}
        </div>
        <div className="delivery-details">
          <div className="detail-row">
            <span className="detail-icon">👤</span>
            <div>
              <span className="detail-label">Customer</span>
              <div className="detail-text">{order.deliveryDetails.customerName}</div>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-icon">📞</span>
            <div>
              <span className="detail-label">Phone</span>
              <div className="detail-text">{order.deliveryDetails.phone}</div>
            </div>
          </div>
          {order.orderType === 'delivery' && order.deliveryDetails.address && (
            <div className="detail-row">
              <span className="detail-icon">📍</span>
              <div>
                <span className="detail-label">Address</span>
                <div className="detail-text">{order.deliveryDetails.address}</div>
              </div>
            </div>
          )}
          {order.orderType === 'dinein' && order.deliveryDetails.tableNumber && (
            <div className="detail-row">
              <span className="detail-icon">🪑</span>
              <div>
                <span className="detail-label">Table Number</span>
                <div className="detail-text">{order.deliveryDetails.tableNumber}</div>
              </div>
            </div>
          )}
          <div className="detail-row">
            <span className="detail-icon">⏱️</span>
            <div>
              <span className="detail-label">
                {order.orderType === 'dinein' ? 'Reserved Time' : 'Est. Time'}
              </span>
              <div className="detail-text">{order.deliveryDetails.estimatedTime}</div>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className="special-instructions">
            <div
              className="instructions-toggle"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <span className="section-title" style={{ margin: 0, border: 'none', paddingBottom: 0 }}>
                Special Instructions
              </span>
              <span className={`toggle-icon ${showInstructions ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            {showInstructions && (
              <div className="instructions-content">
                {order.specialInstructions}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="order-card-actions">
          <button
            className="btn-order btn-complete"
            onClick={() => onComplete?.(order.orderId)}
          >
            ✓ Mark Complete
          </button>
          <button
            className="btn-order btn-cancel"
            onClick={() => onCancel?.(order.orderId)}
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
