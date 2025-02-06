import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules'; // Adjusted import
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

  return (
    <div className="upcoming-movies">
      <h2>Theater movies</h2>
      <Swiper
        modules={[EffectCoverflow, Pagination]} // Use modules prop
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingMovies;
