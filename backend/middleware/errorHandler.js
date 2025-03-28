// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error. Please try again later.',
        error: err.message
    });
};

module.exports = errorHandler;
