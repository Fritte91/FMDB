import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieModal from './MovieModal';
import './MovieRow.css';

const MovieRow = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:5000/movies'); // Fetch from the backend
      const data = await response.json();
      // Randomize the movies and limit to 32
      const shuffledMovies = data.sort(() => 0.5 - Math.random()).slice(0, 32);
      setMovies(shuffledMovies);
    };

    fetchMovies();
  }, []);

  const openModal = (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You need to be logged in to view movie data. Please log in.');
      return;
    }
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // Show 4 slides at a time (adjust based on your design)
    slidesToScroll: 7,
    responsive: [
        {
          breakpoint: 1024, // Adjust for larger screens
          settings: {
            slidesToShow: 3, // Show 3 slides on medium screens
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768, // Adjust for smaller screens
          settings: {
            slidesToShow: 2, // Show 2 slides on small screens
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480, // Adjust for mobile screens
          settings: {
            slidesToShow: 1, // Show 1 slide on mobile
            slidesToScroll: 1,
          },
        },
      ],
  };

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie._id} onClick={() => openModal(movie)} className="movie-card">
              <img 
                src={movie.image} 
                alt={movie.title} 
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
      {isModalOpen && selectedMovie && (
        <MovieModal isOpen={isModalOpen} onRequestClose={closeModal} movie={selectedMovie} />
      )}
      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
};

export default MovieRow;
