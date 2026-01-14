const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from frontend/dist
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));

    // Handle React routing - return index.html for all non-API routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    });
} else {
    // Basic health check for development
    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to Task Management API' });
    });
}

// Error handling middleware
app.use(errorHandler);

module.exports = app;
