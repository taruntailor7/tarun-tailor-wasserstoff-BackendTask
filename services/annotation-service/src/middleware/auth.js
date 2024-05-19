// Import the JSON Web Token (JWT) library
const jwt = require('jsonwebtoken');

// Middleware function for JWT authentication
const auth = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token, remove 'Bearer ' prefix

    // Check if token is missing
    if (!token) {
        return res.status(401).send({ message: 'No token provided' }); // Return 401 Unauthorized status
    }

    try {
        // Verify the token using the JWT_SECRET from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to the request object
        req.user = decoded;
        
        // Call the next middleware function in the chain
        next();
    } catch (error) {
        // If token verification fails, return 401 Unauthorized status
        res.status(401).send({ message: 'Invalid token' });
    }
};

// Export the authentication middleware
module.exports = auth;
