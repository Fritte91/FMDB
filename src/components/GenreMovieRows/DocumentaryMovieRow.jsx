import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import MovieModalYts from '../MovieModalYts'; // Import your modal component

import '../MovieRow.css'; // Ensure you have the CSS for styling

const DocumentaryMovieRow = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDocumentaryMovies = async () => {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre=documentary&minimum_rating=5&limit=50&with_rt_ratings=true&sort_by=rating&order_by=desc');
      const data = await response.json();
      setMovies(data.data.movies);
    };

    fetchDocumentaryMovies();
  }, []);

  const openModal = (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in to view movie data. Please log in.');
      return;
    }
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  };

  return (
    <>
      <h2>Documentary Movies</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie.id} onClick={() => openModal(movie)} className="movie-card">
              <img 
                src={movie.medium_cover_image} 
                alt={movie.title} 
                loading="lazy" 
              />
            </div>
          ))}
        </Slider>
      </div>
      {isModalOpen && selectedMovie && (
        <MovieModalYts 
          isOpen={isModalOpen} 
          onRequestClose={closeModal} 
          movie={selectedMovie} 
          onSelectMovie={handleSelectMovie} 
        />
      )}
    </>
  );
};

export default DocumentaryMovieRow;
