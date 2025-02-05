import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { toast, ToastContainer } from 'react-toastify';
import MovieModalYts from '../MovieModalYts'; // Import your modal component
import '../MovieRow.css'; // Ensure you have the CSS for styling

const ActionMovieRow = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchActionMovies = async () => {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre=action&minimum_rating=5&limit=50&with_rt_ratings=true'); // Updated API endpoint
      const data = await response.json();
      const actionMovies = data.data.movies; // Access the movies array
      const shuffledMovies = actionMovies.sort(() => 0.5 - Math.random()).slice(0, 20); // Adjust as needed
      setMovies(shuffledMovies);
    };

    fetchActionMovies();
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
    slidesToShow: 7, // Adjust based on your design
    slidesToScroll: 3,
  };

  return (
    <>
      <h2>Action Movies</h2>
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
        <MovieModalYts isOpen={isModalOpen} onRequestClose={closeModal} movie={selectedMovie} />
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

export default ActionMovieRow;
