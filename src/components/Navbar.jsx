import React from 'react';
import './Navbar.css'; // Create a separate CSS file for navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Freddy's Movie DB</div>
      <ul className="navbar-links">
        <li><a href="#popular">Popular Movies</a></li>
        <li><a href="#top-rated">Top Rated Movies</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
