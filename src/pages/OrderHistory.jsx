import React, { useEffect, useState } from 'react';
import api from '../api/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = '1';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`/api/order/user/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch order history:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {orders.map((order, index) => {
            const products = order.items || [];
            const totalPrice = products.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div key={index} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                width: '300px',
                backgroundColor: '#f7f7f7'
              }}>
                <h4>UserId: {order.userId}</h4>
                <p><strong>Status:</strong> {order.status || 'Success'}</p>
                <div>
                  <strong>Items:</strong>
                  <ul>
                    {products.map((item, i) => (
                      <li key={i}>
                        {item.productName} - ₹{item.price} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <p><strong>Total Amount Paid:</strong> ₹{totalPrice}</p>
                 <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
                <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
