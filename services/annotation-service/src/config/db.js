const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from the environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new URL string parser instead of the deprecated one
            useUnifiedTopology: true, // Use the new server discovery and monitoring engine
            useCreateIndex: true // Make Mongoose's default index build use `createIndex()` instead of `ensureIndex()` (deprecated)
        });
        console.log('MongoDB connected'); // Log a success message if connection is successful
    } catch (error) {
        console.error('MongoDB connection failed:', error); // Log an error message if connection fails
        process.exit(1); // Exit the process with failure code 1
    }
};

module.exports = connectDB; // Export the connectDB function for use in other parts of the application
