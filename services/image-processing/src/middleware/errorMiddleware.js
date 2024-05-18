// errorMiddleware.js

// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal server error' });
};

module.exports = errorMiddleware;
