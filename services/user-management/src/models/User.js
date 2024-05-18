const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username field (required and unique)
    password: { type: String, required: true }, // Password field (required)
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // Role field (either 'user' or 'admin', default is 'user')
});

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) { // Check if the password field is modified
        this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt factor of 10
    }
    next(); // Proceed to save the document
});

// Method to compare a candidate password with the stored hashed password
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); // Compare the passwords
};

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
