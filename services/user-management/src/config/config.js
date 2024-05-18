require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    port: process.env.PORT || 3000, // Server port
    mongoUri: process.env.MONGO_URI, // MongoDB connection URI
    jwtSecret: process.env.JWT_SECRET, // JWT secret key
};
