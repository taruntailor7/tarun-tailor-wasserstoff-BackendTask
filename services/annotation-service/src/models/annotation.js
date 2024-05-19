// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for annotations
const AnnotationSchema = new mongoose.Schema({
    // Image URL field, required
    imageUrl: {
        type: String,
        required: true
    },
    // Annotations field, storing annotations object, required
    annotations: {
        type: Object,
        required: true
    },
    // createdAt field, storing creation date, defaults to current date
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model based on the schema, named 'Annotation'
module.exports = mongoose.model('Annotation', AnnotationSchema);
