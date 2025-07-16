import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = '1';
  const warehouseId = '6876aa982e5ac1fc26be3e07';
  const paymentMode = 'COD';

  // Hardcoded category info (name and price)
  const categoryInfo = {
    1: { name: 'Jersey', price: 1299 },
    2: { name: 'Cap', price: 499 },
    3: { name: 'Flag', price: 349 },
  };

  const fetchCart = async () => {
    try {
      const res = await api.get(`/api/cart/${userId}`, {
        validateStatus: (status) => status >= 200 && status < 300 || status === 204
      });

      if (res.status === 204 || !res.data) {
        setCart({ categoryIdVsCount: {} });
      } else {
        setCart(res.data);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart({ categoryIdVsCount: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (categoryId) => {
    try {
      await api.delete(`/api/cart/remove`, {
        params: { userId, categoryId }
      });
      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await api.post(`/api/order/place`, {
        userId,
        warehouseId,
        paymentMode
      });
      await api.delete(`/api/cart/clear/${userId}`);
      alert('Order placed and cart cleared!');
      fetchCart();
    } catch (err) {
      console.error('Order or clear failed:', err);
    }
  };

  const calculateTotal = () => {
    return Object.entries(cart.categoryIdVsCount || {}).reduce((total, [catId, qty]) => {
      const price = categoryInfo[catId]?.price || 0;
      return total + price * qty;
    }, 0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : !cart || Object.keys(cart.categoryIdVsCount || {}).length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.entries(cart.categoryIdVsCount).map(([categoryId, quantity]) => {
              const info = categoryInfo[categoryId] || { name: `Category ${categoryId}`, price: 0 };
              return (
                <li key={categoryId} style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{info.name}</strong><br />
                    Quantity: {quantity} <br />
                    Price per item: ₹{info.price} <br />
                    Subtotal: ₹{info.price * quantity}
                  </div>
                  <button onClick={() => handleRemove(categoryId)} style={{ height: '40px' }}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <h3>Total: ₹{calculateTotal()}</h3>
          <button onClick={handlePlaceOrder} style={{ marginTop: 20,
                  backgroundColor: '#1976d2',
                  color: 'white',
                  padding: '10px 20px',
      border: 'none',
    borderRadius: '5px',
    cursor: 'pointer' }}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
