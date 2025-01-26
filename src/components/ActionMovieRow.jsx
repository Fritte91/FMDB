import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import MovieModal from './MovieModalYts';
import './MovieRow.css';

const ActionMovieRow = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchActionMovies = async () => {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre=action'); // Fetch Action movies from YTS
      const data = await response.json();
      
      console.log(data); // Log the entire response to inspect its structure

      const actionMovies = data.data.movies; // Access the movies array
      const shuffledMovies = actionMovies.sort(() => 0.5 - Math.random()).slice(0, 20); // Randomize and limit
      setMovies(shuffledMovies);
    };

    fetchActionMovies();
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
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Adjust based on your design
    slidesToScroll: 1,
  };

  return (
    <>
      <h2>Action Movies</h2>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id} onClick={() => openModal(movie)} className="movie-card">
            <img src={movie.medium_cover_image} alt={movie.title} />
          </div>
        ))}
      </Slider>
      {isModalOpen && selectedMovie && (
        <MovieModal isOpen={isModalOpen} onRequestClose={closeModal} movie={selectedMovie} />
      )}
    </>
  );
};

export default ActionMovieRow;
