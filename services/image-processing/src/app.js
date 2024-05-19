const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const port = config.port;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
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

module.exports = app;
