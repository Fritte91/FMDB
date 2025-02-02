import React, { useEffect, useState } from 'react';
import MovieModalYts from './MovieModalYts'; // Import the modal component
import './MovieSearchPage.css'; // Ensure this line is present

const MovieSearchPage = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${query}`);
      const data = await response.json();
      setMovies(data.data.movies); // Update with the correct path based on API response
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

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
      <nav className="navbar"> {/* Your Navbar Component Here */} </nav>
      <div className="movie-search-results">
        <h2>Search Results for "{query}"</h2>
        <div className="movie-grid">
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
      <footer className="footer"> {/* Your Footer Component Here */} </footer>
    </div>
  );
};

export default MovieSearchPage;
