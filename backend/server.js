import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './db.js'; // Import the connectDB function
import Movie from './models/Movie.js'; // Correct import for default export
import fetch from 'node-fetch'; // Make sure to install node-fetch

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
connectDB();

// Proxy endpoint for fetching movies from YTS API
app.get('/api/movies', async (req, res) => {
  try {
    const response = await fetch('https://yts.mx/api/v2/list_movies.json?genre=action');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch movies from MongoDB
    res.json(movies); // Send the movies data as a response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
