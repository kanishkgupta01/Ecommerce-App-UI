import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId') || '1';
  const warehouseId = '6876aa982e5ac1fc26be3e07';
  const paymentMode = 'COD';

  const fetchCart = async () => {
    try {
      const res = await api.get(`/api/cart/${userId}`, {
        validateStatus: (status) => status >= 200 && status < 300 || status === 204
      });

      if (res.status === 204 || !res.data || !res.data.items) {
        setCart({ items: [] });
      } else {
        setCart(res.data);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/api/cart/remove`, {
        params: { userId, productId }
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
    return cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : !cart || cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.items.map((item) => (
              <li key={item.productId} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                marginBottom: '10px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{item.productName}</strong><br />
                  Quantity: {item.quantity} <br />
                  Price per item: ₹{item.price} <br />
                  Subtotal: ₹{item.price * item.quantity}
                </div>
                <button onClick={() => handleRemove(item.productId)} style={{ height: '40px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{calculateTotal()}</h3>
          <button onClick={handlePlaceOrder} style={{
            marginTop: 20,
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
