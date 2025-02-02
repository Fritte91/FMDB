import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import MovieModalYts from '../MovieModalYts'; // Import your modal component

import '../MovieRow.css'; // Ensure you have the CSS for styling

const AdventureMovieRow = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAdventureMovies = async () => {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre=adventure&minimum_rating=5&limit=50&with_rt_ratings=true&sort_by=rating&order_by=desc');
      const data = await response.json();
      setMovies(data.data.movies); // Adjust based on the API response structure
    };

    fetchAdventureMovies();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSelectMovie = (movie) => {
    console.log("Selected suggested movie:", movie); // Log the selected movie
    setSelectedMovie(movie);
    setIsModalOpen(true);
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
      <h2>Adventure Movies</h2>
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

export default AdventureMovieRow;
