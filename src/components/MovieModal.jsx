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
      <div class="download-links">
  <a href={movie.torrentLink} target="_blank" rel="noopener noreferrer" class="download-button">
    1080P
  </a>
</div>

      
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MovieModal;
