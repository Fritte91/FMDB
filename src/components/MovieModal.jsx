import React from 'react';
import Modal from 'react-modal';
import './MovieModal.css'; // Import the CSS file for styles

const MovieModal = ({ isOpen, onRequestClose, movie }) => {
  if (!movie) return null; // Return null if no movie data is provided

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false} // Disable accessibility warnings
    >
      <h2>{movie.title}</h2>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
      <p>Actors: {movie.actors ? movie.actors.join(', ') : 'N/A'}</p>
      <p>Description: {movie.description}</p>
      <h3>Trailer</h3>
      <iframe
        src={movie.trailerUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div>
        {movie.torrents.map(torrent => (
          <div key={torrent.url}>
            <a href={torrent.url} target="_blank" rel="noopener noreferrer">
              Download {torrent.quality} Torrent
            </a>
          </div>
        ))}
      </div>
      <img 
        src={movie.image} 
        alt={movie.title} 
        loading="lazy" // Enable lazy loading for modal image
      />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MovieModal;
