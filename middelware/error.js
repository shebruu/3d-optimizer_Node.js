// Error handling middlewares
function notFoundHandler(req, res, next) {
    res.status(404).json({ error: 'Not Found' });
}

function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { notFoundHandler, errorHandler };
