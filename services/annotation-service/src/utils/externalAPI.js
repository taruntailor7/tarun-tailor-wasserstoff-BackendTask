// Import the Axios library for making HTTP requests
const axios = require('axios');

// Import configuration for cloud service (Google Cloud Vision API)
const config = require('../config/config');

// Function to annotate an image using the Google Cloud Vision API
const annotateImage = async (imageUrl) => {
    console.log("coming in annotateImage function for making call for Vision API");
    console.log("apikey: ", config.googleApiKey);
  
    try {
      const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${config.googleApiKey}`, {
        requests: [
          {
            image: {
              source: {
                imageUri: imageUrl
              }
            },
            features: [
              {
                type: "LABEL_DETECTION"
              }
            ]
          }
        ],
        "parent": "string"
      });
  
      console.log("response from google vision api: ", response.data);
      return response.data.responses[0].labelAnnotations;
    } catch (error) {
      console.error("Error calling Google Cloud Vision API:", error);
      throw error; // Or handle the error in a different way
    }
};

// Export the annotateImage function for use in other parts of the application
module.exports = { annotateImage };
