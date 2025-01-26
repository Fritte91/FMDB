import React from 'react';
import Modal from 'react-modal';
import './MovieModal.css'; // Import the CSS file for styles

const MovieModalYts = ({ isOpen, onRequestClose, movie }) => {
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
    >
      <h2>{movie.title_long}</h2>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
      <p>Genres: {movie.genres.join(', ')}</p>
      <p>Description: {movie.synopsis || movie.summary || "No description available."}</p>
      <h3>Trailer</h3>
      <iframe
        src={trailerUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width="560"
        height="315"
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
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MovieModalYts;
