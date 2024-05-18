const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const imageRoutes = require('./routes/imageRoutes');
app.use('/api/images', imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    console.log(`Image Processing Service listening at http://localhost:${port}`);
});
