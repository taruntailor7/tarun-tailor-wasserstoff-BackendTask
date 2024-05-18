const express = require('express'); // Import Express for creating the server
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const config = require('./config/config'); // Import configuration settings

const app = express(); // Initialize the Express app

app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api/auth', authRoutes); // Use the authentication routes for the /api/auth path

// Connect to MongoDB using Mongoose
mongoose.connect(config.mongoUri)
    .then(() => console.log('MongoDB connected')) // Log success message on successful connection
    .catch(err => console.error('MongoDB connection error:', err)); // Log error message on connection failure

// Start the server and listen on the specified port
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`); // Log message when the server is running
});

module.exports = app; // Export the Express app
