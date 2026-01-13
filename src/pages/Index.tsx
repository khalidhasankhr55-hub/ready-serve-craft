import React from 'react';
import { OrderCard, OrderData } from '@/components/OrderCard';

// Sample order data showcasing all three order types
const sampleOrders: OrderData[] = [
  {
    orderId: 'ORD-2847',
    orderTime: 'Today, 2:35 PM',
    orderType: 'delivery',
    currentStep: 1,
    items: [
      { id: '1', name: 'Margherita Pizza (Large)', quantity: 2, kitchen: 'Pizza Station', status: 'preparing' },
      { id: '2', name: 'Garlic Bread', quantity: 1, kitchen: 'Pizza Station', status: 'ready' },
      { id: '3', name: 'Caesar Salad', quantity: 1, kitchen: 'Cold Kitchen', status: 'pending' },
    ],
    deliveryDetails: {
      customerName: 'John Smith',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Apt 4B, New York, NY 10001',
      estimatedTime: '3:15 PM',
    },
    specialInstructions: 'Extra cheese on pizza. No onions in salad. Please ring doorbell twice.',
  },
  {
    orderId: 'ORD-2848',
    orderTime: 'Today, 2:40 PM',
    orderType: 'dinein',
    currentStep: 2,
    items: [
      { id: '1', name: 'Grilled Salmon', quantity: 1, kitchen: 'Main Kitchen', status: 'ready' },
      { id: '2', name: 'Truffle Risotto', quantity: 1, kitchen: 'Main Kitchen', status: 'ready' },
      { id: '3', name: 'Tiramisu', quantity: 2, kitchen: 'Dessert Station', status: 'preparing' },
    ],
    deliveryDetails: {
      customerName: 'Emma Johnson',
      phone: '+1 (555) 987-6543',
      tableNumber: 'Table 12',
      estimatedTime: '2:55 PM',
    },
    specialInstructions: 'Anniversary celebration - please bring complimentary dessert candle.',
  },
  {
    orderId: 'ORD-2849',
    orderTime: 'Today, 2:45 PM',
    orderType: 'collection',
    currentStep: 0,
    items: [
      { id: '1', name: 'Chicken Tikka Masala', quantity: 2, kitchen: 'Indian Kitchen', status: 'pending' },
      { id: '2', name: 'Naan Bread', quantity: 4, kitchen: 'Indian Kitchen', status: 'pending' },
      { id: '3', name: 'Mango Lassi', quantity: 2, kitchen: 'Beverage Station', status: 'pending' },
    ],
    deliveryDetails: {
      customerName: 'Michael Chen',
      phone: '+1 (555) 456-7890',
      estimatedTime: '3:30 PM',
    },
  },
];

const Index: React.FC = () => {
  const handleComplete = (orderId: string) => {
    alert(`Order ${orderId} marked as complete!`);
  };

  const handleCancel = (orderId: string) => {
    alert(`Order ${orderId} cancelled!`);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e0de 100%)',
      padding: '40px 20px'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: '#371b17', 
            fontSize: '2.5rem', 
            fontWeight: '700',
            marginBottom: '8px'
          }}>
            Order Management
          </h1>
          <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
            Track and manage orders across all service types
          </p>
        </div>
        
        <div className="row justify-content-center">
          {sampleOrders.map((order) => (
            <div key={order.orderId} className="col-12 col-lg-4 mb-4 d-flex justify-content-center">
              <OrderCard
                order={order}
                onComplete={handleComplete}
                onCancel={handleCancel}
              />
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          padding: '20px',
          background: 'white',
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '40px auto 0'
        }}>
          <h3 style={{ color: '#371b17', marginBottom: '16px' }}>How to Use This Component</h3>
          <pre style={{ 
            textAlign: 'left', 
            background: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '8px',
            fontSize: '0.85rem',
            overflow: 'auto'
          }}>
{`// 1. Copy the OrderCard folder to your project
// 2. Import the component
import { OrderCard, OrderData } from './components/OrderCard';

// 3. Use it with your order data
<OrderCard
  order={yourOrderData}
  onComplete={(id) => handleComplete(id)}
  onCancel={(id) => handleCancel(id)}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Index;
