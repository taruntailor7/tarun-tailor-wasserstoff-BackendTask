// Import the Annotation model
const Annotation = require('../models/annotation');

// Import the annotateImage function from externalAPI utility
const { annotateImage } = require('../utils/externalAPI');

// Import the configured Cloudinary instance
const cloudinary = require('../config/cloudinary');

// Controller function for annotating images
const annotateImageController = async (req, res) => {
    // Extract imageUrl from the request body
    const { imageUrl } = req.body;
    console.log("imageUrl: ", imageUrl);
     
    try {
        // Call the annotateImage function to get annotations for the image
        const annotations = await annotateImage(imageUrl);

        // Create a new instance of Annotation model with imageUrl and annotations
        const annotation = new Annotation({
            imageUrl,
            annotations
        });

        // Save the annotation to the database
        await annotation.save();

        // Send a success response with the annotated image data
        res.status(201).send({ message: 'Image annotated successfully', annotation });
    } catch (error) {
        // If an error occurs during annotation, send a 500 Internal Server Error response
        res.status(500).send({ message: 'Error annotating image', error: error.toString() });
    }
};

// Export the annotateImageController function
module.exports = { annotateImageController };
