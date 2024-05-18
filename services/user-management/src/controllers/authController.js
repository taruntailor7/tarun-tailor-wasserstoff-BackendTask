const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JSON Web Token library for generating tokens
const config = require('../config/config'); // Import configuration settings

// Controller for handling user registration
const register = async (req, res) => {
    const { username, password, role } = req.body; // Extract username, password, and role from request body
    try {
        const user = new User({ username, password, role }); // Create a new User instance
        await user.save(); // Save the user to the database
        res.status(201).send({ message: 'User registered successfully' }); // Send success response
    } catch (error) {
        res.status(400).send({ message: 'Error registering user', error }); // Send error response
    }
};

// Controller for handling user login
const login = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body
    try {
        const user = await User.findOne({ username }); // Find the user by username
        if (!user || !(await user.comparePassword(password))) { // Check if user exists and password matches
            return res.status(401).send({ message: 'Invalid credentials' }); // Send unauthorized response if invalid
        }
        // Generate a JWT token with user ID and role as payload, signed with the secret key, expiring in 1 hour
        const token = jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
        res.send({ token }); // Send the generated token as response
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error }); // Send error response
    }
};

module.exports = { register, login }; // Export the register and login controllers
