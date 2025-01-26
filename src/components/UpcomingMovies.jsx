import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Import Slider from react-slick
import './UpcomingMovies.css'; // Create a CSS file for styling

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingMovies = async () => {
    try {
      console.log("TMDB API Key:", import.meta.env.VITE_TMDB_API_KEY); // Debugging line
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // Adjust this number based on your design
    slidesToScroll: 1,
    centerMode: true, // Center the active slide
    centerPadding: '60px', // Space around the centered slide
  };

  return (
    <div>
      <h2>Upcoming Movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UpcomingMovies;
