import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const userId =  '1'; 

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/api/product/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await api.post('/api/cart/add', {
        userId,
        productId: product.id, // send productId instead of categoryId
        quantity: 1
      });
      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{
      display: 'flex',
      gap: '30px',
      padding: '40px',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>

        <button
          onClick={handleAddToCart}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
