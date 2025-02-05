import React, { useState } from 'react';
import MovieModalYts from './MovieModalYts'; // Import the modal for displaying movie details
import './AdvancedSearchPage.css'; // Ensure you have the CSS for styling

const AdvancedSearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  const fetchMovies = async () => {
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${query}&genre=${genre}&year=${year}&minimum_rating=${rating}`);
    const data = await response.json();
    setMovies(data.data.movies);
  };

  const handleSearch = () => {
    fetchMovies();
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="page-container">
      <h1>Advanced Movie Search</h1>
      <input 
        type="text" 
        className="large-search-input"
        placeholder="Search for movies..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <div className="filters">
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="crime">Crime</option>
          <option value="documentary">Documentary</option>
          <option value="fantasy">Fantasy</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="thriller">Thriller</option>
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
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>Search Results for "{query}"</h2>
      <div className="movie-search-results">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => openModal(movie)}>
              <img src={movie.medium_cover_image} alt={movie.title} loading="lazy" />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {isModalOpen && selectedMovie && (
        <MovieModalYts isOpen={isModalOpen} onRequestClose={closeModal} movie={selectedMovie} />
      )}
    </div>
  );
};

export default AdvancedSearchPage;
