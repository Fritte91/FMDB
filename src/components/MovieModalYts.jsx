import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './MovieModal.css'; // Import the CSS file for styles

const MovieModalYts = ({ isOpen, onRequestClose, movie, onSelectMovie }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isOpen && movie) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movie.id}`);
          setSuggestions(response.data.data.movies); // Adjust based on the API response structure
        } catch (error) {
          console.error("Error fetching movie suggestions:", error);
        }
      };

      fetchSuggestions();
    }
  }, [isOpen, movie]);

  const handleSuggestionClick = (suggestion) => {
    onSelectMovie(suggestion); // Set the selected movie
    
  };

  if (!movie) return null; // Return null if no movie data is provided

  // Construct the trailer URL using the yt_trailer_code
  const trailerUrl = `https://www.youtube.com/embed/${movie.yt_trailer_code}`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false} // Disable accessibility warnings
      style={{
        content: {
          maxWidth: '800px', // Set a maximum width
          margin: 'auto', // Center the modal
          overflowY: 'auto', // Allow vertical scrolling
          maxHeight: '90vh', // Limit height to 90% of viewport height
        },
      }}
    >
      <button className="close-button" onClick={onRequestClose}>✖</button>
      <h2>{movie.title_long}</h2>
      <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Year: {movie.year}</p>
      <p><img src="/assets/imdblogo.png" alt="IMDb Logo" style={{ width: '70px', marginLeft: '5px' }} />: {movie.rating}</p>
      <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Genres: {movie.genres.join(', ')}</p>
      <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Description: {movie.synopsis || movie.summary || "No description available."}</p>
      <h3>Trailer</h3>
      <iframe
        src={trailerUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
      ></iframe>
      <h3>Torrents</h3>
      <div className="download-links">
        {movie.torrents.map(torrent => (
          <a key={torrent.url} href={torrent.url} target="_blank" rel="noopener noreferrer" className="download-button">
            Download {torrent.quality} Torrent
          </a>
        ))}
      </div>
      
      <h3>Suggested Movies</h3>
      <div className="suggested-movies">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="suggestion-card" onClick={() => handleSuggestionClick(suggestion)}>
            <img src={suggestion.medium_cover_image} alt={suggestion.title} />
          </div>
        ))}
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MovieModalYts;
