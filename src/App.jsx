import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar-Footer/Navbar';
import Footer from './components/Navbar-Footer/Footer';
import './App.css'
// src/main.jsx or src/App.jsx
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieRow from './components/MovieRow';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UpcomingMovies from './components/UpcomingMovies'; // Ensure this line is present
import ActionMovieRow from './components/GenreMovieRows/ActionMovieRow';
import MovieSearchPage from './components/MovieSearchPage'; // Create this component for advanced search
import GettingStarted from './components/GettingStarted'; // Import the new component
import CrimeMovieRow from './components/GenreMovieRows/CrimeMovieRow';
import ComedyMovieRow from './components/GenreMovieRows/ComedyMovieRow';
import AdventureMovieRow from './components/GenreMovieRows/AdventureMovieRow';
import FantasyMovieRow from './components/GenreMovieRows/FantasyMovieRow';
import DramaMovieRow from './components/GenreMovieRows/DramaMovieRow';
import HorrorMovieRow from './components/GenreMovieRows/HorrorMovieRow';
import ThrillerMovieRow from './components/GenreMovieRows/ThrillerMovieRow';
import ScifriMovieRow from './components/GenreMovieRows/ScifiMovieRow';
import DocumentaryMovieRow from './components/GenreMovieRows/DocumentaryMovieRow';
import AdvancedSearchPage from './components/AdvancedSearchPage';



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate('/'); // Navigate to the home page or search page
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/getting-started" element={<GettingStarted />} />
        
        <Route path="/AdvancedSearchPage" element={<AdvancedSearchPage />} /> {/* New advanced search page */}
        <Route path="/" element={searchQuery ? <MovieSearchPage query={searchQuery} /> : (
          <>
            <h1>FMDB - Movie Database</h1>
            <UpcomingMovies />
            <h2> Popular Movies</h2>
            <MovieRow />
            <h2> Top Rated Movies</h2>
            <MovieRow />
            <h2> Upcoming Movies</h2>
            <MovieRow />
            
            <ActionMovieRow />
            <AdventureMovieRow />
            <CrimeMovieRow />
            <ComedyMovieRow />
            <DocumentaryMovieRow />
            <DramaMovieRow />
            <FantasyMovieRow />
            <HorrorMovieRow />
            <ScifriMovieRow />
            <ThrillerMovieRow />
          </>
        )} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
