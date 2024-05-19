// const sharp = require('sharp');
// const crypto = require('crypto');
// const cloudinary = require('cloudinary').v2;

// const processImage = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send({ message: 'No file uploaded' });
//     }

//     // File path of the uploaded image
//     const imagePath = req.file.path;

//     try {
//         // Perform image processing using sharp
//         const processedImagePath = 'uploads/processed-' + req.file.filename;
//         await sharp(imagePath)
//             .resize(800, 600) // Resize the image to 800x600
//             .toBuffer(); // Get the processed image as a Buffer

//         // Respond with success message and processed image path
//         res.status(200).send({ 
//             message: 'Image uploaded and processed successfully',
//             processedImagePath: processedImagePath
//         });
//     } catch (error) {
//         res.status(500).send({ message: 'Error processing image', error });
//     }
// };

// module.exports = { processImage };

// src/controllers/imageController.js
const sharp = require('sharp');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

const processImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    try {
        // Process the image using sharp
        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(800, 600) // Resize the image to 800x600
            .toBuffer(); // Get the processed image as a Buffer

        // Generate a unique filename for the processed image
        const uniquePrefix = crypto.randomBytes(8).toString('hex');
        const extension = path.extname(req.file.originalname);

        // Upload the processed image buffer to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'processed', public_id: `processed-${uniquePrefix}`, format: 'png' },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );

            // Pipe the processed image buffer to Cloudinary
            uploadStream.end(processedImageBuffer);
        });

        // Respond with success message and Cloudinary URL of the processed image
        res.status(200).send({
            message: 'Image uploaded and processed successfully',
            processedImageUrl: uploadResult.secure_url
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send({ message: 'Error processing image', error: error.toString() });
    }
};


module.exports = { processImage };

