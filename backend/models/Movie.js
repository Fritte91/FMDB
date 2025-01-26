import mongoose from 'mongoose'; // Use ES module import

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: String, required: true },
  actors: { type: [String], required: true }, // Array of actors
  description: { type: String, required: true },
  trailerUrl: { type: String, required: true }, // URL for the trailer
  torrentLink: { type: String, required: true }, // URL for the torrent
  subtitleLink: { type: String, required: true }, // URL for the subtitle
  image: { type: String, required: true }, // Path to the image
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Export the Movie model as the default export
export default Movie;
