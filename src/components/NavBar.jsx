import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{ padding: 10, backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: 20 }}>Home</Link>
      <Link to="/cart" style={{ marginRight: 20 }}>Cart</Link>
      <Link to="/orders">Orders</Link>
    </nav>
  );
}

export default NavBar;
