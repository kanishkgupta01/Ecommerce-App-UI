import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await api.get('/api/product');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/api/category');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = {};
    if (name) params.name = name;
    if (categoryId) params.categoryId = categoryId;

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

      <form
        onSubmit={handleSearch}
        style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '8px 8px 8px 30px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            minWidth: '200px',
          }}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'flex-start',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
