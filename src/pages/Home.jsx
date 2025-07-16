import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const categoryNameToId = {
    Jersey: 1,
    Cap: 2,
    Flag: 3,
  };

  // ✅ Fetch all products on load
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await api.get('/api/product');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleSearch = async (e) => {
  e.preventDefault();

  const params = {};
  if (name) params.name = name;
  if (categoryName) params.categoryId = categoryNameToId[categoryName];

  // If no filters, show all
  if (Object.keys(params).length === 0) {
    fetchAllProducts();
    return;
  }

  try {
    const res = await api.get('/api/product/search', { params });
    setProducts(res.data);
  } catch (err) {
    console.error('Error searching products:', err);
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>All Products</h2>

      {/* 🔍 Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px',
            color: '#999'
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '8px 8px 8px 30px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minWidth: '200px'
            }}
          />
        </div>

        <select
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Categories</option>
          <option value="Jersey">Jersey</option>
          <option value="Cap">Cap</option>
          <option value="Flag">Flag</option>
        </select>

        <button type="submit" style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Search
        </button>
      </form>

      {/* 🛒 Product Grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'flex-start'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
