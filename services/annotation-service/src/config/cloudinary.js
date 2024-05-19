// Import the Cloudinary library
const cloudinary = require('cloudinary').v2;
// Import the configuration file where environment variables are stored
const config = require('../config/config');

// Configure Cloudinary with credentials from the environment variables
cloudinary.config({
    cloud_name: config.cloudinary.cloudName, // Cloudinary cloud name
    api_key: config.cloudinary.apiKey,       // Cloudinary API key
    api_secret: config.cloudinary.apiSecret, // Cloudinary API secret
});

// Export the configured Cloudinary instance for use in other parts of the application
module.exports = cloudinary;
