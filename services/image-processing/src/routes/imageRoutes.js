const express = require('express');
const { processImage } = require('../controllers/imageController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Import the auth middleware

const router = express.Router();

// Route for image upload, protected by authentication middleware
router.post('/upload', auth, upload.single('image'), processImage);

module.exports = router;
