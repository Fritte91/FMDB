import React, { useState } from 'react';

const SearchEngine = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query, genre, year, rating }); // Pass search parameters to parent
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select Genre</option>
        <option value="action">Action</option>
        <option value="drama">Drama</option>
        {/* Add more genres as needed */}
      </select>
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minimum Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchEngine;
