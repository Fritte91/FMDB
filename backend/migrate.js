import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Movie from './models/Movie.js'; // Ensure to add .js extension

const uri = 'mongodb+srv://FreddyLindberg:Bekind77@moviedb.pythd.mongodb.net/?retryWrites=true&w=majority&appName=MovieDB';

const migrateData = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Atlas connected');

    // Read the movies.json file
    const filePath = path.join(process.cwd(), 'movies.json'); // Use process.cwd() for the correct path
    const data = fs.readFileSync(filePath, 'utf8');
    const movies = JSON.parse(data); // Parse the JSON data

    // Clear existing movies and insert new ones
    await Movie.deleteMany({}); // Clear existing movies
    await Movie.insertMany(movies); // Insert new movies
    console.log('Movies migrated to MongoDB');
  } catch (err) {
    console.error('Error migrating data:', err);
  } finally {
    mongoose.connection.close();
  }
};

migrateData();
