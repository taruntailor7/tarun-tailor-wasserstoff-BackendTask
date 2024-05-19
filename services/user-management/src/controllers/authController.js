const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JSON Web Token library for generating tokens
const config = require('../config/config'); // Import configuration settings

// Controller for handling user registration
const register = async (req, res) => {
    const { username, password, role } = req.body; // Extract username, password, and role from request body
    try {
        // Check if a user with the same username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' }); // Send error response if username already exists
        }

        // Create a new User instance
        const user = new User({ username, password, role });
        // Save the user to the database
        await user.save();
        // Send success response
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        // Send error response with details if registration fails
        res.status(500).send({ message: 'Error registering user', error: error.message });
    }
};

// Controller for handling user login
const login = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        // Check if user exists
        if (!user) {
            return res.status(401).send({ message: 'Username is incorrect' }); // Send error message if username is incorrect
        }
        // Check if password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Password is incorrect' }); // Send error message if password is incorrect
        }
        // Generate a JWT token with user ID and role as payload, signed with the secret key, expiring in 1 hour
        const token = jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, { expiresIn: '24h' });
        // Send success response with token
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        // Send error response if login fails
        res.status(500).send({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { register, login }; // Export the register and login controllers
