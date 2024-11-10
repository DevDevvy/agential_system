// src/services/errorService.js

exports.handleError = (res, error) => {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: error.toString() });
};
