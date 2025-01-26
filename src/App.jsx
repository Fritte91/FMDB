import React from 'react'
import { useState } from 'react'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'
// src/main.jsx or src/App.jsx
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieRow from './components/MovieRow';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UpcomingMovies from './components/UpcomingMovies'; // Ensure this line is present
import ActionMovieRow from './components/ActionMovieRow';




function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <h1>FMDB - Movie Database</h1>
      <UpcomingMovies /> {/* Add the UpcomingMovies component */}
      <h2> Popular Movies</h2>
      <MovieRow />
      <h2> Top Rated Movies</h2>
      <MovieRow />
      <h2> Upcoming Movies</h2>
      <MovieRow />
      <h2> Action Movies</h2>
      <ActionMovieRow />
      <Footer />
    </div>
  )
}

export default App
