const vision = require('@google-cloud/vision');

async function analyzeImage(image) {
    try {
        const client = new vision.ImageAnnotatorClient({
            keyFilename: "/Users/taruntailor/Desktop/trans-dynamics-423811-b9-ec5753164796.json"
        });

        const [labels] = await client.labelDetection(image);
        const [safeSearch] = await client.safeSearchDetection(image);
        return { labels, safeSearch };
    } catch (error) {
        console.error("Error in test: ", error); 
    }
}

module.exports = { analyzeImage };