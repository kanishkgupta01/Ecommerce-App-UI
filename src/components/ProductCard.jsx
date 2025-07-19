import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '10px',
      width: '220px',
      textAlign: 'center',
      backgroundColor: '#eaf4ff',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    }}>
      <h4 style={{ color: '#333', marginBottom: 10 }}>{product.name}</h4>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>₹{product.price}</p>
      <Link
        to={`/product/${product.id || product._id}`}
        style={{
          display: 'inline-block',
          marginTop: 10,
          padding: '6px 12px',
          backgroundColor: '#a666afff',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none'
        }}
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
