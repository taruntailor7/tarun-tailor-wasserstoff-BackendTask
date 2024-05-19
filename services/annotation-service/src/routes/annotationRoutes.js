// Import Express framework
const express = require('express');

// Import controller function for annotating images
const { annotateImageController } = require('../controllers/annotationController');

// Import authentication middleware
const auth = require('../middleware/auth');

// Create an Express router instance
const router = express.Router();

// Route for annotating image
router.post('/annotate', auth, annotateImageController);
// ^ This route is protected by the auth middleware, ensuring only authenticated users can access it

// Export the router for use in the main application
module.exports = router;
