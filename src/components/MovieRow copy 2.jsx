import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from './SliderArrows';
import MovieModal from './MovieModal';
import movies from './movies.json';
import './MovieRow.css';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MovieRow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [shuffledMovies, setShuffledMovies] = useState([]);
  const moviesPerPage = 9;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setShuffledMovies(shuffleArray([...movies]));
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    
  };

  const startIndex = currentPage * moviesPerPage;
  const currentMovies = shuffledMovies.slice(startIndex, startIndex + moviesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Slider {...settings}>
        {currentMovies.map((movie) => (
          <div key={movie.title} onClick={() => openModal(movie)} className="movie-card">
            <img src={movie.image} alt={movie.title} />
          </div>
        ))}
      </Slider>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
      <MovieModal isOpen={isModalOpen} onRequestClose={closeModal} movie={selectedMovie} />
    </>
  );
};

export default MovieRow;
