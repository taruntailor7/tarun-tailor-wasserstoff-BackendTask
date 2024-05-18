const express = require('express');
const router = express.Router();
const { processImage } = require('../controllers/imageController');

// Route for uploading and processing images
router.post('/upload', processImage);

module.exports = router;
