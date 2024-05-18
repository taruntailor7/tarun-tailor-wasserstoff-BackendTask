const jwt = require('jsonwebtoken'); // Import JSON Web Token library for token verification
const config = require('../config/config'); // Import configuration settings

// Middleware function for authentication
const auth = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    // Check if token exists
    if (!token) {
        return res.status(401).send({ message: 'Access denied' }); // Send unauthorized response if token is missing
    }
    try {
        // Verify the token using the JWT secret key
        const decoded = jwt.verify(token, config.jwtSecret);
        // Attach the decoded user information to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).send({ message: 'Invalid token' }); // Send error response if token is invalid
    }
};

module.exports = auth; // Export the auth middleware function
