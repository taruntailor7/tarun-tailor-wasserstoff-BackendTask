const sharp = require('sharp');
const crypto = require('crypto');

const processImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    // File path of the uploaded image
    const imagePath = req.file.path;

    try {
        // Perform image processing using sharp
        const processedImagePath = 'uploads/processed-' + req.file.filename;
        await sharp(imagePath)
            .resize(800, 600) // Resize the image to 800x600
            .toBuffer(); // Get the processed image as a Buffer

        // Respond with success message and processed image path
        res.status(200).send({ 
            message: 'Image uploaded and processed successfully',
            processedImagePath: processedImagePath
        });
    } catch (error) {
        res.status(500).send({ message: 'Error processing image', error });
    }
};

module.exports = { processImage };
