import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = 'mongodb+srv://FreddyLindberg:Bekind77@moviedb.pythd.mongodb.net/?retryWrites=true&w=majority&appName=MovieDB';

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB; // Use ES module export
