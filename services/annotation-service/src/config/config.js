// Load environment variables from a .env file into process.env
require('dotenv').config();

// Export configuration settings
module.exports = {
    // Set the port from the environment variable or default to 3002
    port: process.env.PORT || 3002,

    // JWT secret key for signing tokens
    jwtSecret: process.env.JWT_SECRET,

    // Googlr api key for annotations
    googleApiKey : process.env.GOOGLE_VISION_API_KEY,
    googleProjectId: process.env.GOOGLE_PROJECT_ID,

    // Cloudnary configuration settings
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
        apiKey: process.env.CLOUDINARY_API_KEY,       // Cloudinary API key
        apiSecret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
    },
};
