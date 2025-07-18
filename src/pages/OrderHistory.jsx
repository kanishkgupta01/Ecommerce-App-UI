import React, { useEffect, useState } from 'react';
import api from '../api/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = '1';

  // Static map for category prices
  const categoryPrices = {
    1: { name: 'Jersey', price: 1299 },
    2: { name: 'Cap', price: 499 },
    3: { name: 'Flag', price: 349 },
    0: {name:'Jersey', price:1299}
  };

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
            const items = order.categoryIdVsCount || {};
            let totalPrice = 0;

            
            for (const [catId, count] of Object.entries(items)) {
              const price = categoryPrices[catId]?.price || 0;
              totalPrice += price * count;
            }

            return (
              <div key={index} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                width: '300px',
                backgroundColor: '#f7f7f7'
              }}>
                <h4>Order ID: {order.id}</h4>
                <p><strong>Status:</strong> Success</p>
                <div>
                  <strong>Items:</strong>
                  <ul>
                    {Object.entries(items).map(([catId, count]) => (
                      <li key={catId}>
                        {categoryPrices[catId]?.name || `Category ${catId}`}: {count} item(s)
                      </li>
                    ))}
                  </ul>
                </div>
                <p><strong>Total Amount Paid:</strong> ₹{totalPrice}</p>
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
