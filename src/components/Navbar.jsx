import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="logo">LOGO</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products/rings">Rings</Link>
        <Link to="/products/bangles">Bangles</Link>
        <Link to="/products/necklaces">Necklaces</Link>
        <Link to="/products/bracelets">Bracelets</Link>
        <Link to="/products/chains">Gold Chains</Link>
        <Link to="/products/earrings">Earrings</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/auth">Sign in</Link>
        <Link to="/admin" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>Admin</Link>
      </div>
    </div>
  );
};

export default Navbar;
