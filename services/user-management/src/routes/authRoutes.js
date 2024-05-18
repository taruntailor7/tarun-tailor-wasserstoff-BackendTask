const express = require('express'); // Import Express for creating router
const { register, login } = require('../controllers/authController'); // Import register and login controllers
const router = express.Router(); // Create a new router instance

// Define routes for user registration and login
router.post('/register', register); // Route for user registration
router.post('/login', login); // Route for user login

module.exports = router; // Export the router
