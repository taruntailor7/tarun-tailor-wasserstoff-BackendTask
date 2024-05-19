// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Import function to connect to MongoDB
const annotationRoutes = require('./routes/annotationRoutes'); // Import annotation routes
const config = require('./config/config');

// Create Express app instance
const app = express();

// Define the port to listen on
const port = config.port

// Connect to MongoDB
connectDB(); // This function connects to MongoDB using Mongoose

// Middleware
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes

// Routes
app.use('/api/annotations', annotationRoutes); // Mount annotation routes under /api/annotations

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send({ message: 'Internal server error' }); // Send a generic 500 Internal Server Error response
});

// Start server
app.listen(port, () => {
    console.log(`Annotation Service listening at http://localhost:${port}`); // Log a message indicating the server is running
});
