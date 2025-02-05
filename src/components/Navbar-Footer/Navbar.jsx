import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Ensure you have your navbar styles
import SearchBar from '../SearchBar'; // Import the SearchBar component

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Freddy's Movie DB</Link>
      <SearchBar onSearch={onSearch} /> {/* Move the SearchBar above the links */}
      
      <ul className="navbar-links">
        <li><Link to="/getting-started">Getting Started</Link></li>
        <li><Link to="/AdvancedSearchPage">Search</Link></li>
        <li><Link to="#top-rated">Top Rated Movies</Link></li>
        <li><Link to="#about">About</Link></li>
      </ul>

      {/* Add Login link here */}
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;
